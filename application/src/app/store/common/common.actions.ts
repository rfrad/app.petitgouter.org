import { createAction, props } from "@ngrx/store";

export type CommonAction<PROPS> = {
    type: string,
    props: PROPS
}

export enum CommonActionType {
    INIT_APPLICATION = "[Common] Init",
}

export type NoProps = any;
export const InitaliseApplication = createAction(
    CommonActionType.INIT_APPLICATION,
    props<NoProps>()
)