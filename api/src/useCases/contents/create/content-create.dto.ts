import { Content } from "@entities/content.entity"

interface IFieldParams {
  id: number
  value: string
}

interface IContentCreateRequestDTO {
  contentTypeId: number
  fields: IFieldParams[]
}

interface IContentCreateResponseDTO {
  content: Content
}

export { IContentCreateRequestDTO, IContentCreateResponseDTO }
