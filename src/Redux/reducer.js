import * as types from './actiontypes'
const initialState = {
    empID: null,
    error: null

}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                empID: action.payload.empID,
                error: null
            }
        case types.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;



    }
}
export default userReducer;