import * as React from 'react'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

export interface RegisterProps {
  children: React.ReactNode
}

export default function RegisterLayout({ children }: RegisterProps) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
