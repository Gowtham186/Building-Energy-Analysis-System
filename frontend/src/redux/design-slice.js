import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../config/axios'

export const createBuildingConfig = createAsyncThunk('design', async({formData}, {rejectWithValue})=>{
    try{
        const response = await axios.post('/api/designs', formData)
        console.log(response.data)
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

const designSlice = createSlice({
    name : 'design',
    initialState : {
        newDesign : {},
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
            state.newDesign = action.payload
        })
        builder.addCase(createBuildingConfig.rejected, (state,action)=>{
            state.loading = false
            state.serverError = action.payload
        })
    }
})
export default designSlice.reducer