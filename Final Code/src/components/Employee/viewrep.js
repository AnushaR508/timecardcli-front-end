import React,{ useState } from 'react';
import { withRouter,Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { PropTypes } from 'react'

function ViewEmp(props) {
    const [state , setState] = useState({
        eid : "",
        edata:[]
        
    })



    const handleChange = (e) => {
        const {id , value} = e.target   
        document.getElementById(id).value=value;
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const generateddlist = (e) => {
        debugger;
        var str = e.substr(1,e.length-2);
        var res=str.split(",");
            str = res[0]+"<br/>";
            str += res[1]+"<br/>";
            str += res[2]+"<br/>";
            str += res[3]+"";
            str += res[4]+"<br/>";
            str += res[5]+"<br/>";
            str += res[6]+"<br/>";
          document.getElementById("rid").innerHTML = str;
    }


    const fetchDetailsServer = () => {
       {
            //alert(state.eid);
            const payload={
                "eid":state.eid
            }
            axios.get(API_BASE_URL+'/'+state.eid)
                .then(function (response) {
                    state.edata=response.data;
                     generateddlist(state.edata);
                })
                .catch(function (error) {
                    
                    alert("Data was not added due to error");
                });  

            
        } 
        
    }




   
    
    
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.eid.length>0) {
            fetchDetailsServer()    
        } else {
            alert('Incorrect data input');
        }
    }

    
  const [title] = useState(null);

    return(
        
    <div className="App">
      <Header title={title}/>
      <Link to="/emphome"  className="card col-12 col-lg-12 text-right" style={{fontSize :30}}> Go Back</Link>
      
      <br/>
      <h1> FetchEmployee Info</h1>
      <div className="row">
        <div className="card col-8 col-lg-8 login-card ">
            <form>
                <div className="form-group text-left">
                <label htmlFor="eid">Enter Employee Id</label>
                <input type="text" 
                       className="form-control" 
                       id="eid" 
                       placeholder="Enter eid to see info" 
                       value={state.eid}
                       onChange={handleChange}
                />
                </div>
                
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Fetch Emp Info
                </button>
<br/>
<br/>
                <div id="rid" className="text-left" style={{fontSize:25}}></div>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            
        </div>
        
        </div>
        </div>
    )
}

export default withRouter(ViewEmp);