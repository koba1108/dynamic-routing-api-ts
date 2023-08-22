import { provide } from "inversify-binding-decorators"
import { BaseRepository } from "@repositories/base-repository"
import { ContentValue } from "@entities/content-value.entity"

@provide(ContentValueRepository)
class ContentValueRepository extends BaseRepository<ContentValue> {
  get db() {
    return this.prisma.contentValues()
  }

  nextVal(): Promise<number> {
    return this.prisma.nextVal("contentValues")
  }

  create(cv: ContentValue): Promise<ContentValue> {
    return this.db.create({
      data: {
        contentId: cv.contentId,
        fieldId: cv.fieldId,
        value: cv.value,
        createdAt: cv.createdAt,
        updatedAt: cv.updatedAt,
      },
      include: {
        content: true,
        field: true,
      },
    })
  }

  createMany(cvs: ContentValue[]): Promise<{ count: number }> {
    return this.db.createMany({
      data: cvs.map((cv) => ({
        contentId: cv.contentId,
        fieldId: cv.fieldId,
        value: cv.value,
        createdAt: cv.createdAt,
        updatedAt: cv.updatedAt,
      })),
      skipDuplicates: true,
    })
  }

  update(id: number, cv: ContentValue): Promise<ContentValue> {
    return this.db.update({
      where: { id },
      data: {
        contentId: cv.contentId,
        fieldId: cv.fieldId,
        value: cv.value,
        createdAt: cv.createdAt,
        updatedAt: cv.updatedAt,
      },
      include: {
        content: true,
        field: true,
      },
    })
  }

  delete(id: number): Promise<ContentValue> {
    return this.db.delete({
      where: { id },
      include: {
        content: true,
        field: true,
      },
    })
  }

  findById(id: number): Promise<ContentValue | null> {
    return this.db.findUnique({
      where: { id },
      include: {
        content: true,
        field: true,
      },
    })
  }

  findByIds(ids: number[]): Promise<ContentValue[]> {
    return this.db.findMany({
      where: { id: { in: ids } },
      include: {
        content: true,
        field: true,
      },
    })
  }

  findAll(): Promise<ContentValue[]> {
    return this.db.findMany({
      include: {
        content: true,
        field: true,
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

export { ContentValueRepository }
