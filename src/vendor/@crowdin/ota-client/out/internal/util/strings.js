"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeep = exports.isJsonFile = void 0;
function isJsonFile(file) {
    const extension = (file || '').split('.').pop();
    return (extension === null || extension === void 0 ? void 0 : extension.toLocaleLowerCase()) === 'json';
}
exports.isJsonFile = isJsonFile;
function isObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value);
}
function mergeDeep(targetObj, sourceObj) {
    const target = targetObj || {};
    const source = sourceObj || {};
    Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
            if (!(key in target)) {
                target[key] = source[key];
            }
            else {
                target[key] = mergeDeep(target[key], source[key]);
            }
        }
        else {
            target[key] = source[key];
        }
    });
    return target;
}
exports.mergeDeep = mergeDeep;
