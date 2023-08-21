import { provide } from "inversify-binding-decorators"
import { IContentFieldResponseDTO } from "./content-field-find.dto"
import { Report, StatusCode } from "@expressots/core"
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"

@provide(ContentFieldFindUsecase)
class ContentFieldFindUsecase {
  constructor(private contentFieldRepository: ContentFieldRepository) {
  }

  async execute(id: number): Promise<IContentFieldResponseDTO | null> {
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
