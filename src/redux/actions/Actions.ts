import {Dispatch} from "react";
import {Action, ActionType} from "../reducers/MainReducer";
import {StateModel} from "../../Model/StateModel";

export const SetLogin = (state: StateModel) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETLOGIN,
            payload: state
        })
    }
}

export const SetToken = (state: StateModel) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETTOKEN,
            payload: state
        })
    }
}

export const Login = (state: StateModel) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOGIN,
            payload: state
        })
    }
}