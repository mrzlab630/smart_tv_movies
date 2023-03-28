/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2023-03-27
 * Time: 10:45
 * About:
 *
 */
import React, {Children, FC, useEffect, useState} from "react"
import {IKeyboard,Tkey} from './interface'
import classes from './Keyboard.module.scss'
import {ReactComponent as BackspaceIco} from '../../assets/svgs/backspace.svg'
import {ReactComponent as SpaceBarIco} from '../../assets/svgs/space-bar.svg'
import {ReactComponent as EnterIco} from '../../assets/svgs/enter.svg'
import {ReactComponent as LanguageIco} from '../../assets/svgs/language.svg'






const Keyboard: FC<IKeyboard> = ({
                                     defaultText,
                                     defaultLocal,
                                     onClick,
                                     enterKeyPress}) => {


    const [actionKeyNames] = useState<{[k:string]:number}>({
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

    const [text,setText] = useState<undefined|string>(undefined)

    const [numbers] = useState<number[]>(new Array(10).fill(null).map((_,idx) => idx+1 === 10 ? 0 : idx+1))
    const [keysEn] = useState<Tkey[][]>([
        ['en'],
        numbers,
        ['q','w', 'e','r','t','y','u','i','o','p','!'],
        ['a','s','d','f','g','h','j','k','l','@',<BackspaceIco type={'backspace'}/>],
        ['z','x','c','v','b','n','m',',',<LanguageIco type={'language'}/>,<SpaceBarIco type={'space'}/>,<EnterIco type={'enter'}/>]
    ])
    const [keysRus] = useState<Tkey[][]>([
        ['ru'],
        [...numbers,'/'],//
        ['й','ц', 'у','к','е','н','г','ш','щ','з','х','ъ'],
        ['ф','ы','в','а','п','р','о','л','д','ж','э',<BackspaceIco type={'backspace'}/>],
        ['я','ч','с','м','и','т','ь','б','ю',<LanguageIco type={'language'}/>,<SpaceBarIco type={'space'}/>,<EnterIco type={'enter'}/>]
    ])
    const [keys, setKeys] = useState<Tkey[][]>(keysRus)

    const [selectedPosition, setSelectedPosition] = useState({ row: 0, col: 0 })


    useEffect(() =>{

        if(defaultText){
            setText(defaultText)
        }

    },[defaultText])

    useEffect(() =>{

        const keysLoc = defaultLocal === 'en' ? keysEn : keysRus

        setKeys(keysLoc)

    },[defaultLocal])

    useEffect(() =>{
        if(typeof onClick !== "function"){
            return
        }
        onClick(text)
    },[text])


    const handleClickKey = (k:Tkey) => ()=> {

        let str = k as string
        let action



        switch (typeof k){
            case 'object':
                //@ts-ignore
                action = k?.props?.type

                switch (action) {
                    case 'language':
                        setKeys(prev => prev[0][0] === 'en' ? keysRus : keysEn)
                        return

                    case 'backspace':
                        setText(prev => !prev ? prev : prev.slice(0, -1))
                        return

                    case 'space':
                        setText(prev => !prev ? ' ' : prev+' ')
                        return

                    case 'enter':
                        if(typeof enterKeyPress !== "function"){
                            return
                        }
                        enterKeyPress(true)
                        return
                }
                return

            default:
                setText(prev => !prev ? str : prev+str)
        }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        const { row, col } = selectedPosition
        const {keyCode} = e

        let newRow:number
        let newCol:number
        const targetKey:Tkey = keys[row][col]


        switch (keyCode) {
            case actionKeyNames.enter:
                        handleClickKey(targetKey)()
                return

            case actionKeyNames.down:

                newRow = (row + 1) % keys.length
                setSelectedPosition({ row: newRow, col })
                break

            case actionKeyNames.up:

                newRow = (row - 1 + keys.length) % keys.length
                setSelectedPosition({ row: newRow, col })
                break

            case actionKeyNames.left:

                newCol = (col - 1 + keys[row].length) % keys[row].length
                setSelectedPosition({ row, col: newCol })
                break

            case actionKeyNames.rigth:

                newCol = (col + 1) % keys[row].length
                setSelectedPosition({ row, col: newCol })
                break
        }

    }

    useEffect(() => {

        window.addEventListener('keydown', handleKeyPress)
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [selectedPosition])




    const renderKeyboardKeys = Children.toArray(
        keys.map((row, rowIndex) => {
            const line = Children.toArray(
                row.map((item, colIndex) => {

                        const classNames = [
                            rowIndex === selectedPosition.row && colIndex === selectedPosition.col ? classes.select : classes.background
                        ].join(' ')

                    return <span
                        key={colIndex}
                        className={classNames}
                    >
                        <button onClick={handleClickKey(item)}>
                            {item}
                        </button>
                </span>
                }
                ))
            const classNamesLine = [
                rowIndex === 0 ? classes.hide : '',
                classes.line
            ].join(' ')

            return <div className={classNamesLine}>{line}</div>
        })
    )



return  <div className={classes.wrap}>
            {renderKeyboardKeys}
        </div>



}

export default Keyboard