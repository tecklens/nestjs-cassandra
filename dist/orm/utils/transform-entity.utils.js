"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformEntity = transformEntity;
function transformEntity(target, entityLike) {
    if (!target || !(target && typeof target === 'function') || !entityLike) {
        return entityLike;
    }
    if (entityLike instanceof Array) {
        // @ts-ignore
        return entityLike.map(function (entity) { return Object.assign(new target(), entity); });
    }
    // @ts-ignore
    return Object.assign(new target(), entityLike);
}
//# sourceMappingURL=transform-entity.utils.js.map