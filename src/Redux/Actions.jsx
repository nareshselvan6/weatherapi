import axios from "axios";
import{weatherRequest, weatherSuccess}from "./weatherSlice.jsx";

export const getdata =(value)=> async (dispatch) => {
    try {
        dispatch(weatherRequest())

        const fetcheddata= await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=7eebfd09ec4b9ddf006c0c91f664d1b0`
        )


        dispatch(weatherSuccess(fetcheddata.data))
        
    } catch (error) {
        
    }
};
