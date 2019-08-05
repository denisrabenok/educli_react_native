import React, { Component } from "react";
import { Alert, Image, StatusBar, Text, TextInput, View, Dimensions, BackHandler, Platform } from "react-native";
import { Button, Container, Content, Spinner, Icon, Right } from "native-base";
import colors from "../resources/colors";
import ValidationTextInput from "./ValidationTextInput";
import SearchTextInput from "./SearchTextInput";
import Header from "./Header";
import { connect } from "react-redux";
import consts from "../const";
import dimens from "../resources/dimens";
import strings from "../resources/strings";
import * as actions from "../actions/action-types";
import styles from "../resources/styles";
import * as loginActions from "../actions/login-actions";
import * as rootActions from "../actions/root-actions";
import background from '../assets/background1.png'
import logo from '../assets/logo.png'
import profile_icon from '../assets/icons/profile_icon.png'
import studentCard_icon from '../assets/icons/studentCard_icon.png'
import courses_icon from '../assets/icons/courses_icon.png'
import attendance_icon from '../assets/icons/attendance_icon.png'
import academicProgress_icon from '../assets/icons/academicProgress_icon.png'
import payments_icon from '../assets/icons/payments_icon.png'
import notifications_icon from '../assets/icons/notifications_icon.png'
import personalReminders_icon from '../assets/icons/personalReminders_icon.png'
import newsfeed_icon from '../assets/icons/newsfeed_icon.png'
import visaExpiry_icon from '../assets/icons/visaExpiry_icon.png'
import Orientation from 'react-native-orientation';
const { width, height } = Dimensions.get('window');

