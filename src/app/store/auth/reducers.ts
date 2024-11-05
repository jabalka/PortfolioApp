import { createReducer, on } from '@ngrx/store';

import { UserModel } from "../user/User.model";
import { login, logout, register } from "./actions";



export interface IAuthState{
    currentUser: UserModel | null;
    error: string | null;
    isLoading: boolean;
}

export const initialState: IAuthState = {
    currentUser: null,
    error: null,
    isLoading: false
}

const setCurrentUser = (
    state: IAuthState,
    action: 
        ReturnType<typeof login> |
        ReturnType<typeof register> 
) => {
    const newState = {...state, currentUser: action.user, error: null};
    return newState;
}

export const authReducer = createReducer<IAuthState>(
    initialState,
    on(login, setCurrentUser),
    on(register, setCurrentUser),
    on(logout, (state) => {
        return {...state, currentUser: null, error: null}
    })
)


//Parse/s88wY1HVckyvCtjembSWrWOV7UmkK8O8d2i4SBIZ/currentUser
//Parse/s88wY1HVckyvCtjembSWrWOV7UmkK8O8d2i4SBIZ/currentUser