import {apiCall, setTokenHeader} from "../../services/api";
import {SET_CURRENT_USER} from "../actionTypes";
import {addError, removeError} from "./errors";

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setAuthorizationToken(token) {
    setTokenHeader(token);
}

export function logout(){
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function authUser(type, userData){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/user/${type}`, userData)
                .then(({token, flag, ...user}) => {
                    localStorage.setItem("jwtToken", token);
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError());
                    resolve();
                })
                .catch(({message}) => {
                    dispatch(addError(message));
                    reject();
                })
        })
    }
}