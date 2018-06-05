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
class Matrix4x3 extends Matrix4 {
    constructor(m11 = 0, m12 = 0, m13 = 0, m21 = 0, m22 = 0, m23 = 0, m31 = 0, m32 = 0, m33 = 0, tx = 0, ty = 0, tz = 0) {
        super(m11, m12, m13, 0, m21, m22, m23, 0, m31, m32, m33, 0, tx, ty, tz, 1);
    }
}
export default Matrix4x3;
