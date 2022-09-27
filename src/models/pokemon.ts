import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const PokemonSchema = new Schema({
  uniqueId: {
    type: String,
    default: uuidv4(),
  },
  name: {
    type: String,
    required: "Enter name",
  },
  trainer: {
    type: String,
    required: "Enter trainer",
  },
  isDeleted: {
    type: Boolean,
    required: "Delete sate",
  },
});

export default PokemonSchema;
