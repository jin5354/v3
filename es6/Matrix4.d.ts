import Vector3 from './Vector3';
import EulerAngles from './EulerAngles';
import Quaternion from './Quaternion';
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
     * 标量乘法
     *
     * @static
     * @param {number} scalar
     * @param {Matrix4} m
     * @returns {Matrix4}
     * @memberof Matrix4
     */
    static scalarMultiply(scalar: number, m: Matrix4): Matrix4;
    /**
     * 通过欧拉角构建旋转矩阵
     *
     * @static
     * @param {EulerAngles} orientation
     * @returns {RotationMatrix}
     * @memberof Matrix4
     */
    static fromEulerAngle(orientation: EulerAngles): Matrix4;
    /**
     * 从世界-物体四元数构建旋转矩阵
     *
     * @static
     * @param {Quaternion} q
     * @returns {RotationMatrix}
     * @memberof Matrix4
     */
    static fromWorldToObjectQuaternion(q: Quaternion): Matrix4;
    /**
     * 从物体——世界四元数构建旋转矩阵
     *
     * @static
     * @param {Quaternion} q
     * @returns {RotationMatrix}
     * @memberof Matrix4
     */
    static fromObjectToWorldQuaternion(q: Quaternion): Matrix4;
    /**
     * 矩阵叉乘
     *
     * @static
     * @param {...Matrix4[]} args
     * @returns {Matrix4}
     * @memberof Matrix4
     */
    static matrix4Multiply(...args: Matrix4[]): Matrix4;
    /**
     * 标量乘法（实例属性）
     *
     * @param {number} scalar
     * @memberof Matrix4
     */
    scalarMultiply(scalar: number): void;
    /**
     * 矩阵叉乘（实例属性）
     *
     * @param {...Matrix4[]} args
     * @returns {Matrix4}
     * @memberof Matrix4
     */
    matrix4Multiply(...args: Matrix4[]): void;
    /**
     * 置为单位矩阵（实例属性）
     *
     * @memberof Matrix4
     */
    identity(): void;
    /**
     * 清空平移部分
     *
     * @memberof Matrix4
     */
    clearTranslation(): void;
    /**
     * 设置平移
     *
     * @param {Vector3} v
     * @memberof Matrix4
     */
    setTranslation(v: Vector3): void;
    /**
     * 构造物体——世界变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {EulerAngles} orientation
     * @memberof Matrix4
     */
    setLocalToParentFromEulerAngle(pos: Vector3, orientation: EulerAngles): void;
    /**
     * 构造物体——世界变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {RotationMatrix} orientation
     * @memberof Matrix4
     */
    setLocalToParentFromRotationMatrix(pos: Vector3, orientation: Matrix4): void;
    /**
     * 构造世界——物体变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {EulerAngles} orientation
     * @memberof Matrix4
     */
    setParentToLocalFromEulerAngle(pos: Vector3, orientation: EulerAngles): void;
    /**
     * 构造世界——物体变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {RotationMatrix} orientation
     * @memberof Matrix4
     */
    setParentToLocalFromRotationMatrix(pos: Vector3, orientation: Matrix4): void;
    /**
     * 绕坐标轴旋转
     *
     * @param {string} axis
     * @param {number} theta
     * @memberof Matrix4
     */
    setRotateFromXYZAxis(axis: string, theta: number): void;
    /**
     * 绕特定轴旋转
     *
     * @param {Vector3} axis
     * @param {number} theta
     * @memberof Matrix4
     */
    setRotateFromVector3(axis: Vector3, theta: number): void;
    /**
     * 沿坐标轴缩放
     *
     * @param {Vector3} v
     * @memberof Matrix4
     */
    setScale(v: Vector3): void;
    /**
     * 沿任意轴缩放
     *
     * @param {Vector3} axis
     * @param {number} k
     * @memberof Matrix4
     */
    setScaleFromAxis(axis: Vector3, k: number): void;
    /**
     * 设置切变
     *
     * @param {string} axis
     * @param {number} s
     * @param {number} t
     * @memberof Matrix4
     */
    setShear(axis: string, s: number, t: number): void;
    /**
     * 设置指定反射平面的反射矩阵
     *
     * @param {Vector3} n
     * @memberof Matrix4x3
     */
    setReflection(n: Vector3): void;
    /**
     * 矩阵求逆
     *
     * @memberof Matrix4
     */
    inverse(): void;
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
     * 根据 eye, center, up 设置视图矩阵
     *
     * @param {Vector3} eye
     * @param {Vector3} center
     * @param {Vector3} up
     * @memberof Matrix4
     */
    setLookAt(eye: Vector3, center: Vector3, up: Vector3): void;
    /**
     * 构建正射投影矩阵
     *
     * @param {number} left
     * @param {number} right
     * @param {number} bottom
     * @param {number} top
     * @param {number} near
     * @param {number} far
     * @memberof Matrix4
     */
    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number): void;
    /**
     * 构建透视投影矩阵
     *
     * @param {number} fov
     * @param {number} aspect
     * @param {number} near
     * @param {number} far
     * @memberof Matrix4
     */
    setPerspective(fov: number, aspect: number, near: number, far: number): void;
    /**
     * 克隆矩阵
     *
     * @param {Matrix4} target
     * @memberof Matrix4
     */
    cloneFrom(target: Matrix4): void;
    /**
     * 迭代器
     *
     * @returns {Object}
     * @memberof Matrix4x3
     */
    [Symbol.iterator](): Object;
}
export default Matrix4;
