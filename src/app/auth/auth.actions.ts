import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string }>());

export const resetToken = createAction('Reset token');