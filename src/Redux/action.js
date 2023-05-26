import axios from 'axios';
import * as types from "./actiontypes";

export const LoginApimethod = (email, password) => {
    return async (dispatch) => {
        try {
            const deviceInfo = { deviceId: "D1", deviceType: "DEVICE_TYPE_ANDROID" };
            const response = await axios.post('/api/auth/login', { email, password, deviceInfo });
            const empID = response.data.employeeId;
            localStorage.setItem("response-token", response.data.jwtAuthenticationResponse.accessToken);
            localStorage.setItem("refresh-token", response.data.jwtAuthenticationResponse.refreshToken);
            dispatch({ type: types.LOGIN_SUCCESS, payload: { empID } });
            alert("Login Successfull");
        } catch (error) {
            dispatch({ type: types.LOGIN_FAILURE, payload: { error } });
            alert("Login Failed Try After Sometime..");
        }
    };
};