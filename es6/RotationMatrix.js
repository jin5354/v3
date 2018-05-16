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
    /**
     * 通过欧拉角构建旋转矩阵
     *
     * @static
     * @param {EulerAngles} orientation
     * @returns {RotationMatrix}
     * @memberof RotationMatrix
     */
    static fromEulerAngle(orientation) {
        let sinH = Math.sin(orientation.heading);
        let cosH = Math.cos(orientation.heading);
        let sinP = Math.sin(orientation.picth);
        let cosP = Math.cos(orientation.picth);
        let sinB = Math.sin(orientation.bank);
        let cosB = Math.cos(orientation.bank);
        let m11 = cosH * cosB + sinH * sinP * sinB;
        let m12 = -cosH * sinB + sinH * sinP * cosB;
        let m13 = sinH * cosP;
        let m21 = sinB * cosP;
        let m22 = cosB * cosP;
        let m23 = -sinP;
        let m31 = -sinH * cosB + cosH * sinP * sinB;
        let m32 = sinB * sinH + cosH * sinP * cosB;
        let m33 = cosH * cosP;
        return new RotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33);
    }
    /**
     * 从世界-物体四元数构建旋转矩阵
     *
     * @static
     * @param {Quaternion} q
     * @returns {RotationMatrix}
     * @memberof RotationMatrix
     */
    static fromWorldToObjectQuaternion(q) {
        let m11 = 1 - 2 * q.y * q.y - 2 * q.z * q.z;
        let m12 = 2 * q.x * q.y + 2 * q.w * q.z;
        let m13 = 2 * q.x * q.z - 2 * q.w * q.y;
        let m21 = 2 * q.x * q.y - 2 * q.w * q.z;
        let m22 = 1 - 2 * q.x * q.x - 2 * q.z * q.z;
        let m23 = 2 * q.y * q.z + 2 * q.w * q.x;
        let m31 = 2 * q.x * q.z + 2 * q.w * q.y;
        let m32 = 2 * q.y * q.z - 2 * q.w * q.x;
        let m33 = 1 - 2 * q.x * q.x - 2 * q.y * q.y;
        return new RotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33);
    }
    /**
     * 从物体——世界四元数构建旋转矩阵
     *
     * @static
     * @param {Quaternion} q
     * @returns {RotationMatrix}
     * @memberof RotationMatrix
     */
    static fromObjectToWorldQuaternion(q) {
        let m11 = 1 - 2 * q.y * q.y - 2 * q.z * q.z;
        let m12 = 2 * q.x * q.y - 2 * q.w * q.z;
        let m13 = 2 * q.x * q.z + 2 * q.w * q.y;
        let m21 = 2 * q.x * q.y + 2 * q.w * q.z;
        let m22 = 1 - 2 * q.x * q.x - 2 * q.z * q.z;
        let m23 = 2 * q.y * q.z - 2 * q.w * q.x;
        let m31 = 2 * q.x * q.z - 2 * q.w * q.y;
        let m32 = 2 * q.y * q.z + 2 * q.w * q.x;
        let m33 = 1 - 2 * q.x * q.x - 2 * q.y * q.y;
        return new RotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33);
    }
}
export default RotationMatrix;
