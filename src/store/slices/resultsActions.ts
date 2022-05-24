import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ISearchData, ITypeResult, ITypes } from '../types/results'

export const fetchTypes = createAsyncThunk('results/fetchTypes', async (_, thunkAPI) => {
  try {
    const response = await fetch('https://swapi.dev/api/')
    const data: ITypes = await response.json()

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue('Fetching types error')
  }
})

export const fetchSearchResults = createAsyncThunk(
  'results/fetchSearchResults',
  async (url: string, thunkAPI) => {
    try {
      const response = await fetch(url)
      const data: ITypeResult = await response.json()

      return data
    } catch (e) {
      return thunkAPI.rejectWithValue('Fetching search results error')
    }
  }
)

export const setSearchData = createAction('results/setSearchData', (data: ISearchData) => ({
  payload: data,
}))
