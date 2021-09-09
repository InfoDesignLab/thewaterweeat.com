"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axiosClient_1 = require("./internal/http/axiosClient");
const exportPattern_1 = require("./internal/util/exportPattern");
const strings_1 = require("./internal/util/strings");
class OtaClient {
    /**
     * @param distributionHash hash of released Crowdin project distribution
     * @param config client config
     */
    constructor(distributionHash, config) {
        this.distributionHash = distributionHash;
        this.disableManifestCache = false;
        this.stringsCache = {};
        this.disableStringsCache = false;
        this.disableJsonDeepMerge = false;
        this.httpClient = (config === null || config === void 0 ? void 0 : config.httpClient) || new axiosClient_1.AxiosHttpClient();
        this.disableManifestCache = !!(config === null || config === void 0 ? void 0 : config.disableManifestCache);
        this.locale = config === null || config === void 0 ? void 0 : config.languageCode;
        this.disableStringsCache = !!(config === null || config === void 0 ? void 0 : config.disableStringsCache);
        this.disableJsonDeepMerge = !!(config === null || config === void 0 ? void 0 : config.disableJsonDeepMerge);
    }
    /**
     * Distribution hash
     */
    getHash() {
        return this.distributionHash;
    }
    /**
     * Default language code to be used if language was not passed as an input argument of the method
     *
     * @param languageCode laguage code
     */
    setCurrentLocale(languageCode) {
        this.locale = languageCode;
    }
    /**
     * Get language code
     */
    getCurrentLocale() {
        return this.locale;
    }
    /**
     * Get manifest timestamp of distribution
     */
    getManifestTimestamp() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.manifest).timestamp;
        });
    }
    /**
     * List of files in distribution
     */
    listFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.manifest).files;
        });
    }
    /**
     * List of project language codes
     */
    listLanguages() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.manifest).languages;
        });
    }
    /**
     * Language mappings
     */
    getLanguageMappings() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.manifest).language_mapping;
        });
    }
    /**
     * Custom languages
     */
    getCustomLanguages() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.manifest).custom_languages;
        });
    }
    /**
     * Returns all translations per each language code
     */
    getTranslations() {
        return __awaiter(this, void 0, void 0, function* () {
            const languages = yield this.listLanguages();
            const translations = {};
            yield Promise.all(languages.map((language) => __awaiter(this, void 0, void 0, function* () {
                translations[language] = yield this.getLanguageTranslations(language);
            })));
            return translations;
        });
    }
    /**
     * Returns translations per each file in disribution for specific language
     *
     * @param languageCode language code
     */
    getLanguageTranslations(languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = this.getLanguageCode(languageCode);
            const files = yield this.listFiles();
            return Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const content = yield this.getFileTranslations(file, language);
                return { content, file };
            })));
        });
    }
    /**
     * Returns file translations
     *
     * @param file file from distribution
     * @param languageCode language code
     */
    getFileTranslations(file, languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${OtaClient.BASE_URL}/${this.distributionHash}/content`;
            const language = this.getLanguageCode(languageCode);
            const languageMappings = yield this.getLanguageMappings();
            const customLanguages = yield this.getCustomLanguages();
            const languageMapping = (languageMappings || {})[language];
            const customLanguage = (customLanguages || {})[language];
            if (exportPattern_1.includesLanguagePlaceholders(file)) {
                url += exportPattern_1.replaceLanguagePlaceholders(file, language, languageMapping, customLanguage);
            }
            else {
                url += `/${language}${file}`;
            }
            return this.httpClient.get(url);
        });
    }
    /**
     * Returns translation strings from json-based files for all languages
     *
     * @param file filter strings by specific file (leave undefined to get from all json files)
     */
    getStrings(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.getJsonFiles(file);
            const languages = yield this.listLanguages();
            const res = {};
            yield Promise.all(languages.map((language) => __awaiter(this, void 0, void 0, function* () {
                res[language] = yield this.getStringsByFilesAndLocale(files, language);
            })));
            return res;
        });
    }
    /**
     * Returns translation strings from json-based files for specific language
     *
     * @param file filter strings by specific file (leave undefined to get from all json files)
     * @param languageCode language code
     */
    getStringsByLocale(file, languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = this.getLanguageCode(languageCode);
            const files = yield this.getJsonFiles(file);
            return this.getStringsByFilesAndLocale(files, language);
        });
    }
    /**
     * Returns translation string for language for specific key
     *
     * @param key path to the translation string in json file
     * @param file filter strings by specific file (leave undefined to get from all json files)
     * @param languageCode language code
     */
    getStringByKey(key, file, languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const strings = yield this.getStringsByLocale(file, languageCode);
            const path = Array.isArray(key) ? key : [key];
            const firstKey = path.shift();
            if (!firstKey) {
                return undefined;
            }
            let res = strings[firstKey];
            for (const keyPart of path) {
                res = res && res[keyPart];
            }
            return res;
        });
    }
    /**
     * Clear cache of translation strings
     */
    clearStringsCache() {
        this.stringsCache = {};
    }
    getStringsByFilesAndLocale(files, language) {
        return __awaiter(this, void 0, void 0, function* () {
            let strings = {};
            for (const filePath of files) {
                let content;
                if (this.stringsCache[filePath]) {
                    content = yield this.stringsCache[filePath];
                }
                else {
                    if (!this.disableStringsCache) {
                        this.stringsCache[filePath] = this.getFileTranslations(filePath, language);
                    }
                    content = yield this.stringsCache[filePath];
                }
                if (this.disableJsonDeepMerge) {
                    strings = Object.assign(Object.assign({}, strings), content);
                }
                else {
                    strings_1.mergeDeep(strings, content);
                }
            }
            return strings;
        });
    }
    get manifest() {
        if (this.manifestHolder && !this.disableManifestCache) {
            return this.manifestHolder;
        }
        else {
            this.manifestHolder = this.httpClient.get(`${OtaClient.BASE_URL}/${this.distributionHash}/manifest.json`);
            return this.manifestHolder;
        }
    }
    getLanguageCode(lang) {
        const languageCode = lang || this.getCurrentLocale();
        if (languageCode) {
            return languageCode;
        }
        else {
            throw new Error('Language code should be either provided through input arguments or by "setCurrentLocale" method');
        }
    }
    getJsonFiles(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.listFiles()).filter(f => !file || file === f).filter(strings_1.isJsonFile);
        });
    }
}
exports.default = OtaClient;
OtaClient.BASE_URL = 'https://distributions.crowdin.net';
