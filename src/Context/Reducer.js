const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START" :
            return {
                user: null
            };
        case "LOGIN_SUCCES":
            return {
                user: action.payload
            };
        case "LOGIN_FAILURE":
            return {
                user: null
            };
        case "LOGIN_OUT":
            return {
                user: null
            };
        case "CHANGE_USER":
            return {
                user:action.payload
            };

        default:
            return state
    }

};
export default Reducer