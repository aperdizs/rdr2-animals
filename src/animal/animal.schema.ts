import * as mongoose from 'mongoose';

export const AnimalSchema = new mongoose.Schema({
  name: String,
  img: String,
  type: String,
  size: String,
  description: String,
});
