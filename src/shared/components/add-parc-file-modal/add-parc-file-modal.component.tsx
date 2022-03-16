import React, {
    createRef,
    RefObject,
    useContext,
    useEffect,
    useState
} from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View
} from 'react-native';
import ActionSheetComponent from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SQLError} from 'react-native-sqlite-storage';
import CommonStyles, {
    FILTER_ROW_HEIGHT,
    MAIN_LIGHT_GREY,
    poppinsRegular
} from '../../../styles';
import ModalHeader from '../modal-header/modal-header.component';
import {translate} from '../../../utils/i18n.utils';
import ModalFooter from '../modal-footer/modal-footer.component';
import FormInput from '../form-input/form-input.component';
import DateInput from '../date-input/date-input.component';
import FormCheckbox from '../form-checkbox/form-checkbox.component';
import {CuberInterface} from '../../../core/interfaces/cuber.interface';
import {SiteInterface} from '../../../core/interfaces/site.interface';
import ActionSheetContent from '../action-sheet-content/action-sheet-content.component';
import MatButton from '../mat-button.component';
import SelectInput from '../select-input/select-input.component';
import {AuxiliaryInterface} from '../../../core/interfaces/auxiliary.interface';
import {ParcPrepInterface} from '../../../core/interfaces/parc-prep.interface';
import {
    insertParcPrepFile,
    updateParcPrep
} from '../../../core/services/parc-prep.service';
import {ParcPrepAllDetailsInterface} from '../../../core/interfaces/parc-prep-all-details.interface';
import {requestCloseModal} from '../../../utils/modal.utils';
import {MainStateContextInterface} from '../../../core/interfaces/main-state.interface';
import MainStateContext from '../../../core/contexts/main-state.context';
import CameraModal from '../camera-modal/camera-modal.component';
import ScanInput from '../scan-input/scan-input.component';

const {
    fullWidth,
    appPage,
    vSpacer25,
    scrollView,
    centerHorizontally,
    justifyAlignTLeftHorizontal,
    alignCenter
} = CommonStyles;

