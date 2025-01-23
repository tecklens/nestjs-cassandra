"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHookFunction = void 0;
exports.setEntity = setEntity;
exports.getEntity = getEntity;
exports.setEntityName = setEntityName;
exports.getEntityName = getEntityName;
exports.getAttributes = getAttributes;
exports.setAttributes = setAttributes;
exports.addAttribute = addAttribute;
exports.addAttributeOptions = addAttributeOptions;
exports.getOptions = getOptions;
exports.setOptions = setOptions;
exports.addOptions = addOptions;
require("reflect-metadata");
var orm_constant_1 = require("../orm.constant");
var deep_merge_utils_1 = require("./deep-merge.utils");
function setEntity(target, entity) {
    Reflect.defineMetadata(orm_constant_1.ENTITY_METADATA, entity, target);
}
function getEntity(target) {
    return Reflect.getMetadata(orm_constant_1.ENTITY_METADATA, target);
}
function setEntityName(target, modelName) {
    Reflect.defineMetadata(orm_constant_1.ENTITY_NAME_KEY, modelName, target);
}
function getEntityName(target) {
    return Reflect.getMetadata(orm_constant_1.ENTITY_NAME_KEY, target);
}
function getAttributes(target) {
    var attributes = Reflect.getMetadata(orm_constant_1.ATTRUBUTE_KEY, target);
    if (attributes) {
        return Object.keys(attributes).reduce(function (copy, key) {
            copy[key] = __assign({}, attributes[key]);
            return copy;
        }, {});
    }
}
function setAttributes(target, attributes) {
    Reflect.defineMetadata(orm_constant_1.ATTRUBUTE_KEY, __assign({}, attributes), target);
}
function addAttribute(target, name, options) {
    var attributes = getAttributes(target) || {};
    attributes[name] = __assign({}, options);
    setAttributes(target, attributes);
}
function addAttributeOptions(target, propertyName, options) {
    var attributes = getAttributes(target);
    attributes[propertyName] = (0, deep_merge_utils_1.mergeDeep)(attributes[propertyName], options);
    setAttributes(target, attributes);
}
function getOptions(target) {
    var options = Reflect.getMetadata(orm_constant_1.OPTIONS_KEY, target);
    // @ts-ignore
    return __assign({}, options) || {};
}
function setOptions(target, options) {
    Reflect.defineMetadata(orm_constant_1.OPTIONS_KEY, __assign({}, options), target);
}
function addOptions(target, options) {
    var mOptions = getOptions(target) || {};
    setOptions(target, (0, deep_merge_utils_1.mergeDeep)(mOptions, options));
}
var addHookFunction = function (target, metadataKey) {
    var funcLikeArray = Reflect.getMetadata(metadataKey, target) || [];
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return funcLikeArray.map(function (funcLike) { return funcLike.apply(void 0, args); });
    };
};
exports.addHookFunction = addHookFunction;
//# sourceMappingURL=decorator.utils.js.map