export class Dashboard extends Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            searchText: "",
            pressed_profile: false,
            pressed_studentcard: false,
            pressed_courses: false,
            pressed_attendance: false,
            pressed_academicprogress: false,
            pressed_payments: false,
            pressed_notifications: false,
            pressed_personalreminders: false,
            pressed_visaexpiry: false
        }
        if (Platform.OS !== 'android') return;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    handleBackButtonClick() {
        // Alert.alert('test1')
        Orientation.lockToPortrait();
        // this.props.navigation.pop();

        return true;
    }
    componentDidMount() {
        Orientation.lockToPortrait();
        this.props.dispatch(rootActions.controlProgress(false))
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidUpdate() {
        // this.proceed()
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
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
    onProfile = () => {
        this.props.navigation.navigate(consts.PROFILE_SCREEN);
    }
    onStudentcard = () => {
        this.props.navigation.navigate(consts.STUDENTCARD_SCREEN);
    }
    onCourses = () => {
        this.props.navigation.navigate(consts.COURSES_SCREEN);
    }
    onAttendance = () => {
        this.props.navigation.navigate(consts.ATTENDANCE_SCREEN);
    }
    onAcademicProgress = () => {
        this.props.navigation.navigate(consts.ACADEMICPROGRESS_SCREEN);
    }
    onPayments = () => {
        this.props.navigation.navigate(consts.PAYMENTS_SCREEN);
    }
    onNotifications = () => {
        this.props.navigation.navigate(consts.NOTIFICATIONS_SCREEN);
    }
    onPersonalReminders = () => {
        this.props.navigation.navigate(consts.PERSONALREMINDERS_SCREEN);
    }
    onVisaExpiry = () => {
        this.props.navigation.navigate(consts.VISAEXPIRY_SCREEN);
        // this.props.navigation.navigate(consts.NEWSFEED_SCREEN);
    }
    onNewsFeed = () => {
        this.props.navigation.navigate(consts.NEWSFEED_SCREEN);
    }
    onPressIn_profile = () => {
        this.setState({ pressed_profile: true });
        this.setState({ pressed_studentcard: false });
        this.setState({ pressed_courses: false });
        this.setState({ pressed_attendance: false });
        this.setState({ pressed_academicprogress: false });
        this.setState({ pressed_payments: false });
        this.setState({ pressed_notifications: false });
        this.setState({ pressed_personalreminders: false });
        this.setState({ pressed_visaexpiry: false });
    }
    onPressIn_studentcard = () => {
        this.setState({ pressed_profile: false });
        this.setState({ pressed_studentcard: true });
        this.setState({ pressed_courses: false });
        this.setState({ pressed_attendance: false });
        this.setState({ pressed_academicprogress: false });
        this.setState({ pressed_payments: false });
        this.setState({ pressed_notifications: false });
        this.setState({ pressed_personalreminders: false });
        this.setState({ pressed_visaexpiry: false });
    }
    onPressIn_courses = () => {
        this.setState({ pressed_profile: false });
        this.setState({ pressed_studentcard: false });
        this.setState({ pressed_courses: true });
        this.setState({ pressed_attendance: false });
        this.setState({ pressed_academicprogress: false });
        this.setState({ pressed_payments: false });
        this.setState({ pressed_notifications: false });
        this.setState({ pressed_personalreminders: false });
        this.setState({ pressed_visaexpiry: false });
    }
    onPressIn_attendance = () => {
        this.setState({ pressed_profile: false });
        this.setState({ pressed_studentcard: false });
        this.setState({ pressed_courses: false });
        this.setState({ pressed_attendance: true });
        this.setState({ pressed_academicprogress: false });
        this.setState({ pressed_payments: false });
        this.setState({ pressed_notifications: false });
        this.setState({ pressed_personalreminders: false });
        this.setState({ pressed_visaexpiry: false });
    }
    onPressIn_academicprogress = () => {
        this.setState({ pressed_profile: false });
        this.setState({ pressed_studentcard: false });
        this.setState({ pressed_courses: false });
        this.setState({ pressed_attendance: false });
        this.setState({ pressed_academicprogress: true });
        this.setState({ pressed_payments: false });
        this.setState({ pressed_notifications: false });
        this.setState({ pressed_personalreminders: false });
        this.setState({ pressed_visaexpiry: false });
    }
    onPressIn_payments = () => {
        this.setState({ pressed_profile: false });
        this.setState({ pressed_studentcard: false });
        this.setState({ pressed_courses: false });
        this.setState({ pressed_attendance: false });
        this.setState({ pressed_academicprogress: false });
        this.setState({ pressed_payments: true });
        this.setState({ pressed_notifications: false });
        this.setState({ pressed_personalreminders: false });
        this.setState({ pressed_visaexpiry: false });
    }
    onPressIn_notifications = () => {
        this.setState({ pressed_profile: false });
        this.setState({ pressed_studentcard: false });
        this.setState({ pressed_courses: false });
        this.setState({ pressed_attendance: false });
        this.setState({ pressed_academicprogress: false });
        this.setState({ pressed_payments: false });
        this.setState({ pressed_notifications: true });
        this.setState({ pressed_personalreminders: false });
        this.setState({ pressed_visaexpiry: false });
    }
    onPressIn_personalreminders = () => {
        this.setState({ pressed_profile: false });
        this.setState({ pressed_studentcard: false });
        this.setState({ pressed_courses: false });
        this.setState({ pressed_attendance: false });
        this.setState({ pressed_academicprogress: false });
        this.setState({ pressed_payments: false });
        this.setState({ pressed_notifications: false });
        this.setState({ pressed_personalreminders: true });
        this.setState({ pressed_visaexpiry: false });
    }
    onPressIn_visaexpiry = () => {
        this.setState({ pressed_profile: false });
        this.setState({ pressed_studentcard: false });
        this.setState({ pressed_courses: false });
        this.setState({ pressed_attendance: false });
        this.setState({ pressed_academicprogress: false });
        this.setState({ pressed_payments: false });
        this.setState({ pressed_notifications: false });
        this.setState({ pressed_personalreminders: false });
        this.setState({ pressed_visaexpiry: true });
    }
    onPressOut = () => {
        this.setState({ pressed_profile: false });
        this.setState({ pressed_studentcard: false });
        this.setState({ pressed_courses: false });
        this.setState({ pressed_attendance: false });
        this.setState({ pressed_academicprogress: false });
        this.setState({ pressed_payments: false });
        this.setState({ pressed_notifications: false });
        this.setState({ pressed_personalreminders: false });
        this.setState({ pressed_visaexpiry: false });
    }
    getTintColor = (index) => {
        switch (index) {
            case 1:
                if (this.state.pressed_profile)
                    return 'black';
                else
                    return 'white';
                break;
            case 2:
                if (this.state.pressed_studentcard)
                    return 'black';
                else
                    return 'white';
                break;
            case 3:
                if (this.state.pressed_courses)
                    return 'black';
                else
                    return 'white';
                break;
            case 4:
                if (this.state.pressed_attendance)
                    return 'black';
                else
                    return 'white';
                break;
            case 5:
                if (this.state.pressed_academicprogress)
                    return 'black';
                else
                    return 'white';
                break;
            case 6:
                if (this.state.pressed_payments)
                    return 'black';
                else
                    return 'white';
                break;
            case 7:
                if (this.state.pressed_notifications)
                    return 'black';
                else
                    return 'white';
                break;
            case 8:
                if (this.state.pressed_personalreminders)
                    return 'black';
                else
                    return 'white';
                break;
            case 9:
                if (this.state.pressed_visaexpiry)
                    return 'black';
                else
                    return 'white';
                break;
        }
    }
    getBorderWidth = (index) => {
        switch (index) {
            case 1:
                if (this.state.pressed_profile)
                    return 0;
                else
                    return 3;
                break;
            case 2:
                if (this.state.pressed_studentcard)
                    return 0;
                else
                    return 3;
                break;
            case 3:
                if (this.state.pressed_courses)
                    return 0;
                else
                    return 3;
                break;
            case 4:
                if (this.state.pressed_attendance)
                    return 0;
                else
                    return 3;
                break;
            case 5:
                if (this.state.pressed_academicprogress)
                    return 0;
                else
                    return 3;
                break;
            case 6:
                if (this.state.pressed_payments)
                    return 0;
                else
                    return 3;
                break;
            case 7:
                if (this.state.pressed_notifications)
                    return 0;
                else
                    return 3;
                break;
            case 8:
                if (this.state.pressed_personalreminders)
                    return 0;
                else
                    return 3;
                break;
            case 9:
                if (this.state.pressed_visaexpiry)
                    return 0;
                else
                    return 3;
                break;
        }
    }
    getBackgroundColor = (index) => {
        switch (index) {
            case 1:
                if (this.state.pressed_profile)
                    return colors.accentColor;
                else
                    return 'transparent';
                break;
            case 2:
                if (this.state.pressed_studentcard)
                    return colors.accentColor;
                else
                    return 'transparent';
                break;
            case 3:
                if (this.state.pressed_courses)
                    return colors.accentColor;
                else
                    return 'transparent';
                break;
            case 4:
                if (this.state.pressed_attendance)
                    return colors.accentColor;
                else
                    return 'transparent';
                break;
            case 5:
                if (this.state.pressed_academicprogress)
                    return colors.accentColor;
                else
                    return 'transparent';
                break;
            case 6:
                if (this.state.pressed_payments)
                    return colors.accentColor;
                else
                    return 'transparent';
                break;
            case 7:
                if (this.state.pressed_notifications)
                    return colors.accentColor;
                else
                    return 'transparent';
                break;
            case 8:
                if (this.state.pressed_personalreminders)
                    return colors.accentColor;
                else
                    return 'transparent';
                break;
            case 9:
                if (this.state.pressed_visaexpiry)
                    return colors.accentColor;
                else
                    return 'transparent';
                break;
        }
    }
    onPressOpt = () => {

    }
    onPressExit = () => {
        // this.props.navigation.exitApp();
    }
    render() {
        return (
            <Container style={DashboardStyles.containerStyle}>
                <Image source={background}
                    style={DashboardStyles.imageStyle} />
                <StatusBar style={DashboardStyles.statusBarStyle} />
                <Header
                    label="Dashboard"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={DashboardStyles.contentStyle}>

                    <View style={[DashboardStyles.rowStyle, { marginTop: height * 2 / 40 }]}>
                        <View style={DashboardStyles.leftCellStyle}>
                            <Button
                                style={[DashboardStyles.cell,
                                {
                                    borderWidth: this.getBorderWidth(1),
                                    backgroundColor: this.getBackgroundColor(1),
                                }]}
                                onPress={() => { this.onProfile() }}
                                onPressIn={() => { this.onPressIn_profile() }}
                                onPressOut={() => this.onPressOut()}>
                                <Image
                                    style={
                                        [DashboardStyles.btnImageStyle,
                                        {
                                            height: height / 40 * 1.3,
                                            width: width / 22.5 * 1.9,
                                        },
                                        {
                                            tintColor: this.getTintColor(1)
                                        }]}
                                    source={profile_icon} />
                            </Button>
                            <Text style={{ marginTop: height * 0.8 / 40, color: 'white', fontSize: dimens.dashboarditem }}>{strings.profile}</Text>
                        </View>
                        <View style={DashboardStyles.centerCellStyle}>
                            <Button
                                style={[DashboardStyles.cell,
                                {
                                    borderWidth: this.getBorderWidth(2),
                                    backgroundColor: this.getBackgroundColor(2),
                                }]}
                                onPress={() => { this.onStudentcard() }}
                                onPressIn={() => { this.onPressIn_studentcard() }}
                                onPressOut={() => this.onPressOut()}>
                                <Image
                                    style={
                                        [DashboardStyles.btnImageStyle,
                                        {
                                            height: height / 40 * 1.3,
                                            width: width / 22.5 * 2,
                                        },
                                        {
                                            tintColor: this.getTintColor(2)
                                        }]}
                                    source={studentCard_icon} />
                            </Button>
                            <Text style={{ marginTop: height * 0.8 / 40, color: 'white', fontSize: dimens.dashboarditem }}>{strings.studentcard}</Text>
                        </View>
                        <View style={DashboardStyles.rightCellStyle}>
                            <Button
                                style={[DashboardStyles.cell,
                                {
                                    borderWidth: this.getBorderWidth(3),
                                    backgroundColor: this.getBackgroundColor(3),
                                }]}
                                onPress={() => { this.onCourses() }}
                                onPressIn={() => { this.onPressIn_courses() }}
                                onPressOut={() => this.onPressOut()}>
                                <Image
                                    style={
                                        [DashboardStyles.btnImageStyle,
                                        {
                                            height: height / 40 * 1.4,
                                            width: width / 22.5 * 1.98,
                                        },
                                        {
                                            tintColor: this.getTintColor(3)
                                        }]}
                                    source={courses_icon} />
                            </Button>
                            <Text style={{ marginTop: height * 0.8 / 40, color: 'white', fontSize: dimens.dashboarditem }}>{strings.courses}</Text>
                        </View>
                    </View>
                    <View style={DashboardStyles.rowStyle}>
                        <View style={DashboardStyles.leftCellStyle}>
                            <Button
                                style={[DashboardStyles.cell,
                                {
                                    borderWidth: this.getBorderWidth(4),
                                    backgroundColor: this.getBackgroundColor(4),
                                }]}
                                onPress={() => { this.onAttendance() }}
                                onPressIn={() => { this.onPressIn_attendance() }}
                                onPressOut={() => this.onPressOut()}>
                                <Image
                                    style={
                                        [DashboardStyles.btnImageStyle,
                                        {
                                            height: height / 40 * 1.87,
                                            width: width / 22.5 * 1.9,
                                        },
                                        {
                                            tintColor: this.getTintColor(4)
                                        }]}
                                    source={attendance_icon} />
                            </Button>
                            <Text style={{ marginTop: height * 0.8 / 40, color: 'white', fontSize: dimens.dashboarditem }}>{strings.attendance}</Text>
                        </View>
                        <View style={DashboardStyles.centerCellStyle}>
                            <Button
                                style={[DashboardStyles.cell,
                                {
                                    borderWidth: this.getBorderWidth(5),
                                    backgroundColor: this.getBackgroundColor(5),
                                }]}
                                onPress={() => { this.onAcademicProgress() }}
                                onPressIn={() => { this.onPressIn_academicprogress() }}
                                onPressOut={() => this.onPressOut()}>
                                <Image
                                    style={
                                        [DashboardStyles.btnImageStyle,
                                        {
                                            height: height / 40 * 1.9,
                                            width: width / 22.5 * 1.8,
                                        },
                                        {
                                            tintColor: this.getTintColor(5)
                                        }]}
                                    source={academicProgress_icon} />
                            </Button>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: height * 0.8 / 40, color: 'white', flexWrap: 'wrap', flex: 1, textAlign: 'center', fontSize: dimens.dashboarditem }}>{strings.academicProgress}</Text>
                            </View>
                        </View>
                        <View style={DashboardStyles.rightCellStyle}>
                            <Button
                                style={[DashboardStyles.cell,
                                {
                                    borderWidth: this.getBorderWidth(6),
                                    backgroundColor: this.getBackgroundColor(6),
                                }]}
                                onPress={() => { this.onPayments() }}
                                onPressIn={() => { this.onPressIn_payments() }}
                                onPressOut={() => this.onPressOut()}>
                                <Image
                                    style={
                                        [DashboardStyles.btnImageStyle,
                                        {
                                            height: height / 40 * 1,
                                            width: width / 22.5 * 1.8,
                                        },
                                        {
                                            tintColor: this.getTintColor(6)
                                        }]}
                                    source={payments_icon} />
                            </Button>
                            <Text style={{ marginTop: height * 0.8 / 40, color: 'white', fontSize: dimens.dashboarditem }}>{strings.payments}</Text>
                        </View>
                    </View>
                    <View style={DashboardStyles.rowStyle}>
                        <View style={DashboardStyles.leftCellStyle}>
                            <Button
                                style={[DashboardStyles.cell,
                                {
                                    borderWidth: this.getBorderWidth(7),
                                    backgroundColor: this.getBackgroundColor(7),
                                }]}
                                onPress={() => { this.onNotifications() }}
                                onPressIn={() => { this.onPressIn_notifications() }}
                                onPressOut={() => this.onPressOut()}>
                                <Image
                                    style={
                                        [DashboardStyles.btnImageStyle,
                                        {
                                            height: height / 40 * 1.5,
                                            width: width / 22.5 * 1.3,
                                        },
                                        {
                                            tintColor: this.getTintColor(7)
                                        }]}
                                    source={notifications_icon} />
                            </Button>
                            <Text style={{ marginTop: height * 0.8 / 40, color: 'white', fontSize: dimens.dashboarditem }}>{strings.notifications}</Text>
                        </View>
                        <View style={DashboardStyles.centerCellStyle}>
                            <Button
                                style={[DashboardStyles.cell,
                                {
                                    borderWidth: this.getBorderWidth(8),
                                    backgroundColor: this.getBackgroundColor(8),
                                }]}
                                onPress={() => { this.onNewsFeed() }}
                                onPressIn={() => { this.onPressIn_personalreminders() }}
                                onPressOut={() => this.onPressOut()}>
                                <Image
                                    style={
                                        [DashboardStyles.btnImageStyle,
                                        {
                                            height: height / 40 * 1.6,
                                            width: width / 22.5 * 1.8,
                                        },
                                        {
                                            tintColor: this.getTintColor(8)
                                        }]}
                                    source={newsfeed_icon} />
                            </Button>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: height * 0.8 / 40, color: 'white', flexWrap: 'wrap', flex: 1, textAlign: 'center', fontSize: dimens.dashboarditem }}>{strings.newsfeed}</Text>
                            </View>
                        </View>
                        <View style={DashboardStyles.rightCellStyle}>
                            <Button
                                style={[DashboardStyles.cell,
                                {
                                    borderWidth: this.getBorderWidth(9),
                                    backgroundColor: this.getBackgroundColor(9),
                                }]}
                                onPress={() => { this.onVisaExpiry() }}
                                onPressIn={() => { this.onPressIn_visaexpiry() }}
                                onPressOut={() => this.onPressOut()}>
                                <Image
                                    style={
                                        [DashboardStyles.btnImageStyle,
                                        {
                                            height: height / 40 * 1.9,
                                            width: width / 22.5 * 1.2,
                                        },
                                        {
                                            tintColor: this.getTintColor(9)
                                        }]}
                                    source={visaExpiry_icon} />
                            </Button>
                            <Text style={{ marginTop: height * 0.8 / 40, color: 'white', fontSize: dimens.dashboarditem }}>{strings.visaExpiry}</Text>
                        </View>
                    </View>

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
    }
}


