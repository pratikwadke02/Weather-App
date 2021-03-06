import React from "react";
import './form.css';

const Form = props =>{
    return(
        <div className="container">
            <div>{props.error?error():null}</div>
            <form onSubmit={props.loadWeather}>
            <div className="row">
                <div className="col-md-3 offset-md-2">
                    <input type="text" name="city" className="form-control" autoComplete="off" placeholder="Enter City"/>
                </div>
                <div className="col-md-3">
                    <input type="text" name="country" className="form-control" autoComplete="off" placeholder="Enter Country"/>
                </div>
                <div className="col-md-3 mt-md-0 text-md-left">
                    <button className="btn btn-warning">Get Weather</button>
                </div>
            </div>
            </form>
        </div>
    );
};

function error(){
    return(
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter Country and City
        </div>
    );    
};

export default Form;