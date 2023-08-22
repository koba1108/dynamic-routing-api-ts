import { ContentType } from "@entities/content-type.entity"

interface IContentTypeFindAllDto {
  total: number
  contentTypes: ContentType[]
}

export { IContentTypeFindAllDto }
