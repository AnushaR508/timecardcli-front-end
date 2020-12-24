import React,{ useState } from 'react';
import { withRouter,Link } from 'react-router-dom';

import logo from '../../a.png'; 
import Header from '../Header/Header';
function Home(props) {
  
  const [title] = useState(null);

    return(
        <div className="mt-2">
           
    <div className="App">
      <Header title={title}/>
      
      <Link to="/page2"  className="card col-12 col-lg-12 text-right" style={{fontSize :30}}> Exit</Link>
        <div className="container d-flex align-items-center flex-column">
        <br/>
                <br/>
                
                <Link to="/addemp" className="btn btn-info mybtn btn-work">Add Employee </Link>
                <br/>
                <br/>
                
                <Link to="/addhol" className="btn btn-info mybtn btn-work">Add Holidays </Link>
        </div>
        <span className="input-group-btn text-align-right">
</span>

    </div>
        </div>
    )
}

export default withRouter(Home);