/**
 * Created by liuml on 2017/9/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Homepage from "./HomePage";
import CustomKeyPage from "../my/CustomKeyPage";


// 初始化路由
/*const MyRoutes = {
 Homepage: {
 name: 'home',
 screen: Homepage,
 description: 'homepage'
 },
 CustomKeyPage: {
 name: 'customkey',
 screen: CustomKeyPage,
 description: 'customkey'
 }
 };*/

//这里是导航器创建
//导航注册
const Root = StackNavigator({
    Home: {screen: Homepage},
/*    Chat: { screen: ChatScreen },//新添加的页面*/
});

/*const MyPage = ({navigation}) => {
    <View style={styles.container}>
        <Homepage/>
    </View>
};*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
export default Root;