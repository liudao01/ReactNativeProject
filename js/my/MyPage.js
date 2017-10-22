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


    //navigation 里的方法有navigate 是用于页面跳转 goBack是用于页面返回
    render() {
        const navigation = this.props.navigation.navigate;
        return <View style={styles.container}>
            <NavigationBar
                title="我的"/>
            <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                <Text onPress={() => {
                    navigation('CustomKeyPage', {source: '自定义分类'});
                }}>自定义分类</Text>
                <Text onPress={() => {
                    navigation('SortKeyPage', {source: '分类排序'});
                }}>分类排序</Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }
})