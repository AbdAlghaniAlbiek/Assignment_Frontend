// import { cookies } from "next/headers";
// import { IEntityFilter, IReadDto } from "../../dtos/pagination.dto";
// import { IGetSuccessResponse } from "../../dtos/response.dto";
import {
  IGetAllAPI,
  TCreateAPI,
  TCreateManyAPI,
  TDeleteAPI,
  TDeleteManyAPI,
  // TGetAPI,
  TGetOneAPI,
  TOrderAPI,
  TRestoreAPI,
  TUpdateAPI,
  TUpdateManyAPI,
} from "./types/fetch.types";
import {
  AxiosInstance,
  ContentType,
  // paginationQueryParamsGenerator,
} from "./axios.helper";
import { Axios } from "axios";

export class EntityAPIs<TCreateDto, TUpdateDto, TReadDto, TResponse> {
  public axiosInstance;
  constructor(public endpointUrl: string) {
    this.axiosInstance = AxiosInstance(ContentType.ApplicationJson);
  }

  public appendToken(token: string) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  async create({
    entity,
    token,
    signal,
  }: TCreateAPI<TCreateDto>): Promise<TResponse> {
    if (token) this.appendToken(token);

    return (
      await this.axiosInstance.post<TResponse>(
        `${this.axiosInstance.getUri()}/${this.endpointUrl}`,
        entity,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
          ...(signal && { signal }),
        }
      )
    ).data;
  }

  async update({
    entity,
    id,
    token,
    signal,
  }: TUpdateAPI<TUpdateDto>): Promise<TResponse> {
    if (token) this.appendToken(token);

    return (
      await this.axiosInstance.put<TResponse>(
        `${this.axiosInstance.getUri()}/${this.endpointUrl}/${id}`,
        entity,
        {
          headers: { Authorization: `Bearer ${token}` },

          withCredentials: true,
          ...(signal && { signal }),
        }
      )
    ).data;
  }

  async delete({ id, token, signal }: TDeleteAPI): Promise<TResponse> {
    if (token) this.appendToken(token);

    return (
      await this.axiosInstance.delete<TResponse>(
        `${this.axiosInstance.getUri()}/${this.endpointUrl}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },

          withCredentials: true,
          ...(signal && { signal }),
        }
      )
    ).data;
  }

  // async get({
  //   options,
  //   signal,
  //   token,
  // }: TGetAPI<TReadDto>): Promise<IGetSuccessResponse<TResponse>> {
  //   if (token) this.appendToken(token);

  //   return (
  //     await this.axiosInstance.get<IGetSuccessResponse<TResponse>>(
  //       paginationQueryParamsGenerator(
  //         `${this.axiosInstance.getUri()}/${this.endpointUrl}`,
  //         options
  //       ),
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         // headers: { Authorization: tokenVal },
  //         ...(signal && { signal }),
  //         withCredentials: true,
  //       }
  //     )
  //   ).data;
  // }

  async getAll({ signal, token }: IGetAllAPI) {
    return (
      await this.axiosInstance.get<TResponse[]>(
        `${this.axiosInstance.getUri()}/${this.endpointUrl}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          // headers: { Authorization: tokenVal },
          ...(signal && { signal }),
          // withCredentials: true,
        }
      )
    ).data;
  }

  async getOne({ id, signal, token }: TGetOneAPI): Promise<TResponse> {
    if (token) this.appendToken(token);

    return (
      await this.axiosInstance.get(
        `${this.axiosInstance.getUri()}/${this.endpointUrl}/${id}`,
        {
          signal,
          withCredentials: true,
        }
      )
    ).data;
  }
}
