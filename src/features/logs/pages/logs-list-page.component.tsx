import * as React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionSheetComponent from 'react-native-actions-sheet';
import {createRef, RefObject, useEffect, useState} from 'react';
import {LogsListScreenProps} from '../../../core/types/logs-list-screen-props.type';
import CommonStyles, {
    BORDER_RADIUS,
    FAB_BOTTOM_DISTANCE,
    FILTER_ROW_HEIGHT,
    MAIN_LIGHT_GREY,
    PAGE_TITLE_LINE_HEIGHT,
    poppinsMedium,
    poppinsRegular
} from '../../../styles';
import MatButton from '../../../shared/components/mat-button.component';
import {LogInterface} from '../../../core/interfaces/log.interface';
import LogCard from '../../../shared/components/log-card/log-card.component';
import PageTitle from '../../../shared/components/page-title/page-title.component';
import {translate} from '../../../utils/i18n.utils';
import AddLogDetails from '../../../shared/components/add-log-modal/add-log-modal.component';
import ActionSheetContent from '../../../shared/components/action-sheet-content/action-sheet-content.component';
import {GasolineInterface} from '../../../core/interfaces/gasoline.interface';
import SqlLiteService from '../../../core/services/sql-lite.service';
import NameToTableEnum from '../../../core/enum/name-to-table.enum';

const {
    appPage,
    fullWidth,
    centerVertically,
    centerHorizontally,
    spaceBetween,
    alignCenter,
    justifyAlignCenter,
    justifyAlignTLeftHorizontal,
    scrollView,
    vSpacer12,
    pT2,
    vSpacer25,
    fabButton,
    fabButtonView,
    backgroundSecond,
    mainColor,
    noContent
} = CommonStyles;

const TEXT_LINE_HEIGHT = 27;
const FAB_BOTTOM_MARGIN = 3;
const MISSING_SPACE =
    PAGE_TITLE_LINE_HEIGHT +
    FILTER_ROW_HEIGHT +
    FAB_BOTTOM_DISTANCE -
    FAB_BOTTOM_MARGIN +
    25;

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
    },
    input: {
        minHeight: 50,
        borderRadius: BORDER_RADIUS,
        borderWidth: 1,
        borderColor: MAIN_LIGHT_GREY,
        marginBottom: 15,
        paddingHorizontal: 10
    },
    searchResult: {
        height: FILTER_ROW_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: MAIN_LIGHT_GREY
    },
    searchResultText: {
        marginLeft: 18,
        fontFamily: poppinsRegular,
        fontSize: 16,
        lineHeight: TEXT_LINE_HEIGHT
    }
});

const actionSheetRef: RefObject<ActionSheetComponent> = createRef();

const parcIds = [554560, 623104, 763546, 38525, 105956, 878269];

const LogsListPage: React.FunctionComponent<LogsListScreenProps> = () => {
    const [logs, setLogs] = useState<LogInterface[]>([]);
    const [addLogModalShow, setAddLogModalShow] = useState<boolean>(false);
    const [filteringId, setFilteringId] = useState<string>(`${parcIds[0]}`);

    const [gasolineList, setGasolineList] = useState<GasolineInterface[]>([]);

    useEffect(() => {
        const SQLiteService: SqlLiteService = new SqlLiteService();
        const fetchLogs = () => {
            SQLiteService.getLogs<LogInterface>()
                .then((value: LogInterface[]) => {
                    setLogs(value);
                })
                .catch((reason) => {
                    console.error('LogsListPage line 122', reason);
                });
        };
        const getGasolineList = (close = false) => {
            SQLiteService.getAux<GasolineInterface>(
                NameToTableEnum.gasoline,
                close
            )
                .then((value: GasolineInterface[]) => {
                    setGasolineList(value);
                    fetchLogs();
                })
                .catch((reason) => {
                    console.error('gas line 96', reason);
                });
        };
        getGasolineList();
    }, []);

    const renderItem = ({item}: {item: LogInterface}) => (
        <>
            <LogCard logItem={item} />
            <View style={[vSpacer12]} />
        </>
    );

    const renderFilterBtn = ({item}: {item: string}, _i: number) => (
        <MatButton
            onPress={() => {
                setFilteringId(`${item}`);
                actionSheetRef.current?.setModalVisible(false);
            }}
            key={_i}>
            <View
                style={[
                    scrollView,
                    centerHorizontally,
                    justifyAlignTLeftHorizontal,
                    alignCenter,
                    STYLES.searchResult
                ]}>
                <Icon
                    name="carpenter"
                    size={TEXT_LINE_HEIGHT}
                    color={MAIN_LIGHT_GREY}
                />
                <Text style={[STYLES.searchResultText]}>{item}</Text>
            </View>
        </MatButton>
    );

    return (
        <SafeAreaView style={[appPage]}>
            {logs.length ? (
                <>
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
                        <MatButton
                            isElevated
                            onPress={() => {
                                actionSheetRef.current?.setModalVisible();
                            }}>
                            <View
                                style={[
                                    centerHorizontally,
                                    spaceBetween,
                                    alignCenter,
                                    STYLES.filterButton
                                ]}>
                                <Text>{filteringId}</Text>
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
                </>
            ) : (
                <View>
                    <Text style={[noContent]}>
                        {translate('logsListPage.noContent')}
                    </Text>
                </View>
            )}
            <View style={[fabButtonView, STYLES.fabButtonView]}>
                <MatButton
                    isFab
                    isElevated
                    onPress={() => setAddLogModalShow(true)}>
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

            <AddLogDetails
                gasolineList={gasolineList}
                modalVisible={addLogModalShow}
                onClose={() => setAddLogModalShow(false)}
            />

            <ActionSheetComponent
                initialOffsetFromBottom={0.6}
                ref={actionSheetRef}
                statusBarTranslucent
                bounceOnOpen
                bounciness={4}
                gestureEnabled
                defaultOverlayOpacity={0.3}>
                <ActionSheetContent
                    actionSheetRef={actionSheetRef}
                    valuesList={parcIds}
                    renderElement={renderFilterBtn}
                />
            </ActionSheetComponent>
        </SafeAreaView>
    );
};

export default LogsListPage;
