import { createReducer, on } from "@ngrx/store";
import { CategoryResponse } from "src/app/dto/inventory/response/category.model";
import { setCategories } from "./category.action";

const intialStage: CategoryResponse[] = []

export const categoryReducer = createReducer(intialStage, on(setCategories, (oldState, { categories }) => {
    return [...categories];
}));
