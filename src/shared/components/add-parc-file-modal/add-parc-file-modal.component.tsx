import React, {useState} from 'react';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';
import CommonStyles from '../../../styles';
import ModalHeader from '../modal-header/modal-header.component';
import {translate} from '../../../utils/i18n.utils';
import ModalFooter from '../modal-footer/modal-footer.component';
import FormInput from '../form-input/form-input.component';
import DateInput from '../date-input/date-input.component';
import FormCheckbox from '../form-checkbox/form-checkbox.component';

const {fullWidth, appPage, vSpacer25} = CommonStyles;

const AddParcFileDetails: React.FunctionComponent<{
    modalVisible: boolean;
    onClose: () => void;
}> = ({
    modalVisible,
    onClose
}: {
    modalVisible: boolean;
    onClose: () => void;
}) => {
    const [aac, setAac] = useState<string>('');
    const [aacValid, setAacValid] = useState<boolean | boolean[]>(true);
    const [cuber, setCuber] = useState<string>('');
    const [site, setSite] = useState<string>('');
    const [date, setDate] = useState<string>(new Date().toLocaleDateString());
    const [defaultParc, setDefaultParc] = useState<boolean>(true);

    const validForm = () =>
        !(
            aacValid &&
            aac &&
            aac.length >= 6 &&
            cuber &&
            cuber.length >= 1 &&
            site &&
            site.length >= 1 &&
            date &&
            date.length >= 1
        );

    return (
        <Modal style={[fullWidth]} animationType="slide" visible={modalVisible}>
            <ModalHeader
                title={translate('common.addParcPrepFile')}
                onClose={onClose}
            />
            <SafeAreaView style={[appPage]}>
                <ScrollView>
                    <FormInput
                        title={translate('modals.parcPrep.fields.aac.label')}
                        placeholder={translate('modals.parcPrep.fields.aac.ph')}
                        onChangeText={setAac}
                        value={aac}
                        pattern={[
                            '(99|[0-9]?[0-9])-(99|[0-9]?[0-9])-(99|[0-9]?[0-9])'
                        ]}
                        errText={translate('modals.parcPrep.fields.aac.err')}
                        onValidation={setAacValid}
                    />
                    <FormInput
                        title={translate('modals.parcPrep.fields.cuber.label')}
                        placeholder={translate(
                            'modals.parcPrep.fields.cuber.ph'
                        )}
                        onChangeText={setCuber}
                        value={cuber}
                    />
                    <FormInput
                        title={translate('modals.parcPrep.fields.site.label')}
                        placeholder={translate(
                            'modals.parcPrep.fields.site.ph'
                        )}
                        onChangeText={setSite}
                        value={site}
                    />
                    <DateInput
                        title={translate('modals.parcPrep.fields.date.label')}
                        value={date}
                        onDateChange={(newDate: Date) => {
                            setDate(new Date(newDate).toLocaleDateString());
                        }}
                    />
                    <View style={[vSpacer25]} />
                    <FormCheckbox
                        value={defaultParc}
                        onValueChange={setDefaultParc}
                        title={translate(
                            'modals.parcPrep.fields.parcAsDefault.label'
                        )}
                    />
                </ScrollView>
            </SafeAreaView>
            <ModalFooter
                disabled={validForm()}
                onPress={() => true}
                title={translate('modals.parcPrep.confirm')}
            />
        </Modal>
    );
};

export default AddParcFileDetails;
