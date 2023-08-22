import { provideSingleton } from "@expressots/core"
import { Prisma, PrismaClient } from "@prisma/client"
import { sqltag } from "@prisma/client/runtime/library"
import ENV from "../../env"

type TableName = "users" | "contentTypes" | "contentFields"

interface NextVal {
  nextval: number
}

@provideSingleton(PrismaProvider)
class PrismaProvider {
  protected readonly client: PrismaClient = new PrismaClient({
    log: ["query", "info", "warn", "error"],
    datasources: {
      db: { url: ENV.Postgres.DATABASE_URL },
    },
  })

  setMiddleware(middlewares: Prisma.Middleware[] = []) {
    for (const middleware of middlewares) {
      this.client.$use(middleware)
    }
  }

  async nextVal(tableName: TableName): Promise<number> {
    const upperTableName =
      tableName.charAt(0).toUpperCase() + tableName.slice(1)
    const query = `SELECT nextval('${upperTableName}_id_seq')`
    const [res] = await this.client.$queryRaw<[NextVal]>(sqltag([query]))
    return res.nextval
  }

  get $transaction() {
    return this.client.$transaction
  }

  users() {
    return this.client.users
  }

  contentTypes() {
    return this.client.contentTypes
  }

  contentFields() {
    return this.client.contentFields
  }
}

export { PrismaProvider }
