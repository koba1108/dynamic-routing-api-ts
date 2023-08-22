import { provide } from "inversify-binding-decorators"
import { ContentField } from "@entities/content-field.entity"
import { User } from "@entities/user.entity"
import { IEntity } from "./base.entity"

@provide(ContentType)
class ContentType implements IEntity {
  id: number | undefined
  name!: string
  userId!: number
  fields?: ContentField[]
  user?: User
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
