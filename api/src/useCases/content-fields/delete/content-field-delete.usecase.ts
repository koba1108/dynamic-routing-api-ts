import { Report, StatusCode } from "@expressots/core"
import { provide } from "inversify-binding-decorators"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"

@provide(ContentFieldDeleteUsecase)
class ContentFieldDeleteUsecase {
  constructor(
    private contentTypeRepository: ContentTypeRepository,
    private contentFieldRepository: ContentFieldRepository,
  ) {}

  async execute(contentTypeId: number, id: number): Promise<void> {
    const exists = await this.contentTypeRepository.existsById(contentTypeId)
    if (!exists) {
      Report.Error(
        "ContentType not found",
        StatusCode.BadRequest,
        "content-field-delete-usecase",
      )
      return
    }
    const exists2 = await this.contentFieldRepository.existsById(id)
    if (!exists2) {
      Report.Error(
        "ContentField not found",
        StatusCode.BadRequest,
        "content-field-delete-usecase",
      )
      return
    }
    await this.contentTypeRepository.delete(id)
  }
}

export { ContentFieldDeleteUsecase }
