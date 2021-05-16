import type { GameSnapshot } from '../common/types';
import HttpService from './http-service';

const GAME_V1_API = '/api/v1/game';

export default class GameService {
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  createGame(): Promise<GameSnapshot> {
    return this.httpService.post(GAME_V1_API, null, { withCredentials: true });
  }
}
