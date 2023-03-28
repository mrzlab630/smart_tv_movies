/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-04-18
 * Time: 11:36
 * About:
 *
 */
import React, {Children,KeyboardEvent, useEffect,FC, useState} from "react"
import {IHome} from './interface'
import classes from './Home.module.scss'



const Home: FC<IHome> = () => {

    const [blocks, setBlocks] = useState<string[]>(new Array(9).fill(null).map((_,idx) => idx+1+''))
    const [actionKey, setActionKey] = useState<number|undefined>(undefined)
    const [selectedBlock, setSelectedBlock] = useState<number>(0)
    const [actionKeyNames, setActionKeyNames] = useState<{[k:string]:number}>({
        up:38,
        down:40,
        left:37,
        rigth:39,

        enter:13,

        chUp:427,
        chDown:428,

        red:403,
        green:404,
        yellow:405,
        blue:406,
    })


    useEffect(() => {

        const handleKeyPress = (e:any) => {

            const {keyCode} = e


            switch (true) {

                case actionKeyNames.enter === keyCode:

                    setActionKey(selectedBlock)
                    return

                case actionKeyNames.up === keyCode:
                    setSelectedBlock(prev => prev >= blocks.length ? 1 :  prev+1)
                    return

                case actionKeyNames.down === keyCode:
                    setSelectedBlock(prev => prev <= 1 ? blocks.length : prev-1 )
                    return

                case actionKeyNames.left === keyCode:
                    setSelectedBlock(prev => prev+3 >= blocks.length ? 1 : prev+3 )
                    return

                case actionKeyNames.rigth === keyCode:
                    setSelectedBlock(prev => prev-3 <= 1 ? blocks.length : prev-3 )
                    return

            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [selectedBlock])



    const renderBlocks = Children.toArray(
        blocks.map((itm,id) => <div
            className={`${classes.block} ${(id+1)=== selectedBlock ? classes.select : ''}`}
            >
            <div className={classes.content}>{itm}</div>
        </div>
        )
    )


    return <div
        className={classes.wrap}
    >
        <div className={classes.title}>
            {
                actionKey && <h2>app <span>{actionKey}</span></h2>
            }
        </div>

        <div className={classes.gridWrap}>
            <div className={classes.blocksGrid}>
                {
                    renderBlocks
                }
            </div>
        </div>

    </div>
}

export default Home