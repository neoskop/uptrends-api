import "mocha";
import { expect, use } from "chai";
import { Request } from "./request";
import { spy, SinonSpy } from "sinon";
import * as sinonChai from "sinon-chai";
import * as request from "request";

use(sinonChai);

describe("Request", () => {
  let req: Request;
  let reqSpy: SinonSpy;
  let requestSpy: SinonSpy;
  let requestDefaultsSpy: SinonSpy;

  beforeEach(() => {
    req = Object.create(Request.prototype);
    (req as any).req = reqSpy = spy(function req() {});
    requestSpy = spy<any>(req, "request");
    requestDefaultsSpy = spy(request, "defaults");
  });

  afterEach(() => {
    requestDefaultsSpy.restore();
  });

  describe(":constructor", () => {
    it("should provide defaults to request", () => {
      const req = new Request({
        baseUrl: "http://example.com",
        username: "foo",
        password: "bar",
      });

      expect(req).to.be.instanceOf(Request);
      expect(requestDefaultsSpy).to.have.been.calledOnce;
      expect(requestDefaultsSpy).to.have.been.calledWith({
        baseUrl: "http://example.com",
        auth: {
          username: "foo",
          password: "bar",
        },
      });
    });

    it("should use default baseUrl", () => {
      const req = new Request({ username: "foobar", password: "baz" });

      expect(req).to.be.instanceOf(Request);
      expect(requestDefaultsSpy).to.have.been.calledOnce;
      expect(requestDefaultsSpy).to.have.been.calledWith({
        baseUrl: "http://api.uptrends.com/v3",
        auth: {
          username: "foobar",
          password: "baz",
        },
      });
    });
  });

  describe(":get", () => {
    it("should call this.request", () => {
      req.get("/foobar");

      expect(requestSpy).to.have.been.calledOnce;
      expect(requestSpy).to.have.been.calledWith("GET", "/foobar");
    });
  });

  describe(":post", () => {
    it("should call this.request", () => {
      const obj = {};
      req.post("/foobar", obj);

      expect(requestSpy).to.have.been.calledOnce;
      expect(requestSpy).to.have.been.calledWith("POST", "/foobar", obj);
    });
  });

  describe(":put", () => {
    it("should call this.request", () => {
      const obj = {};
      req.put("/foobar", obj);

      expect(requestSpy).to.have.been.calledOnce;
      expect(requestSpy).to.have.been.calledWith("PUT", "/foobar", obj);
    });
  });

  describe(":delete", () => {
    it("should call this.request", () => {
      const obj = {};
      req.delete("/foobar");

      expect(requestSpy).to.have.been.calledOnce;
      expect(requestSpy).to.have.been.calledWith("DELETE", "/foobar");

      requestSpy.reset();

      req.delete("/foobar", obj);

      expect(requestSpy).to.have.been.calledOnce;
      expect(requestSpy).to.have.been.calledWith("DELETE", "/foobar", obj);
    });
  });

  describe(":request", () => {
    it("should call request", () => {
      (req as any).request("GET", "/foobar");

      expect(reqSpy).to.have.been.calledOnce;
    });

    it("should append format to url", () => {
      (req as any).request("GET", "/foobar");
      (req as any).request("GET", "/foobar?foo=bar");

      expect(reqSpy.getCall(0).args[0].url).to.be.equal("/foobar?format=json");
      expect(reqSpy.getCall(1).args[0].url).to.be.equal(
        "/foobar?foo=bar&format=json"
      );
    });

    it("should provide method", () => {
      (req as any).request("GET", "/foobar");
      (req as any).request("POST", "/foobar", {});

      expect(reqSpy.getCall(0).args[0].method).to.be.equal("GET");
      expect(reqSpy.getCall(1).args[0].method).to.be.equal("POST");
    });

    it("should provide json", () => {
      (req as any).request("GET", "/foobar");
      (req as any).request("POST", "/foobar", { post: "data" });
      (req as any).request("DELETE", "/foobar");
      (req as any).request("DELETE", "/foobar", { delete: "data" });

      expect(reqSpy).to.have.been.calledWith({
        method: "GET",
        url: "/foobar?format=json",
        json: true,
      });
      expect(reqSpy).to.have.been.calledWith({
        method: "POST",
        url: "/foobar?format=json",
        json: { post: "data" },
      });
      expect(reqSpy).to.have.been.calledWith({
        method: "DELETE",
        url: "/foobar?format=json",
        json: true,
      });
      expect(reqSpy).to.have.been.calledWith({
        method: "DELETE",
        url: "/foobar?format=json",
        json: { delete: "data" },
      });
    });

    it("should reject promise on error", (done) => {
      (req as any)
        .request("GET", "/foobar")
        .then(
          () => {
            throw new Error("should reject");
          },
          (err: any) => {
            expect(err).to.be.instanceOf(Error);
            expect(err).to.have.property("message", "err");
          }
        )
        .then(done, done);

      reqSpy.getCall(0).args[1](new Error("err"));
    });

    it("should return json body", (done) => {
      const RES = { json: "body" };
      (req as any)
        .request("GET", "/foobar")
        .then((res: any) => {
          expect(res).to.be.equal(RES);
        })
        .then(done, done);

      reqSpy.getCall(0).args[1](null, {}, RES);
    });
  });
});
