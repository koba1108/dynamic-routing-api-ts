import { ContentField } from "@entities/content-field"

interface IContentFieldCreateRequestDTO {
  contentTypeId: number,
  name: string,
  type: string,
}

interface IContentFieldCreateResponseDTO {
  contentField: ContentField;
}

export { IContentFieldCreateRequestDTO, IContentFieldCreateResponseDTO }
