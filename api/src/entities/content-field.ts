import { provide } from "inversify-binding-decorators"
import { IEntity } from "./base.entity"

@provide(ContentField)
class ContentField implements IEntity {
  id: number | undefined
  name!: string
  type: string
  contentTypeId!: number
  createdAt!: Date
  updatedAt!: Date
  deletedAt!: Date | null

  constructor(name: string, type: string, contentTypeId?: number) {
    this.name = name
    this.type = type
    if (contentTypeId) {
      this.contentTypeId = contentTypeId
    }
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export { ContentField }
