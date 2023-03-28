/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-18
 * Time: 12:00
 * About:
 *
 */
import React, {FC} from "react"
import {IApp} from './interface'
import appRoutes from "../../routing/appRoutes"
import Switcher from "../../routing/Switcher"


const App: FC<IApp> = () =>  <Switcher {...{appRoutes}} />


export default App