import { provide } from "inversify-binding-decorators"
import { IEntity } from "@entities/base.entity"
import { Content } from "@entities/content.entity"
import { ContentField } from "@entities/content-field.entity"

@provide(ContentValue)
class ContentValue implements IEntity {
  id: number | undefined
  contentId!: number
  fieldId!: number
  value!: string
  content?: Content
  field?: ContentField
  createdAt!: Date
  updatedAt!: Date
  deletedAt!: Date | null

  constructor(field: ContentField, value: string, content?: Content) {
    this.value = value
    if (field.id) {
      this.fieldId = field.id
      this.field = field
    }
    if (content && content.id) {
      this.contentId = content.id
      this.content = content
    }
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export { ContentValue }
