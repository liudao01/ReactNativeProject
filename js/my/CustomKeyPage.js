/**
 * Created by liuml on 2017/9/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
/**
 * 自定义分类页面
 */
import NavigationBar from '../compoent/NavigationBar';
import CheckBox from 'react-native-check-box';
import Toast from "react-native-easy-toast"
import ArrayUtil from "../util/ArrayUtil";

export default class CustomKeyPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: [{"name": "Android", "checked": true},
                {"name": "IOS", "checked": false},
                {"name": "ReactNative", "checked": true},
                {"name": "Java", "checked": true},
                {"name": "JS", "checked": true}],
        };
    }

    handleBack = () => {
        if (ArrayUtil.isAbsEqual(this.otherData, this.state.data)) {
            this.doBack();
            return;
        }
        Alert.alert("提示", "是否需要保存?", [
            {
                text: '是', onPress: () => {
                this.handleSave()
            }
            },
            {
                text: '否', onPress: () => {
                this.doBack()
            }
            },])

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

    //保存
    handleSave = () => {
        //http://lib.csdn.net/article/reactnative/43540   JSON.stringify 字符串转JSON
        //AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统
        AsyncStorage.setItem('custom_key', JSON.stringify(this.state.data))
            .then(() => this.refs.toast.show("保存成功"));
        // console.log(JSON.stringify(this.state.data));
        this.doBack();
    }

    //CheckBox 点击  有个疑问为什么在这里设置值就可以不用setState就改变item的checked,因为是这样调用的()=>this.handlerCBClick(item)
    handleClick = (item) => {
        // console.log("之前 " + item.checked);
        item.checked = !item.checked;
        this.setState({isModified:true});//修改了

    }
    //渲染CheckBox  这里item就是一个对象
    renderCheckBox = (item) => {
        // console.log(item);
        // console.log(item.name + ',' + item.checked);
        var leftText = item.name;
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => this.handleClick(item)}
            leftText={item.name}
            isChecked={item.checked}
            unCheckedImage={<Image source={require('../../res/images/ic_check_box_outline_blank.png')}
                                   style={styles.checkbox}/>}
            checkedImage={<Image source={require('../../res/images/ic_check_box.png')} style={styles.checkbox}/>}
        />
    }

    renderViews = () => {
        let len = this.state.data.length;
        var views = [];  //要绘制的所有多选框，装入views数组
        for (let i = 0, j = len - 2; i < j; i += 2) {
            views.push((
                <View key={`view_${i}`} style={{flexDirection: 'row'}}>
                    {this.renderCheckBox(this.state.data[i])}
                    {this.renderCheckBox(this.state.data[i + 1])}
                </View>
            ));
        }


        //偶数个，剩下最后两个多选框
        //奇数个，剩下最后一个多选框
        views.push(
            <View key={`view_${len - 1}`} style={{flexDirection: 'row'}}>
                {len % 2 === 0 ? this.renderCheckBox(this.state.data[len - 2]) :
                    <View style={{flex: 1, padding: 10}}></View>}
                {this.renderCheckBox(this.state.data[len - 1])}
            </View>
        );

        return views;
    }
    componentDidMount = () => {


        this.loadData();

    }

    loadData = () => {
        //加载本地数据
        AsyncStorage.getItem('custom_key')
            .then(value => {
                //有用户数据，选中该选中CheckBox
                if (value !== null) {
                    // console.log(JSON.parse(value));
                    this.setState({data: JSON.parse(value)});
                }
                //把原始数据克隆
                this.otherData = ArrayUtil.clone(this.state.data);
            });

        // console.log(this.state.data);
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar
                title="自定义分类"
                rightButton={this.getRightBtn()}
                leftButton={this.getLeftBtn()}/>
            <View style={{flexDirection: 'column'}}>
                {this.renderViews()}
            </View>
            <Toast ref="toast"/>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    checkbox: {
        tintColor: '#63B8FF'
    }

});

