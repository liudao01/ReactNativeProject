/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import SetUp from './js/pages/Setup';
export default class MyApp extends Component {
    render() {
        return (
            <SetUp/>
        );
    }
}
AppRegistry.registerComponent('testP', () => MyApp);
