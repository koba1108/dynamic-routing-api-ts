import { ContentField } from "@entities/content-field.entity"

interface IContentFieldUpdateRequestDTO {
  id: number
  contentTypeId: number
  name?: string
}

interface IContentFieldUpdateResponseDTO {
  contentField: ContentField
}

export { IContentFieldUpdateRequestDTO, IContentFieldUpdateResponseDTO }
