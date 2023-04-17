import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { config } from 'src/constant'
interface Props {
  onChange?: (file?: File) => void
}
export default function InputFile({ onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('File không đúng  định dạng quy định', { autoClose: 2000 })
    } else {
      onChange && onChange(fileFromLocal)
    }
  }
  const handleUpload = () => {
    inputRef.current?.click()
  }
  return (
    <>
      <input
        ref={inputRef}
        type='file'
        accept='.jpg,.jpeg,.png'
        className='hidden'
        id='avatar_image'
        onChange={handleFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e) => ((e.target as any).value = null)}
      />
      <button
        onClick={handleUpload}
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
      >
        Chọn ảnh
      </button>
    </>
  )
}
