import { Tuple, combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { appReducer as app } from './reducers/appReducer'
import { catsReducer as cats } from './reducers/catsReducer'
import { rootSaga } from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware({})

export const store = configureStore({
  reducer: combineReducers({
    app,
    cats
  }),
  middleware: () => new Tuple(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)
