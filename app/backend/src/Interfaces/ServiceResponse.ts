export type ServiceMessage = { message: string };

type ServiceResponseErrorType =
  'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT' | 'UNPROCESSABLE_CONTENT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage,
};

export type ServiceResponseSuccess<Type> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: Type,
};

export type ServiceResponse<Type> = ServiceResponseError | ServiceResponseSuccess<Type>;
