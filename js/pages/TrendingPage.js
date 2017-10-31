/**
 * Created by liuml on 2017/10/28.
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
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import NavigationBar from '../compoent/NavigationBar'
import ScrollableTabView from "react-native-scrollable-tab-view"
import TrendingProjectRow from '../compoent/TrendingProjectRow'
import GitHubTrending from 'GitHubTrending';
import Popover from '../compoent/Popover'
var popular_def_lans = require('../../res/data/popular_def_lans.json');

const TIME_MAP = new Map([
    ["今 天", "since=daily"],
    ["本 周", "since=weekly"],
    ["本 月", "since=monthly"]
]);

export default class TrendingPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            languages: [],
            isVisible: false,
            buttonRect: {},
            timeSpan: {key: '今天', value: "since=daily"}
        };
        popular_def_lans.forEach(item => {
            if (item.checked) this.state.languages.push(item);
        });
    }

    renderTitle = () => {
        return <TouchableOpacity ref="button"
                                 onPress={this.showPopover}
                                 activeOpacity={0.5}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#FFF', fontsize: 16}}>趋势</Text>
                <Image source={require('../../res/images/ic_spinner_triangle.png')}
                       style={{width: 12, height: 12, marginLeft: 5}}/>
            </View>
        </TouchableOpacity>
    }
    showPopover = () => {
        // console.log(this.refs);
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    closePopover = () => {
        this.setState({isVisible: false});
    }


    loadLanguages = () => {
        // AsyncStorage.clear();
        AsyncStorage.getItem('custom_key')
            .then((value) => {
                // console.log("读取的: " + value);
                // console.log("读取的: " + JSON.parse(value));
                if (value != null) {
                    this.setState({languages: JSON.parse(value)});
                }
            });
    }

    componentDidMount() {
        this.loadLanguages();
    }

    handleTimeSelect = (k, v) => {
        this.setState({
            timeSpan: {key: k, value: v}
        })
        this.closePopover();
    }

    renderTimeMap = () => {
        var views = [];
        for (let [key, value] of TIME_MAP) {
            views.push(<TouchableOpacity key={`pop_${value}`} onPress={() => this.handleTimeSelect(key, value)}>
                <Text style={{fontsize: 18, color: '#FFF', paddin: 8, margin: 8}}>{key}</Text>
            </TouchableOpacity>)
        }
        return <View style={{alignItems: 'center'}}>
            {views}
        </View>
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar
                titleView={this.renderTitle()}
            ></NavigationBar>
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="#FFF"
                tabBarInactiveTextColor="#F5FFFA"
                tabBarUnderlineStyle={{backgroundColor: "#E7E7E7", height: 2}}>
                {
                    this.state.languages.map((item, i) => {
                        // console.log(item);
                        return (item.checked == undefined || item.checked ?
                            <TrendingTab {...this.props} key={`tab${i}`} tabLabel={item.name}/> : null)
                    })
                }
            </ScrollableTabView>
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                contentStyle={{backgroundColor: '#343434', opacity: 0.8}}
                placement="bottom"
                onClose={this.closePopover}>
                {this.renderTimeMap()}
            </Popover>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },

});


class TrendingTab extends Component {

    //这里是Tab 的名字
    static defaultProps = {
        tabLabel: 'IOS',
    }
    // 构造
    constructor(props) {
        super(props);
        const {navigation} = this.props;
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

    //和上面一样的效果  页面加载完成后加载数据
    componentDidMount = () => {
        this.loadData();
    }

    //渲染ListView的每一行
    renderRow = (obj) => {
        return <TrendingProjectRow {...this.props} item={obj}
                                   onSelect={() => this.handleProjectSelect(obj)}></TrendingProjectRow>

        // return <Text>{obj.full_name}</Text>
    }

    handleProjectSelect = (obj) => {
        const navigation = this.props.navigation.navigate;
        navigation('ProjectDetails', {
            params: {
                title: obj.fullName,
                url: `https://github.com${obj.url}`
            },
        });
    }


    //加载数据
    loadData = (time = 'since=daily') => {
        this.setState({isLoading: true});
        new GitHubTrending().fetchTrending(`https://github.com/trending/${this.props.tabLabel}?${time}`)
            .then(value => {
                // console.log(value);
                //更新dataSource
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(value),
                    isLoading: false,
                });
            }).catch((error) => {
            console.error(error);
        }).done();
    }

    handleRefresh = () => {
        this.loadData();
    }

    componentWillReceiveProps(nextprops) {

    }
    render() {
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this.handleRefresh}
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
