import { actionTypes } from "./customActions";

export const initialState = {
    currentCompany: null,
};

const customReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_COMPANY:
            return {
                ...state,
                currentCompany: action.currentCompany,
            };

        default:
            return state;
    }
};

export default customReducer;
