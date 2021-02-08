import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import {ParcPrepScreenProps} from '../../../core/types/parc-prep-screen-props.type';
import CommonStyles, {
    FAB_BOTTOM_DISTANCE,
    STACK_HEADER_HEIGHT
} from '../../../styles';
import {ParcPrepInterface} from '../../../core/interfaces/parc-prep.interface';
import ParcPrepCard from '../../../shared/components/parc-prep-card/parc-prep-card.component';
import MatButton from '../../../shared/components/mat-button.component';
import AddLogDetails from '../../../shared/components/add-log-modal/add-log-modal.component';

const {
    appPage,
    centerVertically,
    justifyAlignCenter,
    scrollView,
    vSpacer12,
    fabButtonView,
    fabButton,
    backgroundMain,
    pT2
} = CommonStyles;

const STYLES = StyleSheet.create({
    fabButtonView: {
        bottom: FAB_BOTTOM_DISTANCE + STACK_HEADER_HEIGHT
    }
});

const PrepParcListPage: React.FunctionComponent<ParcPrepScreenProps> = () => {
    const [files, setFiles] = useState<ParcPrepInterface[]>([]);
    const [addLogModalShow, setAddLogModalShow] = useState<boolean>(false);
    useEffect(() => {
        const fetchFiles = () => {
            const filesData = require('../../../assets/json/fakeParcFiles.json');
            setFiles(filesData);
        };
        fetchFiles();
    });

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

            <View style={[fabButtonView, STYLES.fabButtonView]}>
                <MatButton isFab isElevated onPress={() => true}>
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
                modalVisible={addLogModalShow}
                onClose={() => setAddLogModalShow(false)}
            />
        </SafeAreaView>
    );
};

export default PrepParcListPage;
