import { UserRepository } from "@repositories/user/user.repository"
import { provide } from "inversify-binding-decorators"
import { Report, StatusCode } from "@expressots/core"
import { ContentRepository } from "@repositories/content/content.repository"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"
import { ContentField } from "@entities/content-field.entity"
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"
import {
  ContentData,
  IUserContentFindRequestDTO,
  IUserContentFindResponseDTO,
} from "./user-content-find.dto"

@provide(UserContentFindUsecase)
class UserContentFindUsecase {
  private readonly name = "user-content-find-usecase"

  constructor(
    private userRepository: UserRepository,
    private contentRepository: ContentRepository,
    private contentTypeRepository: ContentTypeRepository,
    private contentFieldRepository: ContentFieldRepository,
  ) {}

  async execute(
    payload: IUserContentFindRequestDTO,
  ): Promise<IUserContentFindResponseDTO | null> {
    const user = await this.userRepository.findById(payload.id)
    if (!user || !user.id) {
      Report.Error("User not found", StatusCode.BadRequest, this.name)
      return null
    }
    const ct = await this.contentTypeRepository.findByUserIdAndName(
      user.id,
      payload.contentTypeName,
    )
    if (!ct || !ct.id) {
      Report.Error("Content type not found", StatusCode.BadRequest, this.name)
      return null
    }
    const c = await this.contentRepository.findByIds(ct.id, payload.id)
    if (!c || !c.id) {
      Report.Error("Content not found", StatusCode.BadRequest, this.name)
      return null
    }
    const filedIds: number[] = []
    ct.fields?.forEach((f: ContentField) => {
      if (f.id) {
        filedIds.push(f.id)
      }
    })
    const data: ContentData = {}
    const contentFields = await this.contentFieldRepository.findByIds(filedIds)
    c.contentValues?.forEach((cv) => {
      const field = contentFields.find((cf) => cf.id === cv.fieldId)
      if (field) {
        data[field.name] = cv.value
      }
    })
    return {
      id: c.id,
      type: ct.name,
      data,
    }
  }
}

export { UserContentFindUsecase }
