import { provide } from "inversify-binding-decorators"
import { BaseRepository } from "@repositories/base-repository"
import { ContentField } from "@entities/content-field.entity"

@provide(ContentFieldRepository)
class ContentFieldRepository extends BaseRepository<ContentField> {
  get db() {
    return this.prisma.contentFields()
  }

  nextVal(): Promise<number> {
    return this.prisma.nextVal("contentFields")
  }

  create(cf: ContentField): Promise<ContentField> {
    return this.db.create({
      data: {
        name: cf.name,
        type: cf.type,
        contentTypeId: cf.contentTypeId,
        createdAt: cf.createdAt,
        updatedAt: cf.updatedAt,
      },
      include: { contentType: true },
    })
  }

  createMany(cfs: ContentField[]): Promise<{ count: number }> {
    return this.db.createMany({
      data: cfs.map((cf) => ({
        name: cf.name,
        type: cf.type,
        contentTypeId: cf.contentTypeId,
        createdAt: cf.createdAt,
        updatedAt: cf.updatedAt,
      })),
      skipDuplicates: true,
    })
  }

  update(id: number, cf: ContentField): Promise<ContentField> {
    return this.db.update({
      where: { id },
      data: {
        name: cf.name,
        updatedAt: cf.updatedAt,
        contentTypeId: cf.contentTypeId,
      },
      include: { contentType: true },
    })
  }

  delete(id: number): Promise<ContentField> {
    return this.db.delete({
      where: { id },
      include: { contentType: true },
    })
  }

  findById(id: number): Promise<ContentField | null> {
    return this.db.findUnique({
      where: { id },
      include: { contentType: true },
    })
  }

  findByIds(ids: number[]): Promise<ContentField[]> {
    return this.db.findMany({
      where: { id: { in: ids } },
      include: { contentType: true },
    })
  }

  findAll(): Promise<ContentField[]> {
    return this.db.findMany({
      include: { contentType: true },
    })
  }

  async existsByName(contentTypeId: number, name: string): Promise<boolean> {
    const res = await this.db.count({
      where: {
        name,
        contentTypeId,
      },
    })
    return res > 0
  }

  async existsById(id: number): Promise<boolean> {
    const res = await this.db.count({ where: { id } })
    return res > 0
  }

  async existsByIds(id: number, contentTypeId: number): Promise<boolean> {
    const res = await this.db.count({ where: { id, contentTypeId } })
    return res > 0
  }

  countAll(): Promise<number> {
    return this.db.count()
  }
}

export { ContentFieldRepository }
