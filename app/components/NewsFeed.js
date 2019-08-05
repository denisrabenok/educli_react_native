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
import * as loginActions from "../actions/login-actions";
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
import sample from '../assets/icons/visaExpiry_icon.png'
const { width, height } = Dimensions.get('window');

export class NewsFeed extends Component {

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
                <Header label="News Feed"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <View style={Styles.newsItemRow}>
                        <View style={Styles.newsDescGroup}>
                            <Text style={Styles.newsDesc}>Apple apologizes, issues fix for MacBook Pro throttling 'bug'</Text>
                            <Text style={Styles.newsSite}>news.com.au • one hour ago</Text>
                        </View>
                        <Image style={Styles.itemImg} source={background} />
                    </View>
                    <View style={Styles.newsItemRow}>
                        <View style={Styles.newsDescGroup}>
                            <Text style={Styles.newsDesc}>Apple apologizes, issues fix for MacBook Pro throttling 'bug'</Text>
                            <Text style={Styles.newsSite}>news.com.au • one hour ago</Text>
                        </View>
                        <Image style={Styles.itemImg} source={background} />
                    </View>
                    <View style={Styles.newsItemRow}>
                        <View style={Styles.newsDescGroup}>
                            <Text style={Styles.newsDesc}>Apple apologizes, issues fix for MacBook Pro throttling 'bug'</Text>
                            <Text style={Styles.newsSite}>news.com.au • one hour ago</Text>
                        </View>
                        <Image style={Styles.itemImg} source={background} />
                    </View>
                    <View style={Styles.newsItemRow}>
                        <View style={Styles.newsDescGroup}>
                            <Text style={Styles.newsDesc}>Apple apologizes, issues fix for MacBook Pro throttling 'bug'</Text>
                            <Text style={Styles.newsSite}>news.com.au • one hour ago</Text>
                        </View>
                        <Image style={Styles.itemImg} source={background} />
                    </View>
                    <Button
                        style={Styles.buttonStyle}
                        onPress={this.ongotoLoginPress}>
                        <Text style={Styles.buttonTextStyle}>{strings.seemore}</Text>
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
        // this.props.navigation.navigate(consts.LOGIN_SCREEN);
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
        paddingTop: height / 20,
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
        marginTop: width * 1.5 / 40
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: dimens.text_size_button,
    },
    newsItemRow: {
        flexDirection: 'row',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: '#c6c0ba',
        width: width / 20 * 17,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: height / 40,
    },
    newsDescGroup: {
        width: width / 20 * 17 * 4 / 5 - 20,
    },
    itemImg: {
        width: width / 20 * 17 / 5 - 10,
        height: width / 20 * 17 / 5 - 10,
        resizeMode: 'cover',
        borderRadius: 15
    },
    newsDesc: {
        fontSize: dimens.text_course_title,
        color: 'black'
    },
    newsSite: {
        marginTop: 3,
        fontSize: dimens.text_course_state,
        color: 'black'
    }
};

const mapStateToProps = (state) => ({
    NewsFeed: state.get('newsFeed'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(NewsFeed)