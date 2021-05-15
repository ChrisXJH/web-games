import axios from "axios";
import { HttpRequestConfig } from "./types";

export default class HttpService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private getUrl(target: string): string {
        return new URL(target, this.baseUrl).href;
    }

    get(target: string, config?: HttpRequestConfig): Promise<any> {
        return axios.get(this.getUrl(target), config).then(res => res.data);
    }

    put(target: string, data?: any, config?: HttpRequestConfig): Promise<any> {
        return axios.put(this.getUrl(target), data, config).then(res => res.data);
    }

    post(target: string, data?:any, config?: HttpRequestConfig) {
        return axios.post(this.getUrl(target), data, config).then(res => res.data);
    }
};
