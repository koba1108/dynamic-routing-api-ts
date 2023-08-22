import { BaseController, StatusCode } from "@expressots/core"
import {
  controller,
  httpPost,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express"
import {
  IContentFieldCreateRequestDTO,
  IContentFieldCreateResponseDTO,
} from "./content-field-create.dto"
import { ContentFieldCreateUsecase } from "./content-field-create.usecase"

@controller("/content-type/:contentTypeId/content-field")
class ContentFieldCreateController extends BaseController {
  constructor(private usecase: ContentFieldCreateUsecase) {
    super("create-content-field-controller")
  }

  @httpPost("/")
  async execute(
    @requestParam("contentTypeId") contentTypeId: string,
    @requestBody() payload: IContentFieldCreateRequestDTO,
    @response() res: Response,
  ): Promise<IContentFieldCreateResponseDTO> {
    return this.callUseCaseAsync(
      this.usecase.execute({
        ...payload,
        contentTypeId: Number(contentTypeId),
      }),
      res,
      StatusCode.Created,
    )
  }
}

export { ContentFieldCreateController }
