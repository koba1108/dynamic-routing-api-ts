import { Report, StatusCode } from "@expressots/core"
import { provide } from "inversify-binding-decorators"
import {
  IContentFieldCreateResponseDTO,
  IContentFieldCreateRequestDTO,
} from "./content-field-create.dto"
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"
import { ContentField } from "@entities/content-field"

@provide(ContentFieldCreateUsecase)
class ContentFieldCreateUsecase {
  constructor(private contentFieldRepository: ContentFieldRepository) {
  }

  async execute(payload: IContentFieldCreateRequestDTO): Promise<IContentFieldCreateResponseDTO | null> {
    const exists = await this.contentFieldRepository.existsByName(payload.contentTypeId, payload.name)
    if (exists) {
      Report.Error(
        "ContentField already exists",
        StatusCode.BadRequest,
        "create-content-field-usecase",
      )
      return null
    }
    const data = new ContentField(payload.name, payload.type, payload.contentTypeId)
    const contentField = await this.contentFieldRepository.create(data)
    return { contentField }
  }
}

export { ContentFieldCreateUsecase }
