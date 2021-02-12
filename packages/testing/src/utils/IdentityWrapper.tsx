import React, { ReactNode } from 'react'

export type ChildrenProps = { children?: ReactNode }

export const IdentityWrapper = ({ children }: ChildrenProps) => <>{children}</>
