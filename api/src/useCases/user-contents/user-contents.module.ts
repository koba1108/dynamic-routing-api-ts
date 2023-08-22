import { CreateModule } from "@expressots/core"
import { UserContentFindController } from "@useCases/user-contents/find/user-content-find.controller"

const UserContentsModule = CreateModule([UserContentFindController])

export { UserContentsModule }
