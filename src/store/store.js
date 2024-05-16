
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

import { configureStore } from '@reduxjs/toolkit'




// const persisReducer = persistReducer(persistConfig,rootReducer)
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean)



export const store = configureStore({
reducer:rootReducer,
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleWares),
}
)

// export const persistor = persistStore(store)