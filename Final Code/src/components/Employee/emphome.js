import React,{ useState } from 'react';
import { withRouter,Link } from 'react-router-dom';

import logo from '../../a.png'; 
import Header from '../Header/Header';
function EmpHome(props) {
  
  const [title] = useState(null);

    return(
        <div className="mt-2">
           
    <div className="App">
      <Header title={title}/>
      
      <Link to="/page2"  className="card col-12 col-lg-12 text-right" style={{fontSize :30}}> Exit</Link>
        <div className="container d-flex align-items-center flex-column">
        <br/>
                <br/>
                
                <Link to="/appleave" className="btn btn-info mybtn btn-work">Apply Leave </Link>
                <br/>
                <br/>
                
                <Link to="/canleave" className="btn btn-info mybtn btn-work">Cancel Leave </Link>
                <br/>
                <br/>
                
                <Link to="/viewRep" className="btn btn-info mybtn btn-work">View report </Link>
                <br/>
                <br/>
                
                <Link to="/viewHol" className="btn btn-info mybtn btn-work">View Holidays </Link>
        </div>
        <span className="input-group-btn text-align-right">
</span>

    </div>
        </div>
    )
}

export default withRouter(EmpHome);