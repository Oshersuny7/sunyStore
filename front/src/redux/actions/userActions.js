import { LOGIN_USER, LOGOUT_USER } from '../constants/userConstants';
import axios from 'axios';

export const setReduxUserState = (userCreated) => (dispatch) => {
    dispatch({
        type: LOGIN_USER,
        payload: userCreated,
    });
};

export const logout = () => async (dispatch) => {
    // Make the logout request
    try {
        await axios.get('/logout');
    } catch (error) {
        // Handle errors if needed
        console.error('Logout request failed:', error);
    }

    // Remove user info and cart from local storage
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo');
    localStorage.removeItem('cart');

    // Redirect after logout
    document.location.href = '/login';

    // Dispatch the LOGOUT_USER action
    dispatch({ type: LOGOUT_USER });
};
