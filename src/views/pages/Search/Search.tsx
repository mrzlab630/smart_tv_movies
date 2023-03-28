/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2023-03-27
 * Time: 10:21
 * About:
 *
 */
import React, {FC, useState, ChangeEvent, Children} from "react"
import {ISearch,Imovies} from './interface'
import classes from "./Search.module.scss"
import Keyboard from '../../../components/Keyboard'
import ProgressBar from  '../../../components/ProgressBar'


const Search: FC<ISearch> = () => {

    const [input, setInput] = useState("")
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [error, setError] = useState<undefined|string>(undefined)

    const [movies, setMovies] = useState<undefined|Imovies[]>(undefined)



    const getMovies = async (title:string) =>{

        const url = 'https://ahoy.yohoho.cc/'
        const player = ['videocdn','kodik','collaps','hdvb','bazon','ustore','alloha','pleer','videospider','torrent','iframe'].join(',')

        setIsloading(true)

        const getData = await fetch(url,{
            method:'POST',
            headers:{
                origin:'https://4h0y.gitlab.io',
                referer:'https://4h0y.gitlab.io',
                'accept-encoding':'gzip, deflate, br',
                'content-type':'application/x-www-form-urlencoded',
                'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            },
            body:`player=${encodeURIComponent(player)}&title=${encodeURIComponent(title)}`
        })
        setIsloading(false)

        if(getData.status !== 200){
            setError('ошибка подключения к yohoho')
            return
        }

        const data:any = await getData.json()

        const list = data ? Object.keys(data) : undefined

        if(!Array.isArray(list) || list.length === 0){
            setError('нет данных')
            return
        }

        const allList:Imovies[] = []

        list.forEach(k =>{
            const {iframe} = data[k]
            if(iframe && iframe.length > 0){
                allList.push(data[k])
            }
        })


        console.log({allList})

        setMovies(allList)




    }
    const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void =>    setInput(event.target.value)
    const handleClickKeyboard = (txt?:string) =>  setInput(txt || '')

    const handleClickKeyboardEnterKeyPress = async (a:boolean) =>  await getMovies(input)


    const renderPlayer = Array.isArray(movies) ? Children.toArray(
            movies.map(mv =>{
                console.log({mv})

                const {iframe,quality,translate} = mv
                return <>
                    <iframe
                        title={quality+' '+translate}
                        src={iframe}
                        allowFullScreen
                    />

                </>
            })
    )
        : null



    return <div className={classes.wrap}>
        <div className={classes.menu}>

            <input
                value={input}
                placeholder={"Tap on the virtual keyboard to start"}
                onChange={onChangeInput}
            />

            <Keyboard
                defaultLocal={'ru'}
                onClick={handleClickKeyboard}
                enterKeyPress={handleClickKeyboardEnterKeyPress}
                defaultText={input}
            />
        </div>
        <div className={classes.content}>
            {
                error && <div className={classes.error}>{error}</div>
            }
            {
                isLoading ? <ProgressBar style={"dot-pulse"}/> : <div className={classes.players}>{renderPlayer}</div>
            }
        </div>
    </div>
}

export default Search