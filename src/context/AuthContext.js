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
        case 'SIGNIN':
            return { ...state, errorMessage: '', token: payload }
        case 'CLEAR_ERROR':
            return { ...state, errorMessage: '' }
        default:
            return state;
    }
}

const signup = dispatch => async({ email, password }) => {
    try {
        const response = await trackerApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'SIGNUP', payload: response.data.token });
        navigate('TrackList');        
    } catch (err) {
        console.log(email, password);
        dispatch({ type: 'ADD_ERROR', payload: 'something went wrong!'})
    }
};

const signin = dispatch => async({ email, password }) => {
    try {
        const response = await trackerApi.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'SIGNIN', payload: response.data.token });
        navigate('TrackList');  
    } catch (err) {
        distpach({
            type: 'ADD_ERROR',
            payload: 'Something went wrong!'
        })
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'CLEAR_ERROR' })
};

const signout = dispatch => {
    return async() => {

    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, signout, clearErrorMessage },
    {
        isSignedIn: false,
        errorMessage: ''
    }
)