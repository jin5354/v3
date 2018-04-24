"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix4x3_1 = require("./Matrix4x3");
/**
 * 旋转矩阵类
 *
 * @class RotationMatrix
 */
var RotationMatrix = /** @class */ (function (_super) {
    __extends(RotationMatrix, _super);
    function RotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
        var _this = _super.call(this, m11, m12, m13, m21, m22, m23, m31, m32, m33, 0, 0, 0) || this;
        _this.m11 = 0;
        _this.m12 = 0;
        _this.m13 = 0;
        _this.m21 = 0;
        _this.m22 = 0;
        _this.m23 = 0;
        _this.m31 = 0;
        _this.m32 = 0;
        _this.m33 = 0;
        return _this;
    }
    /**
     * 通过欧拉角构建旋转矩阵
     *
     * @static
     * @param {EulerAngles} orientation
     * @returns {RotationMatrix}
     * @memberof RotationMatrix
     */
    RotationMatrix.fromEulerAngle = function (orientation) {
        var sinH = Math.sin(orientation.heading);
        var cosH = Math.cos(orientation.heading);
        var sinP = Math.sin(orientation.picth);
        var cosP = Math.cos(orientation.picth);
        var sinB = Math.sin(orientation.bank);
        var cosB = Math.cos(orientation.bank);
        var m11 = cosH * cosB + sinH * sinP * sinB;
        var m12 = -cosH * sinB + sinH * sinP * cosB;
        var m13 = sinH * cosP;
        var m21 = sinB * cosP;
        var m22 = cosB * cosP;
        var m23 = -sinP;
        var m31 = -sinH * cosB + cosH * sinP * sinB;
        var m32 = sinB * sinH + cosH * sinP * cosB;
        var m33 = cosH * cosP;
        return new RotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33);
    };
    /**
     * 从世界-物体四元数构建旋转矩阵
     *
     * @static
     * @param {Quaternion} q
     * @returns {RotationMatrix}
     * @memberof RotationMatrix
     */
    RotationMatrix.fromWorldToObjectQuaternion = function (q) {
        var m11 = 1 - 2 * q.y * q.y - 2 * q.z * q.z;
        var m12 = 2 * q.x * q.y + 2 * q.w * q.z;
        var m13 = 2 * q.x * q.z - 2 * q.w * q.y;
        var m21 = 2 * q.x * q.y - 2 * q.w * q.z;
        var m22 = 1 - 2 * q.x * q.x - 2 * q.z * q.z;
        var m23 = 2 * q.y * q.z + 2 * q.w * q.x;
        var m31 = 2 * q.x * q.z + 2 * q.w * q.y;
        var m32 = 2 * q.y * q.z - 2 * q.w * q.x;
        var m33 = 1 - 2 * q.x * q.x - 2 * q.y * q.y;
        return new RotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33);
    };
    /**
     * 从物体——世界四元数构建旋转矩阵
     *
     * @static
     * @param {Quaternion} q
     * @returns {RotationMatrix}
     * @memberof RotationMatrix
     */
    RotationMatrix.fromObjectToWorldQuaternion = function (q) {
        var m11 = 1 - 2 * q.y * q.y - 2 * q.z * q.z;
        var m12 = 2 * q.x * q.y - 2 * q.w * q.z;
        var m13 = 2 * q.x * q.z + 2 * q.w * q.y;
        var m21 = 2 * q.x * q.y + 2 * q.w * q.z;
        var m22 = 1 - 2 * q.x * q.x - 2 * q.z * q.z;
        var m23 = 2 * q.y * q.z - 2 * q.w * q.x;
        var m31 = 2 * q.x * q.z - 2 * q.w * q.y;
        var m32 = 2 * q.y * q.z + 2 * q.w * q.x;
        var m33 = 1 - 2 * q.x * q.x - 2 * q.y * q.y;
        return new RotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33);
    };
    return RotationMatrix;
}(Matrix4x3_1.default));
exports.default = RotationMatrix;
