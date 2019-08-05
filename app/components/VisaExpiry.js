import React, { Component } from "react";
import { Alert, Image, StatusBar, Text, TextInput, View, Dimensions, Picker, ScrollView } from "react-native";
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
import RNPickerSelect from 'react-native-picker-select';
import { Dropdown } from 'react-native-material-dropdown';
import logo from '../assets/logo.png'
import profile_icon from '../assets/icons/profile_icon.png'
import studentCard_icon from '../assets/icons/studentCard_icon.png'
import courses_icon from '../assets/icons/courses_icon.png'
import plus_icon from '../assets/icons/plus_icon.png'
import attendance_icon from '../assets/icons/attendance_icon.png'
import academicProgress_icon from '../assets/icons/academicProgress_icon.png'
import payments_icon from '../assets/icons/payments_icon.png'
import notifications_icon from '../assets/icons/notifications_icon.png'
import personalReminders_icon from '../assets/icons/personalReminders_icon.png'
import visaExpiry_icon from '../assets/icons/visaExpiry_icon.png'
const { width, height } = Dimensions.get('window');

export class VisaExpiry extends Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            selectedPriority: 'Priority: Urgent',
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
                <Header label="Visa Expiry"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <View style={Styles.pannel}>
                        <Text style={Styles.name}>Your Visa Is About To Expire In:</Text>
                        <View>
                            <View>

                            </View>
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
                style={Styles.progressStyle} />
        )
    }

    validateEmail = (text: string): boolean => consts.EMAIL_REGEX.test(text);

    validatePassword = (text: string): boolean => text.length >= consts.MIN_PASSWORD_LENGTH;

    onSignupPress = () => this.props.dispatch(loginActions.login(this.state.email, this.state.password));
    onbanktopayments = () => {
        this.props.navigation.navigate(consts.PAYMENTS_SCREEN);
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
        // flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        // height: height*2,
        // marginHorizontal: dimens.margin_large
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
        marginTop: height / 20,
        alignSelf: 'center'
    },
    name: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: dimens.text_course_pannle,
        marginBottom: 8,
        textAlign: 'center'
    },
};

const mapStateToProps = (state) => ({
    VisaExpiry: state.get('visaExpiry'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(VisaExpiry)