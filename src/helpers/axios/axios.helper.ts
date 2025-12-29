import axios from "axios";
import {
  NodeConfig,
  ServerConfig,
} from "@/helpers/security/secrets/dotenv.secret";

export enum ContentType {
  ApplicationJson = `application/json`,
  XwwwFormUrlencoded = `application/x-www-form-urlencoded`,
  FormData = `multipart/form-data`,
}

export function AxiosInstance(contentType: ContentType) {
  const instance = axios.create({
    baseURL: `${ServerConfig.BACKEND_URL}`,
  });

  instance.defaults.headers.post["Content-Type"] = contentType;
  instance.defaults.headers["Cache-Control"] =
    "no-cache, no-store, must-revalidate";
  instance.defaults.headers["Pragma"] = "no-cache";
  instance.defaults.headers["Expires"] = "0";
  instance.defaults.timeout = 10 * 1000;

  // instance.interceptors.response.use(responseHandler, responseErrorHandler);

  return instance;
}
