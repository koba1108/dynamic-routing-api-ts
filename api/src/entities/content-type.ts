import { provide } from "inversify-binding-decorators"
import { IEntity } from "./base.entity"
import { ContentField } from "@entities/content-field"

@provide(ContentType)
class ContentType implements IEntity {
  id: number | undefined
  name!: string
  fields: ContentField[]
  createdAt!: Date
  updatedAt!: Date
  deletedAt!: Date | null

  constructor(name: string, fields: ContentField[]) {
    this.name = name
    this.fields = fields
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export { ContentType }
