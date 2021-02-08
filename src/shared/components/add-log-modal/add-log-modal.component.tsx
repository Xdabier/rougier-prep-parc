import React, {useState} from 'react';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';
import CommonStyles from '../../../styles';
import ModalHeader from '../modal-header/modal-header.component';
import {translate} from '../../../utils/i18n.utils';
import ModalFooter from '../modal-footer/modal-footer.component';
import FormInput from '../form-input/form-input.component';

const {fullWidth, appPage, vSpacer100} = CommonStyles;

const AddLogDetails: React.FunctionComponent<{
    modalVisible: boolean;
    onClose: () => void;
}> = ({
    modalVisible,
    onClose
}: {
    modalVisible: boolean;
    onClose: () => void;
}) => {
    const [barCode, setBarCode] = useState<string>('');
    const [logging, setLogging] = useState<string>('');
    const [index, setIndex] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [gasoline, setGasoline] = useState<string>('');
    const [dgb, setDgb] = useState<string>('');
    const [dpb, setDpb] = useState<string>('');
    const [lengthVal, setLengthVal] = useState<string>('');
    const [diameterAvg, setDiameterAvg] = useState<string>('');
    const [volume, setVolume] = useState<string>('');
    const [quality, setQuality] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [patternStatus, setPatternStatus] = useState<string>('');

    const setVolumeFn = (_lengthVal: number, _diameter: number) =>
        _lengthVal && _diameter
            ? ((Math.PI / 4) * (_diameter * _diameter) * _lengthVal) / 1000000
            : 0;

    const onLengthChange = (text: string) => {
        setLengthVal(text);
        setVolume(`${setVolumeFn(+text, +diameterAvg)}`);
    };

    const onLoggingIndexingChange = (
        value: string,
        type: 'logging' | 'indexing'
    ) => {
        if (type === 'indexing') {
            setIndex(value);
            if (value.length || logging.length) {
                setId(`${logging || ''}/${value}`);
            } else if (!value.length || !logging.length) {
                setId('');
            }
        }

        if (type === 'logging') {
            setLogging(value);
            if (value.length || index.length) {
                setId(`${logging}/${index || ''}`);
            } else if (!value.length || !index.length) {
                setId('');
            }
        }
    };

    const setDiameterAndVolume = (dgbVal: number, dpbVal: number) => {
        const FN = (dgbVal + dpbVal) / 2;
        const NON_NAN = Number.isNaN(FN) ? 0 : FN;

        const VOLUME =
            NON_NAN && lengthVal ? setVolumeFn(+lengthVal, NON_NAN) : 0;
        setVolume(`${VOLUME}`);
        setDiameterAvg(`${!NON_NAN ? '' : NON_NAN}`);
    };

    const onDgbDpbChange = (value: string, type: 'dgb' | 'dpb') => {
        if (type === 'dgb') {
            setDgb(value);
            if (dpb.length || value.length) {
                setDiameterAndVolume(+value, +dpb);
            } else if (!value.length || !logging.length) {
                setDiameterAvg('');
            }
        }

        if (type === 'dpb') {
            setDpb(value);
            if (value.length || dgb.length) {
                setDiameterAndVolume(+dgb, +value);
            } else if (!value.length || !index.length) {
                setDiameterAvg('');
            }
        }
    };

    const validForm = () =>
        !(
            barCode &&
            barCode.length >= 6 &&
            logging &&
            logging.length >= 1 &&
            index &&
            index.length >= 1 &&
            gasoline &&
            gasoline.length >= 1 &&
            dgb &&
            dgb.length >= 1 &&
            dpb &&
            dpb.length >= 1 &&
            lengthVal &&
            lengthVal.length >= 1 &&
            diameterAvg &&
            diameterAvg.length >= 1 &&
            volume &&
            volume.length >= 1 &&
            status &&
            status.length >= 1 &&
            patternStatus &&
            patternStatus.length >= 1
        );

    return (
        <Modal style={[fullWidth]} animationType="slide" visible={modalVisible}>
            <ModalHeader title={translate('common.addLog')} onClose={onClose} />
            <SafeAreaView style={[appPage]}>
                <ScrollView>
                    <FormInput
                        title={translate('modals.logs.fields.barCode.label')}
                        placeholder={translate('modals.logs.fields.barCode.ph')}
                        onChangeText={setBarCode}
                        keyboardType="number-pad"
                        value={barCode}
                    />
                    <FormInput
                        title={translate('modals.logs.fields.logging.label')}
                        placeholder={translate('modals.logs.fields.logging.ph')}
                        onChangeText={(text) => {
                            onLoggingIndexingChange(text, 'logging');
                        }}
                        keyboardType="number-pad"
                        value={logging}
                    />
                    <FormInput
                        title={translate('modals.logs.fields.index.label')}
                        placeholder={translate('modals.logs.fields.index.ph')}
                        onChangeText={(text) => {
                            onLoggingIndexingChange(text, 'indexing');
                        }}
                        keyboardType="number-pad"
                        value={index}
                    />
                    <FormInput
                        title={translate('modals.logs.fields.id.label')}
                        placeholder={translate('modals.logs.fields.id.ph')}
                        onChangeText={setId}
                        value={id}
                        disabled
                    />
                    <FormInput
                        title={translate('modals.logs.fields.gasoline.label')}
                        placeholder={translate(
                            'modals.logs.fields.gasoline.ph'
                        )}
                        onChangeText={setGasoline}
                        value={gasoline}
                    />
                    <FormInput
                        title={translate('modals.logs.fields.dgb.label')}
                        placeholder={translate('modals.logs.fields.dgb.ph')}
                        onChangeText={(text) => {
                            onDgbDpbChange(text, 'dgb');
                        }}
                        keyboardType="number-pad"
                        value={dgb}
                    />
                    <FormInput
                        title={translate('modals.logs.fields.dpb.label')}
                        placeholder={translate('modals.logs.fields.dpb.ph')}
                        onChangeText={(text) => {
                            onDgbDpbChange(text, 'dpb');
                        }}
                        keyboardType="number-pad"
                        value={dpb}
                    />
                    <FormInput
                        title={translate('modals.logs.fields.length.label')}
                        placeholder={translate('modals.logs.fields.length.ph')}
                        onChangeText={onLengthChange}
                        value={lengthVal}
                        keyboardType="number-pad"
                    />
                    <FormInput
                        title={translate(
                            'modals.logs.fields.diameterAvg.label'
                        )}
                        placeholder={translate(
                            'modals.logs.fields.diameterAvg.ph'
                        )}
                        onChangeText={setDiameterAvg}
                        value={diameterAvg}
                        disabled
                    />
                    <FormInput
                        title={translate('modals.logs.fields.volume.label')}
                        placeholder={translate('modals.logs.fields.volume.ph')}
                        onChangeText={setVolume}
                        value={volume}
                        disabled
                    />
                    <FormInput
                        title={translate('modals.logs.fields.quality.label')}
                        placeholder={translate('modals.logs.fields.quality.ph')}
                        onChangeText={setQuality}
                        value={quality}
                    />
                    <FormInput
                        title={translate('modals.logs.fields.status.label')}
                        placeholder={translate('modals.logs.fields.status.ph')}
                        onChangeText={setStatus}
                        value={status}
                    />
                    <FormInput
                        title={translate(
                            'modals.logs.fields.patternStatus.label'
                        )}
                        placeholder={translate(
                            'modals.logs.fields.patternStatus.ph'
                        )}
                        onChangeText={setPatternStatus}
                        value={patternStatus}
                    />
                    <View style={[vSpacer100]} />
                </ScrollView>
            </SafeAreaView>
            <ModalFooter
                disabled={validForm()}
                onPress={() => true}
                title={translate('modals.logs.confirm')}
            />
        </Modal>
    );
};

export default AddLogDetails;
