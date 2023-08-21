import { ContentType } from "@entities/content-type"
import { ContentField } from "@entities/content-field"

interface IContentTypeUpdateRequestDTO {
  id: number;
  name?: string;
  fieldIds: number[];
}

interface IContentTypeUpdateResponseDTO {
  contentType: ContentType;
}

export { IContentTypeUpdateRequestDTO, IContentTypeUpdateResponseDTO }
