import { Category, SuccessResponse } from 'src/types'
import http from 'src/utils/http'
const URL = 'categories'
export const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}
