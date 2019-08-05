import React, { Component } from "react";
import { Alert, Image, StatusBar, Text, TextInput, View, Dimensions, } from "react-native";
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
import * as paymentsActions from "../actions/payments-actions";
import * as rootActions from "../actions/root-actions";
import background from '../assets/background2.png'
import idcard from '../assets/studentcard.png'
import logo from '../assets/logo.png'
import payments_go_icon from '../assets/icons/payments_go_icon.png'
import profile_icon from '../assets/icons/profile_icon.png'
import studentCard_icon from '../assets/icons/studentCard_icon.png'
import courses_icon from '../assets/icons/courses_icon.png'
import attendance_icon from '../assets/icons/attendance_icon.png'
import academicProgress_icon from '../assets/icons/academicProgress_icon.png'
import payments_icon from '../assets/icons/payments_icon.png'
import notifications_icon from '../assets/icons/notifications_icon.png'
import personalReminders_icon from '../assets/icons/personalReminders_icon.png'
import visaExpiry_icon from '../assets/icons/visaExpiry_icon.png'
const { width, height } = Dimensions.get('window');

export class Payments extends Component {

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
        this.props.dispatch(rootActions.controlProgress(false))
        this.props.dispatch(paymentsActions.getPayments(this.props.login.get('token'), this.props.login.get('idUser')))
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

    getPayments() {
        let payments = this.props.Payments.get('payments');
        // console.log('view: ', payments)
        if (payments != null)
            // Alert.alert('notes: ' + notes[0].nameAgent)
            return payments.map((item, index) => {
                // Alert.alert(item + ', ' + notes.length);
                // let flag = false;
                // if (index == 0 || index == playerAttr.length - 1) {
                //     flag = true;
                //     // Alert.alert('testsets');
                // }
                return (
                    // {flag? <View style={height: play_h/10}/>:null}
                    <View style={Styles.substateView}>
                        <Text style={Styles.state}>{item.courseName} - AUD {item.amount} - {item.paid==1?'Paid': 'Unpaid'}</Text>
                        <Button
                            style={Styles.buttonStyle}
                            onPress={(index) => { this.goDetail(index); }}>
                            <Image source={payments_go_icon}
                                style={Styles.iconStyle} />
                        </Button>
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
                <Header label="Payments"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <View style={Styles.pannel}>
                        <Text
                            style={Styles.name}>MY PAYMENTS</Text>
                        {this.getPayments()}
                        {/* <View style={Styles.substateView}>
                            <Text style={Styles.state}>CERT VI BUSINESS TERM 1 - AUD 1300 - 27/10/2017</Text>
                            <Button
                                style={Styles.buttonStyle}
                                onPress={(index) => { this.goDetail(1); }}>
                                <Image source={payments_go_icon}
                                    style={Styles.iconStyle} />
                            </Button>
                        </View>
                        <View style={Styles.substateView}>
                            <Text style={Styles.state}>CERT VI BUSINESS TERM 1 - AUD 1300 - 27/10/2017</Text>
                            <Button
                                style={Styles.buttonStyle}
                                onPress={(index) => { this.goDetail(2); }}>
                                <Image source={payments_go_icon}
                                    style={Styles.iconStyle} />
                            </Button>
                        </View>
                        <View style={Styles.substateView}>
                            <Text style={Styles.state}>CERT VI BUSINESS TERM 1 - AUD 1300 - 27/10/2017</Text>
                            <Button
                                style={Styles.buttonStyle}
                                onPress={(index) => { this.goDetail(3); }}>
                                <Image source={payments_go_icon}
                                    style={Styles.iconStyle} />
                            </Button>
                        </View> */}
                    </View>
                    <View style={{ height: 100, backgroundColor: 'transparent' }}></View>
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

    // onSignupPress = () => this.props.dispatch(loginActions.login(this.state.email, this.state.password));
    ongotoLoginPress = () => {
        // this.props.navigation.navigate(consts.LOGIN_SCREEN);
        Alert.alert('test');
    }
    goDetail = (index) => {
        // Alert.alert('test: ' + index);
        this.props.navigation.navigate(consts.PAYMENTDETAILS_SCREEN);
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
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: height * 0.8 / 40,
        width: width * 0.8 / 22.58,
        borderWidth: 0,
        shadowRadius: 0,
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: dimens.text_size_button,
    },
    idcard: {
        width: width * 17 / 20,
        resizeMode: 'contain'
    },
    iconStyle: {
        height: height * 0.8 / 40,
        width: width * 0.8 / 22.58,
        resizeMode: 'contain'
    },
    pannel: {
        flex: 1,
        flexDirection: 'column',
        marginTop: width / 40 * 3,
        width: width / 20 * 17,
        padding: 20,
        backgroundColor: 'white',
    },
    stateView: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        width: width / 20 * 17 - 40,
        marginTop: height / 40 * 1.2,
        marginBottom: height / 40 * 0.3
    },
    substateView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: width / 20 * 17 - 40,
        // marginTop: height / 100,
        height: height / 40 * 2.5
    },
    state: {
        // textAlign: 'center',
        // alignContent: 'center',
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
        width: width / 20 * 17 - 40
    },
    incompleteprogress: {
        position: 'absolute',
        left: 0,
        height: height / 40 * 1.6,
        backgroundColor: colors.incomplete_progress_color,
        width: (width / 20 * 17 - 40) * 7 / 10
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
        // marginBottom: 10,
    },
    pannelname: {
        // fontSize: dimens.text_profile_normal,
        fontWeight: 'bold',
        color: 'black',
        fontSize: dimens.text_course_pannle,
        marginBottom: 10,
    }
};

const mapStateToProps = (state) => ({
    Payments: state.get('payments'),
    root: state.get('root'),
    login: state.get('login')
});

export default connect(mapStateToProps)(Payments)