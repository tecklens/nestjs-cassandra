"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = Column;
exports.GeneratedUUidColumn = GeneratedUUidColumn;
exports.VersionColumn = VersionColumn;
exports.CreateDateColumn = CreateDateColumn;
exports.UpdateDateColumn = UpdateDateColumn;
exports.IndexColumn = IndexColumn;
var decorator_utils_1 = require("../utils/decorator.utils");
var listeners_1 = require("./listeners");
var db_utils_1 = require("../utils/db.utils");
function Column(options) {
    return function (target, propertyName) {
        (0, decorator_utils_1.addAttribute)(target, propertyName, options);
    };
}
function GeneratedUUidColumn(type) {
    if (type === void 0) { type = 'uuid'; }
    return function (target, propertyName) {
        var fn = {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var instance = args[0];
                if (instance !== null && !instance[propertyName]) {
                    instance[propertyName] = type === 'timeuuid' ? (0, db_utils_1.timeuuid)() : (0, db_utils_1.uuid)();
                }
            },
        };
        Column({
            type: type,
            default: { $db_function: type === 'timeuuid' ? 'now()' : 'uuid()' },
        })(target, propertyName);
        (0, listeners_1.BeforeSave)()(target, propertyName, fn);
    };
}
function VersionColumn() {
    return function (target, propertyName) {
        (0, decorator_utils_1.addOptions)(target, { options: { versions: { key: propertyName } } });
    };
}
function CreateDateColumn() {
    return function (target, propertyName) {
        (0, decorator_utils_1.addOptions)(target, {
            options: { timestamps: { createdAt: propertyName } },
        });
    };
}
function UpdateDateColumn() {
    return function (target, propertyName) {
        (0, decorator_utils_1.addOptions)(target, {
            options: { timestamps: { updatedAt: propertyName } },
        });
    };
}
function IndexColumn() {
    return function (target, propertyName) {
        var indexes = (0, decorator_utils_1.getOptions)(target).indexes;
        indexes = indexes || [];
        var isAdded = indexes.some(function (value) { return value === propertyName; });
        if (isAdded) {
            return;
        }
        indexes.push(propertyName);
        (0, decorator_utils_1.addOptions)(target, { indexes: indexes });
    };
}
//# sourceMappingURL=column.decorator.js.map