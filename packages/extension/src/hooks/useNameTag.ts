import { useContext } from 'react'
import { NameTagsContext } from '../providers/nameTags/NameTagsProvider'

export function useNameTags() {
  const { nameTags, setNameTags } = useContext(NameTagsContext)
  return [nameTags, setNameTags] as const
}

export function useNameTag(address: string) {
  return useContext(NameTagsContext).getNameTag(address)
}
