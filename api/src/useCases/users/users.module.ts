import { CreateModule } from "@expressots/core"
import { UserFindAllController } from "@useCases/users/find-all/user-find-all.controller"
import { UserCreateController } from "./create/user-create.controller"
import { UserDeleteController } from "./delete/user-delete.controller"
import { UserUpdateController } from "./update/user-update.controller"
import { UserFindController } from "./find/user-find.controller"

const UsersModule = CreateModule([
  UserCreateController,
  UserDeleteController,
  UserUpdateController,
  UserFindController,
  UserFindAllController,
])

export { UsersModule }
