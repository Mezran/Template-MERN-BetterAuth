import request from "supertest";

declare global {
  var testRequest: ReturnType<typeof request>;
  var logger: any;
}

export {};
