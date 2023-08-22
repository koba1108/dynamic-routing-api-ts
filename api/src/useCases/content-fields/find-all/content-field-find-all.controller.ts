import { BaseController, StatusCode } from "@expressots/core"
import {
  controller,
  httpGet,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express"
import { IContentFieldFindAllDto } from "./content-field-find-all.dto"
import { ContentFieldFindAllUsecase } from "./content-field-find-all.usecase"

@controller("/content-type/:contentTypeId/content-field")
class ContentFieldFindAllController extends BaseController {
  constructor(private usecase: ContentFieldFindAllUsecase) {
    super("find-all-content-field-controller")
  }

  @httpGet("/")
  async execute(
    @requestParam("contentTypeId") contentTypeId: string,
    @response() res: Response,
  ): Promise<IContentFieldFindAllDto> {
    return this.callUseCaseAsync(
      this.usecase.execute(Number(contentTypeId)),
      res,
      StatusCode.OK,
    )
  }
}

export { ContentFieldFindAllController }
