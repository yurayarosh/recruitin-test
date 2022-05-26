import { FC, useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { fetchSearchResults } from '../../store/slices/resultsActions'
import Preloader from '../Preloader/Preloader'

import styles from './ResultsList.module.scss'

const itemsPerPage = 10

const ResultsList: FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading, searchData, typeResult } = useAppSelector(state => state.results)
  const [pageNumber, setPageNumber] = useState<number>(0)

  const pageCount = useMemo(
    () => (typeResult ? Math.ceil(typeResult?.count / itemsPerPage) : 0),
    [typeResult]
  )

  const handlePageClick = (event: { selected: number }) => {
    dispatch(fetchSearchResults(`${searchData.url}&page=${event.selected + 1}`))
    setPageNumber(event.selected)
  }

  if (isLoading) return <Preloader />

  if (!typeResult?.results.length) return <p>There are no results for [{searchData.value}]</p>

  return (
    <>
      <ul className={styles.list}>
        {typeResult?.results &&
          typeResult.results.map(card => (
            <li key={card.url}>
              <div className={styles.card}>
                <span>{card.url}</span>
                <p>{card.name || card.title}</p>
              </div>
            </li>
          ))}
      </ul>

      {pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          previousLabel="Prev"
          nextLabel="Next"
          className="pagination"
          activeClassName="active"
          onPageChange={handlePageClick}
          forcePage={pageNumber}
          pageCount={pageCount}
        />
      )}
    </>
  )
}

export default ResultsList
