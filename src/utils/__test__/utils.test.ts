import { AxiosError } from 'axios'
import { isAxiosError } from '../utils'
import { describe, it, expect } from 'vitest'
// describe dùng để mô tả tập hợp các ngữ cảnh hoặc đơn vị cần test ví dụ function hay component

describe('isAxiosError', () => {
  it('isAxiosError return boolean', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})
