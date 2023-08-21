import { provide } from "inversify-binding-decorators";
import {
  IContentFieldUpdateResponseDTO,
  IContentFieldUpdateRequestDTO,
} from "./content-field-update.dto";
import { ContentFieldRepository } from "@repositories/content-field/content-field.repository"
import { Report, StatusCode } from "@expressots/core"

@provide(ContentFieldUpdateUsecase)
class ContentFieldUpdateUsecase {
  constructor(
    private contentFieldRepository: ContentFieldRepository,
  ) {
  }

  async execute(payload: IContentFieldUpdateRequestDTO): Promise<IContentFieldUpdateResponseDTO | null> {
    const _contentField = await this.contentFieldRepository.findById(payload.id);
    if (!_contentField || _contentField.contentTypeId !== payload.contentTypeId) {
      Report.Error(
        "ContentField not found",
        StatusCode.BadRequest,
        "content-field-update-usecase",
      );
      return null;
    }
    if (payload.name) {
      _contentField.name = payload.name;
    }
    const contentField = await this.contentFieldRepository.update(payload.id, _contentField);
    return { contentField };
  }
}

export { ContentFieldUpdateUsecase };
