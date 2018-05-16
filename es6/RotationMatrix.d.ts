import Matrix4x3 from './Matrix4x3';
import EulerAngles from './EulerAngles';
import Quaternion from './Quaternion';
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
    /**
     * 通过欧拉角构建旋转矩阵
     *
     * @static
     * @param {EulerAngles} orientation
     * @returns {RotationMatrix}
     * @memberof RotationMatrix
     */
    static fromEulerAngle(orientation: EulerAngles): RotationMatrix;
    /**
     * 从世界-物体四元数构建旋转矩阵
     *
     * @static
     * @param {Quaternion} q
     * @returns {RotationMatrix}
     * @memberof RotationMatrix
     */
    static fromWorldToObjectQuaternion(q: Quaternion): RotationMatrix;
    /**
     * 从物体——世界四元数构建旋转矩阵
     *
     * @static
     * @param {Quaternion} q
     * @returns {RotationMatrix}
     * @memberof RotationMatrix
     */
    static fromObjectToWorldQuaternion(q: Quaternion): RotationMatrix;
}
export default RotationMatrix;
