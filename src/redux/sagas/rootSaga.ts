import { spawn, all } from 'redux-saga/effects'

import { initSagas } from './initSagas'
import { favSagas } from './favSagas'
import { fetchSagas } from './fetchSagas'

export function* rootSaga() {
  const sagas = [initSagas, favSagas, fetchSagas]

  yield all(sagas.map((saga) => spawn(saga)))
}
