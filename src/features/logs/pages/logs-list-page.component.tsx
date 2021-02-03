import * as React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useEffect, useState} from 'react';
import {LogsListScreenProps} from '../../../core/types/logs-list-screen-props.type';
import CommonStyles from '../../../styles';
import MatButton from '../../../shared/components/mat-button.component';
import {LogInterface} from '../../../core/interfaces/log.interface';
import LogCard from '../../../shared/components/log-card/log-card.component';

const {
    appPage,
    centerVertically,
    justifyAlignCenter,
    scrollView,
    vSpacer12,
    fabButton,
    fabButtonView,
    rougierShadow,
    backgroundSecond
} = CommonStyles;

const LogsListPage: React.FunctionComponent<LogsListScreenProps> = () => {
    const [logs, setLogs] = useState<LogInterface[]>([]);
    useEffect(() => {
        const fetchLogs = () => {
            const logsData = require('../../../assets/json/fakeLogs.json');
            setLogs(logsData);
        };
        fetchLogs();
    });

    const renderItem = ({item}: {item: LogInterface}) => (
        <>
            <LogCard logItem={item} />
            <View style={[vSpacer12]} />
        </>
    );

    return (
        <SafeAreaView style={[appPage]}>
            <FlatList
                contentContainerStyle={[
                    centerVertically,
                    justifyAlignCenter,
                    scrollView
                ]}
                data={logs}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
            />

            <View style={[fabButtonView, rougierShadow]}>
                <MatButton fab>
                    <View
                        style={[
                            centerVertically,
                            justifyAlignCenter,
                            fabButton,
                            backgroundSecond
                        ]}>
                        <Icon name="add" size={40} color="#fff" />
                    </View>
                </MatButton>
            </View>
        </SafeAreaView>
    );
};

export default LogsListPage;
