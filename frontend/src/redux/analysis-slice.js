import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";
import { flushSync } from "react-dom";

export const calculateAnalysis = createAsyncThunk('design/calculateAnalysis', async({designId}, {rejectWithValue})=>{
    try{
        const response = await axios.post('/api/analysis/calculate', { designId })
        console.log(response.data)
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data.errors)
    }
})

export const compareDesigns = createAsyncThunk('design/compareDesigns', async(designIds, { rejectWithValue})=>{
    try{
        const response = await axios.get(`/api/analysis/compare?designIds=${designIds.join(',')}`)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data.errors)
    }
})

const analysisSlice = createSlice({
    name : 'analysis',
    initialState : {
        loading : false,
        serverError : null,
        comparisonResults : []
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
        builder.addCase(compareDesigns.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(compareDesigns.fulfilled, (state,action)=>{
            state.loading = false
            state.comparisonResults = action.payload
            state.serverError = null
        })
        builder.addCase(compareDesigns.rejected, (state,action)=>{
            state.loading = false
            state.serverError = action.payload
        })

    }
})
export default analysisSlice.reducer