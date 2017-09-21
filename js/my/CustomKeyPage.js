/**
 * Created by liuml on 2017/9/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class CustomKeyPage extends Component {

    render() {
        return <View style={styles.container}>
            <Text>CustomKeyPage</Text>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

});