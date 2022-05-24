import { FC, useEffect } from 'react'
import Search from '../../components/Search/Search'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { fetchTypes } from '../../store/slices/resultsActions'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const { types } = useAppSelector(state => state.results)

  useEffect(() => {
    dispatch(fetchTypes())
  }, [])

  return (
    <section className="home-page">
      <div className="container">
        <div className="inner">
          <Search types={types} />
        </div>
      </div>
    </section>
  )
}

export default Home
