import { provide } from "inversify-binding-decorators"
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"
import { Report, StatusCode } from "@expressots/core"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"
import {
  IContentFieldUpdateResponseDTO,
  IContentFieldUpdateRequestDTO,
} from "./content-field-update.dto"

@provide(ContentFieldUpdateUsecase)
class ContentFieldUpdateUsecase {
  constructor(
    private contentTypeRepository: ContentTypeRepository,
    private contentFieldRepository: ContentFieldRepository,
  ) {}

  async execute(
    payload: IContentFieldUpdateRequestDTO,
  ): Promise<IContentFieldUpdateResponseDTO | null> {
    const exists = await this.contentTypeRepository.existsById(
      payload.contentTypeId,
    )
    if (!exists) {
      Report.Error(
        "ContentType not found",
        StatusCode.BadRequest,
        "content-field-update-usecase",
      )
      return null
    }
    const cf = await this.contentFieldRepository.findById(payload.id)
    if (!cf || cf.contentTypeId !== payload.contentTypeId) {
      Report.Error(
        "ContentField not found",
        StatusCode.BadRequest,
        "content-field-update-usecase",
      )
      return null
    }
    if (payload.name) {
      cf.name = payload.name
    }
    const contentField = await this.contentFieldRepository.update(
      payload.id,
      cf,
    )
    return { contentField }
  }
}

export { ContentFieldUpdateUsecase }
