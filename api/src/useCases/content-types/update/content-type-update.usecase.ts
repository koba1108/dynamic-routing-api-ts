import { Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import {
  IContentTypeUpdateResponseDTO,
  IContentTypeUpdateRequestDTO,
} from "./content-type-update.dto";
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"

@provide(ContentTypeUpdateUsecase)
class ContentTypeUpdateUsecase {
  constructor(
    private contentTypeRepository: ContentTypeRepository,
    private contentFieldRepository: ContentFieldRepository,
  ) {
  }

  async execute(payload: IContentTypeUpdateRequestDTO): Promise<IContentTypeUpdateResponseDTO | null> {
    const _contentType = await this.contentTypeRepository.findById(payload.id);
    if (!_contentType) {
      Report.Error(
        "ContentType not found",
        StatusCode.BadRequest,
        "content-type-update-usecase",
      );
      return null;
    }
    if (payload.name) {
      _contentType.name = payload.name;
    }
    console.log('payload.fieldIds', payload.fieldIds)
    if (payload.fieldIds) {
      _contentType.fields = await this.contentFieldRepository.findByIds(payload.fieldIds);
      console.log('_contentType.fields', _contentType.fields)
    }
    const contentType = await this.contentTypeRepository.update(payload.id, _contentType);
    return { contentType };
  }
}

export { ContentTypeUpdateUsecase };
