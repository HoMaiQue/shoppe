import classNames from 'classnames'
import React from 'react'
interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}
const RANGE = 2
export default function Pagination({ page, setPage, pageSize }: Props) {
  const handlePagination = () => {
    let dotAfter = false
    let dotBefore = false
    const handleDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>
            ...
          </button>
        )
      }
      return null
    }
    const handleDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>
            ...
          </button>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return handleDotAfter(index)
        } else if (page > RANGE * 2 + 1 && pageNumber < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return handleDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return handleDotAfter(index)
          }
        }
        return (
          <button
            key={index}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div className='flex justify-center mt-6 flex-wrap'>
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>Trước</button>
      {handlePagination()}
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>Sau</button>
    </div>
  )
}
