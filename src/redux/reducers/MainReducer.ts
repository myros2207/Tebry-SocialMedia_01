import {StateModel} from "../../Model/StateModel";

const defaultState = new StateModel("", "", "")

export enum ActionType{
    SETLOGIN = "SET_LOGIN",
    SETTOKEN = "SET_TOKEN",
    LOGIN = "LOGIN"
}

export type Action = {
    type: ActionType,
    payload: StateModel
}

export const mainReducer = (state: StateModel = defaultState, action: Action) => {
    switch (action.type){
        case ActionType.SETLOGIN:
            return new StateModel(action.payload.Login, state.Token, state.Role)
        case ActionType.SETTOKEN:
            return new StateModel(state.Login, action.payload.Token, state.Role)
        case ActionType.LOGIN:
            return new StateModel(action.payload.Login, action.payload.Token, action.payload.Role)

        default:
            return new StateModel(state.Login, state.Token, state.Role)
    }
}

export type State = ReturnType<typeof mainReducer>;
