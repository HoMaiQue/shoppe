import { useMutation, useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { productApi } from 'src/api/product.api'
import { purchaseApi } from 'src/api/purchase.api'
import ProductRating from 'src/components/ProductRating'
import QuantityController from 'src/components/QuantityController'
import { path, purchaseStatus } from 'src/constant'
import { queryClient } from 'src/main'
import { Product as ProductType } from 'src/types'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import Product from '../ProductList/components/Product'

export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: dataProductDetail } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const productDetail = dataProductDetail?.data.data
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const currentImageList = useMemo(
    () => (productDetail ? productDetail.images.slice(...currentIndexImage) : []),
    [productDetail, currentIndexImage]
  )
  const queryConfig = { limit: 20, page: '1', category: productDetail?.category._id }
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProductList(queryConfig),
    enabled: Boolean(productDetail),
    staleTime: 3 * 60 * 1000
  })
  const addToCartMutation = useMutation(purchaseApi.addToCart)
  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (productDetail && productDetail.images.length > 0) {
      setActiveImage(productDetail.images[0])
    }
  }, [productDetail])
  const handleActiveImage = (image: string) => {
    setActiveImage(image)
  }

  const handleNext = () => {
    if (currentIndexImage[1] < (productDetail as ProductType).images.length) {
      setCurrentIndexImage((pre) => [pre[0] + 1, pre[1] + 1])
    }
  }

  const handlePrevious = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((pre) => [pre[0] - 1, pre[1] - 1])
    }
  }

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image
    // cach 1 lay offsetX, offsetY khi xu ly dc bubble event
    const { offsetX, offsetY } = e.nativeEvent

    // cach 2 khi khong xu ly dc bubble event
    // const offsetX = e.pageX - (rect.x + window.scrollX)
    // const offsetY = e.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.maxWidth = 'unset'
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const addToCart = () => {
    addToCartMutation.mutate(
      { product_id: productDetail?._id as string, buy_count: buyCount },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 2000 })
          queryClient.invalidateQueries(['purchase', { status: purchaseStatus.inCart }])
        }
      }
    )
  }
  const handleBuyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ product_id: productDetail?._id as string, buy_count: buyCount })
    const purchase = res.data.data
    navigate(path.cart, { state: { purchaseId: purchase._id } })
  }
  if (!productDetail) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative  w-full overflow-hidden pt-[100%] shadow '
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  ref={imageRef}
                  src={activeImage}
                  alt={productDetail.name}
                  className='pointer-events-none absolute top-0 left-0 h-full  bg-white object-cover'
                />
              </div>

              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handlePrevious}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImageList.map((image) => {
                  const isActive = activeImage === image
                  return (
                    <div
                      key={image}
                      className='relative w-full pt-[100%] '
                      onMouseEnter={() => handleActiveImage(image)}
                    >
                      <img
                        src={image}
                        alt=''
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-solid border-red-600'></div>}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handleNext}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>

            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{productDetail.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange'>{productDetail.rating}</span>
                  <ProductRating
                    rating={productDetail.rating}
                    activeClassName='fill-orange text-orange w-4 h-4'
                    noneActiveClassName='w-4 h-4 text-gray-400 fill-gray-200'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(productDetail.sold)}</span>
                  <span className='ml-1 text-gray-400'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(productDetail.price_before_discount)}</div>

                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(productDetail.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold '>
                  {rateSale(productDetail.price_before_discount, productDetail.price)}{' '}
                  <span className='uppercase text-white'>Giảm</span>
                </div>
              </div>

              <div className='mt-8 flex items-center '>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={productDetail.quantity}
                />

                <div className='ml-6 text-sm text-gray-500'>{productDetail.quantity} Sản phẩm có sản</div>
              </div>

              <div className='mt-8 flex items-center '>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-2 h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={handleBuyNow}
                  className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                >
                  {' '}
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='mt-8 bg-white px-4 shadow '>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'> Mô tả sản phẩm</div>
            <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.description) }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>Có thể bạn cũng thích</div>
          {productData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
