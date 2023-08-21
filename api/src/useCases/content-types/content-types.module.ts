import { CreateModule } from "@expressots/core"
import { ContentTypeFindAllController } from "@useCases/content-types/find-all/content-type-find-all.controller"
import { ContentTypeUpdateController } from "@useCases/content-types/update/content-type-update.controller"
import { ContentTypeFindController } from "@useCases/content-types/find/content-type-find.controller"
import { ContentTypeDeleteController } from "@useCases/content-types/delete/content-type-delete.controller"
import { ContentTypeCreateController } from "@useCases/content-types/create/content-type-create.controller"

const ContentTypesModule = CreateModule([
  ContentTypeCreateController,
  ContentTypeDeleteController,
  ContentTypeUpdateController,
  ContentTypeFindController,
  ContentTypeFindAllController,
])

export { ContentTypesModule }
