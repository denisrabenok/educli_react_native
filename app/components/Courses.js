import React, { Component } from "react";
import { Alert, Image, StatusBar, Text, TextInput, View, Dimensions, BackHandler, Platform } from "react-native";
import { Button, Container, Content, Spinner, Icon, Right, Input } from "native-base";
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
import * as coursesActions from "../actions/courses-actions";
import * as rootActions from "../actions/root-actions";
import background from '../assets/background2.png'
import idcard from '../assets/studentcard.png'
import logo from '../assets/logo.png'
import diag_go_icon from '../assets/icons/diag_go_icon.png'
import profile_icon from '../assets/icons/profile_icon.png'
import studentCard_icon from '../assets/icons/studentCard_icon.png'
import courses_icon from '../assets/icons/courses_icon.png'
import attendance_icon from '../assets/icons/attendance_icon.png'
import academicProgress_icon from '../assets/icons/academicProgress_icon.png'
import payments_icon from '../assets/icons/payments_icon.png'
import notifications_icon from '../assets/icons/notifications_icon.png'
import personalReminders_icon from '../assets/icons/personalReminders_icon.png'
import visaExpiry_icon from '../assets/icons/visaExpiry_icon.png'
import Orientation from 'react-native-orientation';
const { width, height } = Dimensions.get('window');

export class Courses extends Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            searchText: "",
        }
        if (Platform.OS !== 'android') return;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    handleBackButtonClick() {
        // Alert.alert('test1')
        Orientation.lockToPortrait();
        this.props.navigation.navigate(consts.DASHBOARD_SCREEN);

        return true;
    }
    componentDidMount() {
        Orientation.lockToPortrait();
        this.props.dispatch(rootActions.controlProgress(false))
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.dispatch(rootActions.controlProgress(false))
        this.dispatchGetStudentAttendance()
    }

    dispatchGetStudentAttendance() {
        // Alert.alert('profile test: ' + this.props.login.get('idUser'));
        // Alert.alert('idUser: ' + this.props.login.get('idUser'));
        // Alert.alert('token: ' + this.props.login.get('token'));
        this.props.dispatch(coursesActions.getStudentCourses(this.props.login.get('token'), this.props.login.get('idUser')))
    }

    componentWillMount() {
        if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    }
    componentDidUpdate() {
        this.proceed()
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
    onPressOpt = () => {

    }
    onPressExit = () => {
        this.props.navigation.pop();
    }

    getStudentCourses() {
        let courses = this.props.Courses.get('courses');
        // console.log('view: ', courses)
        if (courses != null)
            // Alert.alert('notes: ' + notes[0].nameAgent)
            return courses.map((item, index) => {
                // Alert.alert(item + ', ' + notes.length);
                // let flag = false;
                // if (index == 0 || index == playerAttr.length - 1) {
                //     flag = true;
                //     // Alert.alert('testsets');
                // }
                var date1 = new Date(item.courseStartDate);
                var date2 = new Date(item.courseExpiry);
                var today = new Date();
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var period = Math.ceil(timeDiff / (1000 * 3600 * 24));
                timeDiff = Math.abs(today.getTime() - date1.getTime());
                var sofar = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if (sofar > period)
                    sofar = period;
                if (index > 2)
                    return null
                return (
                    // {flag? <View style={height: play_h/10}/>:null}
                    <View>
                        <Text style={Styles.name}>{item.courseName}</Text>
                        <View style={Styles.stateView}>
                            <Text style={Styles.state}>{strings.pastcourse} ({item.courseStartDate} - {item.courseExpiry})</Text>
                        </View>
                        <View style={Styles.progressbar}>
                            <View style={[sofar / period < 1 ? Styles.incompleteprogress : Styles.completeprogress, { width: (width / 20 * 17 - 40) * sofar / period }]}>
                            </View>
                            <Text style={Styles.progressText}>{sofar} of {period} Days ({Math.round(sofar / period * 100)}%)</Text>
                        </View>
                    </View>
                );
            }
            );
    }
    render() {
        return (
            <Container style={Styles.containerStyle}>
                <Image source={background}
                    style={Styles.imageStyle} />
                <StatusBar style={Styles.statusBarStyle} />
                <Header label="Courses"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <View style={Styles.pannel}>
                        <Text style={Styles.pannelname}>{strings.currentcourse}</Text>
                        {this.getStudentCourses()}
                    </View>
                    <Button
                        style={Styles.buttonStyle}
                        onPress={this.ongotoLoginPress}>
                        <Text style={Styles.buttonTextStyle}>{strings.seeallformsfromcollege}</Text>
                        <Image source={diag_go_icon}
                            style={Styles.goiconStyle} />
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
        backgroundColor: colors.accentColor,
        borderRadius: 15,
        width: width * 17 / 20,
        height: height * 3 / 40,
        marginTop: width * 2.5 / 40
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: dimens.text_size_button,
    },
    idcard: {
        width: width * 17 / 20,
        resizeMode: 'contain'
    },
    goiconStyle: {
        position: 'absolute',
        right: 20,
        height: height * 0.8 / 40,
        width: width * 0.8 / 22.58,
        resizeMode: 'contain'
    },
    pannel: {
        marginTop: width / 40 * 3,
        width: width / 20 * 17,
        padding: 20,
        backgroundColor: 'white',
    },
    stateView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: width / 20 * 17 - 40,
        marginTop: 10,
        marginBottom: height / 40 * 0.3
    },
    state: {
        textAlign: 'center',
        alignContent: 'center',
        width: width / 20 * 17 - 40,
        color: 'black',
        fontSize: dimens.text_course_state
    },
    progressbar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 20 * 17 - 40,
        height: height / 40 * 1.6,
        backgroundColor: colors.back_progress_color
    },
    completeprogress: {
        position: 'absolute',
        left: 0,
        backgroundColor: colors.complete_progress_color,
        height: height / 40 * 1.6,
    },
    incompleteprogress: {
        position: 'absolute',
        left: 0,
        height: height / 40 * 1.6,
        backgroundColor: colors.incomplete_progress_color,
    },
    progressText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: dimens.text_course_state
    },
    name: {
        // fontSize: dimens.text_profile_normal,
        fontWeight: 'bold',
        color: 'black',
        fontSize: dimens.text_course_title,
        marginTop: height / 40 * 1.2,
    },
    pannelname: {
        // fontSize: dimens.text_profile_normal,
        fontWeight: 'bold',
        color: 'black',
        fontSize: dimens.text_course_pannle,
    }
};

const mapStateToProps = (state) => ({
    Courses: state.get('courses'),
    root: state.get('root'),
    login: state.get('login')
});

export default connect(mapStateToProps)(Courses)