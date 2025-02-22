import { createAction, props } from "@ngrx/store";
import { ItemResponse } from "src/app/dto/inventory/response/product.model";
import { UserProfile } from "../dto/user-profile";

export const setUser = createAction('SET_USER', props<{ user: UserProfile }>());