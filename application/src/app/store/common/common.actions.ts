import { createAction } from "@ngrx/store";

export enum CommonAction {
    INIT_APPLICATION = "[Common] Init",
}

export const InitaliseApplication = createAction(
    CommonAction.INIT_APPLICATION
)