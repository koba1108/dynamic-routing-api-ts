import { BaseController, StatusCode } from "@expressots/core"
import { controller, httpGet, response } from "inversify-express-utils"
import { Response } from "express"
import { IFindAllUserResponseDTO } from "./user-find-all.dto"
import { FindAllUserUseCase } from "./user-find-all.usecase"

@controller("/users")
class UserFindAllController extends BaseController {
  constructor(private usecase: FindAllUserUseCase) {
    super("find-all-user-controller")
  }

  @httpGet("/")
  async execute(@response() res: Response): Promise<IFindAllUserResponseDTO> {
    return this.callUseCaseAsync(this.usecase.execute(), res, StatusCode.OK)
  }
}

export { UserFindAllController }
