import { AxiosRequestConfig } from "axios";

export type HttpRequestConfig = AxiosRequestConfig | undefined;

export type SetUserRequest = {
    displayName: string;
};
