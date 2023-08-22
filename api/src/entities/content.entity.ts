import { provide } from "inversify-binding-decorators"
import { IEntity } from "@entities/base.entity"
import { ContentType } from "@entities/content-type.entity"
import { ContentValue } from "@entities/content-value.entity"

@provide(Content)
class Content implements IEntity {
  id: number | undefined
  contentTypeId!: number
  contentType?: ContentType
  contentValues?: ContentValue[]
  createdAt!: Date
  updatedAt!: Date
  deletedAt!: Date | null

  constructor(contentType: ContentType, values: ContentValue[]) {
    if (contentType.id) {
      this.contentTypeId = contentType.id
      this.contentType = contentType
    }
    this.contentValues = values
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export { Content }
