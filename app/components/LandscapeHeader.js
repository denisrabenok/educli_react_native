import React, { Component } from "react";
import { Content, Input, Item, Label, Text, Left, View } from "native-base";
import { Alert, Image, Dimensions, TextInput, TouchableOpacity } from "react-native";
import strings from "../resources/strings";
import PropTypes from "prop-types";
import * as Immutable from "../../node_modules/immutable/dist/immutable";
import ImmutableComponent from "./ImmutableComponent";
import option_icon from '../assets/icons/option_icon.png'
import exit_icon from '../assets/icons/exit_icon.png'
import colors from "../resources/colors";
import dimens from "../resources/dimens";

import Orientation from 'react-native-orientation';
const { width, height } = Dimensions.get('window');


export default class LandscapeHeader extends ImmutableComponent {

    constructor(props: {}) {
        super(props);

        if (this.props.label == 'Full Attendance Report') {
            var temp = width;
            width = height;
            height = width;
        }
        this.state = {
            data: Immutable.Map({
                error: "",
                showDefaultValue: true,
            })
        };
        // Alert.alert(width + ', ' + height);
    }
    test = () => {
        Alert.alert('tst');
    }
    onPressExit = () => {
        Orientation.lockToPortrait();
        this.props.navigation.pop();
    }
    render() {
        return (
            <View
                shouldRasterizeIOS
                renderToHardwareTextureAndroid
                style={styles.containerStyle} scrollEnabled={false}>
                <TouchableOpacity style={styles.optionStyle} onPress={this.props.onPressOpt}>
                    <Image source={option_icon}
                        style={styles.optionImg} />
                </TouchableOpacity>
                <Text style={styles.labelStyle}>{this.props.label}</Text>
                <TouchableOpacity style={styles.exitStyle} onPress={this.onPressExit}>
                    <Image source={exit_icon}
                        style={styles.exitImg} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        position: 'absolute',
        top: 0,
        flex: 1,
        flexDirection: 'row',
        width: height,
        height: height / 15,
        backgroundColor: colors.accentColor,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    optionStyle: {
        position: 'absolute',
        left: 20,
        width: width / 15,
        // resizeMode: 'contain'
    },
    optionImg: {
        width: width / 15,
        resizeMode: 'contain'
    },
    labelStyle: {
        fontSize: dimens.text_size_button,
        color: 'white',
    },
    exitStyle: {
        position: 'absolute',
        right: 20,
        width: width / 15,
        // resizeMode: 'contain'
    },
    exitImg: {
        width: width / 15,
        resizeMode: 'contain'
    }
};

LandscapeHeader.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    defaultValue: PropTypes.string
};