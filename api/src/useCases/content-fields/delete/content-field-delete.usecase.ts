import { Report, StatusCode } from "@expressots/core"
import { provide } from "inversify-binding-decorators"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"

@provide(ContentFieldDeleteUsecase)
class ContentFieldDeleteUsecase {
  constructor(private contentTypeRepository: ContentTypeRepository) {
  }

  async execute(id: number): Promise<void> {
    const exists = await this.contentTypeRepository.existsById(id)
    if (!exists) {
      Report.Error(
        "ContentType not found",
        StatusCode.BadRequest,
        "content-field-delete-usecase",
      )
    }
    await this.contentTypeRepository.delete(id)
  }
}

export { ContentFieldDeleteUsecase }
