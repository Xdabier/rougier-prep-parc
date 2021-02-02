import * as React from 'react';
import {Text, View} from 'react-native';
import {LogsListScreenProps} from '../../../core/types/logs-list-screen-props.type';
import CommonStyles from '../../../styles';

const {appPage} = CommonStyles;

const LogsListPage: React.FunctionComponent<LogsListScreenProps> = () => (
    <View style={[appPage]}>
        <Text>Logs list screen</Text>
    </View>
);

export default LogsListPage;
