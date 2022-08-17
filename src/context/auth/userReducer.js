
export const userReducer = (state, action) => {

    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'ERROR':
            return {
                ...state,
                isLoading: false,
            }
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                isLoading: action.payload.isLoading,
                token: action.payload.token
            }
        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
                isLoading: false,
                token: undefined,
            }
        default:
            return state;
    }

}