import * as React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useCallback, useEffect, useState} from 'react';
import {publish as eventPub} from 'pubsub-js';
import {HomeScreenProps} from '../../../core/types/home-screen-props.type';
import CommonStyles, {
    BORDER_RADIUS,
    MAIN_GREEN,
    MAIN_RED,
    PADDING_HORIZONTAL,
    poppinsMedium
} from '../../../styles';
import {translate} from '../../../utils/i18n.utils';
import PageTitle from '../../../shared/components/page-title/page-title.component';
import ParcPrepCard from '../../../shared/components/parc-prep-card/parc-prep-card.component';
import MatButton from '../../../shared/components/mat-button.component';
import {ParcPrepInterface} from '../../../core/interfaces/parc-prep.interface';
import AddLogDetails from '../../../shared/components/add-log-modal/add-log-modal.component';
import AddParcFileDetails from '../../../shared/components/add-parc-file-modal/add-parc-file-modal.component';
import {GasolineInterface} from '../../../core/interfaces/gasoline.interface';
import SqlLiteService from '../../../core/services/sql-lite.service';
import NameToTableEnum from '../../../core/enum/name-to-table.enum';
import {CuberInterface} from '../../../core/interfaces/cuber.interface';
import {SiteInterface} from '../../../core/interfaces/site.interface';
import EventTopicEnum from '../../../core/enum/event-topic.enum';

const {
    appPage,
    vSpacer60,
    vSpacer12,
    centerHorizontally,
    centerVertically,
    spaceEvenly,
    fullWidth,
    justifyAlignCenter,
    textAlignCenter,
    scrollView
} = CommonStyles;

const ICON_SIZE = 30;
const STYLES = StyleSheet.create({
    button: {
        width: Dimensions.get('screen').width - PADDING_HORIZONTAL * 2,
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: BORDER_RADIUS
    },
    buttonSecond: {
        backgroundColor: MAIN_RED
    },
    buttonMain: {
        backgroundColor: MAIN_GREEN
    },
    buttonText: {
        lineHeight: 30,
        fontFamily: poppinsMedium,
        fontSize: 18,
        color: '#fff'
    },
    textView: {
        width: 240
    }
});

const HomePage: React.FunctionComponent<HomeScreenProps> = () => {
    const [files, setFiles] = useState<ParcPrepInterface[]>([]);
    const [addLogModalShow, setAddLogModalShow] = useState<boolean>(false);
    const [addParcFileModalShow, setAddParcFileModalShow] = useState<boolean>(
        false
    );

    const [gasolineList, setGasolineList] = useState<GasolineInterface[]>([]);
    const [cubers, setCubers] = useState<CuberInterface[]>([]);
    const [sites, setSites] = useState<SiteInterface[]>([]);

    const fetchFiles = useCallback(() => {
        const SQLiteService: SqlLiteService = new SqlLiteService();
        SQLiteService.getParcPrepFiles<ParcPrepInterface>()
            .then((value: ParcPrepInterface[]) => {
                setFiles(value);
            })
            .catch((reason) => {
                console.error('getParcPrepFiles line 90', reason);
            });
    }, []);

    useEffect(() => {
        const SQLiteService: SqlLiteService = new SqlLiteService();
        const getGasolineList = (close = false) => {
            SQLiteService.getAux<GasolineInterface>(
                NameToTableEnum.gasoline,
                close
            )
                .then((value: GasolineInterface[]) => {
                    setGasolineList(value);
                    fetchFiles();
                })
                .catch((reason) => {
                    console.error('gas line 96', reason);
                });
        };
        const getCubers = (close = false) => {
            SQLiteService.getAux<CuberInterface>(NameToTableEnum.cuber, close)
                .then((value: CuberInterface[]) => {
                    setCubers(value);
                    getGasolineList(true);
                })
                .catch((reason) => {
                    console.error('parc line 104', reason);
                });
        };
        const getSites = (close = false) => {
            SQLiteService.getAux<SiteInterface>(NameToTableEnum.site, close)
                .then((value: SiteInterface[]) => {
                    setSites(value);
                    getCubers();
                })
                .catch((reason) => {
                    console.error('sites line 114', reason);
                });
        };
        getSites();
    }, [fetchFiles]);

    return (
        <SafeAreaView style={[appPage]}>
            <ScrollView
                contentContainerStyle={[
                    centerVertically,
                    justifyAlignCenter,
                    scrollView
                ]}>
                {files && files.length ? (
                    <>
                        <PageTitle title={translate('homePage.title')} />

                        <ParcPrepCard
                            parcPrepFile={files[0]}
                            onAddLog={() => setAddLogModalShow(true)}
                        />
                    </>
                ) : (
                    <View />
                )}
                <View style={[vSpacer60]} />
                <MatButton onPress={() => true} disabled={!files.length}>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonSecond,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon
                            name="qr-code-scanner"
                            color="#fff"
                            size={ICON_SIZE}
                        />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.scanBarCode')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
                <View style={[vSpacer12]} />
                <MatButton onPress={() => setAddParcFileModalShow(true)}>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonMain,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon name="post-add" color="#fff" size={ICON_SIZE} />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.addParcPrepFile')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
                <View style={[vSpacer12]} />
                <MatButton
                    onPress={() => setAddLogModalShow(true)}
                    disabled={!files.length}>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonMain,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon name="add-circle" color="#fff" size={ICON_SIZE} />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.addLog')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
                <View style={[vSpacer12]} />
                <MatButton onPress={() => true} disabled={!files.length}>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonMain,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon name="sync" color="#fff" size={ICON_SIZE} />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.syncAll')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
            </ScrollView>

            <AddLogDetails
                gasolineList={gasolineList}
                modalVisible={addLogModalShow}
                onClose={() => setAddLogModalShow(false)}
            />

            <AddParcFileDetails
                cubers={cubers}
                sites={sites}
                modalVisible={addParcFileModalShow}
                onClose={(refresh: boolean | undefined) => {
                    setAddParcFileModalShow(false);

                    if (refresh) {
                        fetchFiles();
                        eventPub(EventTopicEnum.updateParcPrep);
                    }
                }}
            />
        </SafeAreaView>
    );
};

export default HomePage;
