import { Purchase, PurchaseStatusList, SuccessResponse } from 'src/types'
import http from 'src/utils/http'

const URL = 'purchases'

export const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchaseList(params: { status: PurchaseStatusList }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, { params })
  },
  buyProduct(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIdList: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, { data: purchaseIdList })
  }
}
