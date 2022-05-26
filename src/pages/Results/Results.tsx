import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Preloader from '../../components/Preloader/Preloader'
import ResultsList from '../../components/ResultsList/ResultsList'
import Search from '../../components/Search/Search'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { RouteNames } from '../../router'
import { fetchSearchResults } from '../../store/slices/resultsActions'

import styles from './Results.module.scss'

const Results: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { typeResult, searchData } = useAppSelector(state => state.results)

  useEffect(() => {
    if (!searchData.typeUrl) navigate(RouteNames.HOME)
  }, [])

  useEffect(() => {
    dispatch(fetchSearchResults(searchData.url))
  }, [searchData])

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <Search />

          {typeResult?.results ? <ResultsList /> : <Preloader />}
        </div>
      </div>
    </section>
  )
}

export default Results
