import { createReducer, on } from "@ngrx/store";
import { CategoryResponse } from "src/app/dto/inventory/response/category.model";
import { setCategories } from "./category.action";

const intialStage: CategoryResponse[] = []

export const categoryReducer = createReducer(intialStage, on(setCategories, (oldState, { categories }) => {
    return [...categories];
}));

// export interface CategoryState {
//     categories: CategoryResponse[];
//     loading: boolean;
//     error: string | null;
// }

// export const initialState: CategoryState = {
//     categories: [],
//     loading: false,
//     error: null
// };

// export const categoryReducer = createReducer(
//     initialState,
//     on(loadCategories, (state) => ({
//         ...state,
//         loading: true
//     })),
//     on(loadCategoriesSuccess, (state, { categories }) => ({
//         ...state,
//         loading: false,
//         categories: categories,
//         error: null
//     })),
//     on(loadCategoriesFailure, (state, { error }) => ({
//         ...state,
//         loading: false,
//         error: error
//     }))
// );