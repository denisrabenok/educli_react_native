import React, { Component } from "react";
import { Alert, Image, StatusBar, Text, TextInput, View, Dimensions, } from "react-native";
import { Button, Container, Content, Spinner, Icon, Right, Input } from "native-base";
import colors from "../resources/colors";
import ValidationTextInput from "./ValidationTextInput";
import SearchTextInput from "./SearchTextInput";
import Header from "./Header";
import CustomProgressCircle from "./CustomProgressCircle";
import { connect } from "react-redux";
import consts from "../const";
import dimens from "../resources/dimens";
import strings from "../resources/strings";
import * as actions from "../actions/action-types";
import styles from "../resources/styles";
import * as loginActions from "../actions/login-actions";
import * as rootActions from "../actions/root-actions";
import * as attendanceActions from "../actions/attendance-actions";
import background from '../assets/background2.png'
import Orientation from 'react-native-orientation';

const { width, height } = Dimensions.get('window');

export class Attendance extends Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            searchText: "",
            timetables: []
        }
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        this.props.dispatch(rootActions.controlProgress(false))
        this.dispatchGetStudentAttendance();
    }

    componentDidUpdate() {
        this.proceed()
    }
    dispatchGetStudentAttendance() {
        // Alert.alert('profile test: ' + this.props.login.get('idUser'));
        // Alert.alert('idUser: ' + this.props.login.get('idUser'));
        // Alert.alert('token: ' + this.props.login.get('token'));
        this.props.dispatch(attendanceActions.getStudentAttendance(this.props.login.get('token'), this.props.login.get('idUser')))
    }
    proceed() {
        // const signupError = this.props.dashboard.get('signupError');
        // const isLoggedIn = this.props.dashboard.get('isLoggedIn');

        // if (this.isObject(loginError) && loginError && this.isObject(loginError.message) && loginError.message) {
        //     Toast.showShortBottom(loginError.message);
        //     this.props.dispatch(loginActions.setError({}))
        // } else if (isLoggedIn && !this.isGoneAlready) {
        //     Alert.alert("proceed test");
        //     this.props.navigation.navigate(consts.REPOSITORY_LIST_SCREEN);
        //     this.isGoneAlready = true;
        // }
        // const timetables = this.props.Attendance.get('timetables');
        // if (timetables) {
        //     this.setState({ timetables: timetables });
        //     console.log(this.state.timetables)
        // }
    }

    isObject(obj) {
        return typeof obj === 'object';
    }

    //noinspection JSMethodCanBeStatic
    setSearch(text) {
        this.state = {
            searchText: text,
        };
    }
    onPressOpt = () => {

    }
    onPressExit = () => {
        this.props.navigation.pop();
    }
    getAttendanceRate = () => {
        // return 0.46;
        const timetables = this.props.Attendance.get('timetables');
        // console.log(timetables.length)
        var sum = 0;
        var count = 0;
        for (var i = 0; i < timetables.length; i++) {
            // console.log('classrooms: ' + i, timetables[i].classrooms.length);
            for (var j = 0; j < timetables[i].classrooms.length; j++) {
                if (timetables[i].classrooms[j].attendancePct != null)
                    sum = sum + timetables[i].classrooms[j].attendancePct;
                count++;
            }
        }
        // console.log('sum: ', sum);
        // console.log('count: ', count);
        // console.log('result: ', Math.round(sum / count) / 100);
        // console.log('result: ', parseFloat(sum / count / 100).toFixed(2));
        // return Math.round(sum / count) / 100
        if (count == 0)
            return 0;
        return parseFloat(sum / count / 100).toFixed(2)

    }
    render() {
        return (
            <Container style={Styles.containerStyle}>
                <Image source={background}
                    style={Styles.imageStyle} />
                <StatusBar style={Styles.statusBarStyle} />
                <Header label="Attendance"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <View style={Styles.pannel}>
                        <Text style={Styles.name}>{strings.yourattendance}</Text>
                        <CustomProgressCircle progress={this.getAttendanceRate()} />
                    </View>
                    <Button
                        style={Styles.buttonStyle}
                        onPress={this.ongotoFullAttendanceReportPress}>
                        <Text style={Styles.buttonTextStyle}>{strings.fullattendancereport}</Text>
                    </Button>
                    <Button
                        style={Styles.buttonStyle}
                        onPress={this.ongotoLoginPress}>
                        <Text style={Styles.buttonTextStyle}>{strings.emailattendancereport}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }

    renderProgress() {
        if (this.props.root.get('progress')) {
            return this.spinner()
        } else {
            return null;
        }
    }

    spinner() {
        return (
            <Spinner
                color={colors.accentColor}
                animating={true}
                size={'large'}
                style={styles.progressStyle} />
        )
    }

    validateEmail = (text: string): boolean => consts.EMAIL_REGEX.test(text);

    validatePassword = (text: string): boolean => text.length >= consts.MIN_PASSWORD_LENGTH;

    onSignupPress = () => this.props.dispatch(loginActions.login(this.state.email, this.state.password));
    ongotoLoginPress = () => {
        this.props.navigation.navigate(consts.LOGIN_SCREEN);
    };
    ongotoFullAttendanceReportPress = () => {

        Orientation.lockToLandscape();
        this.props.navigation.navigate(consts.FULLATTENDANCEREPORT_SCREEN);
    }
}


const Styles = {
    containerStyle: {
        flexDirection: 'column',
        // backgroundColor: colors.primaryColor,
        // alignItems: 'center',
        backgroundColor: '#00000055'

    },
    contentStyle: {
        position: 'absolute',
        top: height / 10,
        height: height * 9 / 10 - StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // marginHorizontal: dimens.margin_large
    },
    imageStyle: {
        position: 'absolute',
        top: 0,
        width: width,
        height: height,
        resizeMode: 'stretch',
    },
    buttonStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.accentColor,
        borderRadius: 15,
        width: width * 17 / 20,
        height: height * 3 / 40,
        marginBottom: height * 1.3 / 40,
    },
    pannel: {
        marginTop: width / 40 * 3,
        marginBottom: height * 3 / 40,
        width: width / 20 * 17,
        padding: 20,
        backgroundColor: 'white',
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: dimens.text_size_button,
        justifyContent: 'center'
    },
    name: {
        // fontSize: dimens.text_profile_normal,
        fontWeight: 'bold',
        color: 'black',
        fontSize: dimens.text_course_pannle,
        marginBottom: 20,
    },
    animationcircularprogresspannel: {
        width: width / 20 * 17,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    customProgress: {
    }
};

const mapStateToProps = (state) => ({
    Attendance: state.get('attendance'),
    root: state.get('root'),
    login: state.get('login'),
});

export default connect(mapStateToProps)(Attendance)