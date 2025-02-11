import { createReducer, on } from "@ngrx/store";
import { setProducts } from "./product.action";
import { ItemResponse } from "src/app/dto/inventory/response/product.model";

const intialStage: ItemResponse[] = []

export const productReducer = createReducer(intialStage, on(setProducts, (oldState, { products }) => {
    return [...products];
}));
