import { ContentType } from "@entities/content-type"

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
