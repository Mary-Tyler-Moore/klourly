
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: false, user } : {};
const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            };
        
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            };
        
            case 'VALIDATE_USER': 
                return {
                    ...state,
                    loggedIn: action.payload
                }

        default:
            return state;
    }
}

export default authenticationReducer;