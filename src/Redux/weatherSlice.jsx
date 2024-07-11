import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const weatherSlice=createSlice({
    name:"weather",

    initialState:{
        loading:false
    },

    reducers:{
   
        weatherRequest(state,action){
            return{
                loading:true
            }
        },
        weatherSuccess(state,action){
            return{
                loading:false,
                weatherdata:action.payload
            }
        },
        weatherFailure(state,action){
            return{
                loading:false,
                error:action.payload
            }
        }

    }
    
})

const {actions,reducer}=weatherSlice

export const{weatherRequest,weatherSuccess,weatherFailure}=actions;


export default reducer;