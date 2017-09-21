/**
 * Created by liuml on 2017/9/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    RefreshControl,
    TouchableOpacity
}from 'react-native';

import NavigationBar from "../compoent/NavigationBar.js"
import ScrollableTabView from "react-native-scrollable-tab-view"
import ProjectRow from "../compoent/ProjectRow"

export default class PapularPage extends Component {


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            languages: ["Android", "Ios", "Java", "React", "JS"]
        };
    }

    getRightBtn = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity activeOpacity={0.7}>
                <Image source={require('../../res/images/ic_search_white_48pt.png')}
                       style={{width:24,height:24}}></Image>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
                <Image source={require('../../res/images/ic_more_vert_white_48pt.png')}
                       style={{width:24,height:24}}></Image>
            </TouchableOpacity>
        </View>
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar
                rightButton={this.getRightBtn()}
                title="热门"/>
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="#FFF"
                tabBarInactiveTextColor="#F5FFFA"
                tabBarUnderlineStyle={{backgroundColor: "#E7E7E7", height: 2}}>
                {
                    this.state.languages.map((item, i) => {
                        return <PopularTab key={`tab${i}`} tabLabel={item}/>
                    })
                }
            </ScrollableTabView>
        </View>
    }
}

class PopularTab extends Component {

    //这里是Tab 的名字
    static defaultProps = {
        tabLabel: 'android',
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),//是一个优化，节省无用的UI渲染 判断前后数据是否改变 如果改变就更新
            isLoading: true
        };
    }

    /*componentDidMount() {
     /!*this.setState({
     dataSource: this.state.dataSource.cloneWithRows(['first', 'second', 'three'])
     }
     )*!/
     this.loadData();
     };*/

    //和上面一样的效果
    componentDidMount = () => {
        this.loadData();
    }

    //渲染ListView的每一行
    renderRow = (obj) => {
        return <ProjectRow item={obj}></ProjectRow>
        // return <Text>{obj.full_name}</Text>
    }


    //加载数据
    loadData = () => {
        this.setState({isLoading: true});
        fetch(`https://api.github.com/search/repositories?q=${this.props.tabLabel}&sort=stars`)
            .then(response => response.json()) //服务器响应response对象，继续变成json对象
            .then(json => {
                //更新dataSource
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(json.items),
                    isLoading: false,
                });
            })
            .catch((error) => {
                console.error(error);
            }).done();
    }

    handleRefresh = () => {
        this.loadData();
    }

    render() {
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        tintColor="#63B8FF"
                        title="正在加载..."
                        titleColor="#63B8FF"
                        colors={['#63B8FF']}
                    />
                }
            ></ListView>
        </View>
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});