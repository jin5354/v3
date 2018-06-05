import Matrix4x3 from './Matrix4x3';
/**
 * 旋转矩阵类
 *
 * @class RotationMatrix
 */
class RotationMatrix extends Matrix4x3 {
    constructor(m11 = 0, m12 = 0, m13 = 0, m21 = 0, m22 = 0, m23 = 0, m31 = 0, m32 = 0, m33 = 0) {
        super(m11, m12, m13, m21, m22, m23, m31, m32, m33, 0, 0, 0);
    }
}
export default RotationMatrix;
