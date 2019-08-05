import React, { Component } from "react";
import { Alert, Image, StatusBar, Text, TextInput, View, Dimensions, ScrollView } from "react-native";
import { Button, Container, Content, Spinner, Icon, Right, Input } from "native-base";
import colors from "../resources/colors";
import ValidationTextInput from "./ValidationTextInput";
import SearchTextInput from "./SearchTextInput";
import Header from "./Header";
import CustomProgressBar from "./CustomProgressBar";
import { connect } from "react-redux";
import consts from "../const";
import dimens from "../resources/dimens";
import strings from "../resources/strings";
import * as actions from "../actions/action-types";
import styles from "../resources/styles";
import * as academicProgressActions from "../actions/academicProgress-actions";
import * as rootActions from "../actions/root-actions";
import background from '../assets/background2.png'
import idcard from '../assets/studentcard.png'
import logo from '../assets/logo.png'
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

export class AcademicProgress extends Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            searchText: "",
        }
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        this.props.dispatch(rootActions.controlProgress(false))
        this.dispatchGetStudentAcademicProgress()
    }
    dispatchGetStudentAcademicProgress() {
        // Alert.alert('profile test: ' + this.props.login.get('idUser'));
        // Alert.alert('idUser: ' + this.props.login.get('idUser'));
        // Alert.alert('token: ' + this.props.login.get('token'));
        this.props.dispatch(academicProgressActions.getStudentAcademicProgress(this.props.login.get('token'), this.props.login.get('idUser')))
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
    getColorIndex = (criteria) => {
        if (criteria == 100)
            return 0
        if (criteria >= 80)
            return 1
        if (criteria >= 50)
            return 2
        return 3
    }
    getAcademicProgress() {
        let progress = this.props.AcademicProgress.get('progresses');
        if (progress == null)
            return null
        var count = 0
        return progress.map((item) => {
            // console.log('test: ', item.competentUnits + ' ' + item.totalUnits + ' ' + item.nonCommencedUnits)
            var percent = 0;
            (item.totalUnits - item.nonCommencedUnits) == 0 ? percent = 0 : percent = Math.round(item.competentUnits / (item.totalUnits - item.nonCommencedUnits) * 100);
            let courses = item.Courses
            return courses.map((courseitem) => {
                count++;
                if (count > 4) return null
                return (
                    // {flag? <View style={height: play_h/10}/>:null}
                    <CustomProgressBar
                        label={courseitem.course}
                        persent={percent}
                        index={(criteria) = this.getColorIndex(percent)} />
                );
            }
            )
        }
        )
    }
    onPressOpt = () => {

    }
    onPressExit = () => {
        this.props.navigation.pop();
    }
    render() {
        return (
            <Container style={Styles.containerStyle}>
                <Image source={background}
                    style={Styles.imageStyle} />
                <StatusBar style={Styles.statusBarStyle} />
                <Header label="Academic Progress"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <View style={Styles.pannel}>
                        <Text style={Styles.name}>{strings.academicprogress}</Text>
                        {this.getAcademicProgress()}
                    </View>
                    <Button
                        style={Styles.buttonStyle}
                        onPress={this.ongotoFullAcademicProgressPress}>
                        <Text style={Styles.buttonTextStyle}>{strings.fullacademicprogress}</Text>
                    </Button>
                    <Button
                        style={Styles.buttonStyle}
                        onPress={this.ongotoLoginPress}>
                        <Text style={Styles.buttonTextStyle}>{strings.emailprogressreport}</Text>
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
    ongotoFullAcademicProgressPress = () => {

        Orientation.lockToLandscape();
        this.props.navigation.navigate(consts.FULLACADEMICPROGRESS_SCREEN);
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
        // height: height * 9 / 10 - StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        marginBottom: -height / 10,
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
        height: height / 40 * 3,
        marginBottom: height / 40 * 1.3,
    },
    pannel: {
        marginTop: width / 40 * 3,
        marginBottom: height / 40 * 2.5,
        width: width / 20 * 17,
        padding: 20,
        backgroundColor: 'white',
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: dimens.text_size_button,
    },
    name: {
        // fontSize: dimens.text_profile_normal,
        fontWeight: 'bold',
        color: 'black',
        fontSize: dimens.text_course_pannle,
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
    AcademicProgress: state.get('academicProgress'),
    root: state.get('root'),
    login: state.get('login')
});

export default connect(mapStateToProps)(AcademicProgress)