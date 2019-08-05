import React, { Component } from "react";
import { Content, Input, Item, Label, Text, Left, View } from "native-base";
import { Alert, Image, Dimensions, TextInput } from "react-native";
import strings from "../resources/strings";
import PropTypes from "prop-types";
import * as Immutable from "../../node_modules/immutable/dist/immutable";
import ImmutableComponent from "./ImmutableComponent";
import email_icon from '../assets/icons/email_icon.png'
import password_icon from '../assets/icons/password_icon.png'
// import email_icon from '../assets/svgs/email_icon.svg'
// import password_icon from '../assets/svgs/password_icon.svg'
import SvgUri from 'react-native-svg-uri';


const { width, height } = Dimensions.get('window');


export default class CustomTextInput extends ImmutableComponent {

    constructor(props: {}) {
        super(props);
        this.state = {
            data: Immutable.Map({
                error: "",
                showDefaultValue: true,
            })
        };
    }

    render() {
        return (
            <View
                shouldRasterizeIOS
                renderToHardwareTextureAndroid
                style={styles.containerStyle}>

                <Image source={this.props.label == "email" ? email_icon : password_icon}
                    style={[styles.iconstyle, { width: this.props.label == "email" ? width / 22.58 * 0.8 : width / 22.58 * 0.7, }]} />
                <Input
                    style={styles.inputStyle}
                    onChangeText={this.handleTextChange}
                    secureTextEntry={this.props.secureTextEntry}
                    placeholder={this.props.placeholder}
                    placeholderTextColor='white'
                />
            </View>
        );
    }
    alertShow(text) {
        // Alert.alert(text);
    }
    handleTextChange = (text: string) => {
        if (this.props.onChangeText) {
            this.props.onChangeText(text);
        }
    };
}

const styles = {
    containerStyle: {
        // flex: 1,
        flexDirection: 'row',
        borderColor: 'white',
        borderRadius: 15,
        borderWidth: 2,
        width: width * 17 / 20,
        // height: height * 3 / 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: height / 40,
    },
    inputStyle: {
        marginLeft: width / 20,
        color: 'white',
        height: height / 40 * 3,
        paddingBottom: 0,
        paddingTop: 0,
    },
    iconstyle: {
        marginLeft: width / 15,
        resizeMode: 'contain'
    }
};

CustomTextInput.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    defaultValue: PropTypes.string
};