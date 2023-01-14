import Input from 'src/components/Input'

export function Profile() {
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        <div className='mt-8 flex flex-col-reverse md:flex-row  md:items-start'>
          <form className='mt-6 flex-grow md:mt-0  md:pr-12'>
            <div className='flex flex-col flex-wrap  sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>homaique@gmail.com</div>
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap  sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%]  sm:text-right'>Tên</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 p-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap  sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%]  sm:text-right'>Số điện thoại</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 p-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap  sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%]  sm:text-right'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 p-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap  sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%]  sm:text-right'>Ngày sinh</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='flex justify-between'>
                  <select name='' id='' className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                    <option value='' disabled>
                      Ngày
                    </option>
                  </select>
                  <select name='' id='' className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                    <option value='' disabled>
                      Tháng
                    </option>
                  </select>
                  <select name='' id='' className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                    <option value='' disabled>
                      Năm
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center '>
              <div className='my-5 h-24 w-24'>
                <img
                  src='https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
                  className='h-full w-full rounded-full object-cover'
                  alt='avatar'
                />
              </div>
              <input type='file' accept='.jpg,.jpeg,.png' className='hidden' />
              <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
                Chọn ảnh
              </button>
              <div className='mt-3 text-gray-400'>
                <div> Dung lượng file tối đa 1MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
