export interface ITypes {
  [key: string]: string
}

export interface ICard {
  name: string
  starships: string[]
  films: string[]
  vehicles: string[]
  url: string
}

export interface ISearchData {
  value: string
  url: string
  typeUrl: string
}

export interface ITypeResult {
  count: number
  next: string | null
  previous: string | null
  results: ICard[]
}

export interface ResultsState {
  isLoading: boolean
  types: ITypes
  typeResult: ITypeResult | null
  searchData: ISearchData
  error?: string
}
