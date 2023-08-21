import { ContentField } from "@entities/content-field"

interface IContentFieldFindAllDto {
  total: number;
  contentFields: ContentField[];
}

export { IContentFieldFindAllDto }
