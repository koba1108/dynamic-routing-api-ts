import { provide } from "inversify-binding-decorators"
import { Report, StatusCode } from "@expressots/core"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"
import { IContentTypeResponseDTO } from "./content-type-find.dto"

@provide(ContentTypeFindUsecase)
class ContentTypeFindUsecase {
  constructor(private contentTypeRepository: ContentTypeRepository) {}

  async execute(id: number): Promise<IContentTypeResponseDTO | null> {
    const contentType = await this.contentTypeRepository.findById(id)
    if (!contentType) {
      Report.Error(
        "ContentType not found",
        StatusCode.BadRequest,
        "content-type-find-usecase",
      )
      return null
    }
    return {
      contentType,
    }
  }
}

export { ContentTypeFindUsecase }
