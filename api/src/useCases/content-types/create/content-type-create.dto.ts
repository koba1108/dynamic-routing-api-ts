import { ContentType } from "@entities/content-type"

interface IContentTypeCreateRequestDTO {
  name: string;
  fields: {
    name: string,
    type: string,
  }[];
}

interface IContentTypeCreateResponseDTO {
  contentType: ContentType;
}

export { IContentTypeCreateRequestDTO, IContentTypeCreateResponseDTO };
