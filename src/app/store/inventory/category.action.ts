import { createAction, props } from "@ngrx/store";
import { CategoryResponse } from "src/app/dto/inventory/response/category.model";

export const setCategories = createAction('SET_CATEGORIES_DATA', props<{ categories: CategoryResponse[] }>());

// // Action to load categories
// export const loadCategories = createAction('[Category] Load Categories');

// // Action to load categories success
// export const loadCategoriesSuccess = createAction(
//     '[Category] Load Categories Success',
//     props<{ categories: CategoryResponse[] }>()
// );

// // Action to load categories failure
// export const loadCategoriesFailure = createAction(
//     '[Category] Load Categories Failure',
//     props<{ error: string }>()
// );