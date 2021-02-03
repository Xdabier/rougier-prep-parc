import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FlatList, SafeAreaView, View} from 'react-native';
import {useEffect, useState} from 'react';
import {ParcPrepScreenProps} from '../../../core/types/parc-prep-screen-props.type';
import CommonStyles from '../../../styles';
import {ParcPrepInterface} from '../../../core/interfaces/parc-prep.interface';
import ParcPrepCard from '../../../shared/components/parc-prep-card/parc-prep-card.component';
import MatButton from '../../../shared/components/mat-button.component';

const {
    appPage,
    centerVertically,
    justifyAlignCenter,
    scrollView,
    vSpacer12,
    fabButtonView,
    fabButton,
    rougierShadow,
    backgroundMain
} = CommonStyles;

const PrepParcListPage: React.FunctionComponent<ParcPrepScreenProps> = () => {
    const [files, setFiles] = useState<ParcPrepInterface[]>([]);
    useEffect(() => {
        const fetchFiles = () => {
            const filesData = require('../../../assets/json/fakeParcFiles.json');
            setFiles(filesData);
        };
        fetchFiles();
    });

    const renderItem = ({item}: {item: ParcPrepInterface}) => (
        <>
            <ParcPrepCard parcPrepFile={item} />
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
                data={files}
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
                            backgroundMain
                        ]}>
                        <Icon name="sync" size={40} color="#fff" />
                    </View>
                </MatButton>
            </View>
        </SafeAreaView>
    );
};

export default PrepParcListPage;
