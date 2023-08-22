import { ContentType } from "@entities/content-type"

interface IContentTypeUpdateRequestDTO {
  id: number
  name?: string
  fieldIds: number[]
}

interface IContentTypeUpdateResponseDTO {
  contentType: ContentType
}

export { IContentTypeUpdateRequestDTO, IContentTypeUpdateResponseDTO }
