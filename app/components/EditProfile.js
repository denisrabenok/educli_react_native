import React, { Component } from "react";
import ReactNative, { Alert, Image, StatusBar, Text, TextInput, View, Dimensions, ScrollView, BackHandler, Platform } from "react-native";
import { Button, Container, Content, Spinner, Icon, Right, Input } from "native-base";
import colors from "../resources/colors";
import Toast from 'react-native-toast-native';
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
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { KeyboardAwareView  } from 'react-native-keyboard-aware-view'
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

export class EditProfile extends Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            firstName: '',
            surName: '',
            email: '',
            confirmemail: '',
            address: '',
            phone: '',
            mobile: '',
            passportnumber: '',
            expirydate: '',
            issuedate: '',
            dateofbirth: ''
        }
        if (Platform.OS !== 'android') return;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    handleBackButtonClick() {
        // Alert.alert('test1')
        Orientation.lockToPortrait();
        this.props.navigation.pop();
        return true;
    }
    componentDidMount() {
        Orientation.lockToPortrait();
        this.props.dispatch(rootActions.controlProgress(false))
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.setState({
            firstName: this.props.Profile.get('name'),
            surName: this.props.Profile.get('surname'),
            email: this.props.Profile.get('email'),
            confirmemail: this.props.Profile.get('email'),
            address: this.props.Profile.get('address'),
            phone: this.props.Profile.get('phone'),
            mobile: this.props.Profile.get('mobile'),
            passportnumber: this.props.Profile.get('passport'),
            expirydate: this.props.Profile.get('passportExpiryDate'),
            issuedate: this.props.Profile.get('passportIssueDate'),
            dateofbirth: this.props.Profile.get('birthDate')
        });
    }

    componentDidUpdate() {
        this.proceed()
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
    setFirstName(text) {
        this.setState({ firstName: text });
    }
    setSurName(text) {
        this.setState({ surName: text });
    }
    setEmail(text) {
        this.setState({ email: text });
    }
    setConfirmEmail(text) {
        this.setState({ confirmemail: text });
    }
    setAddress(text) {
        this.setState({ address: text });
    }
    setPhone(text) {
        this.setState({ phone: text });
    }
    setMobile(text) {
        this.setState({ mobile: text });
    }
    setPassportNum(text) {
        this.setState({ passportnumber: text });
    }
    setExpiryDate(text) {
        this.setState({ expirydate: text });
    }
    setIssueDate(text) {
        this.setState({ issuedate: text });
    }
    setBirthDate(text) {
        this.setState({ dateofbirth: text });
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
                <Header label="Edit Profile"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <TextInput value={this.state.firstName} onChangeText={(text) => this.setFirstName(text)} underlineColorAndroid='transparent' style={Styles.long1} placeholder={strings.firstName} />
                    <TextInput value={this.state.surName} onChangeText={(text) => this.setSurName(text)} underlineColorAndroid='transparent' style={Styles.long1} placeholder={strings.surName} />
                    <TextInput value={this.state.email} onChangeText={(text) => this.setEmail(text)} underlineColorAndroid='transparent' style={Styles.long1} placeholder={strings.email} />
                    <TextInput value={this.state.confirmemail} onChangeText={(text) => this.setConfirmEmail(text)} underlineColorAndroid='transparent' style={Styles.long2} placeholder={strings.confirmemail} placeholderTextColor='white' />
                    <TextInput value={this.state.address} onChangeText={(text) => this.setAddress(text)} underlineColorAndroid='transparent' style={Styles.long1} placeholder={strings.address_normal} />
                    <View style={Styles.row}>
                        <TextInput value={this.state.phone} onChangeText={(text) => this.setPhone(text)} underlineColorAndroid='transparent' style={Styles.short1} placeholder={strings.phone_normal} />
                        <TextInput value={this.state.mobile} onChangeText={(text) => this.setMobile(text)} underlineColorAndroid='transparent' style={Styles.short2} placeholder={strings.mobile_normal} />
                    </View>
                    <View style={Styles.row}>
                        <TextInput value={this.state.passportnumber} onChangeText={(text) => this.setPassportNum(text)} underlineColorAndroid='transparent' style={Styles.short1} placeholder={strings.passportnumber_normal} />
                        <TextInput value={this.state.expirydate} onChangeText={(text) => this.setExpiryDate(text)} underlineColorAndroid='transparent' style={Styles.short2} placeholder={strings.expirydate_normal} />
                    </View>
                    <View style={Styles.row}>
                        <TextInput value={this.state.issuedate} onChangeText={(text) => this.setIssueDate(text)} underlineColorAndroid='transparent' style={Styles.short1} placeholder={strings.issuedate_normal} />
                        <TextInput value={this.state.dateofbirth} onChangeText={(text) => this.setBirthDate(text)} underlineColorAndroid='transparent' style={Styles.short2} placeholder={strings.dateofbirth_normal} />
                    </View>
                    <Button
                        style={Styles.buttonStyle}
                        onPress={() => this.onSaveChange()}>
                        <Text style={Styles.buttonTextStyle}>{strings.savechanges}</Text>
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
    onSaveChange = () => {
        const toastStyles = {
            width: width,
            height: height / 6,
            backgroundColor: '#34343400',
            color: 'red',
            fontSize: dimens.text_size_button,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center'
        };
        // Toast.show('test', Toast.SHORT, Toast.CENTER, toastStyles);
        if (this.state.firstName == '') {
            Toast.show('First Name is empty', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        if (this.state.surName == '') {
            Toast.show('Surname is empty', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        if (this.state.email == '') {
            Toast.show('Email is empty', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        if (!this.validateEmail(this.state.email)) {
            Toast.show('Email is wrong format', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        if (this.state.email != this.state.confirmemail) {
            Toast.show('Confirm Email is not matched', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        if (this.state.address == '') {
            Toast.show('Address is empty', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        if (this.state.phone == '') {
            Toast.show('Phone is empty', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        if (this.state.mobile == '') {
            Toast.show('Mobile is empty', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        if (this.state.passportnumber == '') {
            Toast.show('Passport number is empty', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        if (this.state.expirydate == '') {
            Toast.show('Passport Expirydate is empty', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        if (this.state.issuedate == '') {
            Toast.show('Passport issuedate is empty', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        if (this.state.dateofbirth == '') {
            Toast.show('Birth Date is empty', Toast.SHORT, Toast.CENTER, toastStyles);
            return;
        }
        this.props.dispatch(profileActions.updatetUserInfo(this.props.login.get('token'), this.props.login.get('idUser'), this.state));
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
        // height: height * 8 / 10 - StatusBar.currentHeight,
        // height: height * 8 / 10,
        marginTop: height / 40 * 3,
        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: dimens.margin_large,
        paddingBottom: height / 9,
    },
    scrollStyle: {
        width: width,
        alignSelf: 'center'
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
        marginTop: height / 20,
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: dimens.text_size_button,
    },
    row: {
        // flex: 1,
        // flexDirection: 'row',
        width: width * 17 / 20,
        height: height * 2.5 / 40,
        // alignItems: 'center',
        // alignSelf: 'center'
        marginBottom: 5,
    },
    long1: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: width * 17 / 20,
        height: height * 2.5 / 40,
        paddingLeft: 20,
        marginBottom: 5,
        paddingBottom: 0,
        paddingTop: 0
    },
    long2: {
        backgroundColor: colors.secondColor,
        borderRadius: 15,
        width: width * 17 / 20,
        height: height * 2.5 / 40,
        paddingLeft: 20,
        color: 'white',
        marginBottom: 5,
        paddingBottom: 0,
        paddingTop: 0
    },
    short1: {
        height: height * 2.5 / 40,
        position: 'absolute',
        left: 0,
        backgroundColor: 'white',
        borderRadius: 15,
        width: (width * 17 / 20 - 10) / 2,
        paddingLeft: 20,
        marginBottom: 5,
        paddingBottom: 0,
        paddingTop: 0
    },
    short2: {
        height: height * 2.5 / 40,
        position: 'absolute',
        right: 0,
        backgroundColor: 'white',
        borderRadius: 15,
        width: (width * 17 / 20 - 10) / 2,
        paddingLeft: 20,
        marginBottom: 5,
        paddingBottom: 0,
        paddingTop: 0
    }
};

const mapStateToProps = (state) => ({
    EditProfile: state.get('editProfile'),
    root: state.get('root'),
    Profile: state.get('profile'),
    login: state.get('login')
});

export default connect(mapStateToProps)(EditProfile)