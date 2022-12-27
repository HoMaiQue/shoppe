import { isUndefined, omitBy } from 'lodash'
import { ProductConfig } from 'src/types'
import { useQueryParams } from './useQueryParams'
export type QueryConfig = {
  [key in keyof ProductConfig]: string
}
export function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      category: queryParams.category,
      exclude: queryParams.exclude,
      name: queryParams.name,
      limit: queryParams.limit || 20,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by
    },
    isUndefined
  )
  return queryConfig
}
