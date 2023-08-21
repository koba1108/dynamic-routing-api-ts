import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import {
  IContentTypeCreateRequestDTO,
  IContentTypeCreateResponseDTO,
} from "./content-type-create.dto";
import { ContentTypeCreateUsecase } from "./content-type-create.usecase";

@controller("/content-type")
class ContentTypeCreateController extends BaseController {
  constructor(private usecase: ContentTypeCreateUsecase) {
    super("create-content-type-controller");
  }

  @httpPost("/")
  async execute(
    @requestBody() payload: IContentTypeCreateRequestDTO,
    @response() res: Response,
  ): Promise<IContentTypeCreateResponseDTO> {
    return this.callUseCaseAsync(
      this.usecase.execute(payload),
      res,
      StatusCode.Created,
    );
  }
}

export { ContentTypeCreateController };
