export type UserID = string;
export type GameID = string;

export interface User {
    id: UserID;
    displayName: string;
};

export interface GameSnapshot {
    gameId: GameID;
    players: User[];
};

export interface GameAction {};

export interface GomokuGameAction extends GameAction {
    x: number;
    y: number;
};

export type GomokuSnapshotGrid = [UserID, number, number][];

export interface GomokuSnapshot extends GameSnapshot {
    dimensions: [number, number];
    grid: GomokuSnapshotGrid;
};

// Websocket Requests
export type GamePlayRequest = {
    gameId: GameID;
    action: GameAction;
};

// Websocket Events
export type GamePlayEvent = {
    gameId: GameID;
    playerId: UserID;
    action: GameAction;
};
