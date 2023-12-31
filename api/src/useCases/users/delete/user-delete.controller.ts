import { BaseController, StatusCode } from "@expressots/core"
import {
  controller,
  httpDelete,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express"
import { UserDeleteUseCase } from "./user-delete.usecase"

@controller("/users")
class UserDeleteController extends BaseController {
  constructor(private usecase: UserDeleteUseCase) {
    super("user-delete-controller")
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

export { UserDeleteController }
