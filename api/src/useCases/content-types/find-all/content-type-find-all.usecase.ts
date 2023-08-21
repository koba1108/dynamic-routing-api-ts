import { provide } from "inversify-binding-decorators"
import { IContentTypeFindAllDto } from "./content-type-find-all.dto"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"

@provide(ContentTypeFindAllUsecase)
class ContentTypeFindAllUsecase {
  constructor(private contentTypeRepository: ContentTypeRepository) {
  }

  async execute(): Promise<IContentTypeFindAllDto> {
    try {
      const [contentTypes, total] = await Promise.all([
        this.contentTypeRepository.findAll(),
        this.contentTypeRepository.countAll(),
      ])
      return { contentTypes, total }
    } catch (error: any) {
      throw error
    }
  }
}

export { ContentTypeFindAllUsecase }
