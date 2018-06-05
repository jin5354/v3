import Matrix4x3 from './Matrix4x3';
/**
 * 旋转矩阵类
 *
 * @class RotationMatrix
 */
declare class RotationMatrix extends Matrix4x3 {
    m11: number;
    m12: number;
    m13: number;
    m21: number;
    m22: number;
    m23: number;
    m31: number;
    m32: number;
    m33: number;
    constructor(m11?: number, m12?: number, m13?: number, m21?: number, m22?: number, m23?: number, m31?: number, m32?: number, m33?: number);
}
export default RotationMatrix;
