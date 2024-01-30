import { put, select, takeEvery } from 'redux-saga/effects'
import { HANDLE_FAV_CLICK, UPDATE_FAVS } from '../types'
import { TActionProps } from '../../typescript/types'

function* favAddRemoveSaga(action: TActionProps) {
  const { payload } = action
  const favs: string[] = yield select((store) => store.app.favs)
  if (typeof payload === 'string') {
    const newFavs =
      favs.indexOf(payload) < 0
        ? structuredClone(favs).concat(payload)
        : structuredClone(favs).filter((el) => el !== payload)

    newFavs.length ? localStorage.setItem('favs', newFavs.join(' ')) : localStorage.removeItem('favs')

    yield put({ type: UPDATE_FAVS, payload: newFavs })
  }
}

export function* favSagas() {
  yield takeEvery(HANDLE_FAV_CLICK, favAddRemoveSaga)
}
