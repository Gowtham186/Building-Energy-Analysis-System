import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../config/axios'

export const createBuildingConfig = createAsyncThunk('design/createBuildingConfig', async({formData}, {rejectWithValue})=>{
    try{
        const response = await axios.post('/api/designs', formData)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

export const calculateAnalysis = createAsyncThunk('design/calculateAnalysis', async({designId}, {rejectWithValue})=>{
    try{
        const response = await axios.post('/api/analysis/calculate', { designId })
        console.log(response.data)
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

export const getDesign = createAsyncThunk('design/getDesign', async({id}, {rejectWithValue})=>{
    try{    
        const response = await axios.get(`/api/designs/${id}`)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

const designSlice = createSlice({
    name : 'design',
    initialState : {
        designId : null,
        designData : {},
        allDesigns : [],
        loading : false,
        serverError : null
    },
    extraReducers: (builder)=>{
        builder.addCase(createBuildingConfig.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(createBuildingConfig.fulfilled, (state,action)=>{
            state.loading = false
            state.designId = action.payload?._id
            state.serverError = null
        })
        builder.addCase(createBuildingConfig.rejected, (state,action)=>{
            state.loading = false
            state.serverError = action.payload
        })
        builder.addCase(calculateAnalysis.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(calculateAnalysis.fulfilled, (state,action)=>{
            state.loading = false
        })
        builder.addCase(calculateAnalysis.rejected, (state,action)=>{
            state.serverError = action.payload
        })
        builder.addCase(getDesign.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getDesign.fulfilled, (state,action)=>{
            state.loading = false
            state.designData = action.payload
        })
        builder.addCase(getDesign.rejected, (state,action)=>{
            state.loading = false
            state.serverError = action.payload
        })
    }
})
export default designSlice.reducer