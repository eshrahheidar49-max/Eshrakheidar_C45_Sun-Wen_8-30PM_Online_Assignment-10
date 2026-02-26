import { model, SchemaTypeOptions } from "mongoose";

export const create = async ({ model, data } = {}) => {
  return await model.create(data);
};

export const findOne = async ({ model, filter= {}, options= {},select="" } = {}) => {
 const doc=  model.findOne(filter, null,options).select(select);
 return await doc.exec()
};
export const findByIdAndUpdate = async ({
  model,
  filter= {},
  updates= {},
  options= {},
} = {}) => {
 return await model.findByIdAndUpdate(filter, updates, {runValidators:true, ...options});
};
export const findByIdAndDelete = async ({
  model,
  filter= {},
  options= {},
} = {}) => {
 return await model.findByIdAndDelete(filter, {new:true,...options});
};

export const findById=async({model,filter={},options={}}={})=>{
 return await model.findById(filter,options)
}