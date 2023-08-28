import * as Joi from 'joi';

const regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const defaultErrorMessage = 'Invalid email or password';

export const emailSchema = Joi
  .string()
  .regex(regexEmail)
  .required()
  .messages({
    'string.pattern.base': defaultErrorMessage,
    'any.required': defaultErrorMessage,
  });

export const passwordSchema = Joi
  .string()
  .min(6)
  .required()
  .messages({
    'string.pattern.base': defaultErrorMessage,
    'any.required': defaultErrorMessage,
    'string.min': defaultErrorMessage,
  });

export const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});
