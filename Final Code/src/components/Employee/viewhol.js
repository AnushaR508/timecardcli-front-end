import React,{ useState } from 'react';
import { withRouter,Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { PropTypes } from 'react'

function AppLeave(props) {
    const [state , setState] = useState({
        hyear : "",
        hdata:[]
        
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
        var str = "<table style='width:1000px;font-size:25px;'><thead style='background-color:gray;'><td>Sno.</td><td>Year</td><td>Date</td><td>Description</td></thead>";
        for (var item of e) {
            str += "<tr>";
            str += "<td>"+item["srNo"]+"</td>";
            str += "<td>"+item["year"]+"</td>";
            str += "<td>"+item["date"]+"</td>";
            str += "<td>"+item["description"]+"</td>";
            str += "</tr>";
          }
          str+="</table>"
          document.getElementById("rid").innerHTML = str;
    }


    const fetchDetailsServer = () => {
       {
            //alert(state.eid);
            const payload={
                "hyear":state.hyear
            }
            axios.get(API_BASE_URL+'/holidaylist/'+state.hyear)
                .then(function (response) {
                    state.hdata=response.data;
                     generateddlist(state.hdata);
                })
                .catch(function (error) {
                    
                    alert("Data was not added due to error");
                });  

            
        } 
        
    }




   
    
    
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.hyear.length>0) {
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
      <h1> Fetch Holiday List</h1>
      <div className="row">
        <div className="card col-8 col-lg-8 login-card ">
            <form>
                <div className="form-group text-left">
                <label htmlFor="hyear">Enter year</label>
                <input type="text" 
                       className="form-control" 
                       id="hyear" 
                       placeholder="Enter year to see list" 
                       value={state.hyear}
                       onChange={handleChange}
                />
                </div>
                
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Fetch Holiday List
                </button>
<br/>
<br/>
                <div id="rid"></div>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            
        </div>
        
        </div>
        </div>
    )
}

export default withRouter(AppLeave);