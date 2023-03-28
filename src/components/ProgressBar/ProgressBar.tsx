/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2023-01-04
 * Time: 16:27
 * About:
 *
 */
import React, {FC} from "react"
import {IProgressBar} from './interface'
import classes from './ProgressBar.module.scss'


const ProgressBar: FC<IProgressBar> = ({style}) => {


  switch (style) {
    case "dot-pulse":
      return <div className={classes.dotPulse}/>
    case "line":
      return <div className={classes.line}/>

  }


  return  <div className={classes.line}/>
}


export default ProgressBar