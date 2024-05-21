import Joi from 'joi';

import { IBoardModel } from '../models/IBoardModel.ts';

export const searchValidator: Joi.ObjectSchema<Partial<IBoardModel>> =
  Joi.object({
    _id: Joi.string()
      .pattern(/^[a-fA-F0-9]{24}$/)
      .allow('')
      .messages({
        'string.pattern.base':
          'Board ID must be 24-character hexadecimal string',
      }),
  });

export const boardValidator: Joi.ObjectSchema<Partial<IBoardModel>> =
  Joi.object({
    title: Joi.string().min(2).max(20).required().messages({
      'string.min': 'Title must be min 2 chars',
      'string.max': 'Max length of title is 20 chars',
    }),
  });
