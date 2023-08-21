interface IEntity {
  id: number | undefined;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export { IEntity };
