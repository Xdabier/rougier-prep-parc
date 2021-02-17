import React, {useState} from 'react';
import {Modal, SafeAreaView, ScrollView, ToastAndroid} from 'react-native';
import {SQLError} from 'react-native-sqlite-storage';
import CommonStyles from '../../../styles';
import ModalHeader from '../modal-header/modal-header.component';
import {translate} from '../../../utils/i18n.utils';
import ModalFooter from '../modal-footer/modal-footer.component';
import FormInput from '../form-input/form-input.component';
import {AuxiliaryInterface} from '../../../core/interfaces/auxiliary.interface';
import SqlLiteService from '../../../core/services/sql-lite.service';
import NameToTableEnum from '../../../core/enum/name-to-table.enum';

const {fullWidth, appPage} = CommonStyles;

const AddAuxModal: React.FunctionComponent<{
    modalVisible: boolean;
    onClose: () => void;
    modalName: string;
}> = ({
    modalVisible,
    onClose,
    modalName
}: {
    modalVisible: boolean;
    onClose: () => void;
    modalName: string;
}) => {
    const [name, setName] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const validForm = () =>
        !(name && name.length >= 1 && code && code.length >= 1);

    const confirmInsertion = () => {
        const SQLITE_SERVICE: SqlLiteService = new SqlLiteService();
        const EL: AuxiliaryInterface = {
            name: name.toUpperCase(),
            code: code.toUpperCase()
        };

        // @ts-ignore
        SQLITE_SERVICE.insertAux(EL, NameToTableEnum[modalName])
            .then((res) => {
                if (res && res.rows) {
                    setName('');
                    setCode('');
                    onClose();
                    ToastAndroid.show(
                        translate('modals.aux.succMsg', {val: modalName}),
                        ToastAndroid.SHORT
                    );
                }
            })
            .catch((reason: SQLError) => {
                console.error('add aux l58', reason);
                if (!reason.code) {
                    ToastAndroid.show(
                        translate('common.dupErr'),
                        ToastAndroid.LONG
                    );
                }
            });
    };

    return (
        <Modal style={[fullWidth]} animationType="slide" visible={modalVisible}>
            <ModalHeader
                title={translate('modals.aux.title', {val: modalName})}
                onClose={onClose}
            />
            <SafeAreaView style={[appPage]}>
                <ScrollView>
                    <FormInput
                        title={translate('modals.aux.fields.name.label', {
                            val: modalName
                        })}
                        placeholder={translate('modals.aux.fields.name.ph', {
                            val: modalName
                        })}
                        onChangeText={setName}
                        value={name}
                    />
                    <FormInput
                        title={translate('modals.aux.fields.code.label', {
                            val: modalName
                        })}
                        placeholder={translate('modals.aux.fields.code.ph', {
                            val: modalName
                        })}
                        onChangeText={setCode}
                        value={code}
                    />
                </ScrollView>
            </SafeAreaView>
            <ModalFooter
                disabled={validForm()}
                onPress={() => {
                    confirmInsertion();
                }}
                title={translate('modals.aux.confirm', {
                    val: modalName
                })}
            />
        </Modal>
    );
};

export default AddAuxModal;
