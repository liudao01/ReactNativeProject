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
import MyPage from "../my/MyPage";
import CustomKeyPage from "../my/CustomKeyPage";
import SortKeyPage from "../my/SortKeyPage"
import ProjectDetails from "./ProjectDetails"

//各个页面路由配置
const RouteConfigs = {
    Home: {//首页
        screen: Homepage,
    },
    MyPage: {//我的
        screen: MyPage,
    },
    CustomKeyPage: {//自定义分类
        screen: CustomKeyPage,
    },
    SortKeyPage: {//自定义分类 排序
        screen: SortKeyPage,
    },
    ProjectDetails: {//项目详情
        screen: ProjectDetails,
    },
}

//导航器的配置，包括导航器的初始页面、各个页面之间导航的动画、页面的配置选项等等
const NavigatorConfig = {
    initialRouteName: 'Home', // 默认显示界面
    headerMode: 'none',//https://reactnavigation.org/docs/navigators/stack#StackNavigatorConfig

}

//导航注册
const RootNavigator = StackNavigator(RouteConfigs, NavigatorConfig);
export default RootNavigator;