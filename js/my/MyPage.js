/**
 * Created by liuml on 2017/9/16.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    RefreshControl
}from 'react-native';

import  NavigationBar from "../compoent/NavigationBar";
/**
 * 我的页面
 */
export default class MyPage extends Component {


    render() {
        const {navigate} = this.props.navigation;
        return <View style={styles.container}>
            <NavigationBar
                title="我的"/>
            <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                <Text onPress={() => {
                    navigate('CustomKeyPage', {source: '自定义分类'});
                }
                }>自定义分类</Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }
})