/**
 * Created by liuml on 2017/9/11.
 */
import React, {Component, PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';
/**
 * 导航条
 */
export default class NavigationBar extends Component {

    static propTypes = {
        //验证，不传element组件类型，会报错提示
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
        titleView: PropTypes.element
    }

    //渲染顶部title
    renderTitle = () => {
        let view = (this.props.title != undefined && this.props.title.length != 0) ? (
            <Text style={styles.title}>{this.props.title}</Text>) : this.props.titleView;

        return <View style={styles.titleWrapper}>
            {view}
        </View>
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.container}>
                <StatusBar hidden={false} barStyle="light-content"/>
            </View>
            {/*顶部导航栏*/}
            <View style={styles.navBar}>
                <View style={styles.leftBtnStyle}>
                    {this.props.leftButton}
                </View>
                {this.renderTitle()}
                <View style={styles.rightBar}>
                    {this.props.rightButton}
                </View>

            </View>
        </View>
    }
}
const styles = StyleSheet.create({

    container: {
        backgroundColor: '#63B8FF',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : 0
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    titleWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
    },
    title: {
        fontSize: 16,
        color: '#FFF'
    },
    navBtn: {
        width: 24,
        height: 24
    },
    rightBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8
    },
    leftBtnStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30
    },
});

