import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './pages/home-page.component';
import {HomeStackParamsList} from '../../core/types/home-stack-params.types';

const HOME_STACK = createStackNavigator<HomeStackParamsList>();

const HomeStackScreens = () => (
    <HOME_STACK.Navigator>
        <HOME_STACK.Screen name="homeScreen" component={HomePage} />
    </HOME_STACK.Navigator>
);

export default HomeStackScreens;
