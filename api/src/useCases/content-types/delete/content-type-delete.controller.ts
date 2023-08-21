import { BaseController, StatusCode } from "@expressots/core"
import {
  controller,
  httpDelete,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express"
import { ContentTypeDeleteUsecase } from "./content-type-delete.usecase"

@controller("/content-type")
class ContentTypeDeleteController extends BaseController {
  constructor(private usecase: ContentTypeDeleteUsecase) {
    super("content-type-delete-controller")
  }

  @httpDelete("/:id")
  async execute(
    @requestParam("id") id: string,
    @response() res: Response,
  ): Promise<void> {
    return this.callUseCaseAsync(
      this.usecase.execute(Number(id)),
      res,
      StatusCode.NoContent,
    )
  }
}

export { ContentTypeDeleteController }
