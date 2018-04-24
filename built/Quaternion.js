"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector3_1 = require("./Vector3");
var MathUtil = require("./MathUtil");
/**
 * 四元数类
 *
 * @class Quaternion
 */
var Quaternion = /** @class */ (function () {
    function Quaternion(w, x, y, z) {
        this.w = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * 四元数求负
     *
     * @static
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    Quaternion.negate = function (a) {
        return new Quaternion(-a.w, -a.x, -a.y, -a.z);
    };
    /**
     * 四元数求模
     *
     * @static
     * @param {Quaternion} a
     * @returns {number}
     * @memberof Quaternion
     */
    Quaternion.getNorm = function (a) {
        return Math.sqrt(a.w * a.w + a.x * a.x + a.y * a.y + a.z * a.z);
    };
    /**
     * 四元数求共轭
     *
     * @static
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    Quaternion.getConjugate = function (a) {
        return new Quaternion(a.w, -a.x, -a.y, -a.z);
    };
    /**
     * 四元数点乘
     *
     * @static
     * @param {Quaternion} a
     * @param {Quaternion} b
     * @returns {number}
     * @memberof Quaternion
     */
    Quaternion.dotProduct = function (a, b) {
        return a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
    };
    /**
     * 四元数叉乘
     *
     * @static
     * @param {...Quaternion[]} args
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    Quaternion.crossProduct = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length < 2) {
            throw Error('四元数叉乘至少需要两个参数');
        }
        // 与标准定义相反
        return args.reduce(function (a, b) {
            var w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
            var x = a.w * b.x + a.x * b.w + a.z * b.y - a.y * b.z;
            var y = a.w * b.y + a.y * b.w + a.x * b.z - a.z * b.x;
            var z = a.w * b.z + a.z * b.w + a.y * b.x - a.x * b.y;
            return new Quaternion(w, x, y, z);
        });
    };
    /**
     * 标量乘
     *
     * @static
     * @param {number} scalar
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    Quaternion.scalarMultiply = function (scalar, a) {
        return new Quaternion(scalar * a.w, scalar * a.x, scalar * a.y, scalar * a.z);
    };
    /**
     * 四元数对数
     *
     * @static
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    Quaternion.log = function (a) {
        var theta = a.getRotationAngle();
        return new Quaternion(0, theta / 2 * a.x, theta / 2 * a.y, theta / 2 * a.z);
    };
    /**
     * 四元数求幂
     *
     * @static
     * @param {Quaternion} a
     * @param {number} exponent
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    Quaternion.pow = function (a, exponent) {
        if (Math.abs(a.w) > 0.999) {
            return a;
        }
        var alpha = MathUtil.safeAcos(a.w);
        var newAlpha = alpha * exponent;
        var mult = Math.sin(newAlpha) / Math.sin(alpha);
        return new Quaternion(Math.cos(alpha), a.x * mult, a.y * mult, a.z * mult);
    };
    /**
     * 由四元数 a 到四元数 b 的角位移
     *
     * @param {Quaternion} a
     * @param {Quaternion} b
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    Quaternion.getAngularDisplacement = function (a, b) {
        return Quaternion.crossProduct(Quaternion.getConjugate(a), b);
    };
    /**
     * 四元数 slerp 插值
     *
     * @static
     * @param {Quaternion} a
     * @param {Quaternion} b
     * @param {number} t
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    Quaternion.slerp = function (a, b, t) {
        var k0;
        var k1;
        var cosOmega = Quaternion.dotProduct(a, b);
        // 反转，找最短弧度
        if (cosOmega < 0) {
            b = Quaternion.negate(b);
            cosOmega = -cosOmega;
        }
        // 夹角过小，当做平行线
        if (cosOmega > 0.9999) {
            k0 = 1 - t;
            k1 = t;
        }
        else {
            var sinOmega = Math.sqrt(1 - cosOmega * cosOmega);
            var omega = Math.atan2(sinOmega, cosOmega);
            k0 = Math.sin((1 - t) * omega) / sinOmega;
            k1 = Math.sin(t * omega) / sinOmega;
        }
        var w = a.w * k0 + b.w * k1;
        var x = a.x * k0 + b.x * k1;
        var y = a.y * k0 + b.y * k1;
        var z = a.z * k1 + b.z * k1;
        return new Quaternion(w, x, y, z);
    };
    /**
     * 从旋转矩阵提取四元数
     *
     * @static
     * @param {RotationMatrix} m
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    Quaternion.fromRotationMatrix = function (m) {
        var w = 0;
        var x = 0;
        var y = 0;
        var z = 0;
        var fourWSquaredMinus1 = m.m11 + m.m22 + m.m33;
        var fourXSquaredMinus1 = m.m11 - m.m22 - m.m33;
        var fourYSquaredMinus1 = m.m22 - m.m11 - m.m33;
        var fourZSquaredMinus1 = m.m33 - m.m11 - m.m22;
        var biggestIndex = 0;
        var fourBiggestSquaredMinus1 = fourWSquaredMinus1;
        if (fourXSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourXSquaredMinus1;
            biggestIndex = 1;
        }
        if (fourYSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourYSquaredMinus1;
            biggestIndex = 2;
        }
        if (fourZSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourZSquaredMinus1;
            biggestIndex = 3;
        }
        var biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1) * 0.5;
        var mult = 0.25 / biggestVal;
        switch (biggestIndex) {
            case (0): {
                w = biggestVal;
                x = (m.m23 - m.m32) * mult;
                y = (m.m31 - m.m13) * mult;
                z = (m.m12 - m.m21) * mult;
                break;
            }
            case (1): {
                w = biggestVal;
                x = (m.m23 - m.m32) * mult;
                y = (m.m12 + m.m21) * mult;
                z = (m.m31 + m.m13) * mult;
                break;
            }
            case (2): {
                w = biggestVal;
                x = (m.m31 - m.m13) * mult;
                y = (m.m12 + m.m21) * mult;
                z = (m.m23 + m.m32) * mult;
                break;
            }
            case (3): {
                w = biggestVal;
                x = (m.m12 - m.m21) * mult;
                y = (m.m31 + m.m13) * mult;
                z = (m.m23 + m.m13) * mult;
                break;
            }
        }
        return new Quaternion(w, x, y, z);
    };
    /**
     * 从欧拉角构建物体——世界四元数
     *
     * @static
     * @param {EulerAngles} orientation
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    Quaternion.setObjectToWorldFromEulerAngles = function (orientation) {
        var sinHOver2 = Math.sin(orientation.heading / 2);
        var cosHOver2 = Math.cos(orientation.heading / 2);
        var sinPOver2 = Math.sin(orientation.picth / 2);
        var cosPOver2 = Math.cos(orientation.picth / 2);
        var sinBOver2 = Math.sin(orientation.bank / 2);
        var cosBOver2 = Math.cos(orientation.bank / 2);
        return new Quaternion(cosHOver2 * cosPOver2 * cosBOver2 + sinHOver2 * sinPOver2 * sinBOver2, cosHOver2 * sinPOver2 * cosBOver2 + sinHOver2 * cosPOver2 * sinBOver2, -cosHOver2 * sinPOver2 * sinBOver2 + sinHOver2 * cosPOver2 * cosBOver2, -sinHOver2 * sinPOver2 * cosBOver2 + cosHOver2 * cosPOver2 * sinBOver2);
    };
    /**
     * 从欧拉角构建世界——物体四元数
     *
     * @static
     * @param {EulerAngles} orientation
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    Quaternion.setWorldToObjectFromEulerAngles = function (orientation) {
        return Quaternion.getConjugate(Quaternion.setObjectToWorldFromEulerAngles(orientation));
    };
    /**
     * 绕 X 轴旋转
     *
     * @param {number} theta
     * @memberof Quaternion
     */
    Quaternion.prototype.setToRotateAboutX = function (theta) {
        this.w = Math.cos(theta / 2);
        this.x = Math.sin(theta / 2);
        this.y = 0;
        this.z = 0;
    };
    /**
     * 绕 Y 轴旋转
     *
     * @param {number} theta
     * @memberof Quaternion
     */
    Quaternion.prototype.setToRotateAboutY = function (theta) {
        this.w = Math.cos(theta / 2);
        this.x = 0;
        this.y = Math.sin(theta / 2);
        this.z = 0;
    };
    /**
     * 绕 Z 轴旋转
     *
     * @param {number} theta
     * @memberof Quaternion
     */
    Quaternion.prototype.setToRotateAboutZ = function (theta) {
        this.w = Math.cos(theta / 2);
        this.x = 0;
        this.y = 0;
        this.z = Math.sin(theta / 2);
    };
    /**
     * 绕指定轴旋转
     *
     * @param {Vector3} axis
     * @param {number} theta
     * @memberof Quaternion
     */
    Quaternion.prototype.setToRotateAboutAxis = function (axis, theta) {
        // 旋转轴向量必须标准化
        if (Vector3_1.default.getNorm(axis) - 1 >= 0.01) {
            throw Error('构建四元数时，旋转轴向量必须标准化');
        }
        this.w = Math.cos(theta / 2);
        this.x = Math.sin(theta / 2) * axis.x;
        this.y = Math.sin(theta / 2) * axis.y;
        this.z = Math.sin(theta / 2) * axis.z;
    };
    /**
     * 标准化四元数
     *
     * @memberof Quaternion
     */
    Quaternion.prototype.normalize = function () {
        var norm = Quaternion.getNorm(this);
        if (norm) {
            this.w = this.w / norm;
            this.x = this.x / norm;
            this.y = this.y / norm;
            this.z = this.z / norm;
        }
        else {
            this.w = 1;
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
    };
    /**
     * 提取旋转角
     *
     * @returns {number}
     * @memberof Quaternion
     */
    Quaternion.prototype.getRotationAngle = function () {
        return 2 * MathUtil.safeAcos(this.w);
    };
    /**
     * 提取旋转轴
     *
     * @returns {Vector3}
     * @memberof Quaternion
     */
    Quaternion.prototype.getRotationAxis = function () {
        var sinThetaOver2 = Math.sqrt(1 - this.w * this.w);
        if (!sinThetaOver2) {
            return new Vector3_1.default(1, 0, 0);
        }
        return new Vector3_1.default(this.x / sinThetaOver2, this.y / sinThetaOver2, this.z / sinThetaOver2);
    };
    /**
     * 单位四元数
     *
     * @static
     * @memberof Quaternion
     */
    Quaternion.QuaternionIdentity = new Quaternion(1, 0, 0, 0);
    return Quaternion;
}());
exports.default = Quaternion;
