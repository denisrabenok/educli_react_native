import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import configureStore from "../store/configureStore.js";
import {StackNavigator} from "react-navigation";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Studentcard from "./Studentcard";
import Courses from "./Courses";
import Attendance from "./Attendance";
import FullAttendanceReport from "./FullAttendanceReport";
import AcademicProgress from "./AcademicProgress";
import FullAcademicProgress from "./FullAcademicProgress";
import Payments from "./Payments";
import PaymentDetails from "./PaymentDetails";
import Notifications from "./Notifications";
import PersonalReminders from "./PersonalReminders";
import VisaExpiry from "./VisaExpiry";
import NewsFeed from "./NewsFeed";


const store = configureStore();
const Routes = {
  Login: {screen: Login},
  Signup: {screen: Signup},
  Dashboard: {screen: Dashboard},
  Profile: {screen: Profile},
  EditProfile: {screen: EditProfile},
  Studentcard: {screen: Studentcard},
  Courses: {screen: Courses},
  Attendance: {screen: Attendance},
  FullAttendanceReport: {screen: FullAttendanceReport},
  AcademicProgress: {screen: AcademicProgress},
  FullAcademicProgress: {screen: FullAcademicProgress},
  Payments: {screen: Payments},
  PaymentDetails: {screen: PaymentDetails},
  Notifications: {screen: Notifications},
  PersonalReminders: {screen: PersonalReminders},
  VisaExpiry: {screen: VisaExpiry},
  NewsFeed: {screen: NewsFeed}
};
const Navigator = StackNavigator(Routes, {
  headerMode: 'screen'
});

export class Navigation extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }

}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}
export default connect(mapStateToProps)(Navigation);
