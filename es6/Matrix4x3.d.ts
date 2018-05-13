import Vector3 from './Vector3';
import EulerAngles from './EulerAngles';
import RotationMatrix from './RotationMatrix';
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
    constructor(m11: number, m12: number, m13: number, m21: number, m22: number, m23: number, m31: number, m32: number, m33: number, tx: number, ty: number, tz: number);
    /**
     * Vector3 乘 Matrix4x3
     *
     * @static
     * @param {Vector3} v
     * @param {Matrix4x3} m
     * @returns {Vector3}
     * @memberof Matrix4x3
     */
    static vector3Multiply(v: Vector3, m: Matrix4x3): Vector3;
    /**
     * 矩阵叉乘
     *
     * @static
     * @param {...Matrix4x3[]} args
     * @returns {Matrix4x3}
     * @memberof Matrix4x3
     */
    static matrix4x3Multiply(...args: Matrix4x3[]): Matrix4x3;
    /**
     * 清空平移部分
     *
     * @memberof Matrix4x3
     */
    clearTranslation(): void;
    /**
     * 根据向量设置平移部分
     *
     * @param {Vector3} v
     * @memberof Matrix4x3
     */
    setTranslation(v: Vector3): void;
    /**
     * 根据向量构建平移矩阵
     *
     * @param {Vector3} v
     * @memberof Matrix4x3
     */
    setupTranslation(v: Vector3): void;
    /**
     * 构造物体——世界变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {EulerAngles} orientation
     * @memberof Matrix4x3
     */
    setupLocalToParentFromEulerAngle(pos: Vector3, orientation: EulerAngles): void;
    /**
     * 构造物体——世界变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {RotationMatrix} orientation
     * @memberof Matrix4x3
     */
    setupLocalToParentFromRotationMatrix(pos: Vector3, orientation: RotationMatrix): void;
    /**
     * 构造世界——物体变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {EulerAngles} orientation
     * @memberof Matrix4x3
     */
    setupParentToLocalFromEulerAngle(pos: Vector3, orientation: EulerAngles): void;
    /**
     * 构造世界——物体变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {RotationMatrix} orientation
     * @memberof Matrix4x3
     */
    setupParentToLocalFromRotationMatrix(pos: Vector3, orientation: RotationMatrix): void;
    /**
     * 绕坐标轴旋转
     *
     * @param {string} axis
     * @param {number} theta
     * @memberof Matrix4x3
     */
    setupRotateFromXYZAxis(axis: string, theta: number): void;
    /**
     * 绕特定轴旋转
     *
     * @param {Vector3} axis
     * @param {number} theta
     * @memberof Matrix4x3
     */
    setupRotateFromVector3(axis: Vector3, theta: number): void;
    /**
     * 沿坐标轴缩放
     *
     * @param {Vector3} v
     * @memberof Matrix4x3
     */
    setupScale(v: Vector3): void;
    /**
     * 沿任意轴缩放
     *
     * @param {Vector3} axis
     * @param {number} k
     * @memberof Matrix4x3
     */
    setupScaleFromAxis(axis: Vector3, k: number): void;
    /**
     * 设置切变
     *
     * @param {string} axis
     * @param {number} s
     * @param {number} t
     * @memberof Matrix4x3
     */
    setupShear(axis: string, s: number, t: number): void;
    /**
     * 设置指定反射平面的反射矩阵
     *
     * @param {Vector3} n
     * @memberof Matrix4x3
     */
    setupReflection(n: Vector3): void;
}
export default Matrix4x3;
