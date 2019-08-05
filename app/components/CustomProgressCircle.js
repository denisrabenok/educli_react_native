import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Animated, Easing, Image, Text } from 'react-native';
import RN from 'react-native/package';
import dimens from "../resources/dimens";

const imgWave = require('../../wave.png');

export default class CustomProgressCircle extends Component {
    static defaultProps = {
        animationEasing: Easing.linear,
        animationDuration: 800,
        animationDurationAlt: 1200,

        animating: true,
        interaction: true,
        size: 200,
        borderColor: '#FF6B00',
        backgroundColor: 'white',
        waveFillColor: '#FF6B00',
        waveAltColor: '#FF6B0050',
        waveAmplitude: 16,

        progress: 0.5,
    };

    static propTypes = {
        animationEasing: PropTypes.func,
        animationDuration: PropTypes.number,

        animating: PropTypes.bool,
        interaction: PropTypes.bool,
        size: PropTypes.number,
        borderColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        waveFillColor: PropTypes.string,
        waveAltColor: PropTypes.string,
        waveAmplitude: PropTypes.number,
        progress: PropTypes.number,
    };

    constructor(props) {
        super(props);

        this.renderComponent = this.renderComponent.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.stopAnimation = this.stopAnimation.bind(this);

        this.state = {
            waveProgress1: new Animated.Value(0),
            waveProgress2: new Animated.Value(0),
        };

        this.mounted = false;
    }

    startAnimation({ finished } = {}) {
        let { waveProgress1, waveProgress2 } = this.state;
        let {
            interaction,
            animationEasing,
            animationDuration,
            animationDurationAlt,
        } = this.props;

        if (!this.mounted || false === finished) {
            return;
        }

        const animation1 =
            Animated.timing(waveProgress1, {
                duration: animationDuration,
                easing: animationEasing,
                useNativeDriver: true,
                isInteraction: interaction,
                toValue: 1,
            });
        const animation2 =
            Animated.timing(waveProgress2, {
                duration: animationDurationAlt,
                easing: animationEasing,
                useNativeDriver: true,
                isInteraction: interaction,
                toValue: 1,
            });
        Animated.loop(animation1).start();
        Animated.loop(animation2).start();
        this.setState({ animation1, animation2 });
    }

    stopAnimation() {
        let { animation1, animation2 } = this.state;

        if (!animation1) {
            return;
        }

        animation1.stop();
        animation2.stop();

        this.setState({ animation1: null, animation2: null });
    }

    componentDidMount() {
        let { animating } = this.props;

        this.mounted = true;

        if (animating) {
            this.startAnimation();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentWillReceiveProps(props) {
        let { animating } = this.props;

        if (animating ^ props.animating) {
            if (animating) {
                this.stopAnimation();
            } else {
                this.startAnimation();
            }
        }
    }

    renderComponent(undefined, index) {
        const { waveProgress1, waveProgress2 } = this.state;
        const { size, progress, waveAmplitude, waveFillColor, waveAltColor } = this.props;
        const waveCount = 2;
        const waveWidth = size / waveCount;
        const imgWidth = waveWidth * 8;
        const animWidth = size * 2;
        const top = size * (1 - progress);

        const style = {
            position: 'absolute',
            top: top - waveAmplitude,
            left: 0,
            width: size,
            alignItems: 'center',
            alignSelf: 'center',
            height: waveAmplitude + size,
        };
        const waveStyle1 = {
            position: 'absolute',
            left: 0,
            top: 0,
            resizeMode: 'stretch',
            width: imgWidth,
            height: waveAmplitude,
            tintColor: waveFillColor,
            transform: [{
                translateX: waveProgress1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -waveWidth * 2],
                }),
            }],
        };
        const waveStyle2 = {
            ...waveStyle1,
            left: -size * 0.3,
            tintColor: waveAltColor,
            transform: [{
                translateX: waveProgress2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -waveWidth * 2],
                }),
            }],
        };
        const barStyle = {
            position: 'absolute',
            left: 0,
            top: waveAmplitude - 2,
            width: size,
            height: size,
            backgroundColor: waveFillColor,
            // borderWidth: 2
        };

        return (
            <Animated.View style={style} >
                <View style={{ position: 'absolute', top: 0, left: 0, height: waveAmplitude, width: size, overflow: 'hidden' }} >
                    <Animated.Image source={imgWave} style={waveStyle2} />
                    <Animated.Image source={imgWave} style={waveStyle1} />
                </View>
                <View style={[barStyle, { backgroundColor: waveAltColor }]} />
                <View style={barStyle} />
            </Animated.View>
        );
    }

    render() {
        const { size, borderColor, backgroundColor, style, ...props } = this.props;
        const styleex = {
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor,
            backgroundColor,
            overflow: 'hidden',
        };
        const textStyle = {
            fontSize: dimens.text_size_label,
            fontWeight: 'bold',
            color: 'black'
        };
        return (
            <View {...props} style={[style || {}, styleex]} >
                {this.renderComponent()}
                <Text style={textStyle}>{Math.round(this.props.progress * 10000) / 100}%</Text>
            </View>
        );
    }
}
