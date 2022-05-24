import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { RouteNames } from '../../router'
import { setSearchData } from '../../store/slices/resultsActions'
import { ITypes } from '../../store/types/results'

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
    <form className="search" onSubmit={onSubmit}>
      <div>
        <input
          required
          type="text"
          placeholder="Search..."
          value={searchVal}
          onChange={onSearchChange}
        />
        <button>search</button>
      </div>

      {types && (
        <div className="types">
          {Object.entries(types).map(([type, url]) => (
            <label key={type} htmlFor={type}>
              <input
                required
                type="radio"
                id={type}
                name="types"
                value={url}
                onChange={onRadioChange}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      )}
    </form>
  )
}

export default Search
