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
        <div className="container d-flex align-items-center flex-column">
        <br/>
                <br/>
                
                <Link to="/adminhome" className="btn btn-info mybtn btn-work">Admin </Link>
                <br/>
                <br/>
                
                <Link to="/emphome" className="btn btn-info mybtn btn-work">Employee </Link>
        </div>
        <span className="input-group-btn text-align-right">
</span>

    </div>
        </div>
    )
}

export default withRouter(Home);