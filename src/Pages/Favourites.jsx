import React from 'react';
import { Link } from 'react-router-dom';

const Favourites = () => {

 const getfav = localStorage.getItem("favdata");
 const arrfav = getfav ? JSON.parse(getfav) : [];

 return (
  <div className='total-fav'>
     <div  className='favourite'>
         <div>
             <h1 className='fav_city'>Favourite Cities</h1>
         </div>
         <nav className='navigates favnav'>
             <Link to="/" className='headnavs'>Main</Link>
             <Link to="/dashboard" className='headnavs'>Dashboard</Link>
             <Link to="/favourites" className='headnavs'>Favourites</Link>
         </nav>
         <div className='total-table table-responsive'>
             <div className='full-table table-responsive'>
                 <table className="table table-striped table-responsive">
                     <thead>
                         <tr>
                             <th scope="col">S.No</th>
                             <th scope="col">City-Name</th>
                             <th scope="col">Temperature</th>
                             <th scope="col">Wind</th>
                         </tr>
                     </thead>
                     <tbody>
                         {arrfav?.map((ele, index) => (
                             <tr key={index}>
                                 <th scope="row">{index + 1}</th>
                                 <td>{ele?.city.name}</td>
                                 <td>{Math.floor(ele?.list[0].main.temp - 273.15)}°C</td>
                                 <td>{ele?.list[0].wind.speed} m/s</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
         </div>
     </div> 
      </div>
 );

};

export default Favourites;