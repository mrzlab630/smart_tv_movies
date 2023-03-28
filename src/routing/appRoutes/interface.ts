/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-18
 * Time: 13:43
 * About:
 *
 */
import {FC} from "react"




export interface IappRoutesPage{
    redirect?: string,
    path: string,
    component: FC,
    privatePage?: boolean,
}





export interface IappRoutes {
    [key: string]: IappRoutesPage
}
