import { BaseController, StatusCode } from "@expressots/core"
import {
  controller,
  httpGet,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express"
import { IContentFieldResponseDTO } from "./content-field-find.dto"
import { ContentFieldFindUsecase } from "./content-field-find.usecase"

@controller("/content-type/:contentTypeId/content-field")
class ContentFieldFindController extends BaseController {
  constructor(private usecase: ContentFieldFindUsecase) {
    super("content-field-find-controller")
  }

  @httpGet("/:id")
  async execute(
    @requestParam("contentTypeId") contentTypeId: string,
    @requestParam("id") id: string,
    @response() res: Response,
  ): Promise<IContentFieldResponseDTO> {
    return this.callUseCaseAsync(
      this.usecase.execute(Number(contentTypeId), Number(id)),
      res,
      StatusCode.OK,
    )
  }
}

export { ContentFieldFindController }
