/**
 * mat4 标准矩阵
 *
 * @class Matrix4
 */
declare class Matrix4 {
    m11: number;
    m12: number;
    m13: number;
    m14: number;
    m21: number;
    m22: number;
    m23: number;
    m24: number;
    m31: number;
    m32: number;
    m33: number;
    m34: number;
    tx: number;
    ty: number;
    tz: number;
    tw: number;
    constructor(m11?: number, m12?: number, m13?: number, m14?: number, m21?: number, m22?: number, m23?: number, m24?: number, m31?: number, m32?: number, m33?: number, m34?: number, tx?: number, ty?: number, tz?: number, tw?: number);
    /**
     * 置为单位矩阵
     *
     * @memberof Matrix4
     */
    identity(): void;
    /**
     * 矩阵转置
     *
     * @memberof Matrix4
     */
    transpose(): void;
    /**
     * 获取该矩阵的 mat4 类型化数组
     *
     * @returns {Float32Array}
     * @memberof Matrix4x3
     */
    getMat4FloatArray(): Float32Array;
    /**
     * 迭代器
     *
     * @returns {Object}
     * @memberof Matrix4x3
     */
    [Symbol.iterator](): Object;
}
export default Matrix4;
