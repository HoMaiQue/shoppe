import { Purchase, PurchaseStatusList, SuccessResponse } from 'src/types'
import http from 'src/utils/http'

const URL = 'purchases'

export const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchaseList(params: { status: PurchaseStatusList }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, { params })
  }
}
