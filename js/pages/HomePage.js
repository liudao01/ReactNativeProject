/**
 * Created by liuml on 2017/9/8.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import TabNavigatorItem from "react-native-tab-navigator/TabNavigatorItem";
import PapularPage from './PapularPage';
import MyPage from '../my/MyPage'
import TrendingPage from './TrendingPage'
import {NavigationActions} from 'react-navigation'
//"最热"是包含在，HomePage页面
//"最热"页面包含，NavigationBar
/**
 * 主页
 */
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Home'})
    ]
})

export default class Homepage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {selectedTab: 'papular'};
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('HOMEPAGE_RELOAD', (n) => {
            //主页重新加载数据
            // console.log("主页重新加载数据");
            // this.setState({selectedTab: 'papular'});
            //跳转到新的场景，并且重置整个路由栈
            this.props.navigation.dispatch(resetAction);

            // this.props.navigation.resetTo({
            //     component:Homepage
            // })
        })
    }


    componentWillUnmount() {
        //移除监听
        this.listener.remove();
    }

    render() {

        return <View style={styles.container}>
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'papular'}
                    title="最热"
                    slectedTitleStyle={{color: '#FFF'}}
                    renderIcon={() => <Image style={styles.icon}
                                             source={require('../../res/images/ic_popular.png')}></Image>}
                    renderSelectedIcon={() =>
                        <Image style={[styles.icon, {tintColor: '#63B8FF'}]}
                               source={require('../../res/images/ic_popular.png')}/>}
                    onPress={() => this.setState({selectedTab: 'papular'})}>

                    {/*最热的内容*/}
                    <PapularPage {...this.props}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'trending'}
                    slectedTitleStyle={{color: '#0F0'}}
                    renderIcon={() => <Image style={styles.icon}
                                             source={require('../../res/images/ic_trending.png')}/>}
                    renderSelectedIcon={() =>
                        <Image style={[styles.icon, {tintColor: '#63B8FF'}]}
                               source={require('../../res/images/ic_trending.png')}/>}
                    onPress={() => this.setState({selectedTab: 'trending'})}
                    title="趋势">

                    <TrendingPage {...this.props}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'favorite'}
                    slectedTitleStyle={{color: '#0F0'}}
                    renderIcon={() => <Image style={styles.icon}
                                             source={require('../../res/images/ic_favorite.png')}/>}
                    renderSelectedIcon={() =>
                        <Image style={[styles.icon, {tintColor: '#63B8FF'}]}
                               source={require('../../res/images/ic_favorite.png')}/>}
                    onPress={() => this.setState({selectedTab: 'favorite'})}
                    title="收藏">

                    <View style={{backgroundColor: '#0FF', flex: 1}}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'my'}
                    slectedTitleStyle={{color: '#0F0'}}
                    renderIcon={() => <Image style={styles.icon}
                                             source={require('../../res/images/ic_my.png')}/>}
                    renderSelectedIcon={() =>
                        <Image style={[styles.icon, {tintColor: '#63B8FF'}]}
                               source={require('../../res/images/ic_my.png')}/>}
                    onPress={() => this.setState({selectedTab: 'my'})}
                    title="我的">

                    <MyPage {...this.props}/>
                </TabNavigator.Item>

            </TabNavigator>
        </View>

    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    icon: {
        width: 26,
        height: 26
    }

});