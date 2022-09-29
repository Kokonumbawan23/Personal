const Joi = require("joi");

const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  fullName: Joi.string().min(5).required(),
  shortName: Joi.string().min(3).required(),
  jabatan: Joi.string().required(),
}).unknown();

const userUpdateSchema = Joi.object({
  id: Joi.number().integer().required(),
  fullName: Joi.string().min(5).required(),
  shortName: Joi.string().min(3).required(),
  jabatan: Joi.string().required(),
}).unknown();

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown();

module.exports = {
    userCreateSchema,
    userUpdateSchema,
    userLoginSchema,
}