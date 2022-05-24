import { ComponentType } from 'react'
import Home from '../pages/Home/Home'
import Results from '../pages/Results/Results'

export interface IRoute {
  path: string
  Component: ComponentType
}

export enum RouteNames {
  HOME = '/',
  RESULTS = '/results',
}

export const routes: IRoute[] = [
  {
    path: RouteNames.HOME,
    Component: Home,
  },
  {
    path: RouteNames.RESULTS,
    Component: Results,
  },
]
