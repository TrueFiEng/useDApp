import React, { createContext, ReactNode, useMemo, useState } from 'react'

export interface NameTag {
  address: string
  name: string
}

export interface NameTagsContextValue {
  nameTags: NameTag[]
  setNameTags: (nameTags: NameTag[]) => void
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
  const [nameTags, setNameTags] = useState<NameTag[]>([])
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
