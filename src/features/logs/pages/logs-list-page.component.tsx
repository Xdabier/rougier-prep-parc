import * as React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useEffect, useState} from 'react';
import {LogsListScreenProps} from '../../../core/types/logs-list-screen-props.type';
import CommonStyles, {
    BORDER_RADIUS,
    FAB_BOTTOM_DISTANCE,
    PAGE_TITLE_LINE_HEIGHT,
    poppinsMedium,
    poppinsRegular
} from '../../../styles';
import MatButton from '../../../shared/components/mat-button.component';
import {LogInterface} from '../../../core/interfaces/log.interface';
import LogCard from '../../../shared/components/log-card/log-card.component';
import PageTitle from '../../../shared/components/page-title/page-title.component';
import {translate} from '../../../utils/i18n.utils';

const {
    appPage,
    fullWidth,
    centerVertically,
    centerHorizontally,
    spaceBetween,
    alignCenter,
    justifyAlignCenter,
    scrollView,
    vSpacer12,
    pT2,
    vSpacer25,
    fabButton,
    fabButtonView,
    rougierShadow,
    backgroundSecond,
    mainColor
} = CommonStyles;

const TEXT_LINE_HEIGHT = 27;
const FILTER_ROW_HEIGHT = 41;
const FAB_BOTTOM_MARGIN = 3;
const MISSING_SPACE =
    PAGE_TITLE_LINE_HEIGHT +
    FILTER_ROW_HEIGHT +
    FAB_BOTTOM_DISTANCE -
    FAB_BOTTOM_MARGIN +
    25 +
    6;

const STYLES = StyleSheet.create({
    filterRow: {
        height: FILTER_ROW_HEIGHT
    },
    fabButtonView: {
        bottom: MISSING_SPACE,
        marginBottom: FAB_BOTTOM_MARGIN
    },
    filterButton: {
        width: 234 - 13 * 2,
        height: FILTER_ROW_HEIGHT,
        borderRadius: BORDER_RADIUS,
        backgroundColor: '#fff',
        paddingHorizontal: 13
    },
    filterLabel: {
        fontSize: 20,
        fontFamily: poppinsMedium,
        lineHeight: 30
    },
    filterButtonText: {
        fontSize: 18,
        fontFamily: poppinsRegular,
        lineHeight: TEXT_LINE_HEIGHT
    },
    listBottomSpacing: {
        paddingBottom: MISSING_SPACE
    }
});

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
            <PageTitle title={translate('logsListPage.title')} />

            <View
                style={[
                    fullWidth,
                    centerHorizontally,
                    spaceBetween,
                    alignCenter
                ]}>
                <Text style={[STYLES.filterLabel, mainColor]}>
                    {translate('common.parcId')}
                </Text>
                <MatButton isElevated>
                    <View
                        style={[
                            centerHorizontally,
                            spaceBetween,
                            alignCenter,
                            STYLES.filterButton
                        ]}>
                        <Text>216542</Text>
                        <Icon
                            name="keyboard-arrow-down"
                            size={TEXT_LINE_HEIGHT}
                        />
                    </View>
                </MatButton>
            </View>

            <View style={[vSpacer25]} />

            <FlatList
                contentContainerStyle={[
                    centerVertically,
                    justifyAlignCenter,
                    scrollView,
                    pT2,
                    STYLES.listBottomSpacing
                ]}
                data={logs}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
            />
            <View style={[fabButtonView, STYLES.fabButtonView]}>
                <MatButton isFab isElevated>
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
