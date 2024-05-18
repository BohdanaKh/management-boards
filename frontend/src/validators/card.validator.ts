import Joi from "joi";
import {ICardModel} from "../models/ICardModel.ts";

export const cardValidator: Joi.ObjectSchema<Partial<ICardModel>> =
    Joi
        .object({
            name: Joi.string().min(1).max(20).required().messages({
                'string.min': 'Card name must be min 1 chars',
                'string.max': `Max length of card's name is 20 chars`,
            }),
            description: Joi.string().min(3).max(100).required().messages({
                'string.min': 'Card description must be min 1 char',
                'string.max': 'Max length of description is 100 chars',
            })
        })