import { ContentField } from "@entities/content-field"

interface IContentFieldUpdateRequestDTO {
  id: number;
  contentTypeId: number;
  name?: string;
  type?: string
}

interface IContentFieldUpdateResponseDTO {
  contentField: ContentField;
}

export { IContentFieldUpdateRequestDTO, IContentFieldUpdateResponseDTO }
