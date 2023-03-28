/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-18
 * Time: 13:47
 * About:
 *
 */

import React, {FC} from "react"
import {ISwitcher} from './interface'
import { Route,Routes,useLocation, Navigate } from 'react-router-dom'
import {ErrorPage, Home} from "../../views/pages"




const Switcher: FC<ISwitcher> = ({
                                     isAutheticated,
                                     appRoutes
                                 }) => {

    const location = useLocation()


    const renderRoutes = (listRoutes:string[],isAutheticated?:boolean) =>{

        if(!Array.isArray(listRoutes)){
            return
        }

        return listRoutes.map((itm:string,idx) => {

            const {privatePage,path,component:Component,redirect} = appRoutes[itm]

            const addParam ={
                path,
                element:!privatePage ? <Component/> : isAutheticated ? <Component/> : <Navigate to={redirect || '/'}/>
            }

            return (<Route
                key={`renderRoutes-${idx}`}
                {...addParam}
            />)

        })

    }


    return <Routes {...{location}}>
            {
                renderRoutes(Object.keys(appRoutes),isAutheticated)
            }
            <Route path="*" element={<ErrorPage />} />
        </Routes>

}

export default Switcher