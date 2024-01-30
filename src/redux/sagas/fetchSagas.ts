import { call, put, takeEvery } from 'redux-saga/effects'
import { ADDITIONAL_FETCH_ATTEMPT, ADDITIONAL_FETCH_FAILURE, ADDITIONAL_FETCH_SUCCESS } from '../types'
import { TCat } from '../../typescript/types'
import { getCats } from '../api'

export const catTypeGuard = async (data: TCat[]) => {
  return new Promise(async (resolve) => {
    const check = data.length && 'url' in data[0]
    resolve(check)
  })
}

export function* catsFetchSaga() {
  try {
    const cats: TCat[] = yield call(getCats, 12)
    const check: boolean = yield call(catTypeGuard, cats)

    if (check) {
      yield put({ type: ADDITIONAL_FETCH_SUCCESS, payload: cats })
    } else {
      throw new Error('Wrong data fetched')
    }
  } catch (error) {
    yield put({ type: ADDITIONAL_FETCH_FAILURE, payload: error instanceof Error ? error.message : 'Fetch error' })
  }
}

export function* fetchSagas() {
  yield takeEvery(ADDITIONAL_FETCH_ATTEMPT, catsFetchSaga)
}
