import { SuccessResponse } from 'src/types'
import { Product, ProductConfig, ProductList } from 'src/types/product.type'
import http from 'src/utils/http'

const URL = 'products'
export const productApi = {
  getProductList(params: ProductConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, { params })
  },
  getProductDetail(idProduct: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${idProduct}`)
  }
}
