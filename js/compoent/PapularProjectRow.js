/**
 * Created by liuml on 2017/9/14.
 */

import React, {Component} from 'react';
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
 * 组件: 最热页面的item
 */
export default class PapularProjectRow extends Component {

    static defaultProps = {
        item: {}
    }


    render() {
        var item = this.props.item;
        return <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.props.onSelect}>
            <View style={styles.container}>
                <Text style={styles.title}>{item.full_name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.bottom}>
                    <View style={styles.bottomTextWrapper}>
                        <Text>作者:</Text>
                        {/* {console.log(item.owner.avatar_url)}*/}
                        <Image style={{width: 22, height: 22}} source={{uri: item.owner.avatar_url}}/>
                    </View>
                    <View style={styles.bottomTextWrapper}>
                        <Text>star:</Text>
                        <Text>{item.stargazers_count}</Text>
                    </View>
                    <Image source={require("../../res/images/ic_unstar_transparent.png")}
                           style={{width: 22, height: 22}}/>
                </View>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 5,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowRadius: 1, //阴影半径
        shadowOpacity: 0.4,
        elevation: 2 //Android 投影

    },
    title: {
        fontSize: 16

    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'

    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})