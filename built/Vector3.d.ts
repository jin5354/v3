/**
 * 3D向量类
 *
 * @class Vector3
 */
declare class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    /**
     * isEqual 判断两向量是否相等
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {boolean}
     * @memberof Vector3
     */
    static isEqual(a: Vector3, b: Vector3): boolean;
    /**
     * negate 求负向量
     *
     * @static
     * @param {Vector3} a
     * @returns {Vector3}
     * @memberof Vector3
     */
    static negate(a: Vector3): Vector3;
    /**
     * plus 向量求和
     *
     * @static
     * @param {...Vector3[]} args
     * @returns {Vector3}
     * @memberof Vector3
     */
    static plus(...args: Vector3[]): Vector3;
    /**
     * scalarMultiply 标量乘法
     *
     * @static
     * @param {number} scalar
     * @param {Vector3} a
     * @returns {Vector3}
     * @memberof Vector3
     */
    static scalarMultiply(scalar: number, a: Vector3): Vector3;
    /**
     * getNorm 向量取模
     *
     * @static
     * @param {Vector3} a
     * @returns {number}
     * @memberof Vector3
     */
    static getNorm(a: Vector3): number;
    /**
     * getDistance 求两点间距离
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {number}
     * @memberof Vector3
     */
    static getDistance(a: Vector3, b: Vector3): number;
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
    static innerProduct(a: Vector3, b: Vector3): number;
    /**
     * getAngle 求两向量夹角
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {number}
     * @memberof Vector3
     */
    static getAngle(a: Vector3, b: Vector3): number;
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
    static crossProduct(a: Vector3, b: Vector3): Vector3;
    /**
     * normalize 向量标准化
     *
     * @memberof Vector3
     */
    normalize(): void;
}
export default Vector3;