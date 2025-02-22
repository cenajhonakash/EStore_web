import { createReducer, on } from "@ngrx/store";
import { ItemResponse } from "src/app/dto/inventory/response/product.model";
import { setUser } from "./user.action";
import { User } from "../dto/user.model";
import { UserProfile } from "../dto/user-profile";

const intialStage: UserProfile = {}

export const userReducer = createReducer(intialStage, on(setUser, (oldState, { user }) => {
    return user;
}));
