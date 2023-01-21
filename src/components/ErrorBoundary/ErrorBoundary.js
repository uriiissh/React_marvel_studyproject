import {Component} from "react";
import Errormessage from "../errorMessage/ErrorMessage";



class ErrorBoundary extends Component {
    state = {
        error:false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error:true
        })
    }

    render(){
        if (this.state.error){
            return <Errormessage />;
        }
            return this.props.children;
    }
}


export default ErrorBoundary;