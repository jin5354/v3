import Vector3 from './Vector3';
import RotationMatrix from './RotationMatrix';
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
    static fromEulerAngle(orientation: EulerAngles): RotationMatrix;
    /**
     * 从世界-物体四元数构建旋转矩阵
     *
     * @static
     * @param {Quaternion} q
     * @returns {RotationMatrix}
     * @memberof Matrix4
     */
    static fromWorldToObjectQuaternion(q: Quaternion): RotationMatrix;
    /**
     * 从物体——世界四元数构建旋转矩阵
     *
     * @static
     * @param {Quaternion} q
     * @returns {RotationMatrix}
     * @memberof Matrix4
     */
    static fromObjectToWorldQuaternion(q: Quaternion): RotationMatrix;
    /**
     * Vector3 乘 Matrix4
     *
     * @static
     * @param {Vector3} v
     * @param {Matrix4} m
     * @returns {Vector3}
     * @memberof Matrix4
     */
    static vector3Multiply(v: Vector3, m: Matrix4): Vector3;
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
     * 置为单位矩阵
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
     * 根据向量设置平移部分
     *
     * @param {Vector3} v
     * @memberof Matrix4
     */
    setTranslation(v: Vector3): void;
    /**
     * 根据向量构建平移矩阵
     *
     * @param {Vector3} v
     * @memberof Matrix4
     */
    setupTranslation(v: Vector3): void;
    /**
     * 构造物体——世界变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {EulerAngles} orientation
     * @memberof Matrix4
     */
    setupLocalToParentFromEulerAngle(pos: Vector3, orientation: EulerAngles): void;
    /**
     * 构造物体——世界变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {RotationMatrix} orientation
     * @memberof Matrix4
     */
    setupLocalToParentFromRotationMatrix(pos: Vector3, orientation: RotationMatrix): void;
    /**
     * 构造世界——物体变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {EulerAngles} orientation
     * @memberof Matrix4
     */
    setupParentToLocalFromEulerAngle(pos: Vector3, orientation: EulerAngles): void;
    /**
     * 构造世界——物体变换矩阵，物体位置和方位在世界中描述
     *
     * @param {Vector3} pos
     * @param {RotationMatrix} orientation
     * @memberof Matrix4
     */
    setupParentToLocalFromRotationMatrix(pos: Vector3, orientation: RotationMatrix): void;
    /**
     * 绕坐标轴旋转
     *
     * @param {string} axis
     * @param {number} theta
     * @memberof Matrix4
     */
    setupRotateFromXYZAxis(axis: string, theta: number): void;
    /**
     * 绕特定轴旋转
     *
     * @param {Vector3} axis
     * @param {number} theta
     * @memberof Matrix4
     */
    setupRotateFromVector3(axis: Vector3, theta: number): void;
    /**
     * 沿坐标轴缩放
     *
     * @param {Vector3} v
     * @memberof Matrix4
     */
    setupScale(v: Vector3): void;
    /**
     * 沿任意轴缩放
     *
     * @param {Vector3} axis
     * @param {number} k
     * @memberof Matrix4
     */
    setupScaleFromAxis(axis: Vector3, k: number): void;
    /**
     * 设置切变
     *
     * @param {string} axis
     * @param {number} s
     * @param {number} t
     * @memberof Matrix4
     */
    setupShear(axis: string, s: number, t: number): void;
    /**
     * 设置指定反射平面的反射矩阵
     *
     * @param {Vector3} n
     * @memberof Matrix4x3
     */
    setupReflection(n: Vector3): void;
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
     * 迭代器
     *
     * @returns {Object}
     * @memberof Matrix4x3
     */
    [Symbol.iterator](): Object;
}
export default Matrix4;
