import { combineReducers } from "redux";
import weatherreducer from "./weatherSlice";
import { configureStore } from "@reduxjs/toolkit";



const reducer=combineReducers({

    weatherstate:weatherreducer

})

const store=configureStore({
    reducer
})

export default store;