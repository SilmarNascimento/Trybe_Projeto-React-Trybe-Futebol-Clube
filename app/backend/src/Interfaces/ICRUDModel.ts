export interface ICRUDModelCreator<Type> {
  create(data: Partial<Type>): Promise<Type>
}

export interface ICRUDModelReaderAll<Type> {
  findAll(): Promise<Type[]>;
}

export interface ICRUDModelReaderById<Type> {
  findById(id: number): Promise<Type | null>;
}

export interface ICRUDModelReaderByQuery<Type> {
  findByQuery(query?: string): Promise<Type[]>;
}

export interface ICRUDModelUpdater<Type> {
  update(id: number, data: Partial<Type>): Promise<Type | null>;
}

export interface ICRUDModelDeleter {
  delete(id: number): Promise<number>;
}

export interface ICRUDModelReader<Type> extends
  ICRUDModelReaderAll<Type>,
  ICRUDModelReaderById<Type> {}

export interface ICRUDModel<Type> extends
  ICRUDModelCreator<Type>,
  ICRUDModelReader<Type>,
  ICRUDModelUpdater<Type>,
  ICRUDModelDeleter {}
