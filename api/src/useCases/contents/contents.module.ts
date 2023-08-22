import { CreateModule } from "@expressots/core"
import { ContentCreateController } from "@useCases/contents/create/content-create.controller"

const ContentsModule = CreateModule([ContentCreateController])

export { ContentsModule }
