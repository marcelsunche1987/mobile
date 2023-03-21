import { enUS, es } from 'date-fns/locale';

const defaultLocale: Locale = enUS;

/**
 * when this function is called locale storage is checked for the i18nextLng property
 *
 * if that is null then the defualt Locale is returned
 *
 * else switch statement handles what other options
 *
 * @returns {Locale}  a date-fns locale
 */
const getLocaleFromI18n = () => {
    const currentLanguage: string | null = localStorage.getItem('i18nextLng');
    if (currentLanguage === null) {
        return defaultLocale;
    } else {
        switch (currentLanguage) {
            case 'en':
                return enUS;
                break;
            case 'spa':
                return es;
                break;
            default:
                return defaultLocale;
        }
    }
};
export default getLocaleFromI18n;
