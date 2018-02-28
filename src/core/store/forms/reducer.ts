import { FORM_ACTIONS } from "core/constants";
import { formsReducer as reducer } from "core/utilities";

export type FormsState = {
}

const INITIAL_STATE: FormsState = {
};

export const formsReducer = reducer<FormsState>(INITIAL_STATE, FORM_ACTIONS);
