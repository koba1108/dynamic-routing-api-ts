import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";
import { Response } from "express";
import { IContentFieldFindAllDto } from "./content-field-find-all.dto";
import { ContentFieldFindAllUsecase } from "./content-field-find-all.usecase"
import { ContentFieldsMiddleware } from "@useCases/content-fields/content-fields.middleware"

@controller("/content-type/:contentTypeId/content-field")
class ContentFieldFindAllController extends BaseController {
  constructor(private usecase: ContentFieldFindAllUsecase) {
    super("find-all-content-field-controller");
  }

  @httpGet("/")
  async execute(@response() res: Response): Promise<IContentFieldFindAllDto> {
    return this.callUseCaseAsync(
      this.usecase.execute(),
      res,
      StatusCode.OK,
    );
  }
}

export { ContentFieldFindAllController };
