import { User } from "@entities/user.entity"
import { BaseRepository } from "@repositories/base-repository"
import { provide } from "inversify-binding-decorators"

@provide(UserRepository)
class UserRepository extends BaseRepository<User> {
  get db() {
    return this.prisma.users()
  }

  nextVal(): Promise<number> {
    return this.prisma.nextVal("users")
  }

  create(data: User): Promise<User> {
    return this.db.create({ data })
  }

  update(id: number, data: User): Promise<User> {
    return this.db.update({ where: { id }, data })
  }

  delete(id: number): Promise<User> {
    return this.db.delete({ where: { id } })
  }

  findAll(): Promise<User[]> {
    return this.db.findMany()
  }

  countAll(): Promise<number> {
    return this.db.count()
  }

  findById(id: number): Promise<User | null> {
    return this.db.findUnique({
      where: { id },
    })
  }

  findByEmail(email: string): Promise<User | null> {
    return this.db.findUnique({
      where: { email },
    })
  }

  async existsById(id: number): Promise<boolean> {
    const count = await this.db.count({ where: { id } })
    return count > 0
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.db.count({ where: { email } })
    return count > 0
  }
}

export { UserRepository }
