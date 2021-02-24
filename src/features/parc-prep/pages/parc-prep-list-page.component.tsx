import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useContext, useState} from 'react';
import {publish as eventPub} from 'pubsub-js';
import {ParcPrepScreenProps} from '../../../core/types/parc-prep-screen-props.type';
import CommonStyles, {
    FAB_BOTTOM_DISTANCE,
    STACK_HEADER_HEIGHT
} from '../../../styles';
import ParcPrepCard from '../../../shared/components/parc-prep-card/parc-prep-card.component';
import MatButton from '../../../shared/components/mat-button.component';
import AddLogDetails from '../../../shared/components/add-log-modal/add-log-modal.component';
import {translate} from '../../../utils/i18n.utils';
import {MainStateContextInterface} from '../../../core/interfaces/main-state.interface';
import MainStateContext from '../../../core/contexts/main-state.context';
import {ParcPrepAllDetailsInterface} from '../../../core/interfaces/parc-prep-all-details.interface';
import AddParcFileDetails from '../../../shared/components/add-parc-file-modal/add-parc-file-modal.component';
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
    pB60,
    noContent
} = CommonStyles;

const STYLES = StyleSheet.create({
    fabButtonView: {
        bottom: FAB_BOTTOM_DISTANCE + STACK_HEADER_HEIGHT
    }
});

const PrepParcListPage: React.FunctionComponent<ParcPrepScreenProps> = () => {
    const [addLogModalShow, setAddLogModalShow] = useState<boolean>(false);
    const [addParcFileModalShow, setAddParcFileModalShow] = useState<boolean>(
        false
    );
    const [oldParc, setOldParc] = useState<ParcPrepAllDetailsInterface | null>(
        null
    );
    const [selectedParcId, setSelectedParcId] = useState<number>();

    const {
        gasolines,
        parcPrepFiles,
        cubers,
        sites
    } = useContext<MainStateContextInterface>(MainStateContext);

    const renderItem = ({item}: {item: ParcPrepAllDetailsInterface}) => (
        <>
            <ParcPrepCard
                parcPrepFile={item}
                editParc={() => {
                    setOldParc(item);
                    setAddParcFileModalShow(true);
                }}
                onAddLog={() => {
                    setSelectedParcId(item.id);
                    setAddLogModalShow(true);
                }}
            />
            <View style={[vSpacer12]} />
        </>
    );

    return (
        <SafeAreaView style={[appPage]}>
            {parcPrepFiles.length ? (
                <FlatList
                    contentContainerStyle={[
                        centerVertically,
                        justifyAlignCenter,
                        scrollView,
                        pT2,
                        pB60
                    ]}
                    data={parcPrepFiles}
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
                    disabled={!parcPrepFiles.length}>
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
                parcPrepFileId={selectedParcId}
                gasolineList={gasolines}
                modalVisible={addLogModalShow}
                onClose={(refresh: boolean | undefined) => {
                    setAddLogModalShow(false);

                    if (refresh) {
                        eventPub(EventTopicEnum.updateParcPrep);
                    }
                }}
            />

            <AddParcFileDetails
                oldFile={oldParc}
                cubers={cubers}
                sites={sites}
                modalVisible={addParcFileModalShow}
                onClose={(refresh: boolean | undefined) => {
                    setAddParcFileModalShow(false);
                    setOldParc(null);

                    if (refresh) {
                        eventPub(EventTopicEnum.updateParcPrep);
                    }
                }}
            />
        </SafeAreaView>
    );
};

export default PrepParcListPage;
