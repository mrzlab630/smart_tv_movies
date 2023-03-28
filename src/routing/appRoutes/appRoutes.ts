/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-18
 * Time: 13:42
 * About:
 *
 */

import {IappRoutesPage,IappRoutes} from './interface'

import {
    Home,
    ErrorPage,
    Search
} from '../../views/pages'


const homePage:IappRoutesPage = {
    path:'/home',
    component:Home,
}

const SearchPage:IappRoutesPage = {
    path:'/',
    component:Search,
}
const error:IappRoutesPage = {
    path:'/error',
    component:ErrorPage,
}



const appRoutes:IappRoutes = {
    homePage,
    SearchPage,
    error
}

export default appRoutes