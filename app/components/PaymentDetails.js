import React, { Component } from "react";
import { Alert, Image, StatusBar, Text, TextInput, View, Dimensions, } from "react-native";
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
import background from '../assets/background2.png'
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
const { width, height } = Dimensions.get('window');

export class PaymentDetails extends Component {

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
    render() {
        return (
            <Container style={Styles.containerStyle}>
                <Image source={background}
                    style={Styles.imageStyle} />
                <StatusBar style={Styles.statusBarStyle} />
                <Header label="Payment Details"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <View style={Styles.pannel}>
                        <Text style={Styles.name}>Payment Details</Text>
                        <Text style={Styles.normal}>{strings.currentcourse} [17/06/2012 - 09/06/2013]</Text>
                        <Text style={Styles.normal}>{strings.certificate} IV IN WEB DEVELOPMENT</Text>
                        <Text style={Styles.normal}>TERM 2 (24/02/2012 - 12/08/2012)</Text>
                        <Text style={Styles.normal}>{strings.amount}: 1300 AUD</Text>
                        <Text style={Styles.normal}>{strings.duedate}: 24/02/2012</Text>
                        <Text style={Styles.normal}>{strings.bankmethod}: BANK DEPOSIT</Text>
                        <Text style={Styles.normal}>{strings.bankname}: SAINT GEORGE AUSTRALIA</Text>
                        <Text style={Styles.normal}>{strings.bankaccount}: EDUCLI COLLEGE EDUCATION</Text>
                        <Text style={Styles.normal}>BSB: 062-6428</Text>
                        <Text style={Styles.normal}>{strings.account}: 123456789</Text>
                        <Text style={Styles.normal}>{strings.anyfurtherquestioncontact}:</Text>
                        <Text style={Styles.normal}>{strings.paymentsmanager}: 0420 420420</Text>
                    </View>
                    <Button
                        style={Styles.buttonStyle}
                        onPress={this.onbanktopayments}>
                        <Text style={Styles.buttonTextStyle}>{strings.banktopayments}</Text>
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
    onbanktopayments = () => {
        this.props.navigation.pop();
        // this.props.navigation.navigate(consts.PAYMENTS_SCREEN);
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
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: dimens.margin_large
    },
    imageStyle: {
        position: 'absolute',
        top: 0,
        width: width,
        height: height,
        resizeMode: 'stretch',
    },
    pannel: {
        width: width / 20 * 17,
        padding: 20,
        backgroundColor: 'white',
        // marginBottom: height / 10
        marginTop: height / 20
    },
    name: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: dimens.text_course_pannle,
        marginBottom: 8,
    },
    normal: {
        color: 'black',
        fontSize: dimens.text_paymentdetails_normal,
        marginTop: 8,
    },
    buttonStyle: {
        marginTop: height / 20,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: colors.accentColor,
        borderRadius: 15,
        width: width * 17 / 20,
        height: height * 3 / 40,
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: dimens.text_size_button,
    }

};

const mapStateToProps = (state) => ({
    PaymentDetails: state.get('PaymentDetails'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(PaymentDetails)