const DashboardStyles = {
    containerStyle: {
        // flexDirection: 'column',
        // backgroundColor: colors.primaryColor,
        // alignItems: 'center',
        backgroundColor: '#00000055'

    },
    contentStyle: {
        position: 'absolute',
        top: height / 40 * (3.8 + 2),
        // height: height * 9 / 10 - StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        // marginHorizontal: dimens.margin_large
    },
    statusBarStyle: {
        // backgroundColor: colors.primaryColor
    },
    btnImageStyle: {
        resizeMode: 'contain'
    },
    centercell: {
        height: width / 22.58 * 3.74,
        width: width / 22.58 * 3.74,
        borderRadius: width / 22.58 * 3.74 / 2,
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: colors.accentColor,
        shadowColor: '#444444',
        shadowOffset: { width: 12, height: 12 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    cell: {
        // backgroundColor: 'transparent',
        height: width / 22.58 * 3.74,
        width: width / 22.58 * 3.74,
        borderRadius: width / 22.58 * 3.74 / 2,
        // borderWidth: 3,
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderColor: 'white',
    },
    leftCellStyle: {
        position: 'absolute',
        left: width / 22.58 * 1.98,
        flexDirection: 'column',
        flex: 2,
        // justifyContent: 'center',
        alignItems: 'center', // important
        // alignSelf: 'center',
        height: height / 6,
    },
    centerCellStyle: {
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        height: height / 6,
    },
    rightCellStyle: {
        position: 'absolute',
        right: width / 22.58 * 1.98,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        height: height / 6,
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: height / 5,
        width: width,
    },
    imageStyle: {
        position: 'absolute',
        top: 0,
        width: width,
        height: height,
        resizeMode: 'stretch',
    },
};

const mapStateToProps = (state) => ({
    Dashboard: state.get('dashboard'),
    root: state.get('root'),
    login: state.get('login'),
});

export default connect(mapStateToProps)(Dashboard)