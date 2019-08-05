import React, { Component } from "react";
import { Content, Input, Item, Label, Text, Left, View } from "native-base";
import { Alert, Image, Dimensions, TextInput } from "react-native";
import strings from "../resources/strings";
import PropTypes from "prop-types";
import * as Immutable from "../../node_modules/immutable/dist/immutable";
import ImmutableComponent from "./ImmutableComponent";
import search_icon from '../assets/icons/search_icon.png'



const { width, height } = Dimensions.get('window');


export default class SearchTextInput extends ImmutableComponent {

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
                style={styles.containerStyle} scrollEnabled={false}>

                <Image source={search_icon}
                    style={styles.iconstyle} />
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
        flex: 1,
        flexDirection: 'row',
        borderColor: 'white',
        borderRadius: 15,
        borderWidth: 2,
        width: width * 17 / 20,
        height: height * 3 / 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: height / 100,
    },
    errorTextStyle: {
        color: 'red'
    },
    itemStyle: {
        flex: 0,
        marginTop: 16
    },
    inputStyle: {
        marginLeft: width / 20,
        color: 'white',
        paddingBottom: 0,
        paddingTop: 0
    },
    iconstyle: {
        width: width / 22.58,
        marginLeft: width / 15,
        resizeMode: 'contain'
    }
};

SearchTextInput.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    defaultValue: PropTypes.string
};