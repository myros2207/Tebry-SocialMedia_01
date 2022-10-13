import {applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import {mainReducer} from "../reducers/MainReducer";
import {StateModel} from "../../Model/StateModel";
import {persistReducer, persistStore} from "redux-persist"
//@ts-ignore
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "main-root",
    storage
}

const persistedReducer = persistReducer(persistConfig, mainReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk))

export const Persistor = persistStore(store)