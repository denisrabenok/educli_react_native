import React, { Component } from "react";
import { Alert, Image, StatusBar, Text, Dimensions, AsyncStorage } from "react-native";
import { Button, Container, Content, Spinner } from "native-base";
import colors from "../resources/colors";
import CustomTextInput from "./CustomTextInput";
import { connect } from "react-redux";
import consts from "../const";
import dimens from "../resources/dimens";
import strings from "../resources/strings";
import styles from "../resources/styles";
import * as loginActions from "../actions/login-actions";
import * as rootActions from "../actions/root-actions";
import background from '../assets/background1.png'
import logo from '../assets/logo.png'
import go_icon from '../assets/icons/go_icon.png'
import signupnow_icon from '../assets/icons/signupnow_icon.png'
import Orientation from 'react-native-orientation';
import Toast from 'react-native-toast-native';
const { width, height } = Dimensions.get('window');

export class Login extends Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            token: '',
            idUser: '',
            isGoneAlready: false
        }
        this.getKey();
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        this.props.dispatch(rootActions.controlProgress(false))
    }

    componentDidUpdate() {
        this.proceed()
    }
    async getKey() {
        try {
            var token = await AsyncStorage.getItem('@Educli:token');
            var idUser = await AsyncStorage.getItem('@Educli:idUser');
            // Alert.alert('token: ' + token);
            if (token != null && idUser != null) {
                // Alert.alert('passed');
                // this.setState({ token: token, idUser: idUser});
                this.props.dispatch(loginActions.setLoginSuccess(token, idUser));
                this.setState({ isGoneAlready: true })
                this.props.navigation.navigate(consts.DASHBOARD_SCREEN);
            }
        } catch (error) {
            // console.log("Error retrieving data" + error);
        }
        this.setState({ dummy: true });
    }
    async saveKey(token, idUser) {
        try {
            await AsyncStorage.setItem('@Educli:token', token);
            await AsyncStorage.setItem('@Educli:idUser', idUser);
        } catch (error) {
            console.warn("Error saving data" + error);
        }
    }

    proceed() {
        const loginError = this.props.Login.get('loginError');
        const isLoggedIn = this.props.Login.get('isLoggedIn');
        const token = this.props.Login.get('token');
        const idUser = this.props.Login.get('idUser');
        // Alert.alert('proceed token: ' + token);
        // Alert.alert('proceed idUser: ' + idUser);
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
        if (this.isObject(loginError) && loginError && !this.isObject(loginError.msg) && loginError.msg) {
            Toast.show(loginError.msg, Toast.SHORT, Toast.CENTER, toastStyles);
            // Alert.alert(loginError + '');
            this.setState({ isGoneAlready: false })
            this.props.dispatch(loginActions.setError({}))
        }
        else if (token != null && idUser != null && !this.state.isGoneAlready) {
            this.setState({ isGoneAlready: true });
            this.props.navigation.navigate(consts.DASHBOARD_SCREEN)
        }
    }

    isObject(obj) {
        return typeof obj === 'object';
    }

    // noinspection JSMethodCanBeStatic
    setEmail(text) {
        this.setState({ email: text });
    }
    setPassword(text) {
        this.setState({ password: text });
    }

    render() {
        return (

            <Container style={loginStyles.containerStyle}>
                <Image source={background}
                    style={loginStyles.imageStyle} />
                <StatusBar style={loginStyles.statusBarStyle} />
                <Content contentContainerStyle={loginStyles.contentStyle}>
                    <Image source={logo}
                        style={loginStyles.logostyle} />
                    <CustomTextInput
                        label="email"
                        onChangeText={(text) => this.setEmail(text)}
                        placeholder={strings.email}
                        style={loginStyles.emailStyle}
                        color={colors.accentColor}
                        secureTextEntry={false} />
                    <CustomTextInput
                        label="password"
                        onChangeText={(text) => this.setPassword(text)}
                        placeholder={strings.password}
                        style={loginStyles.emailStyle}
                        color={colors.accentColor}
                        secureTextEntry={true} />
                    <Button
                        style={loginStyles.gobuttonStyle}
                        onPress={() => { this.onLoginPress() }}>
                        <Text style={loginStyles.gobuttonTextStyle}>{strings.log_in}</Text>
                        <Image source={go_icon}
                            style={loginStyles.goiconStyle} />
                    </Button>
                    <Text style={loginStyles.altsignup}>
                        {strings.altsignup}
                    </Text>
                    <Button
                        style={loginStyles.buttonStyle}
                        onPress={this.onSignupNowPress}>
                        <Image source={signupnow_icon}
                            style={loginStyles.iconStyle} />
                        <Text style={loginStyles.buttonTextStyle}>{strings.signupnow}</Text>
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
                color={colors.secondColor}
                animating={true}
                size={'large'}
                style={loginStyles.progressStyle} />
        )
    }

    validateEmail = (text: string): boolean => consts.EMAIL_REGEX.test(text);

    validatePassword = (text: string): boolean => text.length >= consts.MIN_PASSWORD_LENGTH;

    onLoginPress = () => {
        this.props.dispatch(loginActions.login(this.state.email, this.state.password));
    }
    onSignupNowPress = () => {
        this.props.navigation.navigate(consts.SIGNUP_SCREEN);
    }
}


const loginStyles = {
    containerStyle: {
        // flexDirection: 'row',
        // backgroundColor: colors.primaryColor,
        // alignItems: 'center',
        backgroundColor: '#00000055'
    },
    contentStyle: {
        // flex: 0,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        // marginHorizontal: dimens.margin_large
    },
    statusBarStyle: {
        // backgroundColor: colors.primaryColor
    },
    altsignup: {
        color: 'white',
        marginTop: height * 4.5 / 40,
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
        // marginTop: dimens.margin_medium,
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
        // width: width * 12.5 / 22.58,
        height: height * 7 / 39.86,
        resizeMode: 'contain',
        marginBottom: height / 39.86 * 4.5,
        marginTop: height / 39.86 * 2.6
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
    Login: state.get('login'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(Login)