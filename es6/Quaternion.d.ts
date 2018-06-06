import Vector3 from './Vector3';
import Matrix4 from './Matrix4';
import EulerAngles from './EulerAngles';
/**
 * 四元数类
 *
 * @class Quaternion
 */
declare class Quaternion {
    /**
     * 单位四元数
     *
     * @static
     * @memberof Quaternion
     */
    static QuaternionIdentity: Quaternion;
    w: number;
    x: number;
    y: number;
    z: number;
    constructor(w?: number, x?: number, y?: number, z?: number);
    /**
     * 四元数求负
     *
     * @static
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static negate(a: Quaternion): Quaternion;
    /**
     * 四元数求模
     *
     * @static
     * @param {Quaternion} a
     * @returns {number}
     * @memberof Quaternion
     */
    static getNorm(a: Quaternion): number;
    /**
     * 四元数求共轭
     *
     * @static
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static getConjugate(a: Quaternion): Quaternion;
    /**
     * 四元数点乘
     *
     * @static
     * @param {Quaternion} a
     * @param {Quaternion} b
     * @returns {number}
     * @memberof Quaternion
     */
    static dotProduct(a: Quaternion, b: Quaternion): number;
    /**
     * 四元数叉乘
     *
     * @static
     * @param {...Quaternion[]} args
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static crossProduct(...args: Quaternion[]): Quaternion;
    /**
     * 标量乘
     *
     * @static
     * @param {number} scalar
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static scalarMultiply(scalar: number, a: Quaternion): Quaternion;
    /**
     * 四元数对数
     *
     * @static
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static log(a: Quaternion): Quaternion;
    /**
     * 四元数求幂
     *
     * @static
     * @param {Quaternion} a
     * @param {number} exponent
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static pow(a: Quaternion, exponent: number): Quaternion;
    /**
     * 由四元数 a 到四元数 b 的角位移
     *
     * @param {Quaternion} a
     * @param {Quaternion} b
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static getAngularDisplacement(a: Quaternion, b: Quaternion): Quaternion;
    /**
     * 四元数 slerp 插值
     *
     * @static
     * @param {Quaternion} a
     * @param {Quaternion} b
     * @param {number} t
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static slerp(a: Quaternion, b: Quaternion, t: number): Quaternion;
    /**
     * 从旋转矩阵提取四元数
     *
     * @static
     * @param {RotationMatrix} m
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static fromRotationMatrix(m: Matrix4): Quaternion;
    /**
     * 从欧拉角构建物体——世界四元数
     *
     * @static
     * @param {EulerAngles} orientation
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static setObjectToWorldFromEulerAngles(orientation: EulerAngles): Quaternion;
    /**
     * 从欧拉角构建世界——物体四元数
     *
     * @static
     * @param {EulerAngles} orientation
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static setWorldToObjectFromEulerAngles(orientation: EulerAngles): Quaternion;
    /**
     * 绕 X 轴旋转
     *
     * @param {number} theta
     * @memberof Quaternion
     */
    setToRotateAboutX(theta: number): void;
    /**
     * 绕 Y 轴旋转
     *
     * @param {number} theta
     * @memberof Quaternion
     */
    setToRotateAboutY(theta: number): void;
    /**
     * 绕 Z 轴旋转
     *
     * @param {number} theta
     * @memberof Quaternion
     */
    setToRotateAboutZ(theta: number): void;
    /**
     * 绕指定轴旋转
     *
     * @param {Vector3} axis
     * @param {number} theta
     * @memberof Quaternion
     */
    setToRotateAboutAxis(axis: Vector3, theta: number): void;
    /**
     * 标准化四元数
     *
     * @memberof Quaternion
     */
    normalize(): void;
    /**
     * 提取旋转角
     *
     * @returns {number}
     * @memberof Quaternion
     */
    getRotationAngle(): number;
    /**
     * 提取旋转轴
     *
     * @returns {Vector3}
     * @memberof Quaternion
     */
    getRotationAxis(): Vector3;
}
export default Quaternion;
