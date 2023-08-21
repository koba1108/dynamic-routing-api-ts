import { provide } from "inversify-binding-decorators"
import { IEntity } from "./base.entity"

@provide(User)
class User implements IEntity {
  id: number | undefined
  name!: string
  email!: string
  createdAt!: Date
  updatedAt!: Date
  deletedAt!: Date | null

  constructor(name: string, email: string) {
    this.name = name
    this.email = email
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export { User }
