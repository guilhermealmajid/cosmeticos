import { type SchemaTypeDefinition } from "sanity";
import { brandType } from "./brand";
import { categoryType } from "./category";
import { productType } from "./product";
import { slideType } from "./slide";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [brandType, categoryType, productType, slideType],
};
