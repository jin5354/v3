import Matrix4 from './Matrix4';
/**
 * 变换矩阵
 *
 * [x, y, z, 1] | m11 m12 m13 0 | = [x', y', z', 1]
 *              | m21 m22 m23 0 |
 *              | m31 m32 m33 0 |
 *              | tx  ty  tz  1 |
 * 为方便使用，去掉常数部分，形成 Matrix4x3 变化矩阵
 *
 * @class Matrix4x3
 */
declare class Matrix4x3 extends Matrix4 {
    m11: number;
    m12: number;
    m13: number;
    m21: number;
    m22: number;
    m23: number;
    m31: number;
    m32: number;
    m33: number;
    tx: number;
    ty: number;
    tz: number;
    constructor(m11?: number, m12?: number, m13?: number, m21?: number, m22?: number, m23?: number, m31?: number, m32?: number, m33?: number, tx?: number, ty?: number, tz?: number);
}
export default Matrix4x3;
