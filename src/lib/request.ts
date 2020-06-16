import {
  RequestAPI,
  Request as RequestRequest,
  RequestResponse,
  CoreOptions,
  RequiredUriUrl,
} from "request";
import debug from "debug";
const D = debug("uptrends:request");

export interface IRequest {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body: object): Promise<T>;
  put<T>(path: string, body: object): Promise<T>;
  delete<T>(path: string, body?: object): Promise<T>;
}

export interface IRequestConfig {
  baseUrl?: string;
  username: string;
  password: string;
}

export class Request implements IRequest {
  readonly req: RequestAPI<RequestRequest, CoreOptions, RequiredUriUrl>;

  constructor({
    baseUrl = "http://api.uptrends.com/v3",
    username,
    password,
  }: IRequestConfig) {
    this.req = require("request").defaults({
      baseUrl,
      auth: {
        username,
        password,
      },
    });
  }

  protected request<T>(
    method: string,
    path: string,
    body?: object
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const url = path + (-1 < path.indexOf("?") ? "&" : "?") + "format=json";
      D("request %s %s (%j)", method, path, body);
      this.req(
        {
          method,
          url,
          json: body || true,
        },
        (err: any, _response: RequestResponse, body: T) => {
          if (err) {
            D("ERROR %j", err);
            return reject(err);
          }

          D("response %s %s (%j)", method, path, body);
          resolve(body);
        }
      );
    });
  }

  get<T>(path: string): Promise<T> {
    return this.request("GET", path);
  }

  post<T>(path: string, body: object): Promise<T> {
    return this.request("POST", path, body);
  }

  put<T>(path: string, body: object): Promise<T> {
    return this.request("PUT", path, body);
  }

  delete<T>(path: string, body?: object): Promise<T> {
    return this.request("DELETE", path, body);
  }
}
