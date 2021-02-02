import * as React from 'react';
import {Text, View} from 'react-native';
import {ParcPrepScreenProps} from '../../../core/types/parc-prep-screen-props.type';
import CommonStyles from '../../../styles';

const {appPage} = CommonStyles;

const PrepParcListPage: React.FunctionComponent<ParcPrepScreenProps> = () => (
    <View style={[appPage]}>
        <Text>PrepParcList screen</Text>
    </View>
);

export default PrepParcListPage;
