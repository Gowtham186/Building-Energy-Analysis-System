import { configureStore } from '@reduxjs/toolkit'
import designReducer from './design-slice'
import analysisReducer from './analysis-slice'

const store = configureStore({
    reducer : {
        design : designReducer,
        analysis : analysisReducer
    }
})

export default store