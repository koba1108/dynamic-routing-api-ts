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
  IContentCreateRequestDTO,
  IContentCreateResponseDTO,
} from "./content-create.dto"
import { ContentCreateUsecase } from "./content-create.usecase"

@controller("/content-type/:contentTypeId/contents")
class ContentCreateController extends BaseController {
  constructor(private usecase: ContentCreateUsecase) {
    super("create-content-controller")
  }

  @httpPost("/")
  async execute(
    @requestParam("contentTypeId") contentTypeId: string,
    @requestBody() payload: IContentCreateRequestDTO,
    @response() res: Response,
  ): Promise<IContentCreateResponseDTO> {
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

export { ContentCreateController }
