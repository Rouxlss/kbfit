
export const userReducer = (state, action) => {

    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                isLoading: true
            }
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                isLoading: action.payload.isLoading
            }
        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
                isLoading: false
            }
        default:
            return state;
    }

}