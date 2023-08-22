import { ContentType } from "@entities/content-type.entity"

interface IContentFieldParams {
  name: string
  type: string
}

interface IContentFieldCreateRequestDTO {
  contentTypeId: number
  fields: IContentFieldParams[]
}

interface IContentFieldCreateResponseDTO {
  contentType: ContentType
}

export {
  IContentFieldParams,
  IContentFieldCreateRequestDTO,
  IContentFieldCreateResponseDTO,
}
