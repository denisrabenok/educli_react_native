import React, { Component } from "react";
import { Alert, Image, StatusBar, Text, TextInput, View, Dimensions, BackHandler, Platform, ScrollView } from "react-native";
import { Button, Container, Content, Spinner, Icon, Right, Input } from "native-base";
import colors from "../resources/colors";
import ValidationTextInput from "./ValidationTextInput";
import SearchTextInput from "./SearchTextInput";
import LandscapeHeader from "./LandscapeHeader";
import CustomProgressCircle from "./CustomProgressCircle";
import { connect } from "react-redux";
import consts from "../const";
import dimens from "../resources/dimens";
import strings from "../resources/strings";
import * as actions from "../actions/action-types";
import styles from "../resources/styles";
import * as loginActions from "../actions/login-actions";
import * as rootActions from "../actions/root-actions";
import background from '../assets/background2.png'
import Orientation from 'react-native-orientation';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

const { width, height } = Dimensions.get('window');

export class FullAttendanceReport extends Component {

    static navigationOptions = {
        header: null
    };
    handleBackButtonClick() {
        Orientation.lockToPortrait();
        this.props.navigation.pop();

        return true;
    }
    constructor() {
        super();
        this.state = {
            tableHead: [strings.classcode, strings.classdescription, strings.venue, strings.trainer, strings.startdate, strings.starttime, strings.endtime, strings.attendance_capital],
            widthArr: [height / 900 * 140, height / 900 * 220, height / 900 * 85, height / 900 * 100, height / 900 * 80, height / 900 * 70, height / 900 * 70, height / 900 * 120]
        }
        if (Platform.OS !== 'android') return;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
        Orientation.lockToLandscape();
        this.props.dispatch(rootActions.controlProgress(false))
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidUpdate() {
        this.proceed()
    }
    componentWillMount() {

    }

    componentWillUnmount() {
        if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    }
    handleBackPress() {
        handleBackPress = () => {
            this.goBack(); // works best when the goBack is async
            return true;
        }
    }
    async goBack() {
        Orientation.lockToPortrait();
        this.props.navigation.navigate(consts.ATTENDANCE_SCREEN);
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
    getAttendances = () => {
        const tableData = [];
        const timetables = this.props.attendance.get('timetables');
        for (var i = 0; i < timetables.length; i++) {
            // console.log('classrooms: ' + i, timetables[i].classrooms.length);
            for (var j = 0; j < timetables[i].classrooms.length; j++) {
                var attendanceItem = timetables[i].classrooms[j];
                var rate = 0;
                if (attendanceItem.attendancePct != null)
                    rate = attendanceItem.attendancePct;
                let rowData =
                    [
                        attendanceItem.code,
                        attendanceItem.name,
                        attendanceItem.venue,
                        attendanceItem.teacherNmae + ' ' + attendanceItem.teacherSurname,
                        attendanceItem.startDate,
                        attendanceItem.startTime,
                        attendanceItem.endTIme,
                        rate
                    ];
                tableData.push(rowData);
            }
        }

        return tableData.map((rowData, index) => (
            <TableWrapper key={index} style={[Styles.row, (index + 1) % 2 && { backgroundColor: '#ffffff90' }]}>
                {
                    rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 7 ? cellData + '%' : cellData} textStyle={Styles.text} style={[this.cellStyle(cellData, cellIndex, index), { width: this.state.widthArr[cellIndex] }]} />
                    ))
                }
            </TableWrapper>
        ))
    }

    cellStyle = (cellData, cellIndex, index) => {
        if (cellIndex == 7) {
            var color = '';
            if (cellData >= 100) {
                if (index % 2)
                    color = colors.lightpassedColor;
                else
                    color = colors.darkpassedColor;
            }
            else if (cellData >= 50) {
                if (index % 2)
                    color = colors.secondColor;
                else
                    color = colors.darksecondColor;
            }
            else {
                if (index % 2)
                    color = colors.lightdangerColor;
                else
                    color = colors.darkdangerColor;
            }
            // Alert.alert(cellData + ', '+ color)
            return { backgroundColor: color }
        }
    }
    render() {
        // const state = this.state;
        // const tableData = [];

        // for (var i = 0; i < 10; i += 1) {
        //     // const rowData = [];
        //     // for (let j = 0; j < 9; j += 1) {
        //     //     rowData.push(`${i}${j}`);
        //     // }

        //     let rowData = ['171415_BO98C207', 'Dip Web Dev Class 2070-Term 1', 'Brookvale', 'Trainer Test', '25/10/17', '14:30', '18.30', 100];
        //     if (i % 3 == 0)
        //         rowData = ['171415_BO98C207', 'Dip Web Dev Class 2070-Term 1', 'Brookvale', 'Trainer Test', '25/10/17', '14:30', '18.30', 100]
        //     else if (i % 3 == 1)
        //         rowData = ['171415_BO98C207', 'Dip Web Dev Class 2070-Term 1', 'Brookvale', 'Trainer Test', '25/10/17', '14:30', '18.30', 50]
        //     else
        //         rowData = ['171415_BO98C207', 'Dip Web Dev Class 2070-Term 1', 'Brookvale', 'Trainer Test', '25/10/17', '14:30', '18.30', 10]
        //     tableData.push(rowData);
        // }

        const cellStyle = (cellData, cellIndex, index) => {
            if (cellIndex == 7) {
                var color = '';
                if (cellData >= 100) {
                    if (index % 2)
                        color = colors.lightpassedColor;
                    else
                        color = colors.darkpassedColor;
                }
                else if (cellData >= 50) {
                    if (index % 2)
                        color = colors.secondColor;
                    else
                        color = colors.darksecondColor;
                }
                else {
                    if (index % 2)
                        color = colors.lightdangerColor;
                    else
                        color = colors.darkdangerColor;
                }
                // Alert.alert(cellData + ', '+ color)
                return { backgroundColor: color }
            }
        }

        return (
            <Container style={Styles.containerStyle}>
                <StatusBar style={Styles.statusBarStyle} />
                <LandscapeHeader label="Full Attendance Report"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit}
                    navigation={this.props.navigation} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <Table borderStyle={{ borderColor: '#C1C0B9', borderWidth: 0, }}>
                        <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={Styles.header} textStyle={Styles.text} />
                    </Table>
                    {/* <ScrollView style={Styles.dataWrapper}> */}
                    <Table borderStyle={{ borderColor: '#C1C0B9', borderWidth: 0, borderRightWidth: 0, }}>
                        {/* {
                                tableData.map((rowData, index) => (
                                    <TableWrapper key={index} style={[Styles.row, (index + 1) % 2 && { backgroundColor: '#ffffff90' }]}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} data={cellIndex === 7 ? cellData + '%' : cellData} textStyle={Styles.text} style={[cellStyle(cellData, cellIndex, index), { width: state.widthArr[cellIndex] }]} />
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            } */}
                        {this.getAttendances()}
                    </Table>
                    {/* </ScrollView> */}
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

        Orientation.lockToPortrait();
        this.props.navigation.navigate(consts.LOGIN_SCREEN);
    }
}


const Styles = {
    containerStyle: {
        flexDirection: 'column',
        // backgroundColor: colors.primaryColor,
        // alignItems: 'center',
        backgroundColor: colors.empty_background_color

    },
    contentStyle: {
        position: 'absolute',
        top: height / 13,
        // height: height * 9 / 10 - StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingBottom: height / 7 + StatusBar.currentHeight,
        // marginHorizontal: dimens.margin_large
    },
    statusBarStyle: {

    },
    header: {
        height: 50,
        backgroundColor: colors.accentColor,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: dimens.text_course_state,
    },
    dataWrapper: {
        marginTop: -1
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#E7E6E1',
        borderBottomWidth: 1,
    }
};

const mapStateToProps = (state) => ({
    FullAttendanceReport: state.get('fullAttendanceReport'),
    root: state.get('root'),
    attendance: state.get('attendance')
});

export default connect(mapStateToProps)(FullAttendanceReport)