import React, {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import {store} from "./redux/store"
import { BrowserRouter } from "react-router-dom"

import './styles/globals.scss'
import ErrorBoundry from "./components/ErrorBoundry"




const runApp = function (){
    try {

        const container = document.getElementById('root')

        if(!container){
            throw new Error(`can't found root app div`)
        }

        const root = createRoot(container)


        root.render(<ErrorBoundry>
                <StrictMode>
                    <Provider store={store}>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </Provider>
                </StrictMode>
            </ErrorBoundry>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
        reportWebVitals()


    }catch (e){
        console.error(e)
    }
}




runApp()