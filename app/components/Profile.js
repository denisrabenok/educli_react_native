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
import * as profileActions from "../actions/profile-actions";
import * as rootActions from "../actions/root-actions";
import background from '../assets/background2.png'
import Orientation from 'react-native-orientation';
const { width, height } = Dimensions.get('window');

export class Profile extends Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
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
    componentWillMount() {
        if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    }
    componentDidMount() {
        Orientation.lockToPortrait();
        this.props.dispatch(rootActions.controlProgress(false))
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.dispatchGetUserInfo();
    }
    dispatchGetUserInfo() {
        // Alert.alert('profile test: ' + this.props.login.get('idUser'));
        // Alert.alert('idUser: ' + this.props.login.get('idUser'));
        // Alert.alert('token: ' + this.props.login.get('token'));
        this.props.dispatch(profileActions.getUserInfo(this.props.login.get('token'), this.props.login.get('idUser')))
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
                <Header label="Profile"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <View style={Styles.pannel}>
                        <Text style={Styles.name}>{this.props.Profile.get('name') + ' ' + this.props.Profile.get('surname')}</Text>
                        <Text style={Styles.normal}>{strings.dateofbirth}: {this.props.Profile.get('birthDate')}</Text>
                        <Text style={Styles.normal}>{strings.cap_email}: {this.props.Profile.get('email')}</Text>
                        <Text style={Styles.normal}>{strings.address}: {this.props.Profile.get('address')}</Text>
                        <Text style={Styles.normal}>{strings.phone}: {this.props.Profile.get('phone')}</Text>
                        <Text style={Styles.normal}>{strings.passportnumber}: {this.props.Profile.get('passport')}</Text>
                        {/* <Text style={Styles.normal}>{strings.nationality}: {this.props.Profile.get('nationality')}</Text> */}
                    </View>
                    <Button
                        style={Styles.buttonStyle}
                        onPress={this.onEditProfile}>
                        <Text style={Styles.buttonTextStyle}>{strings.editprofile}</Text>
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
    onEditProfile = () => {
        this.props.navigation.navigate(consts.EDITPROFILE_SCREEN);
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
        marginBottom: height / 10
    },
    name: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: dimens.text_course_pannle,
        marginBottom: 8,
    },
    normal: {
        color: 'black',
        fontSize: dimens.text_profile_normal,
        marginTop: 8,
    },
    buttonStyle: {
        marginTop: dimens.margin_medium,
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
    Profile: state.get('profile'),
    root: state.get('root'),
    login: state.get('login')
});

export default connect(mapStateToProps)(Profile)