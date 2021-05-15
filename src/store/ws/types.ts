import { AnyAction } from "redux";

export type ActionPreparer =
    (prepareDefaultAction: (...args: any[]) => AnyAction, ...args: any[]) => AnyAction;

export type EmitPayload = {
    event: any,
    args: any[]
};
