import { provide } from "inversify-binding-decorators"
import { BaseRepository } from "@repositories/base-repository"
import { ContentType } from "@entities/content-type"

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
        createdAt: ct.createdAt,
        updatedAt: ct.updatedAt,
        fields: {
          createMany: {
            data: ct.fields,
          },
        },
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
        fields: {
          connect: ct.fields.map((f) => ({ id: f.id })),
        },
      },
      include: { fields: true },
    })
  }

  delete(id: number): Promise<ContentType> {
    return this.db.delete({
      where: {
        id
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
