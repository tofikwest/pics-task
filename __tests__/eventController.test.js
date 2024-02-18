const app = require("../app");
require("dotenv").config();

const request = require("supertest");
const processEvent = require("../utils/processEvent");

// * TEST 1
const testCase_1 = {
  config: {
    destinations: [
      {
        name: "destination1",
        url: "http://example.com/endpoint",
        transport: "http.post",
      },
      {
        name: "destination2",
        url: "http://example2.com/endpoint",
        transport: "http.put",
      },
      {
        name: "destination3",
        url: "http://example3.com/endpoint",
        transport: "http.get",
      },
      {
        name: "destination4",
        transport: "console.log",
      },
    ],
    strategy: "ALL",
  },
  event: {
    payload: { a: 1, b: 2 },
    possibleDestinations: [
      {
        destination1: true,
        destination2: true,
        destination3: true,
      },
      {
        destination1: true,
        destination3: false,
      },
      {
        destination1: true,
        destination2: true,
        destination4: false,
      },
      {
        destination5: true,
      },
    ],
  },
  expectResult: {
    destination1: true,
    destination2: true,
    destination3: false,
    destination4: false,
    destination5: false,
  },
};

// * TEST 2
const testCase_2 = {
  config: {
    destinations: [
      {
        name: "destination1",
        url: "http://example.com/endpoint",
        type: "http.post",
      },
      {
        name: "destination2",
        url: "http://example2.com/endpoint",
        type: "http.put",
      },
      {
        name: "destination3",
        url: "http://example3.com/endpoint",
        type: "http.get",
      },
      {
        name: "destination4",
        url: "http://example4.com/endpoint",
        type: "http.get",
      },
    ],
    strategy: "ANY",
  },
  event: {
    payload: { a: 1, b: 2 },
    possibleDestinations: [
      {
        destination1: true,
        destination2: true,
        destination3: true,
      },
      {
        destination1: false,
        destination3: false,
      },
      {
        destination1: true,
        destination2: false,
        destination4: false,
      },
      {
        destination5: true,
      },
    ],
  },
  expectResult: {
    destination1: true,
    destination2: true,
    destination3: true,
    destination4: false,
    destination5: false,
  },
};

// * TEST 3
const testCase_3 = {
  config: {
    destinations: [
      {
        name: "destination1",
        url: "http://example.com/endpoint",
        transport: "http.post",
      },
      {
        name: "destination2",
        url: "http://example2.com/endpoint",
        transport: "http.put",
      },
      {
        name: "destination3",
        url: "http://example3.com/endpoint",
        transport: "http.get",
      },
      {
        name: "destination4",
        transport: "console.log",
      },
    ],
    strategy: "ANY",
  },
  event: {
    payload: { a: 1, b: 2 },
    strategy: "() => { return true; }",
    possibleDestinations: [
      {
        destination1: true,
        destination2: true,
        destination3: true,
      },
      {
        destination1: true,
        destination3: false,
      },
      {
        destination1: true,
        destination2: true,
        destination4: false,
      },
      {
        destination5: true,
      },
    ],
  },
  expectResult: {
    destination1: true,
    destination2: true,
    destination3: true,
    destination4: true,
    destination5: false,
  },
};

describe("UNIT TESTS CASE :  EVENTS", () => {
  it("TEST 1 :: should return validate destinations", async () => {
    const { expect } = await import("chai");

    const res = processEvent(testCase_1.event, testCase_1.config);

    expect(res).to.deep.equal(testCase_1.expectResult);
  });

  it("TEST 2 :: should return validate destinations", async () => {
    const { expect } = await import("chai");

    const res = processEvent(testCase_2.event, testCase_2.config);

    expect(res).to.deep.equal(testCase_2.expectResult);
  });

  it("TEST 3 :: should return validate destinations", async () => {
    const { expect } = await import("chai");

    const res = processEvent(testCase_3.event, testCase_3.config);

    expect(res).to.deep.equal(testCase_3.expectResult);
  });
});

describe("INTERGRATION TEST : EVENT :: POST /api/event/", () => {
  it("TEST 1 NEED TO USE TEST 1 DESTINATION CONFIG :: should respond with status 200 and return validate destinations", async () => {
    const { expect } = await import("chai");

    const registerReq = await request(app)
      .post("/api/auth/registration")
      .send({ authorizePrivateKey: process.env.AUTH_PRIVATE_KEY })
      .expect(201);

    const response = await request(app)
      .post("/api/event/")
      .set("Authorization", `Bearer ${registerReq.body.accessToken}`)
      .send(testCase_1.event)
      .expect(200);

    expect(response.body.answer).to.deep.equal(testCase_1.expectResult);
    expect(response.body.error).to.be.null;
  });
});
