import { useDispatch, useSelector } from 'react-redux'

import { HANDLE_HEADER_CLICK } from '../../redux/types'
import { selectAppData } from '../../redux/selectors'
import './header.css'

export const Header = () => {
  const dispatch = useDispatch()
  const { tab } = useSelector(selectAppData)

  const handleAll = () => dispatch({ type: HANDLE_HEADER_CLICK, payload: 'all' })

  const handleFav = () => dispatch({ type: HANDLE_HEADER_CLICK, payload: 'fav' })

  return (
    <div id="header" className="header">
      <div className={tab === 'all' ? 'header__button active' : 'header__button'} onClick={handleAll}>
        Все котики
      </div>
      <div className={tab === 'fav' ? 'header__button active' : 'header__button'} onClick={handleFav}>
        Любимые котики
      </div>
    </div>
  )
}
