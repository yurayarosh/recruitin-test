import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { RouteNames } from '../../router'
import { setSearchData } from '../../store/slices/resultsActions'
import { ITypes } from '../../store/types/results'
import Radio from '../Radio/Radio'

import styles from './Search.module.scss'

interface SearchProps {
  types?: ITypes
}

const Search: FC<SearchProps> = ({ types }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { searchData } = useAppSelector(state => state.results)

  const [typeUrl, setTypeUrl] = useState<string>(searchData.typeUrl)
  const [searchVal, setSearchVal] = useState<string>(searchData.value)

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value)
  }

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeUrl(e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const searchUrl = `${typeUrl}?search=${searchVal}`

    dispatch(
      setSearchData({
        value: searchVal,
        url: searchUrl,
        typeUrl,
      })
    )

    if (types) navigate(RouteNames.RESULTS)
  }

  return (
    <form className={styles.search} onSubmit={onSubmit}>
      <div className={styles.panel}>
        <input
          required
          type="text"
          placeholder="Search..."
          value={searchVal}
          onChange={onSearchChange}
        />
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon icon--search">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        </button>
      </div>

      {types && (
        <div className="types">
          {Object.entries(types).map(([type, url]) => (
            <Radio key={type} name="types" required value={url} onChange={onRadioChange}>
              {type}
            </Radio>
          ))}
        </div>
      )}
    </form>
  )
}

export default Search
