/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:38
 * About:
 *
 */

import {combineReducers, configureStore, ThunkAction, Action, Reducer, CombinedState} from '@reduxjs/toolkit'

import {
    helpersSlice,
} from './slices'
import {IinitialStateHelpers} from "./initialState/helpers"




export interface IrootReducer{
    helpers:IinitialStateHelpers,
}

export const rootReducer:Reducer<CombinedState<IrootReducer>> = combineReducers({
    helpers:helpersSlice,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState =  ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type appThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

