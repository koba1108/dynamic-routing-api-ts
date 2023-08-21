import { provide } from "inversify-binding-decorators"
import { IContentFieldFindAllDto } from "./content-field-find-all.dto"
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"

@provide(ContentFieldFindAllUsecase)
class ContentFieldFindAllUsecase {
  constructor(private contentFieldRepository: ContentFieldRepository) {
  }

  async execute(): Promise<IContentFieldFindAllDto> {
    try {
      const [contentFields, total] = await Promise.all([
        this.contentFieldRepository.findAll(),
        this.contentFieldRepository.countAll(),
      ])
      return { contentFields, total }
    } catch (error: any) {
      throw error
    }
  }
}

export { ContentFieldFindAllUsecase }
