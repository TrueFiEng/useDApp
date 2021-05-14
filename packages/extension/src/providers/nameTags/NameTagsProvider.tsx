import React, { createContext, ReactNode, useMemo } from 'react'
import { useStorage } from '../../hooks'

export interface NameTag {
  address: string
  name: string
}

export interface NameTagsContextValue {
  nameTags: NameTag[]
  setNameTags: React.Dispatch<React.SetStateAction<NameTag[] | undefined>>
  getNameTag: (address: string) => string | undefined
}
export const NameTagsContext = createContext<NameTagsContextValue>({
  nameTags: [],
  setNameTags: () => undefined,
  getNameTag: () => undefined,
})

interface Props {
  children: ReactNode
}

export function NameTagsProvider({ children }: Props) {
  const [nameTags = [], setNameTags] = useStorage<NameTag[]>('nameTags')
  const value = useMemo(() => {
    const map = new Map(nameTags.map((tag) => [tag.address.toLowerCase(), tag.name]))
    return {
      nameTags,
      setNameTags,
      getNameTag: (address: string) => map.get(address.toLowerCase()),
    }
  }, [nameTags, setNameTags])
  return <NameTagsContext.Provider value={value} children={children} />
}
