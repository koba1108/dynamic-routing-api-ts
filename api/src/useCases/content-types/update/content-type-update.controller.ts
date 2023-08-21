import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPut,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express";
import {
  IContentTypeUpdateRequestDTO,
  IContentTypeUpdateResponseDTO,
} from "./content-type-update.dto";
import { ContentTypeUpdateUsecase } from "./content-type-update.usecase";

@controller("/content-type")
class ContentTypeUpdateController extends BaseController {
  constructor(private usecase: ContentTypeUpdateUsecase) {
    super("content-type-update-controller");
  }

  @httpPut("/:id")
  async execute(
    @requestParam("id") id: string,
    @requestBody() payload: IContentTypeUpdateRequestDTO,
    @response() res: Response,
  ): Promise<IContentTypeUpdateResponseDTO> {
    return this.callUseCaseAsync(
      this.usecase.execute({ ...payload, id: Number(id) }),
      res,
      StatusCode.OK,
    );
  }
}

export { ContentTypeUpdateController };
