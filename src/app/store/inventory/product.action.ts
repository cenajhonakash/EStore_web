import { createAction, props } from "@ngrx/store";
import { ItemResponse } from "src/app/dto/inventory/response/product.model";

export const setProducts = createAction('SET_PRODUCTS', props<{ products: ItemResponse[] }>());
