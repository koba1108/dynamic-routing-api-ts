import { ContentField } from "@entities/content-field.entity"

interface IContentFieldFindAllDto {
  total: number
  contentFields: ContentField[]
}

export { IContentFieldFindAllDto }
