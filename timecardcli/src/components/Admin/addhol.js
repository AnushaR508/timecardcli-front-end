import React,{ useState } from 'react';
import { withRouter,Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';
import { PropTypes } from 'react'

function AddHol(props) {
    const [state , setState] = useState({
        sid : "",
        hyear : "",
        hdate: "",
        Descrip: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.sid.length && state.hyear.length && state.hdate.length) {
            //alert(state.eid);
            const payload={
                "srNo":state.sid,
                "year":state.hyear,
                "date":state.hdate,
                "description":state.Descrip
            }
            axios.post(API_BASE_URL+'/insertholidaylist', payload)
                .then(function (response) {
                        alert("Holiday added successfully");
                     
                })
                .catch(function (error) {
                    
                    alert("Holiday was not added due to error");
                });    
        } else {
            alert('Please enter valid data')    
        }
        
    }
    
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.sid.length>0 && state.hyear==2020 &&  state.Descrip.length>3) {
            sendDetailsToServer()    
        } else {
            alert('Incorrect data input');
        }
    }

    
  const [title] = useState(null);

    return(
        
    <div className="App">
      <Header title={title}/>
      <Link to="/adminhome"  className="card col-12 col-lg-12 text-right" style={{fontSize :30}}> Go Back</Link>
      
      <br/>
        <div className="card col-12 col-lg-12 login-card ">
            <form>
                <div className="form-group text-left">
                <label htmlFor="Sno">Serial #</label>
                <input type="text" 
                       className="form-control" 
                       id="sid" 
                       placeholder="Enter  Holiday Id" 
                       value={state.sid}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="HYear">Enter Year</label>
                    <input type="text" 
                        className="form-control" 
                        id="hyear" 
                        placeholder="Enter Year as 2019 or 2020"
                        value={state.hyear}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="Hdate">Date</label>
                    <input type="date" 
                        className="form-control" 
                        id="hdate" 
                        value={state.hdate}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="Descrip">Description</label>
                    <textarea className="form-control" 
                        id="Descrip" 
                        value={state.Descrip}                        
                        onChange={handleChange} >

                        </textarea>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Add Holiday
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            
        </div>
        </div>
    )
}

export default withRouter(AddHol);