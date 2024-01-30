import { TCat } from '../../typescript/types'
import * as ACTIONTYPES from '../types'

type TCatsReducer = {
  cats: TCat[]
}

const initialState: TCatsReducer = {
  cats: []
}

type TCatsActionProps = {
  type: string
  payload: TCat[]
}

export const catsReducer = (state = initialState, action: TCatsActionProps) => {
  const { type, payload } = action

  switch (type) {
    case ACTIONTYPES.INITIAL_FETCH_SUCCESS:
      return {
        ...state,
        cats: payload
      }

    case ACTIONTYPES.ADDITIONAL_FETCH_SUCCESS:
      const existingCats = state.cats.map((cat: TCat) => cat.id)
      const additionalCats = payload.filter((cat: TCat) => existingCats.indexOf(cat.id) < 0)
      const newCats = structuredClone(state.cats).concat(additionalCats)
      return {
        ...state,
        cats: newCats
      }

    default:
      return state
  }
}
