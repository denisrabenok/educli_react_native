import { autoRehydrate, persistStore } from "redux-persist-immutable";
import { combineReducers } from "redux-immutable";
import createActionBuffer from "redux-action-buffer";
import { REHYDRATE } from "redux-persist/constants";
import Immutable from "immutable";
import { applyMiddleware, compose, createStore } from "redux";
import { AsyncStorage } from "react-native";
import loginReducer from "../reducers/loginReducer";
import signupReducer from "../reducers/signupReducer";
import rootReducer from "../reducers/rootReducer";
import profileReducer from "../reducers/profileReducer";
import notificationsReducer from "../reducers/notificationsReducer";
import attendanceReducer from "../reducers/attendanceReducer";
import coursesReducer from "../reducers/coursesReducer";
import academicProgressReducer from "../reducers/academicProgressReducer";
import paymentsReducer from "../reducers/paymentsReducer";

import createSagaMiddleware from "redux-saga";

import * as loginSaga from "../saga/login-saga";
import * as signupSaga from "../saga/signup-saga";
import * as profileSaga from "../saga/profile-saga";
import * as editProfileSaga from "../saga/editProfile-saga";
import * as notificationsSaga from "../saga/notifications-saga";
import * as attendanceSaga from "../saga/attendance-saga";
import * as coursesSaga from "../saga/courses-saga";
import * as academicProgressSaga from "../saga/academicProgress-saga";
import * as paymentsSaga from "../saga/payments-saga";


const combinedReducers = combineReducers({
    root: rootReducer,
    login: loginReducer,
    signup: signupReducer,
    profile: profileReducer,
    notifications: notificationsReducer,
    attendance: attendanceReducer,
    courses: coursesReducer,
    academicProgress: academicProgressReducer,
    payments: paymentsReducer
});

const initialState = new Immutable.Map({
    root: Immutable.Map({
        progress: undefined,
    }),
    login: Immutable.Map({
        isLoggedIn: false,
        idUser: '',
        loginError: {},
        email: '',
        password: '',
    }),
    signup: Immutable.Map({
        isSignedUp: false,
        idUser: '',
        signupError: {},
        email: '',
        password: '',
    }),
    profile: Immutable.Map({
        name: '',
        surname: '',
        birthDate: '',
        email: '',
        address: '',
        phone: '',
        passport: '',
        mobile: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        visatype: ''
    }),
    notifications: Immutable.Map({
        notes: []
    }),
    attendance: Immutable.Map({
        timetables: []
    }),
    courses: Immutable.Map({
        courses: []
    }),
    academicProgress: Immutable.Map({
        progresses: []
    }),
    payments: Immutable.Map({
        payments: []
    })
});

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combinedReducers,
        initialState,
        compose(applyMiddleware(sagaMiddleware, createActionBuffer(REHYDRATE)), autoRehydrate({ log: true })));

    persistStore(
        store,
        {
            storage: AsyncStorage,
            blacklist: ['root'],
        }
    );
    return {
        ...store, runSaga: [
            sagaMiddleware.run(loginSaga.loginFlow),
            sagaMiddleware.run(signupSaga.signupFlow),
            sagaMiddleware.run(profileSaga.profileFlow),
            sagaMiddleware.run(editProfileSaga.editProfileFlow),
            sagaMiddleware.run(notificationsSaga.notificationsFlow),
            sagaMiddleware.run(attendanceSaga.attendanceFlow),
            sagaMiddleware.run(coursesSaga.coursesFlow),
            sagaMiddleware.run(academicProgressSaga.academicProgressFlow),
            sagaMiddleware.run(paymentsSaga.paymentsFlow)
        ]
    };
}