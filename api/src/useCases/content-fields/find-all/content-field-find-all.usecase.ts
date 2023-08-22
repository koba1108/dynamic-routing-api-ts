import { provide } from "inversify-binding-decorators"
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"
import { Report, StatusCode } from "@expressots/core"
import { IContentFieldFindAllDto } from "./content-field-find-all.dto"

@provide(ContentFieldFindAllUsecase)
class ContentFieldFindAllUsecase {
  constructor(
    private contentFieldRepository: ContentFieldRepository,
    private contentTypeRepository: ContentTypeRepository,
  ) {}

  async execute(contentTypeId: number): Promise<IContentFieldFindAllDto> {
    const exists = await this.contentTypeRepository.existsById(contentTypeId)
    if (!exists) {
      Report.Error(
        "Content type not found",
        StatusCode.BadRequest,
        "content-field-find-all-usecase",
      )
    }
    const [contentFields, total] = await Promise.all([
      this.contentFieldRepository.findAll(),
      this.contentFieldRepository.countAll(),
    ])
    return { contentFields, total }
  }
}

export { ContentFieldFindAllUsecase }
