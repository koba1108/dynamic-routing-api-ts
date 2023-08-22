import { ContentType } from "@entities/content-type"

interface IContentTypeFindAllDto {
  total: number
  contentTypes: ContentType[]
}

export { IContentTypeFindAllDto }
