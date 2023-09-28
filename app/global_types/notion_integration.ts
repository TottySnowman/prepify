import { meal_ingredient } from "./meal";
export type notion_import_params = {
  notion_secret: string;
  ingredient_list: meal_ingredient[];
};
