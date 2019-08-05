import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Animated, Easing, Image, Text, Dimensions } from 'react-native';
import RN from 'react-native/package';
import dimens from "../resources/dimens";
import * as Progress from 'react-native-progress';
import colors from "../resources/colors";


const { width, height } = Dimensions.get('window');
const imgWave = require('../../wave.png');

export default class CustomProgressBar extends Component {

    constructor(props: {}) {
        super(props);

        this.state = {
            progress: 0,
            indeterminate: true
        };
        // Alert.alert(width + ', ' + height);
    }
    componentDidMount() {
        this.animate();
    }

    animate() {
        let progress = 0;
        this.setState({ progress: progress });
        setTimeout(() => {
            this.setState({ indeterminate: false });
            let intervalID = setInterval(() => {
                progress += 1;
                if (progress > this.props.persent) {
                    progress = this.props.persent;
                    clearInterval(intervalID)
                }
                this.setState({ progress: progress });
            }, 50);
        }, 1500);
    }
    render() {
        const custom_out_Color = (index) => {
            var r = index % 4;
            if (r == 0)
                return colors.progress0_out_Color;
            else if (r == 1)
                return colors.progress1_out_Color;
            else if (r == 2)
                return colors.progress2_out_Color;
            else if (r == 3)
                return colors.progress3_out_Color;
            else
                return colors.progress0_out_Color;
        }
        const custom_in_Color = (index) => {
            var r = index % 4;
            if (r == 0)
                return colors.progress0_in_Color;
            else if (r == 1)
                return colors.progress1_in_Color;
            else if (r == 2)
                return colors.progress2_in_Color;
            else if (r == 3)
                return colors.progress3_in_Color;
            else
                return colors.progress0_in_Color;
        }
        return (
            <View
                shouldRasterizeIOS
                renderToHardwareTextureAndroid
                style={styles.containerStyle} scrollEnabled={false}>
                <Text style={styles.titleStyle}>{this.props.label}</Text>
                <View style={[styles.progressbargroup, { backgroundColor: custom_out_Color(this.props.index) }]}>
                    <View style={[styles.labelView, { backgroundColor: custom_in_Color(this.props.index) }]}>
                        <Text style={styles.labelStyle}>{this.state.progress}%</Text>
                    </View>
                    <Progress.Bar
                        progress={this.state.progress / 100}
                        indeterminate={this.state.indeterminate}
                        unfilledColor={custom_in_Color(this.props.index)}
                        width={styles.bar.width}
                        height={height / 80}
                        color='white' borderWidth={0}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignSelf: 'center',
        // alignItems: 'center',
        // height: height/20,
        // width: width,
        // backgroundColor: 'black'
    },
    progressbargroup: {
        // flex: 1,
        flexDirection: 'row',
        height: height / 20,
        // width: width,
        // justifyContent: 'center',
        // alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondColor
    },
    labelStyle: {
        color: 'white',
        borderRadius: 5,
    },
    labelView: {
        height: height / 30,
        width: width / 8,
        marginLeft: height / 120,
        marginRight: height / 120,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: colors.accentColor,
        borderRadius: 3,
    },
    titleStyle: {
        marginTop: height / 40 * 0.5,
        marginBottom: height / 100,
        fontSize: 13,
        color: 'black'
    },
    bar: {
        width: width * (17 / 20 - 1 / 8) - height / 40 - 40,
    }
};

CustomProgressBar.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    defaultValue: PropTypes.string
};
