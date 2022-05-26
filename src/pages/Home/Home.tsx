import { FC, useEffect } from 'react'
import Search from '../../components/Search/Search'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { fetchTypes } from '../../store/slices/resultsActions'

import styles from './Home.module.scss'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const { types } = useAppSelector(state => state.results)

  useEffect(() => {
    dispatch(fetchTypes())
  }, [])

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <Search types={types} />
        </div>
      </div>
    </section>
  )
}

export default Home
