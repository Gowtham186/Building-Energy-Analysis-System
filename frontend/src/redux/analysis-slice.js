import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const calculateAnalysis = createAsyncThunk('design/calculateAnalysis', async({designId}, {rejectWithValue})=>{
    try{
        const response = await axios.post('/api/analysis/calculate', { designId })
        console.log(response.data)
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data.errors)
    }
})

const analysisSlice = createSlice({
    name : 'analysis',
    initialState : {
        loading : false,
        serverError : null
    },
    extraReducers : (builder)=>{
        builder.addCase(calculateAnalysis.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(calculateAnalysis.fulfilled, (state,action)=>{
            state.loading = false
        })
        builder.addCase(calculateAnalysis.rejected, (state,action)=>{
            state.serverError = action.payload
        })
        
    }
})
export default analysisSlice.reducer