import { ActionReducerMap } from "@ngrx/store";
import { authReducer, IAuthState } from "./reducers";



export interface IAuthUserState {
    readonly auth: IAuthState;
}

export const reducers: ActionReducerMap<IAuthUserState> = {
    auth: authReducer
};