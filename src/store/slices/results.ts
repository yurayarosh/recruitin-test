import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResultsState, ITypes, ITypeResult, ISearchData } from '../types/results'
import { fetchSearchResults, fetchTypes, setSearchData } from './resultsActions'

const initialState: ResultsState = {
  isLoading: true,
  types: {},
  typeResult: null,
  searchData: {
    value: '',
    url: '',
    typeUrl: '',
  },
}

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTypes.pending.type]: state => {
      state.isLoading = true
    },
    [fetchTypes.fulfilled.type]: (state, action: PayloadAction<ITypes>) => {
      state.isLoading = false
      state.types = action.payload
    },
    [fetchTypes.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },

    [setSearchData.type]: (state, action: PayloadAction<ISearchData>) => {
      state.searchData = action.payload
    },

    [fetchSearchResults.pending.type]: state => {
      state.isLoading = true
    },
    [fetchSearchResults.fulfilled.type]: (state, action: PayloadAction<ITypeResult>) => {
      state.isLoading = false
      state.typeResult = action.payload
    },
    [fetchSearchResults.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default resultsSlice.reducer
