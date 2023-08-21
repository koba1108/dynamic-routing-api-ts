import { NextFunction } from "express-serve-static-core"
import { Report, StatusCode } from "@expressots/core"
import { ContentTypeRepository } from "@repositories/content-type/content-type.repository"
import { provide } from "inversify-binding-decorators"
import { next, requestParam } from "inversify-express-utils"

@provide(ContentFieldsMiddleware)
class ContentFieldsMiddleware {
  constructor(private contentTypeRepository: ContentTypeRepository) {
  }

  async execute(
    @requestParam("contentTypeId") contentTypeId: string,
    @next() _next: NextFunction,
  ) {
    try {
      const contentType = await this.contentTypeRepository.findById(Number(contentTypeId))
      if (!contentType) {
        Report.Error(
          "ContentType not found",
          StatusCode.NotFound,
          "content-type-exists-middleware",
        )
        return
      }
      _next()
    } catch (err) {
      console.error({ err })
    }
  }
}

export { ContentFieldsMiddleware }
