import { inject } from "inversify"
import { provide } from "inversify-binding-decorators"
import { IBaseRepository } from "./base-repository.interface"
import { IEntity } from "@entities/base.entity"
import { PrismaProvider } from "@providers/prisma/prisma.provider"
import { RedisProvider } from "@providers/redis/redis.provider"
import { redisCacheMiddleware } from "@providers/prisma/prisma.middleware"

@provide(BaseRepository)
class BaseRepository<T extends IEntity> implements IBaseRepository<T> {
  @inject(RedisProvider) private _redis!: RedisProvider
  @inject(PrismaProvider) private _prisma!: PrismaProvider

  private _initiated = false

  protected get prisma() {
    if (!this._initiated) {
      this.setRedisCacheMiddleware()
    }
    return this._prisma
  }

  protected get redis() {
    return this._redis
  }

  setRedisCacheMiddleware() {
    this._initiated = true
    const redisCache = redisCacheMiddleware(this.redis.client())
    this.prisma.setMiddleware([redisCache])
  }
}

export { BaseRepository }
