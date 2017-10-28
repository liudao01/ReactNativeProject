/**
 * Created by liuml on 2017/10/26.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    WebView
} from 'react-native';

import NavigationBar from "../compoent/NavigationBar";


export default class ProjectDetails extends Component {

    // 构造
    constructor(props) {
        super(props);

        // 初始状态
        this.state = {
            canGoBack: false
        };
    }

    handleBack = () => {
        //如果网页能够返回 先返回网页
        if (this.state.canGoBack) {
            this.refs.webview.goBack();
        } else {
            this.doBack();
        }
    }
    doBack = () => {
        this.props.navigation.goBack();
    }
    getLeftBtn = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleBack}>
                <Image source={require('../../res/images/ic_arrow_back_white_36pt.png')}
                       style={{width: 24, height: 24}}/>
            </TouchableOpacity>
        </View>;
    }

    //监听状态改变 是否能够返回
    handleNavStateChange = (s) => {
        this.setState({canGoBack: s.canGoBack});
    }

    render() {
        const {state} = this.props.navigation;
        let title = state.params.params.title;
        let url = state.params.params.url;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={title}
                    leftButton={this.getLeftBtn()}/>
                <WebView
                    ref="webview"
                    startInLoadingState={true}
                    source={{uri: url}}
                    onNavigationStateChange={this.handleNavStateChange}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

})

