import * as React from 'react';
import {Text, View} from 'react-native';
import {HomeScreenProps} from '../../../core/types/home-screen-props.type';
import CommonStyles from '../../../styles';
import {translate} from '../../../utils/i18n.utils';

const {appPage} = CommonStyles;

const HomePage: React.FunctionComponent<HomeScreenProps> = () => (
    <View style={[appPage]}>
        <Text>{translate('common.home')}</Text>
    </View>
);

export default HomePage;
