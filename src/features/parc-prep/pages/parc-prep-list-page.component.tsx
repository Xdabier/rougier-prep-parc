import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {subscribe as eventSub} from 'pubsub-js';
import {ParcPrepScreenProps} from '../../../core/types/parc-prep-screen-props.type';
import CommonStyles, {
    FAB_BOTTOM_DISTANCE,
    STACK_HEADER_HEIGHT
} from '../../../styles';
import {ParcPrepInterface} from '../../../core/interfaces/parc-prep.interface';
import ParcPrepCard from '../../../shared/components/parc-prep-card/parc-prep-card.component';
import MatButton from '../../../shared/components/mat-button.component';
import AddLogDetails from '../../../shared/components/add-log-modal/add-log-modal.component';
import {GasolineInterface} from '../../../core/interfaces/gasoline.interface';
import SqlLiteService from '../../../core/services/sql-lite.service';
import NameToTableEnum from '../../../core/enum/name-to-table.enum';
import {translate} from '../../../utils/i18n.utils';
import EventTopicEnum from '../../../core/enum/event-topic.enum';

const {
    appPage,
    centerVertically,
    justifyAlignCenter,
    scrollView,
    vSpacer12,
    fabButtonView,
    fabButton,
    backgroundMain,
    pT2,
    noContent
} = CommonStyles;

const STYLES = StyleSheet.create({
    fabButtonView: {
        bottom: FAB_BOTTOM_DISTANCE + STACK_HEADER_HEIGHT
    }
});
const SQLiteService: SqlLiteService = new SqlLiteService();

const PrepParcListPage: React.FunctionComponent<ParcPrepScreenProps> = () => {
    const [files, setFiles] = useState<ParcPrepInterface[]>([]);
    const [gasolineList, setGasolineList] = useState<GasolineInterface[]>([]);
    const [addLogModalShow, setAddLogModalShow] = useState<boolean>(false);

    const fetchFiles = useCallback(() => {
        SQLiteService.getParcPrepFiles<ParcPrepInterface>()
            .then((value: ParcPrepInterface[]) => {
                setFiles(value);
            })
            .catch((reason) => {
                console.error('getParcPrepFiles line 90', reason);
            });
    }, []);

    useEffect(() => {
        const subForEvent = (): void => {
            eventSub(EventTopicEnum.updateParcPrep, () => {
                fetchFiles();
            });
        };
        const getGasolineList = (close = false) => {
            SQLiteService.getAux<GasolineInterface>(
                NameToTableEnum.gasoline,
                close
            )
                .then((value: GasolineInterface[]) => {
                    setGasolineList(value);
                    fetchFiles();
                    subForEvent();
                })
                .catch((reason) => {
                    console.error('gas line 96', reason);
                });
        };
        getGasolineList();
    }, [SQLiteService, fetchFiles]);

    const renderItem = ({item}: {item: ParcPrepInterface}) => (
        <>
            <ParcPrepCard
                parcPrepFile={item}
                onAddLog={() => setAddLogModalShow(true)}
            />
            <View style={[vSpacer12]} />
        </>
    );

    return (
        <SafeAreaView style={[appPage]}>
            {files.length ? (
                <FlatList
                    contentContainerStyle={[
                        centerVertically,
                        justifyAlignCenter,
                        scrollView,
                        pT2
                    ]}
                    data={files}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${index}`}
                />
            ) : (
                <View>
                    <Text style={[noContent]}>
                        {translate('parcPrep.noContent')}
                    </Text>
                </View>
            )}

            <View style={[fabButtonView, STYLES.fabButtonView]}>
                <MatButton
                    isFab
                    isElevated
                    onPress={() => true}
                    disabled={!files.length}>
                    <View
                        style={[
                            centerVertically,
                            justifyAlignCenter,
                            fabButton,
                            backgroundMain
                        ]}>
                        <Icon name="sync" size={40} color="#fff" />
                    </View>
                </MatButton>
            </View>

            <AddLogDetails
                gasolineList={gasolineList}
                modalVisible={addLogModalShow}
                onClose={() => setAddLogModalShow(false)}
            />
        </SafeAreaView>
    );
};

export default PrepParcListPage;
