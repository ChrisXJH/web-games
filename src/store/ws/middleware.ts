import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware, MiddlewareAPI } from 'redux';
import { WEBSOCKET_EMIT } from '../constants';
import { ServicesAPI } from '../types';
import { websocketConnect, websocketEvent } from './actions';
import { ActionPreparer, EmitPayload } from './types';

const prepareDefaultAction = (...args: any[]) => websocketEvent(args);

export type WebsocketMiddlewareOptions = {
    api: ServicesAPI;
    prepareAction?: ActionPreparer;
};

const handleConnected = (options: WebsocketMiddlewareOptions, store: MiddlewareAPI) => {
    const { api, prepareAction = prepareDefaultAction } = options;

    api.websocketService.onAny((...args) => {
        const action = prepareAction(prepareDefaultAction, ...args);

        if (process.env.NODE_ENV !== 'production') {
            console.log(action);
        }

        store.dispatch(action);
    });
}

const handleEmit = (options: WebsocketMiddlewareOptions, action: PayloadAction<EmitPayload>) => {
    const { api } = options;
    const { payload: { event, args } } = action;
    
    api.websocketService.emit(event, ...args);
};

export const websocketMiddleware = (options: WebsocketMiddlewareOptions): Middleware => store => next => action => {
    const { type } = action;

    switch (type) {
        case websocketConnect.fulfilled.type:
            handleConnected(options, store);
            break;

        case WEBSOCKET_EMIT:
            handleEmit(options, action);
            break;

        default:
            break;
    }

    return next(action);
};
