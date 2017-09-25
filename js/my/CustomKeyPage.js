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
import NavigationBar from '../compoent/NavigationBar'

export default class CustomKeyPage extends Component {

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

    render() {

        return <View style={styles.container}>
            <NavigationBar
                title="自定义分类"
                rightButton={this.getRightBtn()}
                leftButton={this.getLeftBtn()}/>
            <Text onPress={() => {
                this.handleBack();
            }}>CustomKeyPage</Text>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

});