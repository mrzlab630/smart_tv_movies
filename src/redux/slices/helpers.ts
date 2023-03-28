/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-05-30
 * Time: 15:23
 * About:
 *
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {initialStateHelpers} from "../initialState"
import {IinitialStateHelpers} from "../initialState/helpers"




export const helpersSlice = createSlice({
    name: 'helpers',
    initialState: initialStateHelpers,
    reducers: {
        getHelpers: (state: IinitialStateHelpers): IinitialStateHelpers => state,
    }
})




export const {getHelpers} = helpersSlice.actions
export default helpersSlice.reducer