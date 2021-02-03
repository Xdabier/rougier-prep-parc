import I18n, {TranslateOptions} from 'i18n-js';
import {findBestAvailableLanguage} from 'react-native-localize';
import memoize from 'lodash.memoize';

const translationGetters: {
    [local: string]: object;
} = {
    en: require('../assets/json/i18n/en.json')
};

const translate = memoize(
    (key, config?: TranslateOptions) =>
        config ? I18n.t(key, config) : I18n.t(key),
    (key, config?: TranslateOptions) =>
        config ? key + JSON.stringify(config) : key
);

const setI18nConfig = () => {
    const fallback = {languageTag: 'en'};
    const {languageTag} =
        findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;

    if (translate && translate.cache && translate.cache.clear) {
        translate.cache.clear();
    }

    I18n.translations = {[languageTag]: translationGetters[languageTag]};
    I18n.locale = languageTag;
};

export {setI18nConfig, translate};
