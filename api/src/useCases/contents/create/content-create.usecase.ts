import { provide } from "inversify-binding-decorators"
import { Report, StatusCode } from "@expressots/core"
import { Content } from "@entities/content.entity"
import { ContentRepository } from "@repositories/content/content.repository"
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"
import { ContentValue } from "@entities/content-value.entity"
import {
  IContentCreateRequestDTO,
  IContentCreateResponseDTO,
} from "./content-create.dto"

@provide(ContentCreateUsecase)
class ContentCreateUsecase {
  constructor(
    private contentRepository: ContentRepository,
    private contentTypeRepository: ContentTypeRepository,
    private contentFieldRepository: ContentFieldRepository,
  ) {}

  async execute(
    payload: IContentCreateRequestDTO,
  ): Promise<IContentCreateResponseDTO | null> {
    const ct = await this.contentTypeRepository.findById(payload.contentTypeId)
    if (!ct) {
      Report.Error(
        "ContentType not found",
        StatusCode.NotFound,
        "create-content-usecase",
      )
      return null
    }
    const fields = await this.contentFieldRepository.findByIds(
      payload.fields.map((f) => f.id),
    )
    const contentValues = fields.map((field) => {
      const params = payload.fields.find((f) => f.id === field.id)
      return new ContentValue(field, params?.value || "")
    })
    const data = new Content(ct, contentValues)
    const content = await this.contentRepository.create(data)
    return { content }
  }
}

export { ContentCreateUsecase }
