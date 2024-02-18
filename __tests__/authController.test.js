const app = require("../app");
const request = require("supertest");

describe("INTEGRATION TEST :: POST /api/auth/registration", () => {
  it("REGISTRATION ROUTE TEST :: must respond with status 201 and with access token", async () => {
    const { expect } = await import("chai");
    const response = await request(app)
      .post("/api/auth/registration")
      .send({
        authorizePrivateKey: process.env.AUTH_PRIVATE_KEY,
      })
      .expect(201);

    expect(response.body.accessToken);
  });

  it("REGISTRATION ROUTE TEST :: when request doesnt have property authorizePrivateKey", async () => {
    const { expect } = await import("chai");
    const response = await request(app)
      .post("/api/auth/registration")
      .send({})
      .expect(400);

    expect(response.body.message).to.deep.equal("Use your authorizePrivateKey");
  });

  it("REGISTRATION ROUTE TEST :: when request has invalid authorizePrivateKey", async () => {
    const { expect } = await import("chai");
    const response = await request(app)
      .post("/api/auth/registration")
      .send({ authorizePrivateKey: "wrongKey" })
      .expect(401);

    expect(response.body.message).to.deep.equal(
      "Invalid or expired private key"
    );
  });
});
