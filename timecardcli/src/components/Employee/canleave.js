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
        lid : "",
        eid : "",
        ltype : "",
        sdate: "",
        edate: "",
        successMessage: null,        
        ddata:[] 
        
    })


  // disable weekends
  const disableWeekends = current => {
    return current.day() !== 0 && current.day() !== 6;
  }




    const handleChange = (e) => {
        const {id , value} = e.target   
        document.getElementById(id).value=value;
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))


        if(id=="sdate")
        {
            const picker = document.getElementById('sdate');
            var dateOne = new Date(); //Year, Month, Date    
           var dateTwo = new Date(value); //Year, Month, Date    
           if (dateOne > dateTwo) {    
                alert("Sorry you cannot select for older dates."); 
               

            }

    picker.addEventListener('input', function(e){
  var day = new Date(this.value).getUTCDay();
  if([6,0].includes(day)){
    e.preventDefault();
    this.value = '';
    alert('Weekends not allowed');
  }
});
        }

        
        if(id=="edate")
        {
            debugger;
            const picker = document.getElementById('edate');
            var dateOne = new Date(); //Year, Month, Date    
            var dateOne1 = new Date( state.sdate); //Year, Month, Date    
           var dateTwo = new Date(value); //Year, Month, Date    
           if (dateOne > dateTwo) {    
                alert("Sorry you cannot select for older dates.");   
                

            }
            if (dateOne1 > dateTwo) {    
                 alert("Sorry you cannot select for older dates than start date.");   
 
             }

    picker.addEventListener('input', function(e){
  var day = new Date(this.value).getUTCDay();
  if([6,0].includes(day)){
    e.preventDefault();
    this.value = '';
    alert('Weekends not allowed');
  }
});
        }
        if(id=="lid")
        {
            fetchDetailsServer()            
            
        }
    }

    const generateddlist = (e) => {
        debugger;
        var str = "";
        for (var item of e) {
            str += "<option>" + item + "</option>"
            document.getElementById("ltype").innerHTML = str;
          }
    }


    const fetchDetailsServer = () => {
       {
            //alert(state.eid);
            const payload={
                "leaveId":state.lid
            }


            axios.get(API_BASE_URL+'/leavetype/')
                .then(function (response) {
                    state.ddata=response.data;
                     generateddlist(state.ddata);
                })
                .catch(function (error) {
                    
                    alert("Data was not added due to error");
                });  

            
        } 
        
    }




    const sendDetailsToServer = () => {
        if(state.lid.length) {
            debugger;
            //alert(state.eid);
            if(state.lid==0)
            state.ltype="Adoption Leave";
            if(state.lid==1)
            state.ltype="Privilege Leave";
            if(state.lid==2)
            state.ltype="Maternity Leave";
            if(state.lid==3)
            state.ltype="Miscarriage Leave";
            if(state.lid==4)
            state.ltype="Bereavement Leave";
            if(state.lid==5)
            state.ltype="Leave Without Pay";
            if(state.lid==6)
            state.ltype="Relocation Leave";
            const payload={
                "empId":state.eid,
                "leaveId":state.lid,
                "leaveType":state.ltype,
                "startDate":state.sdate,
                "endDate":state.edate
            }
            axios.put(API_BASE_URL+'/cancelleave/'+state.eid, payload)
                .then(function (response) {
                        alert("Leave changed successfully");
                     
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
        if(state.eid.length>0) {
            sendDetailsToServer()    
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
      <h1> Leave Change Page</h1>
      <div className="row">
        <div className="card col-8 col-lg-8 login-card ">
            <form>
                <div className="form-group text-left">
                <label htmlFor="Lid">Leave ID</label>
                <input type="text" 
                       className="form-control" 
                       id="lid" 
                       placeholder="Enter Leave Id" 
                       value={state.lid}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="Eid">Employee ID</label>
                <input type="text" 
                       className="form-control" 
                       id="eid" 
                       placeholder="Enter Employee Id" 
                       value={state.eid}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="Ltype">Leave Type</label>
                    <select id="ltype"
                      >
                        <option>--Select--</option>
                    </select>
                </div>


                
                <div className="form-group text-left">
                    <label htmlFor="sdate">Start Date</label>
               <input type="date" id="sdate"  value={state.sdate} onChange={handleChange}/>
               
                 </div>
                
                <div className="form-group text-left">
                    <label htmlFor="edate">End Date</label>
               
                    <input type="date" id="edate"  value={state.edate} onChange={handleChange}/>
                 </div>
              
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Cancel Leave
                </button>
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