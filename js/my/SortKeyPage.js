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

} from 'react-native';

import NavigationBar from "../compoent/NavigationBar";
import SortableListView from "react-native-sortable-listview";

export default class SortKeyPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: [],
        };
    }


    doBack = () => {

        this.props.navigation.goBack();
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

    componentDidMount() {
        AsyncStorage.getItem("custom_key")
            .then(value => {
                if (value != null) {
                    //只获取checked为true语言，进行排序  forEach 不会返回一个数组 而map会返回一个数组
                    let d = [];
                    JSON.parse(value).forEach((item) => {
                        if (item.checked) {
                            d.push(item);
                        }
                    })
                    this.setState({data: d});
                    var myorder = Object.keys(this.state.data); //Array of keys
                }
            })
    }


    render() {

        return <View style={styles.container}>
            <NavigationBar
                title="语言分类排序"
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