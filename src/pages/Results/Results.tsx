import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Search from '../../components/Search/Search'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { RouteNames } from '../../router'
import { fetchSearchResults } from '../../store/slices/resultsActions'

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
    <section className="results-page">
      <Search />

      <ul className="results">
        <li>
          {typeResult?.results.map((res, i) => (
            <div key={i} className="card">
              {res.name}
            </div>
          ))}
        </li>
      </ul>
    </section>
  )
}

export default Results
