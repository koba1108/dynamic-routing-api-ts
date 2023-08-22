import { provide } from "inversify-binding-decorators"
import { BaseRepository } from "@repositories/base-repository"
import { Content } from "@entities/content.entity"

@provide(ContentRepository)
class ContentRepository extends BaseRepository<Content> {
  get db() {
    return this.prisma.contents()
  }

  nextVal(): Promise<number> {
    return this.prisma.nextVal("contents")
  }

  create(c: Content): Promise<Content> {
    return this.db.create({
      data: {
        contentTypeId: c.contentTypeId,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        contentValues: {
          create: c.contentValues?.map((cv) => ({
            fieldId: cv.fieldId,
            value: cv.value,
            createdAt: cv.createdAt,
            updatedAt: cv.updatedAt,
          })),
        },
      },
      include: {
        contentType: true,
        contentValues: true,
      },
    })
  }

  createMany(cs: Content[]): Promise<{ count: number }> {
    return this.db.createMany({
      data: cs.map((c) => ({
        contentTypeId: c.contentTypeId,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      })),
      skipDuplicates: true,
    })
  }

  update(id: number, c: Content): Promise<Content> {
    return this.db.update({
      where: { id },
      data: {
        contentTypeId: c.contentTypeId,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      },
      include: {
        contentType: true,
        contentValues: true,
      },
    })
  }

  delete(id: number): Promise<Content> {
    return this.db.delete({
      where: { id },
      include: {
        contentType: true,
        contentValues: true,
      },
    })
  }

  findById(id: number): Promise<Content | null> {
    return this.db.findUnique({
      where: { id },
      include: {
        contentType: true,
        contentValues: true,
      },
    })
  }

  findByIds(id: number, contentTypeId: number): Promise<Content | null> {
    return this.db.findUnique({
      where: { id, contentTypeId },
      include: {
        contentType: true,
        contentValues: true,
      },
    })
  }

  findByIdList(ids: number[]): Promise<Content[]> {
    return this.db.findMany({
      where: { id: { in: ids } },
      include: {
        contentType: true,
        contentValues: true,
      },
    })
  }

  findAll(): Promise<Content[]> {
    return this.db.findMany({
      include: {
        contentType: true,
        contentValues: true,
      },
    })
  }

  async existsById(id: number): Promise<boolean> {
    const res = await this.db.count({ where: { id } })
    return res > 0
  }

  countAll(): Promise<number> {
    return this.db.count()
  }
}

export { ContentRepository }
