import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

import { ADDITIONAL_FETCH_ATTEMPT, HANDLE_FAV_CLICK } from '../../redux/types'
import { selectAppData, selectCats } from '../../redux/selectors'
import { useVisibility } from '../../hooks/useVisibility'
import { TCat } from '../../typescript/types'
import './cats.scss'

export const Cats = () => {
  const dispatch = useDispatch()
  const footerRef = useRef<HTMLDivElement>(null)
  const { favs, tab, loading } = useSelector(selectAppData)
  const cats = useSelector(selectCats)
  const array = tab === 'all' ? cats : cats.filter((cat: TCat) => favs.indexOf(cat.id) > -1)

  const footerInViewPort = useVisibility(footerRef)

  useEffect(() => {
    if (footerInViewPort && !loading && tab === 'all') {
      dispatch({ type: ADDITIONAL_FETCH_ATTEMPT })
    }
  }, [footerInViewPort])

  const handleFav = (id: string) => dispatch({ type: HANDLE_FAV_CLICK, payload: id })

  return (
    <div id="cats" className="tile-container">
      {array.map((cat: TCat) => {
        const { id, url } = cat
        const alt = `Cat #${id}`
        const isFav = favs.indexOf(id) > -1
        return (
          <div className="tile" key={id}>
            <img src={url} className="tile__cat" alt={alt} width={224} height={224} />
            <div className={isFav ? 'tile__fav' : 'tile__heart'} onClick={() => handleFav(id)} />
          </div>
        )
      })}
      <div id="footer" ref={footerRef}></div>
    </div>
  )
}
