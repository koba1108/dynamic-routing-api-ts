import { BaseController, StatusCode } from "@expressots/core"
import {
  controller,
  httpPut,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express"
import {
  IContentFieldUpdateRequestDTO,
  IContentFieldUpdateResponseDTO,
} from "./content-field-update.dto"
import { ContentFieldUpdateUsecase } from "./content-field-update.usecase"

@controller("/content-type/:contentTypeId/content-field")
class ContentFieldUpdateController extends BaseController {
  constructor(private usecase: ContentFieldUpdateUsecase) {
    super("content-field-update-controller")
  }

  @httpPut("/:id")
  async execute(
    @requestParam("contentTypeId") contentTypeId: string,
    @requestParam("id") id: string,
    @requestBody() payload: IContentFieldUpdateRequestDTO,
    @response() res: Response,
  ): Promise<IContentFieldUpdateResponseDTO> {
    return this.callUseCaseAsync(
      this.usecase.execute({
        ...payload,
        id: Number(id),
        contentTypeId: Number(contentTypeId),
      }),
      res,
      StatusCode.OK,
    )
  }
}

export { ContentFieldUpdateController }
