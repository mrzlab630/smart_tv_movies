/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2023-03-27
 * Time: 10:45
 * About:
 *
 */
import {ReactNode} from "react"


export type Tkey = string|number|ReactNode
export type TdefaultLocal = 'en' | 'ru'

export interface IKeyboard{
    defaultText?:string,
    defaultLocal?:TdefaultLocal,
    onClick?:(txt?:string) => void,
    enterKeyPress?:(k:boolean) => void,
}