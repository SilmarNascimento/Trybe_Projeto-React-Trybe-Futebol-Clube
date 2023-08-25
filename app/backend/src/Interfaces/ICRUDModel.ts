export interface ICRUDModelCreator<Type> {
  create(data: Partial<Type>): Promise<Type>
}

export interface ICRUDModelReader<Type> {
  findAll(): Promise<Type[]>;
  findById(id: number): Promise<Type | null>;
}

export interface ICRUDModelUpdater<Type> {
  update(id: number, data: Partial<Type>): Promise<Type | null>;
}

export interface ICRUDModelDeleter {
  delete(id: number): Promise<number>;
}

export interface ICRUDModel<Type> extends
  ICRUDModelCreator<Type>,
  ICRUDModelReader<Type>,
  ICRUDModelUpdater<Type>,
  ICRUDModelDeleter {}
