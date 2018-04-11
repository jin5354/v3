"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 3D向量类
 *
 * @class Vector3
 */
var Vector3 = /** @class */ (function () {
    function Vector3(x, y, z) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * normalize 向量标准化
     *
     * @memberof Vector3
     */
    Vector3.prototype.normalize = function () {
        var norm = Vector3.getNorm(this);
        if (norm) {
            this.x = this.x / norm;
            this.y = this.y / norm;
            this.z = this.z / norm;
        }
    };
    /**
     * isEqual 判断两向量是否相等
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {boolean}
     * @memberof Vector3
     */
    Vector3.isEqual = function (a, b) {
        return a.x === b.x && a.y === b.y && a.z === b.z;
    };
    /**
     * negate 求负向量
     *
     * @static
     * @param {Vector3} a
     * @returns {Vector3}
     * @memberof Vector3
     */
    Vector3.negate = function (a) {
        return new Vector3(-a.x, -a.y, -a.z);
    };
    /**
     * plus 向量求和
     *
     * @static
     * @param {...Vector3[]} args
     * @returns {Vector3}
     * @memberof Vector3
     */
    Vector3.plus = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2) {
            return new Vector3(args[0].x + args[1].x, args[0].y + args[1].y, args[0].z + args[1].z);
        }
        else {
            var x = args.map(function (a) { return a.x; }).reduce(function (a, b) { return a + b; }, 0);
            var y = args.map(function (a) { return a.y; }).reduce(function (a, b) { return a + b; }, 0);
            var z = args.map(function (a) { return a.z; }).reduce(function (a, b) { return a + b; }, 0);
            return new Vector3(x, y, z);
        }
    };
    /**
     * scalarMultiply 标量乘法
     *
     * @static
     * @param {number} scalar
     * @param {Vector3} a
     * @returns {Vector3}
     * @memberof Vector3
     */
    Vector3.scalarMultiply = function (scalar, a) {
        return new Vector3(scalar * a.x, scalar * a.y, scalar * a.z);
    };
    /**
     * getNorm 向量取模
     *
     * @static
     * @param {Vector3} a
     * @returns {number}
     * @memberof Vector3
     */
    Vector3.getNorm = function (a) {
        return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
    };
    /**
     * getDistance 求两点间距离
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {number}
     * @memberof Vector3
     */
    Vector3.getDistance = function (a, b) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z));
    };
    /**
     * innerProduct 向量点乘
     * 反应两向量相似程度
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {number}
     * @memberof Vector3
     */
    Vector3.innerProduct = function (a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    };
    /**
     * getAngle 求两向量夹角
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {number}
     * @memberof Vector3
     */
    Vector3.getAngle = function (a, b) {
        return Math.acos(Vector3.innerProduct(a, b) / (Vector3.getNorm(a) * Vector3.getNorm(b)));
    };
    /**
     * crossProduct 向量叉乘
     * 创建垂直于平面的向量
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {Vector3}
     * @memberof Vector3
     */
    Vector3.crossProduct = function (a, b) {
        return new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    };
    return Vector3;
}());
exports.default = Vector3;
