import { User } from "../common/types";
import HttpService from "./http-service";
import { SetUserRequest } from "./types";

const USER_API = '/api/v1/user';

export default class UserService {
    private httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    getUser(): Promise<User> {
        return this.httpService.get(USER_API, { withCredentials: true });
    }

    setUser(request: SetUserRequest): Promise<User> {
        return this.httpService.put(USER_API, request, { withCredentials: true });
    }
};
