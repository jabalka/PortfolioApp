import { createAction, props } from '@ngrx/store';
import { UserModel } from '../user/User.model';



const authNamespace = `[AUTH]`;

export const login = createAction(`${authNamespace} Login`, props<{ user: UserModel }>());
const userLoginNamespace = '[USER LOGIN]';
export const userLoginSetLoading = createAction(`${userLoginNamespace} SET LOADING`, props<{ isLoading: boolean}>());
export const userLoginSetErrorMessage = createAction(`${userLoginNamespace} SET ERROR MESSAGE`, props<{ message: string}>());

export const register = createAction(`${authNamespace} Register`, props<{ user: UserModel }>());
const userRegisterNamespace = '[USER Register]';
export const userRegisterSetLoading = createAction(`${userRegisterNamespace} SET LOADING`, props<{ isLoading: boolean}>());
export const userRegisterSetErrorMessage = createAction(`${userRegisterNamespace} SET ERROR MESSAGE`, props<{ message: string}>());

export const logout = createAction(`${authNamespace} Logout`);
export const authenticate = createAction(`${authNamespace} Authenticate`, props<{ user: UserModel | null }>());
export const setUserSuccess = createAction(`${authNamespace} Set User`, props<{ user: UserModel }>());
export const setUserFailure = createAction(`${authNamespace} Set User Failure`, props<{ error: any }>());

