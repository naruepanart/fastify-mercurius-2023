const { ObjectId } = require("mongodb");
const { z } = require("zod");
const repositoryDB = require("../../repository/mongodb");

const find = async (input) => {
  const schema = z.object({
    limit: z.number().max(10).default(10),
    skip: z.number().default(0),
  });
  const dto = schema.parse(input);

  const databaseDefault = {
    dbName: "abc",
    collectionName: "users",
  };
  const inputSkipLimitDTO = {
    skip: dto.skip,
    limit: dto.limit,
  };
  const result = await repositoryDB.find(databaseDefault, inputSkipLimitDTO);
  return result;
};
const findOne = async (input) => {
  const schema = z.object({
    _id: z.string(),
  });
  const dto = schema.parse(input);

  const databaseDefault = {
    dbName: "abc",
    collectionName: "users",
  };
  const inputId = {
    _id: new ObjectId(dto._id),
  };
  const result = await repositoryDB.findOne(databaseDefault, inputId);
  if (result.status_code === 1) {
    return { status_code: result.status_code, message: result.message };
  }
  return result;
};
const create = async (input) => {
  const schema = z.object({
    name: z.string().trim(),
    email: z.string().email().trim(),
    password: z.string().trim().default("123456"),
    is_admin: z.boolean().default(false),
    created_at: z.date().default(new Date()),
    updated_at: z.date().default(new Date()),
  });
  const dto = schema.parse(input);

  const databaseDefault = {
    dbName: "abc",
    collectionName: "users",
  };
  const inputDTO = {
    email: dto.email,
  };
  const result = await repositoryDB.create(databaseDefault, inputDTO, dto);
  if (result.status_code === 1) {
    return { status_code: result.status_code, message: result.message };
  }
  return result;
};
const update = async (input) => {
  const schema = z.object({
    _id: z.string(),
    name: z.string(),
  });
  const dto = schema.parse(input);

  const databaseDefault = {
    dbName: "abc",
    collectionName: "users",
  };
  const inputDTO = { _id: new ObjectId(dto._id) };
  const inputEditDTO = {
    name: dto.name,
  };
  const result = await repositoryDB.update(databaseDefault, inputDTO, inputEditDTO);
  if (result.status_code === 1) {
    return { status_code: result.status_code, message: result.message };
  }
  return result;
};
const remove = async (input) => {
  const schema = z.object({
    _id: z.string(),
  });
  const dto = schema.parse(input);

  const databaseDefault = {
    dbName: "abc",
    collectionName: "users",
  };
  const inputDTO = { _id: new ObjectId(dto._id) };
  const result = await repositoryDB.remove(databaseDefault, inputDTO);
  if (result.status_code === 1) {
    return { status_code: result.status_code, message: result.message };
  }
  return result;
};

module.exports = { find, findOne, create, update, remove };
