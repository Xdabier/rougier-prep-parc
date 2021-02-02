import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ParcPrepListPage from './pages/parc-prep-list-page.component';
import {ParcPrepStackParamsTypes} from '../../core/types/parc-prep-stack-params.types';

const PARC_PREP_STACK = createStackNavigator<ParcPrepStackParamsTypes>();

const ParcPrepStackScreens = () => (
    <PARC_PREP_STACK.Navigator>
        <PARC_PREP_STACK.Screen
            name="parcPrepList"
            component={ParcPrepListPage}
        />
    </PARC_PREP_STACK.Navigator>
);

export default ParcPrepStackScreens;
