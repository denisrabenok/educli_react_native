import React, { Component } from "react";
import { Alert, Image, StatusBar, Text, TextInput, View, Dimensions } from "react-native";
import { Button, Container, Content, Spinner, Icon, Right } from "native-base";
import colors from "../resources/colors";
import ValidationTextInput from "./ValidationTextInput";
import CustomTextInput from "./CustomTextInput";
import { connect } from "react-redux";
import consts from "../const";
import dimens from "../resources/dimens";
import strings from "../resources/strings";
import * as actions from "../actions/action-types";
import styles from "../resources/styles";
// import * as Toast from "@remobile/react-native-toast";
import * as signupActions from "../actions/signup-actions";
import * as rootActions from "../actions/root-actions";
import background from '../assets/background1.png'
import logo from '../assets/logo.png'
import go_icon from '../assets/icons/go_icon.png'
import signupnow_icon from '../assets/icons/signupnow_icon.png'
import Toast from 'react-native-toast-native';
const { width, height } = Dimensions.get('window');

export class Signup extends Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmpassword: ''
        }
    }

    componentDidMount() {
        this.props.dispatch(rootActions.controlProgress(false))
    }

    componentDidUpdate() {
        // this.proceed()
    }

    proceed() {

    }

    isObject(obj) {
        return typeof obj === 'object';
    }

    //noinspection JSMethodCanBeStatic
    setEmail(text) {
        this.setState({ email: text });
    }
    setPassword(text) {
        this.setState({ password: text });
    }
    setConfirmPassword(text) {
        this.setState({ confirmpassword: text });
    }

    render() {
        return (
            <Container style={SignupStyles.containerStyle}>
                <Image source={background}
                    style={SignupStyles.imageStyle} />
                <StatusBar style={SignupStyles.statusBarStyle} />
                <Content contentContainerStyle={SignupStyles.contentStyle}>
                    <Image source={logo}
                        style={SignupStyles.logostyle} />
                    <CustomTextInput
                        label="email"
                        onChangeText={(text) => this.setEmail(text)}
                        style={SignupStyles.emailStyle}
                        placeholder={strings.email}
                        color={colors.accentColor}
                        secureTextEntry={false} />
                    <CustomTextInput
                        label="password"
                        onChangeText={(text) => this.setPassword(text)}
                        style={SignupStyles.emailStyle}
                        placeholder={strings.password}
                        color={colors.accentColor}
                        secureTextEntry={true} />
                    <CustomTextInput
                        label="password"
                        onChangeText={(text) => this.setConfirmPassword(text)}
                        style={SignupStyles.emailStyle}
                        placeholder={strings.confirmpassword}
                        color={colors.accentColor}
                        secureTextEntry={true} />
                    <Button
                        style={SignupStyles.gobuttonStyle}
                        onPress={this.onSignupPress}>
                        <Text style={SignupStyles.gobuttonTextStyle}>{strings.register}</Text>
                        <Image source={go_icon}
                            style={SignupStyles.goiconStyle} />
                    </Button>
                    <Text style={SignupStyles.altsignup}>
                        {strings.altsignin}
                    </Text>
                    <Button
                        style={SignupStyles.buttonStyle}
                        onPress={this.ongotoLoginPress}>
                        <Text style={SignupStyles.buttonTextStyle}>{strings.sign_in}</Text>
                    </Button>
                    {this.renderProgress()}
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
                style={SignupStyles.progressStyle} />
        )
    }

    validateEmail = (text: string): boolean => consts.EMAIL_REGEX.test(text);

    validatePassword = (text: string): boolean => text.length >= consts.MIN_PASSWORD_LENGTH;

    // onSignupPress = () => this.props.dispatch(loginActions.login(this.state.email, this.state.password));
    onSignupPress = () => {
        const toastStyles = {
            width: width,
            height: height / 6,
            backgroundColor: '#34343400',
            color: 'red',
            fontSize: dimens.text_size_button,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center'
        }
        // if (this.state.password != this.state.confirmpassword || this.state.password == '' || this.state.password == '') {
        //     Toast.show('Wrong Input!', Toast.SHORT, Toast.CENTER, toastStyles);
        //     return;
        // }
        // Alert.alert('signup button');
        this.props.dispatch(signupActions.signup(this.state.email, this.state.password));
        // this.props.navigation.navigate(consts.LOGIN_SCREEN);
    }
    ongotoLoginPress = () => {
        this.props.navigation.navigate(consts.LOGIN_SCREEN);
    }
}


const SignupStyles = {
    containerStyle: {
        // flexDirection: 'row',
        // backgroundColor: colors.primaryColor,
        // alignItems: 'center',
        backgroundColor: '#00000055'

    },
    contentStyle: {
        flex: 0,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        // marginHorizontal: dimens.margin_large
    },
    cell: {
        // height: height / 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    statusBarStyle: {
        // backgroundColor: colors.primaryColor
    },
    altsignup: {
        color: 'white',
        marginTop: height / 20,
        marginBottom: height / 40,
        fontSize: dimens.text_size_button,
    },
    emailStyle: {
        alignSelf: 'stretch',
    },
    gobuttonStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: colors.accentColor,
        borderRadius: 15,
        width: width * 17 / 20,
        height: height * 3 / 40,
    },
    buttonStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondColor,
        borderRadius: 15,
        width: width * 17 / 20,
        height: height * 3 / 40,
    },
    gobuttonTextStyle: {
        color: 'white',
        fontSize: dimens.text_size_button,
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: dimens.text_size_button,
    },
    imageStyle: {
        position: 'absolute',
        top: 0,
        width: width,
        height: height,
        resizeMode: 'stretch',
    },
    logostyle: {
        height: height * 7 / 39.86,
        resizeMode: 'contain',
        marginTop: height / 39.86 * 2.6,
        marginBottom: height / 39.86 * 3,
    },
    iconStyle: {
        height: 25,
        resizeMode: 'contain'
    },
    goiconStyle: {
        position: 'absolute',
        right: 20,
        width: width * 1.2 / 22.58,
        resizeMode: 'contain'
    },
    progressStyle: {
        position: 'absolute',
        top: height / 3,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    }
};

const mapStateToProps = (state) => ({
    Signup: state.get('signup'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(Signup)