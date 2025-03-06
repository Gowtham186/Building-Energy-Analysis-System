import { configureStore } from '@reduxjs/toolkit'
import designReducer from './design-slice'

const store = configureStore({
    reducer : {
        design : designReducer
    }
})

export default store