import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestParam,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { IContentTypeResponseDTO } from "./content-type-find.dto";
import { ContentTypeFindUsecase } from "./content-type-find.usecase";

@controller("/content-type")
class ContentTypeFindController extends BaseController {
  constructor(private usecase: ContentTypeFindUsecase) {
    super("content-type-find-controller");
  }

  @httpGet("/:id")
  async execute(
    @requestParam("id") id: string,
    @response() res: Response,
  ): Promise<IContentTypeResponseDTO> {
    return this.callUseCaseAsync(
      this.usecase.execute(Number(id)),
      res,
      StatusCode.OK,
    );
  }
}

export { ContentTypeFindController };
