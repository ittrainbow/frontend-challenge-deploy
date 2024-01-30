import { call, put, all } from 'redux-saga/effects'

import { INITIAL_FETCH_FAILURE, INITIAL_FAVS_SUCCESS, INITIAL_FETCH_SUCCESS } from '../types'
import { catTypeGuard, catsFetchSaga } from './fetchSagas'
import { TCat } from '../../typescript/types'
import { getFav } from '../api'

function* initLocalFavsSaga() {
  const favs: string[] = localStorage.getItem('favs')?.split(' ') || []
  yield put({ type: INITIAL_FAVS_SUCCESS, payload: favs })
  return favs
}

function* initFavCatsSaga(favs: string[]) {
  try {
    const favCats: TCat[] = yield all(favs.map(async (fav) => await getFav(fav)))
    const check: boolean = yield call(catTypeGuard, favCats)
    if (check) {
      yield put({ type: INITIAL_FETCH_SUCCESS, payload: favCats })
    } else {
      throw new Error('Wrong data fetched')
    }
  } catch (error) {
    yield put({ type: INITIAL_FETCH_FAILURE, payload: error instanceof Error ? error.message : 'Fetch error' })
  }
}

export function* initSagas() {
  const favs: string[] = yield call(initLocalFavsSaga)
  yield call(initFavCatsSaga, favs)
  yield call(catsFetchSaga)
}
