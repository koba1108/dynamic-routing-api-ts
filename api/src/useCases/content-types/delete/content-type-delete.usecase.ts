import { Report, StatusCode } from "@expressots/core"
import { provide } from "inversify-binding-decorators"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"

@provide(ContentTypeDeleteUsecase)
class ContentTypeDeleteUsecase {
  constructor(private contentTypeRepository: ContentTypeRepository) {
  }

  async execute(id: number): Promise<void> {
    const exists = await this.contentTypeRepository.existsById(id)
    if (!exists) {
      Report.Error(
        "ContentType not found",
        StatusCode.BadRequest,
        "content-type-delete-usecase",
      )
    }
    await this.contentTypeRepository.delete(id)
  }
}

export { ContentTypeDeleteUsecase }
