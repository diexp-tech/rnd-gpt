import https from "https";

import { Logger } from "@nestjs/common";

export interface SendRequestDto {
  body: Record<string, any> | FormData;
  host: string;
  path: string;
  method: string;
  headers?: Record<string, unknown>;
}

export class HttpService {
  private readonly apiToken: string;

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  public async sendRequest(data: SendRequestDto) {
    const { host, body, method, headers = {}, path } = data;

    const postData = body instanceof FormData ? body : JSON.stringify(body);

    const options = {
      host,
      path,
      method,
      headers: {
        ...headers,
        Authorization: `Bearer ${this.apiToken}`,
      },
    };

    return await new Promise((resolve, reject) => {
      const postReq = https.request(options, (res) => {
        let responseBody = "";
        res.on("data", (chunk) => {
          responseBody += chunk;
        });

        res.on("end", () => {
          let resBody;
          try {
            resBody = JSON.parse(responseBody);
          } catch (e) {
            resBody = responseBody;
          }

          resolve(resBody);
        });
      });

      postReq.on("error", (e) => {
        Logger.error(`problem with request: ${e.message}`);
        reject(e);
      });

      postReq.write(postData);
      postReq.end();
    });
  }
}
