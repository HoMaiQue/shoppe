import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { productApi } from 'src/api/product.api'
import Pagination from 'src/components/Pagination'
import { useQueryParams } from 'src/hooks'
import { ProductConfig } from 'src/types/product.type'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import { omitBy, isUndefined } from 'lodash'
export type QueryConfig = {
  [key in keyof ProductConfig]: string
}
const ProductList = () => {
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
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProductList(queryConfig as ProductConfig),
    keepPreviousData: true
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
              <div className='md:grid-cols-3:lg:grid-cols-4 mt-6 grid grid-cols-2 gap-3 xl:grid-cols-5'>
                {data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
