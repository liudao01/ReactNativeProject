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
    TouchableOpacity
} from 'react-native';
/**
 * 自定义分类页面
 */
import NavigationBar from '../compoent/NavigationBar';
import CheckBox from 'react-native-check-box';

export default class CustomKeyPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: [
                {name: 'Android', checked: true},
                {name: 'IOS', checked: false},
                {name: 'React Native', checked: true},
                {name: 'Java', checked: true},
                {name: 'JS', checked: true}
            ]
        };
    }


    handleBack = () => {
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
            <TouchableOpacity activeOpacity={0.7}>
                <View style={{marginRight: 10}}>
                    <Text style={{fontsize: 16, color: '#FFF'}}>保存</Text>
                </View>
            </TouchableOpacity>
        </View>
    }


    //CheckBox 点击  有个疑问为什么在这里设置值就可以不用setState就改变item的checked,因为是这样调用的()=>this.handlerCBClick(item)
    handlerCBClick = (item) => {
        console.log(item.checked);
        item.checked = !item.checked;
    }
    //渲染CheckBox  这里item就是一个对象
    renderCheckBox = (item) => {
        console.log(item.name);
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={()=>this.handlerCBClick(item)}
            leftText={item.name}
            ischecked={item.checked}
            unCheckedImage={<Image source={require('../../res/images/ic_check_box_outline_blank.png')}
                                   style={styles.checkStyle}/>}
            checkedImage={<Image source={require('../../res/images/ic_check_box.png')}
                                 />}
        />
    }

    //渲染checkbox数组
    renderViews = () => {
        let len = this.state.data.length;
        var Views = [];//要绘制的所有多选框，装入views数组
        for (let i = 0; i < len; i++) {
            Views.push((
                <View key={`view_${i}`} style={{flexDirection: 'column'}}>
                    {this.renderCheckBox(this.state.data[i])}
                </View>
            ));
        }
        return Views;
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
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    checkStyle: {
        tintColor: '#63B8FF'
    }

});