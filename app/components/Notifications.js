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
import * as notificationsActions from "../actions/notifications-actions";
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

export class Notifications extends Component {

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
        this.dispatchGetNotes();
    }

    componentDidUpdate() {
        this.proceed()
    }

    dispatchGetNotes() {
        // Alert.alert('profile test: ' + this.props.login.get('idUser'));
        // Alert.alert('idUser: ' + this.props.login.get('idUser'));
        // Alert.alert('token: ' + this.props.login.get('token'));
        this.props.dispatch(notificationsActions.getNotifications(this.props.login.get('token'), this.props.login.get('idUser')))
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

    getNotifications() {
        let notes = this.props.Notifications.get('notes');
        if (notes != null)
            // Alert.alert('notes: ' + notes[0].nameAgent)
            return notes.map((item, index) => {
                // Alert.alert(item + ', ' + notes.length);
                // let flag = false;
                // if (index == 0 || index == playerAttr.length - 1) {
                //     flag = true;
                //     // Alert.alert('testsets');
                // }
                return (
                    // {flag? <View style={height: play_h/10}/>:null}
                    <View style={Styles.cell}>
                        <View>
                            <Text style={Styles.num}>{index + 1}</Text>
                        </View>
                        <View style={Styles.descRow}>
                            <Text style={Styles.desc}>Dear {item.idUser}, {item.body}</Text>
                            <Text style={Styles.desc}>thank you. {item.nameAgent}</Text>
                        </View>
                    </View>
                );
            }
            );
        else
            return (
                // {flag? <View style={height: play_h/10}/>:null}
                <View style={Styles.cell}>
                    <View>
                        <Text style={Styles.num}>0</Text>
                    </View>
                    <View style={Styles.descRow}>
                        <Text style={Styles.desc}>You have no notification</Text>
                        <Text style={Styles.desc}>thank you</Text>
                    </View>
                </View>
            );
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
                <Header label="Notifications"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <View style={Styles.pannel}>
                        <Text style={Styles.name}>College Notifications</Text>
                        {this.getNotifications()}
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
    cell: {
        flex: 1,
        flexDirection: 'row',
        marginTop: height / 40,
        justifyContent: 'center',
    },
    num: {
        backgroundColor: colors.accentColor,
        color: 'black',
        fontWeight: 'bold',
        fontSize: dimens.text_profile_normal,
        width: width / 20,
        textAlign: 'center'
    },
    descRow: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    desc: {
        marginLeft: width / 20,
        fontSize: dimens.text_course_state,
        width: width / 20 * 17 - 40 - width / 10,
        textAlign: 'justify',
        color: 'black'
    }
};

const mapStateToProps = (state) => ({
    Notifications: state.get('notifications'),
    root: state.get('root'),
    login: state.get('login')
});

export default connect(mapStateToProps)(Notifications)