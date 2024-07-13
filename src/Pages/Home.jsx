import React, { useEffect, useState } from 'react';
import "../Pages/Pages.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getdata } from '../Redux/Actions';
import { Audio } from 'react-loader-spinner'
import Loader from './Loader';

const Home = () => {

    const [currentDateTime, setCurrentDateTime] = useState(Date().toString().split('GMT')[0].trim());

    const[searchbox,setSearchbox]=useState();

    const[theme,setTheme]=useState(false);
      
    useEffect(()=>{
    const bodyElement = document.body;
    if(theme){
        document.body.style.background= 'linear-gradient(90deg, rgba(15,32,39,1) 0%, rgba(32,58,67,1) 50%, rgba(44,83,100,1) 100%)';
       
    }else{
        document.body.style.background= 'linear-gradient(90deg, #fcff9e 0%, #c67700 100%)';
    }
},[theme])

    const[datafound,setDatafound]=useState(false)

    const{weatherdata,loading}=useSelector((state)=>state.weatherstate)
   console.log(weatherdata);

    const dispatch=useDispatch();

    // sunrise timestamp
    const sunrise=weatherdata?.city.sunrise

    const risedate= new Date(sunrise*1000)

    const sunriseString = risedate.toLocaleTimeString();


    //sunset timestamp

    const sunset=weatherdata?.city.sunset

    const sunsetdate= new Date(sunset*1000)

    const sunsetString = sunsetdate.toLocaleTimeString();

    //date
    const time =[]   
    const monthnddate=()=>{
        for(let i=0;i<5;i++){
          const timedata= weatherdata?.list[i].dt_txt.split(' ')[1]
          if(timedata){
              const timeParts = timedata.split(':');
              const hours = timeParts[0];
              const minutes = timeParts[1];
              const formatedtime=`${hours}:${minutes}`
             time.push(formatedtime)

          }
        }
        return time
    }
    monthnddate()

    //day
    const wekday=[]
    const sun =[]
    const mon=[]
    const tue=[]
    const wed=[]
    const thur=[]
    const fri=[]
    const sat=[]
    const days=()=>{

        for(let i=0;i<weatherdata?.list.length;i++){

            const days=weatherdata?.list[i].dt_txt;
           //console.log(days);

            const daystemp=Math.floor(weatherdata?.list[i].main.temp-273.05)
           //console.log(daystemp);
        
            const daysplit=new Date(days)
           //console.log(daysplit);
        
            const weekdays=["sun","mon","tue","wed","thur","fri","sat"]
            const day=weekdays[daysplit.getDay()]
           //console.log(day);
            wekday.push({day:day , temp:daystemp})
            if(day=="sun"){
               sun.push({day:day,temp:daystemp})

            }else if (day=="mon"){
                mon.push({day:day,temp:daystemp})
 
             }
             else if (day=="tue"){
                tue.push({day:day,temp:daystemp})
 
             }else if (day=="wed"){
                wed.push({day:day,temp:daystemp})
 
             }else if (day=="thur"){
                thur.push({day:day,temp:daystemp})
 
             }else if (day=="fri"){
                fri.push({day:day,temp:daystemp})
 
             }else if (day=="sat"){
                sat.push({day:day,temp:daystemp})
 
             }
        }

    }
    days()




    const timefn=()=>{
        const timer=setInterval(()=>{
            setCurrentDateTime(Date().toString().split('GMT')[0].trim())
        },1000)
    
        return ()=> clearInterval(timer);
    }

    useEffect(()=>{
        setDatafound(false)
    },[])

    useEffect(()=>{
//    timefn()

if (weatherdata) {
    setDatafound(true)
}

    },[weatherdata])

    const searchsubmit=(e)=>{
        e.preventDefault()
       
        dispatch(getdata(searchbox))
        
    }

    const clear=()=>{
        setDatafound(false)
    }


    const favourite = () => {
       
        let existingFavs = localStorage.getItem("favdata");
        let favArray = existingFavs ? JSON.parse(existingFavs) : [];
    
      
        const isAlreadyFav = favArray.some(fav => fav.city.id === weatherdata.city.id);
    
        if (!isAlreadyFav) {

            favArray.push(weatherdata);
    
            localStorage.setItem("favdata", JSON.stringify(favArray));
    
            console.log("Weather data added to favorites:", weatherdata);
        } else {
            console.log("Weather data is already in favorites.");
        }
    }
    


    return (
        loading?<Loader/>
        :
        <div>
            <div className='totalcontent'>
            <div className='body_dash'>

                <div className='heading'>
                    <div >

                    <h1 >WEATHER API</h1>
                    </div>
                </div>
                    <div className='theme '>
                        <div>
                            <label > Theme</label>
                        </div>

                    <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={theme} onChange={e=>setTheme(e.target.checked)}/>
                    </div>
                    </div>
                
                    <nav className='navigates'>
                     <Link to="/" className='headnavs' > Main </Link>
                     <Link to="/dashboard" className='headnavs' > Dashboard </Link>
                     <Link to="/favourites"className='headnavs' > Favourites </Link>
                   
                    </nav>
                    
                    <div className='search'>

                        <form className='searchform m-4' onSubmit={searchsubmit} >
                        <input type="text" className='searchbox' placeholder=' Search for city...' onChange={e=>setSearchbox(e.target.value)}/>
                        <button type='submit' className='btn search-btn'><i className="fa fa-search fasearch" aria-hidden="true" /></button>

                        </form>

                    </div>


                  { datafound? <div  className='weatherdatas'>
                  

                            <div className='date_time d-flex justify-content-center align-items-center white'>
                                <div>
                                    <h1>{currentDateTime}</h1>
                                </div>
                                <div>
                                    <button className='btn btn-primary' onClick={favourite}>Add To Fav</button>
                                </div>
                            </div>

                    <div className='country-name name_display'>
                        <div>
                            <h1>{weatherdata?.city.name}</h1>
                            <button className='clear_btn' onClick={clear}> Clear</button>
                        </div>
                    </div>

                    <div className='temperature'>
                        <div className='temp_circle'>
                        <i className="fa fa-circle temp-circle" aria-hidden="true"/> 
                        </div>
                        <div className='degree white'>
                            <h1>{Math.floor(weatherdata?.list[0].main.temp- 273.15)}°C </h1>
                        </div>

                        <div className='RHW'>
                            <p className='white'><i className="fa fa-thermometer-full" aria-hidden="true"/> Real fell: {Math.floor(weatherdata?.list[0].main.feels_like-273.15)}°C</p>
                            <p className='white'><i className="fa fa-tint" aria-hidden="true"/> Humidity: {Math.floor(weatherdata?.list[0].main.humidity)}°C</p>
                            <p className='white' ><i class="fa-solid fa-wind"/>Wind: {weatherdata?.list[0].wind.speed}</p>
                        </div>
                    </div>


                    <div className='full_RSHL'>
                        <div className='RSHL d-flex justify-content-center gap-4'>

                            <p className='white'><i className="fa fa-sun-o " aria-hidden="true"/> Rise: {sunriseString} </p>
                            <p className='white'>|</p>

                            <p className='white'><i className="fa fa-sun-o" aria-hidden="true"/> Set:  {sunsetString}</p>
                            <p className='white'>|</p>

                            <p className='white'><i className="fa fa-sun-o" aria-hidden="true"/> High:  {Math.floor(weatherdata?.list[0].main.temp_max-273)}°C </p>
                            <p className='white'>|</p>

                            <p className='white'><i className="fa fa-sun-o" aria-hidden="true"/> Low: {Math.floor(weatherdata?.list[0].main.temp_min-273)}°C  </p>

                        </div>
                    </div>

                    <div>
                        <div className='hourly-forcast d-flex justify-content-center flex-column align-items-center my-2'>
                            <h2 className='hourlyname'>HOURLY FORCAST</h2>
                            <hr />
                        </div>

                        <div className='multi-hour'>

                        <div className='fivehour white d-flex justify-content-center gap-5'>
                          
                            <div className='center'>
                            <p> {time[0]}</p>
                            <p className='black m-2'><i className="fa fa-circle" aria-hidden="true"/></p>
                            <p>{Math.floor(weatherdata?.list[0].main.temp- 273.15)}°C</p>
                            </div>

                            <div  className='center'>
                            <p> {time[1]}</p>
                            <p className='black m-2'><i className="fa fa-circle" aria-hidden="true"/></p>
                            <p>{Math.floor(weatherdata?.list[1].main.temp- 273.15)}°C</p>
                            </div>

                            <div  className='center'>
                            <p> {time[2]}</p>
                            <p className='black m-2'><i className="fa fa-circle" aria-hidden="true"/></p>
                            <p>{Math.floor(weatherdata?.list[2].main.temp- 273.15)}°C</p>
                            </div>

                            <div  className='center'>
                            <p> {time[3]}</p>
                            <p className='black m-2'><i className="fa fa-circle" aria-hidden="true"/></p>
                            <p>{Math.floor(weatherdata?.list[3].main.temp- 273.15)}°C</p>
                            </div>

                            <div  className='center'>
                            <p> {time[4]}</p>
                            <p className='black m-2'><i className="fa fa-cloud" aria-hidden="true"/></p>
                            <p>{Math.floor(weatherdata?.list[4].main.temp- 273.15)}°C</p>
                            </div>
                           
                            
                        </div>
                      
                    </div>

                    </div>

                    <div>
                        <div className='daily-forcast d-flex justify-content-center flex-column align-items-center my-2'>
                            <h2 className='dailyname'>DAILY FORCAST</h2>
                            <hr />
                        </div>
                    </div>

                    <div className='multi-days'>

                        <div className='days white d-flex justify-content-center gap-5'>
                            
                            <div  className='center'>
                            <p> thur</p>
                            <p className='black m-2'><i className="fa fa-cloud" aria-hidden="true"/></p>
                            <p>{thur?thur[0].temp:21}°C</p>
                            </div>

                            <div  className='center'>
                            <p>  Fri</p>
                            <p className='black m-2'><i className="fa fa-cloud" aria-hidden="true"/></p>
                            <p>{ sat?sat[0].temp:(fri[0].temp)}°C</p>
                            </div>

                            <div  className='center'>
                            <p> Sat</p>
                            <p className='black m-2'><i className="fa fa-cloud" aria-hidden="true"/></p>
                            <p>{sat?sat[0].temp:null}°C</p>
                            </div>


                            <div  className='center'>
                            <p> Sun</p>
                            <p className='black m-2'><i className="fa fa-cloud" aria-hidden="true"/></p>
                            <p>{sun?sun[0].temp:null}°C </p>
                            </div>

                            <div  className='center'>
                            <p> Mon</p>
                            <p className='black m-2'><i className="fa fa-cloud" aria-hidden="true"/></p>
                            <p>{mon?mon[0].temp:null}°C</p>
                            </div>
                            
                        </div>
                    </div>



                    </div>:<div className='welcome d-flex justify-content-center align-items-center'>Search And Get Weather Data</div>}
            </div>
            </div>
         </div>
    );
};

export default Home;