import { provide } from "inversify-binding-decorators"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"
import { IContentTypeFindAllDto } from "./content-type-find-all.dto"

@provide(ContentTypeFindAllUsecase)
class ContentTypeFindAllUsecase {
  constructor(private contentTypeRepository: ContentTypeRepository) {}

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
