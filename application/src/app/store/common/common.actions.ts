import { createAction, props } from "@ngrx/store";

export enum CommonAction {
    INIT_APPLICATION = "[Common] Init",
}

export type NoProps = any;
export const InitaliseApplication = createAction(
    CommonAction.INIT_APPLICATION,
    props<NoProps>()
)