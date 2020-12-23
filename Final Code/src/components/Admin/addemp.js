import React,{ useState } from 'react';
import { withRouter,Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';
import { PropTypes } from 'react'

function AddEmp(props) {
    const [state , setState] = useState({
        eid : "",
        ename : "",
        availLeave: "",
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
        if(state.eid.length && state.ename.length) {
            //alert(state.eid);
            const payload={
                "empId":state.eid,
                "empName":state.ename,
                "leaveAvailable":"24",
            }
            axios.post(API_BASE_URL+'/insert', payload)
                .then(function (response) {
                        alert("Data added successfully");
                     
                })
                .catch(function (error) {
                    
                    alert("Data was not added due to error");
                });    
        } else {
            alert('Please enter valid data')    
        }
        
    }
    
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.eid.length>0 && state.ename.length>3) {
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
        <div className="card col-12 col-lg-6 login-card ">
            <form>
                <div className="form-group text-left">
                <label htmlFor="EmployeeId">Enter Employee ID</label>
                <input type="text" 
                       className="form-control" 
                       id="eid" 
                       placeholder="Enter Employee Id" 
                       value={state.eid}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="EmployeeName">Enter Employee Name</label>
                    <input type="text" 
                        className="form-control" 
                        id="ename" 
                        placeholder="Enter Employee Name"
                        value={state.ename}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="AvailLeave">Leaves Available</label>
                    <input type="text" 
                        className="form-control" 
                        id="availLeave" 
                        value="24"
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Add Employee
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            
        </div>
        </div>
    )
}

export default withRouter(AddEmp);