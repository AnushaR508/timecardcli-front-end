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
          <img src={logo} alt="demo" className="homeimg" />

        </div>
        <span className="input-group-btn text-align-right">
  <Link to="/page2" className="btn btn-info">Enter into the application </Link>
</span>

    </div>
        </div>
    )
}

export default withRouter(Home);