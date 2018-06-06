import Quaternion from './Quaternion';
import Matrix4 from './Matrix4';
/**
 * 欧拉角类
 * heading-picth-bank
 *
 * @class EulerAngles
 */
declare class EulerAngles {
    heading: number;
    picth: number;
    bank: number;
    constructor(heading?: number, picth?: number, bank?: number);
    /**
     * 从世界——物体旋转矩阵中提取欧拉角
     *
     * @static
     * @param {Matrix4} m
     * @memberof EulerAngles
     */
    static fromRotationMatrix(m: Matrix4): EulerAngles;
    /**
     * 物体——世界四元数转换为欧拉角
     *
     * @static
     * @param {Quaternion} q
     * @returns {EulerAngles}
     * @memberof EulerAngles
     */
    static fromObjectToWorldQuaternion(q: Quaternion): EulerAngles;
    static fromWorldToObjectQuaternion(q: Quaternion): EulerAngles;
    /**
     * 限制欧拉角
     * heading, bank 限制到 -pi —— pi
     * picth 限制到 -2/pi —— 2/pi
     *
     * @memberof EulerAngles
     */
    canonize(): void;
}
export default EulerAngles;
