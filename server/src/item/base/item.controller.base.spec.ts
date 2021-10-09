import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { ItemController } from "../item.controller";
import { ItemService } from "../item.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  completed: "true",
  createdAt: new Date(),
  details: "exampleDetails",
  dueDate: new Date(),
  id: "exampleId",
  title: "exampleTitle",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  completed: "true",
  createdAt: new Date(),
  details: "exampleDetails",
  dueDate: new Date(),
  id: "exampleId",
  title: "exampleTitle",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    completed: "true",
    createdAt: new Date(),
    details: "exampleDetails",
    dueDate: new Date(),
    id: "exampleId",
    title: "exampleTitle",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  completed: "true",
  createdAt: new Date(),
  details: "exampleDetails",
  dueDate: new Date(),
  id: "exampleId",
  title: "exampleTitle",
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Item", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ItemService,
          useValue: service,
        },
      ],
      controllers: [ItemController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /items", async () => {
    await request(app.getHttpServer())
      .post("/items")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        dueDate: CREATE_RESULT.dueDate.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /items", async () => {
    await request(app.getHttpServer())
      .get("/items")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          dueDate: FIND_MANY_RESULT[0].dueDate.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /items/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/items"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /items/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/items"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        dueDate: FIND_ONE_RESULT.dueDate.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
