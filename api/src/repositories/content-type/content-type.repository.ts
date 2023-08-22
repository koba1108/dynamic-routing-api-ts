import { provide } from "inversify-binding-decorators"
import { BaseRepository } from "@repositories/base-repository"
import { ContentType } from "@entities/content-type.entity"

@provide(ContentTypeRepository)
class ContentTypeRepository extends BaseRepository<ContentType> {
  get db() {
    return this.prisma.contentTypes()
  }

  nextVal(): Promise<number> {
    return this.prisma.nextVal("contentTypes")
  }

  create(ct: ContentType): Promise<ContentType> {
    return this.db.create({
      data: {
        name: ct.name,
        userId: ct.userId,
        createdAt: ct.createdAt,
        updatedAt: ct.updatedAt,
        fields: ct.fields
          ? {
              createMany: {
                data: ct.fields,
              },
            }
          : undefined,
      },
      include: { fields: true },
    })
  }

  update(id: number, ct: ContentType): Promise<ContentType> {
    return this.db.update({
      where: { id },
      data: {
        name: ct.name,
        updatedAt: ct.updatedAt,
        fields: ct.fields
          ? {
              connect: ct.fields.map((f) => ({ id: f.id })),
            }
          : undefined,
      },
      include: { fields: true },
    })
  }

  delete(id: number): Promise<ContentType> {
    return this.db.delete({
      where: {
        id,
      },
      include: { fields: true },
    })
  }

  findById(id: number): Promise<ContentType | null> {
    return this.db.findUnique({
      where: { id },
      include: { fields: true },
    })
  }

  findByUserIdAndName(
    userId: number,
    name: string,
  ): Promise<ContentType | null> {
    return this.db.findUnique({
      where: { name, userId },
      include: { fields: true },
    })
  }

  findAll(): Promise<ContentType[]> {
    return this.db.findMany({
      include: { fields: true },
    })
  }

  async existsByName(name: string): Promise<boolean> {
    const res = await this.db.count({ where: { name } })
    return res > 0
  }

  async existsById(id: number): Promise<boolean> {
    const res = await this.db.count({ where: { id } })
    return res > 0
  }

  countAll(): Promise<number> {
    return this.db.count()
  }
}

export { ContentTypeRepository }
