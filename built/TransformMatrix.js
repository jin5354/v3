"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 变换矩阵
 *
 * @class TransformMatrix
 */
var TransformMatrix = /** @class */ (function () {
    function TransformMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
        this.m11 = 0;
        this.m12 = 0;
        this.m13 = 0;
        this.m21 = 0;
        this.m22 = 0;
        this.m23 = 0;
        this.m31 = 0;
        this.m32 = 0;
        this.m33 = 0;
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
    }
    return TransformMatrix;
}());
exports.default = TransformMatrix;
