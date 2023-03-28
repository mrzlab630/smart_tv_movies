import React, { Component } from 'react'
import ErrorIndicator from '../ErrorIndicator'
import {IProps, IState} from './interface'




export default class ErrorBoundry extends  Component<IProps, IState>{


    state: any = {
        hasError: false,
        error: false,
        errorInfo:false
    };

    componentDidCatch(error: Error | null, errorInfo: object) {

        this.setState({
            hasError:true,
            error: error,
            errorInfo: errorInfo})
    }



    render() {

        if(this.state.hasError){

            console.error('ErrorBoundry',this.state)

            return <ErrorIndicator
                info={this.state.error && this.state.error.toString() + " " + this.state.errorInfo && this.state.errorInfo.componentStack}/>
        }

        return this.props.children || false

    }

}

