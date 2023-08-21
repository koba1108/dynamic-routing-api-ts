import { BaseController, StatusCode } from "@expressots/core"
import {
  controller,
  httpDelete,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express"
import { ContentFieldDeleteUsecase } from "./content-field-delete.usecase"
import { ContentFieldsMiddleware } from "@useCases/content-fields/content-fields.middleware"

@controller("/content-type/:contentTypeId/content-field")
class ContentFieldDeleteController extends BaseController {
  constructor(private usecase: ContentFieldDeleteUsecase) {
    super("content-field-delete-controller")
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

export { ContentFieldDeleteController }
