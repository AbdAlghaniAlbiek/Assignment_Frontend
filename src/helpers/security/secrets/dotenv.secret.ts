import { INodeConfig, IServerConfig } from "./dotenvInterface.secret";

export const ServerConfig: IServerConfig = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
};

export const NodeConfig: INodeConfig = {
  APP_PORT: Number.parseInt(process.env.NEXT_PUBLIC_APP_PORT as string),
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as string,
};