const TEXT_LINE_HEIGHT = 27;
const STYLES = StyleSheet.create({
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

const AddParcFileDetails: React.FunctionComponent<{
    modalVisible: boolean;
    cubers: CuberInterface[];
    sites: SiteInterface[];
    oldFile?: ParcPrepAllDetailsInterface | null;
    onClose: (refresh?: boolean) => void;
}> = ({
    modalVisible,
    onClose,
    cubers,
    oldFile,
    sites
}: {
    modalVisible: boolean;
    onClose: (refresh?: boolean) => void;
    cubers: CuberInterface[];
    oldFile?: ParcPrepAllDetailsInterface | null;
    sites: SiteInterface[];
}) => {
    const [name, setName] = useState<string>('');
    const [cameraModalShow, setCameraModalShow] = useState<boolean>(false);
    const [idValid, setIdValid] = useState<boolean | boolean[]>(true);
    const [aac, setAac] = useState<string>('');
    const [aacValid, setAacValid] = useState<boolean | boolean[]>(true);
    const [cuber, setCuber] = useState<CuberInterface>();
    const [site, setSite] = useState<SiteInterface>();
    const [date, setDate] = useState<Date>(new Date());
    const [defaultParc, setDefaultParc] = useState<boolean>(true);

    const [selectedList, setSelectedList] = useState<
        'cubers' | 'sites' | 'none'
    >('none');

    const {keyboardHeight} = useContext<MainStateContextInterface>(
        MainStateContext
    );

    const validForm = () =>
        !!(idValid && aacValid && aac && aac.length && cuber && site);

    const onSelectMenu = (list: 'cubers' | 'sites' | 'none'): void => {
        setSelectedList(list);
        if (list === 'none') {
            actionSheetRef.current?.setModalVisible(false);
        } else {
            actionSheetRef.current?.setModalVisible();
        }
    };

    const clearFields = () => {
        setName('');
        setAac('');
        setDate(new Date());
        setCuber(undefined);
        setSite(undefined);
    };

    useEffect(() => {
        if (oldFile) {
            setName(oldFile.name);
            setAac(oldFile.aac);
            setAacValid(true);
            setIdValid(true);
            setCuber({
                name: oldFile.cuberName,
                code: oldFile.cuberCode
            });
            setSite({
                name: oldFile.siteName,
                code: oldFile.siteCode
            });
            setDate(new Date(oldFile.creationDate));
            setDefaultParc(!!oldFile.isDefault);
        }
    }, [oldFile]);

    const checkIfOnlyDefaultChanged = () =>
        date.toISOString() === oldFile?.creationDate &&
        cuber?.code === oldFile.cuberCode &&
        site?.code === oldFile.siteCode &&
        aac === oldFile.aac;

    const confirmInsertion = () => {
        if (validForm() && cuber && site) {
            const EL: ParcPrepInterface = {
                name,
                creationDate: date.toISOString(),
                aac,
                cuber: cuber.code,
                site: site.code,
                defaultParcFile: defaultParc ? 1 : 0
            };

            if (oldFile) {
                EL.id = `${oldFile.id}`;
                updateParcPrep(EL, !checkIfOnlyDefaultChanged())
                    .then((res) => {
                        if (res && res.rows) {
                            clearFields();
                            onClose(true);
                            ToastAndroid.show(
                                translate('modals.parcPrep.succMsgEdit'),
                                ToastAndroid.SHORT
                            );
                        }
                    })
                    .catch((reason: SQLError) => {
                        if (!reason.code) {
                            ToastAndroid.show(
                                translate('common.dupErr'),
                                ToastAndroid.LONG
                            );
                        }
                    });
            } else {
                insertParcPrepFile(EL)
                    .then((res) => {
                        if (res && res.rows) {
                            clearFields();
                            onClose(true);
                            ToastAndroid.show(
                                translate('modals.parcPrep.succMsg'),
                                ToastAndroid.SHORT
                            );
                        }
                    })
                    .catch((reason: SQLError) => {
                        console.error(reason);
                        if (!reason.code) {
                            ToastAndroid.show(
                                translate('common.dupErr'),
                                ToastAndroid.LONG
                            );
                        }
                    });
            }
        } else {
            ToastAndroid.show(translate('common.validErr'), ToastAndroid.LONG);
        }
    };

    const renderFilterBtn = (
        {item}: {item: AuxiliaryInterface},
        _i: number
    ) => (
        <MatButton
            onPress={() => {
                if (selectedList === 'cubers') {
                    setCuber(item);
                } else {
                    setSite(item);
                }
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
                    name={
                        selectedList === 'cubers'
                            ? 'engineering'
                            : 'photo-size-select-actual'
                    }
                    size={TEXT_LINE_HEIGHT}
                    color={MAIN_LIGHT_GREY}
                />
                <Text style={[STYLES.searchResultText]}>{item.name}</Text>
            </View>
        </MatButton>
    );

    return (
        <Modal
            style={[fullWidth]}
            onRequestClose={() => {
                requestCloseModal(() => {
                    clearFields();
                    onClose();
                });
            }}
            animationType="slide"
            visible={modalVisible}>
            <ModalHeader
                title={translate(
                    oldFile
                        ? 'common.editParcPrepFile'
                        : 'common.addParcPrepFile'
                )}
                onClose={() => {
                    requestCloseModal(() => {
                        clearFields();
                        onClose();
                    });
                }}
            />
            <SafeAreaView style={[appPage]}>
                <ScrollView>
                    <FormInput
                        maxLength={25}
                        title={translate('modals.parcPrep.fields.id.label')}
                        placeholder={translate('modals.parcPrep.fields.id.ph')}
                        onChangeText={setName}
                        value={name}
                        pattern={['^(.){3,}$']}
                        errText={translate('modals.parcPrep.fields.id.err')}
                        onValidation={setIdValid}
                        required
                    />
                    <FormInput
                        maxLength={8}
                        title={translate('modals.parcPrep.fields.aac.label')}
                        placeholder={translate('modals.parcPrep.fields.aac.ph')}
                        onChangeText={setAac}
                        value={aac}
                        pattern={[
                            '(99|[0-9]?[0-9])-(99|[0-9]?[0-9])-(99|[0-9]?[0-9])'
                        ]}
                        errText={translate('modals.parcPrep.fields.aac.err')}
                        onValidation={setAacValid}
                        required
                    />
                    <SelectInput
                        title={translate('modals.parcPrep.fields.cuber.label')}
                        placeholder={translate(
                            'modals.parcPrep.fields.cuber.ph'
                        )}
                        showSelectMenu={() => {
                            onSelectMenu('cubers');
                        }}
                        value={cuber?.name}
                        required
                    />
                    <ScanInput
                        title={translate('modals.parcPrep.fields.site.label')}
                        placeholder={translate(
                            'modals.parcPrep.fields.site.ph'
                        )}
                        onChangeText={(text) => {
                            setSite({
                                name: '',
                                code: text
                            });
                        }}
                        keyboardType="default"
                        value={site?.code}
                        showCodeScanner={() => setCameraModalShow(true)}
                        required
                    />
                    <DateInput
                        title={translate('modals.parcPrep.fields.date.label')}
                        value={date}
                        onDateChange={(newDate: Date) => {
                            setDate(newDate);
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
                disabled={!validForm()}
                onPress={confirmInsertion}
                title={translate('modals.parcPrep.confirm')}
            />

            <CameraModal
                modalVisible={cameraModalShow}
                onClose={(code?: string) => {
                    setCameraModalShow(false);

                    if (code && code.length) {
                        setSite({
                            name: '',
                            code
                        });
                    }
                }}
                modalName={translate('common.scanBarCode')}
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
                    keyboardHeight={keyboardHeight}
                    actionSheetRef={actionSheetRef}
                    valuesList={selectedList === 'cubers' ? cubers : sites}
                    renderElement={renderFilterBtn}
                />
            </ActionSheetComponent>
        </Modal>
    );
};

AddParcFileDetails.defaultProps = {
    oldFile: null
};

export default AddParcFileDetails;
