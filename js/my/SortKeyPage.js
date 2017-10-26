/**
 * Created by liuml on 2017/10/22.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage,
    DeviceEventEmitter

} from 'react-native';

import NavigationBar from "../compoent/NavigationBar";
import SortableListView from "react-native-sortable-listview";
import popular_def_lans from "../../res/data/popular_def_lans.json"
import Toast from "react-native-easy-toast"

/**
 * 分类排序页面
 */
export default class SortKeyPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            originData: popular_def_lans,
            data: [],
        };
        //初始化数据 把所有选中的数据放入进去
        this.state.originData.forEach((item => {
            if (item.checked) {
                this.state.data.push(item)
            }
        }))
    }


    doBack = () => {

        this.props.navigation.goBack();
    }
    //保存
    doSave = () => {

        //原始数组
        var originArray = this.state.originData;
        //排序后的数组
        var sortedArray = this.state.data;
        //要保存的数组
        var savedArray = [];

        //i用来遍历originalArray
        //j用来遍历sortedArray
        for (var i = 0, j = 0; i < originArray.length; i++) {
            var item = originArray[i];
            if (item.checked) {
                savedArray[i] = sortedArray[j];
                j++;
            } else {
                savedArray[i] = item;
            }
        }

        // console.log("保存读取: ");
        // console.log(savedArray);
        AsyncStorage.setItem("custom_key", JSON.stringify(savedArray))
            .then(() => {
                this.refs.toast.show("保存成功");
                this.doBack();
                DeviceEventEmitter.emit("HOMEPAGE_RELOAD","HomePage重新加载");
            })
    }
    //保存
    handleSave = () => {
        this.doSave();
    }

    getLeftBtn = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.doBack}>
                <Image source={require('../../res/images/ic_arrow_back_white_36pt.png')}
                       style={{width: 24, height: 24}}/>
            </TouchableOpacity>
        </View>;
    }


    getRightBtn = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
                onPress={this.handleSave}
                activeOpacity={0.7}>
                <View style={{marginRight: 10}}>
                    <Text style={{fontSize: 16, color: '#FFF'}}>保存</Text>
                </View>
            </TouchableOpacity>
        </View>;
    }

    componentDidMount() {
        AsyncStorage.getItem("custom_key")
            .then(value => {
                // console.log("进入读取: ");
                // console.log(value);
                if (value != null) {
                    //只获取checked为true语言，进行排序  forEach 不会返回一个数组 而map会返回一个数组
                    let d = [];
                    let origin = JSON.parse(value);
                    origin.forEach((item) => {
                        if (item.checked) {
                            d.push(item);
                        }
                    })
                    // this.setState({data: d});
                    // var myorder = Object.keys(this.state.data); //Array of keys
                    this.setState({originData: origin, data: d});
                }
            })
    }


    render() {

        //http://www.w3school.com.cn/jsref/jsref_splice.asp   splice方法的使用
        return <View style={styles.container}>
            <NavigationBar
                title="语言分类排序"
                rightButton={this.getRightBtn()}
                leftButton={this.getLeftBtn()}/>

            <SortableListView
                data={this.state.data}
                order={Object.keys(this.state.data)}
                rowActivationTime="10"
                renderRow={row => <RowComponent data={row}/>}
                onRowMoved={e => {
                    this.state.data.splice(e.to, 0, this.state.data.splice(e.from, 1)[0]);
                    this.forceUpdate();
                }}
            />
            <Toast ref="toast"/>
        </View>
    }
}

//https://github.com/deanmcpherson/react-native-sortable-listview/blob/master/Sortable/example.js 这里是SortableListView github地址 示例代码

class RowComponent extends Component {
    static defaultProps = {
        data: {name: ""}
    };

    render() {
        return <TouchableHighlight
            underlayColor="#EEE"
            style={styles.item}
            {...this.props.sortHandlers}>
            <View style={{flexDirection: 'row', paddingLeft: 10}}>
                <Image source={require('../../res/images/ic_sort.png')} style={styles.image}/>
                <Text>{this.props.data.name}</Text>
            </View>

        </TouchableHighlight>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#EEE',
        height: 50,
        justifyContent: 'center'
    },
    image: {
        width: 16,
        height: 16,
        marginRight: 10,
        tintColor: '#63B8FF'
    }

});