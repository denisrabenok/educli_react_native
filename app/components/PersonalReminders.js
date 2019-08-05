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

export class PersonalReminders extends Component {

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
                <Header label="Personal Reminders"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <View style={Styles.pannel}>
                        <Text style={Styles.name}>Personal Reminders</Text>
                        <View style={Styles.symbolrow}>
                            <View style={Styles.symbolLeft}>
                                <View style={[Styles.rect, { backgroundColor: colors.personalReminder_urgent }]}>
                                </View>
                                <Text style={Styles.symboldesc}>{strings.urgent}</Text>
                            </View>
                            <View style={Styles.symbolCenter}>
                                <View style={[Styles.rect, { backgroundColor: colors.personalReminder_inprogress }]}>
                                </View>
                                <Text style={Styles.symboldesc}>{strings.inprogress}</Text>
                            </View>
                            <View style={Styles.symbolRight}>
                                <View style={[Styles.rect, { backgroundColor: colors.personalReminder_done }]}>
                                </View>
                                <Text style={Styles.symboldesc}>{strings.done}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.subpannel}>
                        <Text style={Styles.name}>Want To Add Reminder?</Text>
                        <TextInput underlineColorAndroid='transparent' style={Styles.writetodo} placeholder={strings.writenewtodo} />
                        <View style={Styles.addrow}>
                            <TextInput underlineColorAndroid='transparent' style={Styles.date} placeholder={strings.date} />
                            <View style={Styles.subaddrow}>
                                <Text
                                    style={{
                                        paddingLeft: 5,
                                        fontSize: dimens.text_course_state,
                                    }}>Priority:</Text>
                                <Picker
                                    style={Styles.pickerStyle}
                                    selectedValue={this.state.selectedPriority}
                                    onValueChange={(itemValue, itmeIndex) => this.setState({ selectedPriority: itemValue })}>
                                    <Picker.Item label='Urgent' value='0' />
                                    <Picker.Item label='In Progress' value='1' />
                                    <Picker.Item label='Done' value='2' />
                                </Picker>
                            </View>
                            <Button style={Styles.addbtn}>
                                <Image style={{ height: height / 40, width: height / 40, resizeMode: 'contain' }} source={plus_icon}></Image>
                            </Button>
                        </View>
                        <View style={[Styles.cell, { backgroundColor: 'white' }]}>
                            <View style={Styles.celldate}>
                                <Text style={Styles.day}>11</Text>
                                <Text style={Styles.month}>Jun</Text>
                            </View>
                            <View style={Styles.celldesc}>
                                <View style={Styles.cellrow}>
                                    <View style={[Styles.rect, { backgroundColor: colors.personalReminder_urgent }]}>
                                    </View>
                                    <Text style={Styles.symboldesc}>CHECK ASSESSMENTS</Text>
                                </View>
                                <View style={Styles.cellrow}>
                                    <View style={[Styles.rect, { backgroundColor: colors.personalReminder_inprogress }]}>
                                    </View>
                                    <Text style={Styles.symboldesc}>CHECK ASSESSMENTS</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[Styles.cell, { backgroundColor: '#f2f2f2' }]}>
                            <View style={Styles.celldate}>
                                <Text style={Styles.day}>12</Text>
                                <Text style={Styles.month}>Jun</Text>
                            </View>
                            <View style={Styles.celldesc}>
                                <View style={Styles.cellrow}>
                                    <View style={[Styles.rect, { backgroundColor: colors.personalReminder_urgent }]}>
                                    </View>
                                    <Text style={Styles.symboldesc}>CHECK ASSESSMENTS</Text>
                                </View>
                                <View style={Styles.cellrow}>
                                    <View style={[Styles.rect, { backgroundColor: colors.personalReminder_inprogress }]}>
                                    </View>
                                    <Text style={Styles.symboldesc}>CHECK ASSESSMENTS</Text>
                                </View>
                                <View style={Styles.cellrow}>
                                    <View style={[Styles.rect, { backgroundColor: colors.personalReminder_done }]}>
                                    </View>
                                    <Text style={Styles.symboldesc}>CHECK ASSESSMENTS</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[Styles.cell, { backgroundColor: 'white' }]}>
                            <View style={Styles.celldate}>
                                <Text style={Styles.day}>15</Text>
                                <Text style={Styles.month}>Jul</Text>
                            </View>
                            <View style={Styles.celldesc}>
                                <View style={Styles.cellrow}>
                                    <View style={[Styles.rect, { backgroundColor: colors.personalReminder_urgent }]}>
                                    </View>
                                    <Text style={Styles.symboldesc}>CHECK ASSESSMENTS</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[Styles.cell, { backgroundColor: '#f2f2f2' }]}>
                            <View style={Styles.celldate}>
                                <Text style={Styles.day}>15</Text>
                                <Text style={Styles.month}>Jul</Text>
                            </View>
                            <View style={Styles.celldesc}>
                                <View style={Styles.cellrow}>
                                    <View style={[Styles.rect, { backgroundColor: colors.personalReminder_urgent }]}>
                                    </View>
                                    <Text style={Styles.symboldesc}>CHECK ASSESSMENTS</Text>
                                </View>
                                <View style={Styles.cellrow}>
                                    <View style={[Styles.rect, { backgroundColor: colors.personalReminder_inprogress }]}>
                                    </View>
                                    <Text style={Styles.symboldesc}>CHECK ASSESSMENTS</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[Styles.cell, { backgroundColor: 'white' }]}>
                            <View style={Styles.celldate}>
                                <Text style={Styles.day}>16</Text>
                                <Text style={Styles.month}>Jul</Text>
                            </View>
                            <View style={Styles.celldesc}>
                                <View style={Styles.cellrow}>
                                    <View style={[Styles.rect, { backgroundColor: colors.personalReminder_urgent }]}>
                                    </View>
                                    <Text style={Styles.symboldesc}>CHECK ASSESSMENTS</Text>
                                </View>
                                <View style={Styles.cellrow}>
                                    <View style={[Styles.rect, { backgroundColor: colors.personalReminder_inprogress }]}>
                                    </View>
                                    <Text style={Styles.symboldesc}>CHECK ASSESSMENTS</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: height / 10 + 20, width: width, backgroundColor: 'transparent' }}>
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
    subpannel: {
        width: width / 20 * 17,
        backgroundColor: '#f2f2f2',
        // marginBottom: height / 10
        paddingTop: 20,
        // paddingBottom: 20,
        marginTop: height / 50,
        alignSelf: 'center',
        alignItems: 'center'
    },
    name: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: dimens.text_course_pannle,
        marginBottom: 8,
        textAlign: 'center'
    },
    symbolrow: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rect: {
        height: height / 50,
        width: height / 50,
        marginRight: width / 50,
    },
    symboldesc: {
        fontSize: dimens.text_course_state,
        color: 'black',
        // marginRight: width / 20
    },
    symbolLeft: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        left: 0
    },
    symbolCenter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    symbolRight: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        right: 0
    },
    writetodo: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: width * 17 / 20 - 40,
        height: height * 2.5 / 40,
        paddingLeft: 20,
        marginBottom: 5,
        fontSize: dimens.text_course_state,
        // paddingBottom: 3
    },
    addrow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10
    },
    prioritypicker: {
        height: height * 2.5 / 40,
        width: width / 22.58 * 9,
        borderRadius: 15,
        backgroundColor: 'white',
    },
    date: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: width * 4.22 / 22.58,
        height: height * 2.5 / 40,
        paddingLeft: 20,
        fontSize: dimens.text_course_state,
    },
    pickerStyle: {
        width: width / 22.58 * 6.8,
        height: height / 40 * 2.5,
    },
    addbtn: {
        width: height / 40 * 2.5,
        height: height / 40 * 2.5,
        backgroundColor: colors.accentColor,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 5,
    },
    subaddrow: {
        flex: 1,
        flexDirection: 'row',
        // width: width / 22.58 * 9,
        height: height / 40 * 2.5,
        backgroundColor: 'white',
        borderRadius: 15,
        // justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 5,
    },
    cell: {
        // flex: 1,
        flexDirection: 'row',
        paddingBottom: 10,
        paddingTop: 10
        // width: '100%',
        // backgroundColor: 'yellow',
    },
    celldate: {
        // flex: 1,
        flexDirection: 'column',
        width: width / 20 * 17 / 4,
        // backgroundColor: '#954545',
        justifyContent: 'center',
        alignItems: 'center',
    },
    day: {

    },
    month: {

    },
    celldesc: {
        // flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'green',
        width: width / 20 * 17 / 4 * 3,
        justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
    },
    cellrow: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 5,
        marginVertical: 5,
        // alignSelf: 'center',
        alignItems: 'center',
        // justifyContent: 'center',
    }
};

const mapStateToProps = (state) => ({
    PersonalReminders: state.get('personalReminders'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(PersonalReminders)