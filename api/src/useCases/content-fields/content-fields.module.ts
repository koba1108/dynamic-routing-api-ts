import { CreateModule } from "@expressots/core"
import { ContentFieldCreateController } from "@useCases/content-fields/create/content-field-create.controller"
import { ContentFieldDeleteController } from "@useCases/content-fields/delete/content-field-delete.controller"
import { ContentFieldUpdateController } from "@useCases/content-fields/update/content-field-update.controller"
import { ContentFieldFindController } from "@useCases/content-fields/find/content-field-find.controller"
import { ContentFieldFindAllController } from "@useCases/content-fields/find-all/content-field-find-all.controller"

const ContentFieldsModule = CreateModule([
  ContentFieldCreateController,
  ContentFieldDeleteController,
  ContentFieldUpdateController,
  ContentFieldFindController,
  ContentFieldFindAllController,
])

export { ContentFieldsModule }
