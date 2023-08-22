import { provide } from "inversify-binding-decorators"
import { Report, StatusCode } from "@expressots/core"
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"
import { IContentFieldResponseDTO } from "./content-field-find.dto"

@provide(ContentFieldFindUsecase)
class ContentFieldFindUsecase {
  constructor(
    private contentTypeRepository: ContentFieldRepository,
    private contentFieldRepository: ContentFieldRepository,
  ) {}

  async execute(
    contentTypeId: number,
    id: number,
  ): Promise<IContentFieldResponseDTO | null> {
    const exists = await this.contentTypeRepository.existsById(contentTypeId)
    if (!exists) {
      Report.Error(
        "Content Type not found",
        StatusCode.BadRequest,
        "content-field-find-usecase",
      )
      return null
    }
    const contentField = await this.contentFieldRepository.findById(id)
    if (!contentField) {
      Report.Error(
        "ContentField not found",
        StatusCode.BadRequest,
        "content-field-find-usecase",
      )
      return null
    }
    return {
      contentField,
    }
  }
}

export { ContentFieldFindUsecase }
