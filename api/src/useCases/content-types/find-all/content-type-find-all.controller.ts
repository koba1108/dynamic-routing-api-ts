import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";
import { Response } from "express";
import { IContentTypeFindAllDto } from "./content-type-find-all.dto";
import { ContentTypeFindAllUsecase } from "./content-type-find-all.usecase"

@controller("/content-type")
class ContentTypeFindAllController extends BaseController {
  constructor(private usecase: ContentTypeFindAllUsecase) {
    super("find-all-content-type-controller");
  }

  @httpGet("/")
  async execute(@response() res: Response): Promise<IContentTypeFindAllDto> {
    return this.callUseCaseAsync(
      this.usecase.execute(),
      res,
      StatusCode.OK,
    );
  }
}

export { ContentTypeFindAllController };
