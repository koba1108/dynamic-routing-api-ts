import { Report, StatusCode } from "@expressots/core"
import { provide } from "inversify-binding-decorators"
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"
import { ContentField } from "@entities/content-field"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"
import {
  IContentFieldCreateResponseDTO,
  IContentFieldCreateRequestDTO,
} from "./content-field-create.dto"

@provide(ContentFieldCreateUsecase)
class ContentFieldCreateUsecase {
  constructor(
    private contentFieldRepository: ContentFieldRepository,
    private contentTypeRepository: ContentTypeRepository,
  ) {}

  async execute(
    payload: IContentFieldCreateRequestDTO,
  ): Promise<IContentFieldCreateResponseDTO | null> {
    const exists = await this.contentTypeRepository.existsById(
      payload.contentTypeId,
    )
    if (!exists) {
      Report.Error(
        "ContentType not found",
        StatusCode.NotFound,
        "create-content-field-usecase",
      )
      return null
    }
    for (const field of payload.fields) {
      const exists = await this.contentFieldRepository.existsByName(
        payload.contentTypeId,
        field.name,
      )
      if (exists) {
        Report.Error(
          "ContentField already exists",
          StatusCode.BadRequest,
          "create-content-field-usecase",
        )
        return null
      }
    }
    const datas = payload.fields.map((field) => {
      return new ContentField(field.name, field.type, payload.contentTypeId)
    })
    await this.contentFieldRepository.createMany(datas)
    const contentType = await this.contentTypeRepository.findById(
      payload.contentTypeId,
    )
    if (!contentType) {
      Report.Error(
        "ContentField not found",
        StatusCode.NotFound,
        "create-content-field-usecase",
      )
      return null
    }
    return { contentType }
  }
}

export { ContentFieldCreateUsecase }
