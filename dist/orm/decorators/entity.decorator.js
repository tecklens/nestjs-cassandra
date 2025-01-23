"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = Entity;
var decorator_utils_1 = require("../utils/decorator.utils");
function Entity(nameOrOptions, maybeOptions) {
    // TODO описать тип и переименовать table_name
    var options = (typeof nameOrOptions === 'object' ? nameOrOptions : maybeOptions) || {};
    var name = typeof nameOrOptions === 'string' ? nameOrOptions : options.table_name;
    return function (target) {
        options.instanceMethods = target.prototype;
        options.classMethods = target;
        (0, decorator_utils_1.setEntityName)(target.prototype, name);
        (0, decorator_utils_1.addOptions)(target.prototype, options);
    };
}
//# sourceMappingURL=entity.decorator.js.map