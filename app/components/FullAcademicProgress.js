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

export class FullAcademicProgress extends Component {

    static navigationOptions = {
        header: null
    };
    handleBackButtonClick() {
        // Alert.alert(
        //     'Exit App',
        //     'Do you want to exit?',
        //     [
        //         { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        //         { text: 'Yes', onPress: () => BackHandler.exitApp() },
        //     ],
        //     { cancelable: false })
        Orientation.lockToPortrait();
        this.props.navigation.pop();

        return true;
    }
    constructor() {
        super();
        this.state = {
            tableHead: [strings.unitCode, strings.unitName, strings.startdate, strings.enddate, strings.Assessment1, strings.Assessment2, strings.Assessment3, strings.outCome],
            widthArr: [height / 900 * 140, height / 900 * 220, height / 900 * 90, height / 900 * 90, height / 900 * 90, height / 900 * 90, height / 900 * 90, height / 900 * 90]
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
    getUnits = () => {
        const unitData = [];
        const unittables = this.props.academicProgress.get('progresses');
        for (var i = 0; i < unittables.length; i++) {
            // console.log('Courses: ' + i, unittables[i].Courses.length);
            for (var j = 0; j < unittables[i].Courses.length; j++) {
                var coursesItem = unittables[i].Courses[j];
                // if (unitItem.attendancePct != null)
                //     rate = unitItem.attendancePct;
                for (var k = 0; k < unittables[i].Courses[j].Units.length; k++) {
                    var unitItem = unittables[i].Courses[j].Units[k]
                    let rowData =
                        [
                            unitItem.UnitCode,
                            unitItem.UnitName,
                            unitItem.startDate,
                            unitItem.endDate,
                            unitItem.Assessment1,
                            unitItem.Assessment2,
                            unitItem.Assessment3,
                            unitItem.Outcome
                        ];
                    unitData.push(rowData);
                }
            }
        }

        return unitData.map((rowData, index) => (
            <TableWrapper key={index} style={[Styles.row, (index + 1) % 2 && { backgroundColor: '#ffffff90' }]}>
                {
                    rowData.map((cellData, cellIndex) => (
                        <Cell
                            key={cellIndex}
                            data={cellData}
                            textStyle={Styles.text}
                            style={
                                [
                                    {
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        width: this.state.widthArr[cellIndex]
                                    }
                                    , cellIndex == 7 ? this.cellStyle(cellData, index) : null
                                ]
                            } />
                    ))
                }
            </TableWrapper>
        ))
    }
    cellStyle = (cellData, index) => {
        var color = '';
        if (cellData == 'C') {
            if (index % 2)
                color = colors.lightpassedColor;
            else
                color = colors.darkpassedColor;
        }
        else if (cellData == 'NYC') {
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
    render() {

        return (
            <Container style={Styles.containerStyle}>
                <StatusBar style={Styles.statusBarStyle} />
                <LandscapeHeader label="Full Academic Progress"
                    onPressOpt={this.onPressOpt}
                    onPressExit={this.onPressExit}
                    navigation={this.props.navigation} />
                <Content contentContainerStyle={Styles.contentStyle}>
                    <Table borderStyle={{ borderColor: '#C1C0B9', borderWidth: 0, }}>
                        <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={Styles.header} textStyle={Styles.text} />
                    </Table>
                    <ScrollView style={Styles.dataWrapper}>
                        <Table borderStyle={{ borderColor: '#C1C0B9', borderWidth: 0, borderRightWidth: 0, }}>
                            {this.getUnits()}
                        </Table>
                    </ScrollView>
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
        // marginHorizontal: dimens.margin_large,
        paddingBottom: height / 9,
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
        // height: 40,
        backgroundColor: '#E7E6E1',
        borderBottomWidth: 1,
    }
};

const mapStateToProps = (state) => ({
    FullAcademicProgress: state.get('fullAcademicProgress'),
    root: state.get('root'),
    academicProgress: state.get('academicProgress')
});

export default connect(mapStateToProps)(FullAcademicProgress)