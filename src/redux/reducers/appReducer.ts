import { TActionProps } from '../../typescript/types'
import * as ACTIONTYPES from '../types'

type TAppReducer = {
  loading: boolean
  tab: 'all' | 'fav'
  error: null | string
  favs: string[]
}

const initialState: TAppReducer = {
  loading: true,
  tab: 'all',
  error: null,
  favs: []
}

export const appReducer = (state = initialState, action: TActionProps) => {
  const { type, payload } = action

  switch (type) {
    case ACTIONTYPES.INITIAL_FETCH_SUCCESS:
    case ACTIONTYPES.ADDITIONAL_FETCH_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case ACTIONTYPES.INITIAL_FAVS_SUCCESS:
      return {
        ...state,
        favs: payload
      }

    case ACTIONTYPES.ADDITIONAL_FETCH_ATTEMPT:
      return {
        ...state,
        loading: true
      }

    case ACTIONTYPES.HANDLE_HEADER_CLICK:
      return {
        ...state,
        tab: payload
      }

    case ACTIONTYPES.UPDATE_FAVS:
      return {
        ...state,
        favs: payload
      }

    case ACTIONTYPES.INITIAL_FETCH_FAILURE:
    case ACTIONTYPES.ADDITIONAL_FETCH_FAILURE:
      return {
        ...state,
        error: payload
      }

    default:
      return state
  }
}
