import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'ADD_ERROR':
            return { ...state, errorMessage: payload }
        case 'SIGNUP':
            return { ...state, errorMessage: '', token: payload }
        default:
            return state;
    }
}

const signup = dispatch => async({ email, password }) => {
    try {
        const response = await trackerApi.post('/signup', { email, password });
        console.log(email, password);
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'SIGNUP', payload: response.data.token });

        navigate('TrackList');        
    } catch (err) {
        console.log(email, password);
        dispatch({ type: 'ADD_ERROR', payload: 'something went wrong!'})
    }
};

const signin = distpach => { 
    return async({ email, password }) => {
        // Try to signin

        // Handle success by updating state

        // Handle failure by showing error message
    }
}

const signout = dispatch => {
    return async() => {

    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, signout },
    {
        isSignedIn: false,
        errorMessage: ''
    }
)