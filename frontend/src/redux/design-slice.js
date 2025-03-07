import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../config/axios'

export const createBuildingConfig = createAsyncThunk('design/createBuildingConfig', async({formData}, {rejectWithValue})=>{
    try{
        const response = await axios.post('/api/designs', formData)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data.errors)
    }
})


export const getDesign = createAsyncThunk('design/getDesign', async({id}, {rejectWithValue})=>{
    try{    
        const response = await axios.get(`/api/designs/${id}`)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data.errors)
    }
})

export const getAllDesigns = createAsyncThunk('design/getAllDesigns', async(_, {rejectWithValue})=>{
    try{
        const response = await axios.get('/api/designs')
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data.errors)
    }
})

export const deleteDesign = createAsyncThunk('design/deleteDesign', async({id}, {rejectWithValue})=>{
    try{
        const response = await axios.delete(`/api/designs/${id}`)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data.errors)
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
        builder.addCase(getAllDesigns.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getAllDesigns.fulfilled, (state,action)=>{
            state.loading = false
            state.allDesigns = action.payload
            state.serverError = null
        })
        builder.addCase(getAllDesigns.rejected, (state,action)=>{
            state.loading = false
            state.serverError = action.payload
        })
        builder.addCase(deleteDesign.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(deleteDesign.fulfilled, (state,action)=>{
            state.loading = false
            state.allDesigns = state.allDesigns.filter((design) => design._id !== action.payload._id)
            state.serverError = null
        })
        builder.addCase(deleteDesign.rejected, (state,action)=>{
            state.loading = false
            state.serverError = action.payload
        })
        
    }
})
export default designSlice.reducer