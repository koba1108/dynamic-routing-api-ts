import { Report, StatusCode } from "@expressots/core"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"
import { provide } from "inversify-binding-decorators"
import { ContentType } from "@entities/content-type"
import { ContentField } from "@entities/content-field"
import {
  IContentTypeCreateResponseDTO,
  IContentTypeCreateRequestDTO,
} from "./content-type-create.dto"

@provide(ContentTypeCreateUsecase)
class ContentTypeCreateUsecase {
  constructor(private contentTypeRepository: ContentTypeRepository) {}

  async execute(
    payload: IContentTypeCreateRequestDTO,
  ): Promise<IContentTypeCreateResponseDTO | null> {
    const exist = await this.contentTypeRepository.existsByName(payload.name)
    if (exist) {
      Report.Error(
        "ContentType already exists",
        StatusCode.BadRequest,
        "create-content-type-usecase",
      )
      return null
    }
    const fields = payload.fields.map((field) => {
      return new ContentField(field.name, field.type)
    })
    const data = new ContentType(payload.name, fields)
    const contentType = await this.contentTypeRepository.create(data)
    return { contentType }
  }
}

export { ContentTypeCreateUsecase }
