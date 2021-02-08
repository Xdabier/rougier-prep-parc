import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import CommonStyles, {
    PADDING_HORIZONTAL,
    STACK_HEADER_HEIGHT
} from '../../../styles';
import ModalHeader from '../modal-header/modal-header.component';
import {translate} from '../../../utils/i18n.utils';

const {fullWidth, appPage} = CommonStyles;

const STYLES = StyleSheet.create({
    header: {
        height: STACK_HEADER_HEIGHT,
        backgroundColor: '#fff',
        paddingHorizontal: PADDING_HORIZONTAL
    }
});

const AddLogDetails: React.FunctionComponent<{
    modalVisible: boolean;
    onClose: () => void;
}> = ({
    modalVisible,
    onClose
}: {
    modalVisible: boolean;
    onClose: () => void;
}) => (
    <Modal style={[fullWidth]} animationType="slide" visible={modalVisible}>
        <ModalHeader
            title={translate('common.addLog')}
            modalVisible={modalVisible}
            onClose={onClose}
        />
        <SafeAreaView style={[appPage]}>
            <ScrollView>
                <Text>Hello</Text>
            </ScrollView>
        </SafeAreaView>
    </Modal>
);

export default AddLogDetails;
