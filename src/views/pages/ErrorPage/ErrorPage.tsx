/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-04-07
 * Time: 12:11
 * About:
 *
 */
import React, {FC, useState} from "react"
import {IErrorPage} from './interface'
import classes from './ErrorPage.module.scss'


const ErrorPage: FC<IErrorPage> = () => {

    const [code] = useState<number>(500)
    const [message] = useState<string>('None')


    return <>
        <span>Error {code}: {message}</span>
    </>
}

export default ErrorPage