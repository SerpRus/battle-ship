import React, { ReactNode } from 'react'
import Header from '../../../shared/ui/Header/Header'

const LayoutWrapper = ({
  authOnly,
  children,
}: {
  authOnly?: boolean
  children: ReactNode
}) => (
  <>
    {authOnly !== undefined && <Header authOnly={authOnly} />}
    {children}
  </>
)

export default LayoutWrapper
