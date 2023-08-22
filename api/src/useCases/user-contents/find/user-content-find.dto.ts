type ContentData = {
  [key: string]: string | number
}

interface IUserContentFindRequestDTO {
  id: number
  userId: number
  contentTypeName: string
}

interface IUserContentFindResponseDTO {
  id: number
  type: string
  data: ContentData
}

export { ContentData, IUserContentFindRequestDTO, IUserContentFindResponseDTO }
