import * as React from 'react'

export interface RegisterProps {
  children: React.ReactNode
}

export default function RegisterLayout({ children }: RegisterProps) {
  return <div>{children}</div>
}
