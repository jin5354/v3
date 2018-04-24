import Vector3 from './Vector3'
import EulerAngles from './EulerAngles'
import RotationMatrix from './RotationMatrix'
import Quaternion from './Quaternion'

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
class Matrix4x3 {
  m11: number = 0
  m12: number = 0
  m13: number = 0
  m21: number = 0
  m22: number = 0
  m23: number = 0
  m31: number = 0
  m32: number = 0
  m33: number = 0
  tx: number = 0
  ty: number = 0
  tz: number = 0

  constructor(m11: number, m12: number, m13: number, m21: number, m22: number, m23: number, m31: number, m32: number, m33: number, tx: number, ty: number, tz: number) {
    this.m11 = m11
    this.m12 = m12
    this.m13 = m13
    this.m21 = m21
    this.m22 = m22
    this.m23 = m23
    this.m31 = m31
    this.m32 = m32
    this.m33 = m33
    this.tx = tx
    this.ty = ty
    this.tz = tz
  }

  /**
   * Vector3 乘 Matrix4x3
   *
   * @static
   * @param {Vector3} v
   * @param {Matrix4x3} m
   * @returns {Vector3}
   * @memberof Matrix4x3
   */
  static vector3Multiply(v: Vector3, m: Matrix4x3): Vector3 {
    return new Vector3(
      v.x * m.m11 + v.y * m.m21 + v.z * m.m31 + m.tx,
      v.x * m.m12 + v.y * m.m22 + v.z * m.m32 + m.tx,
      v.x * m.m13 + v.y * m.m23 + v.z * m.m33 + m.tx
    )
  }

  /**
   * 矩阵叉乘
   *
   * @static
   * @param {...Matrix4x3[]} args
   * @returns {Matrix4x3}
   * @memberof Matrix4x3
   */
  static matrix4x3Multiply(...args: Matrix4x3[]): Matrix4x3 {
    if(args.length < 2) {
      throw Error('矩阵叉乘至少需要两个参数')
    }
    return args.reduce((a: Matrix4x3, b: Matrix4x3): Matrix4x3 => {
      return new Matrix4x3(
        a.m11 * b.m11 + a.m12 * b.m21 + a.m13 * b.m31,
        a.m11 * b.m12 + a.m12 * b.m22 + a.m13 * b.m32,
        a.m11 * b.m13 + a.m12 * b.m23 + a.m13 * b.m33,
        a.m21 * b.m11 + a.m22 * b.m21 + a.m23 * b.m31,
        a.m21 * b.m12 + a.m22 * b.m22 + a.m23 * b.m32,
        a.m21 * b.m13 + a.m22 * b.m23 + a.m23 * b.m33,
        a.m31 * b.m11 + a.m32 * b.m21 + a.m33 * b.m31,
        a.m31 * b.m12 + a.m32 * b.m22 + a.m33 * b.m32,
        a.m31 * b.m13 + a.m32 * b.m23 + a.m33 * b.m33,
        a.tx * b.m11 + a.ty * b.m21 + a.tz * b.m31 + b.tx,
        a.tx * b.m12 + a.ty * b.m22 + a.tz * b.m32 + b.ty,
        a.tx * b.m13 + a.ty * b.m23 + a.tz * b.m33 + b.tz
      )
    })
  }

  /**
   * 置为单位矩阵
   *
   * @memberof Matrix4x3
   */
  identity() {
    this.m11 = 1
    this.m12 = 0
    this.m13 = 0
    this.m21 = 0
    this.m22 = 1
    this.m23 = 0
    this.m31 = 0
    this.m32 = 0
    this.m33 = 1
    this.tx = 0
    this.ty = 0
    this.tz = 0
  }

  /**
   * 清空平移部分
   *
   * @memberof Matrix4x3
   */
  clearTranslation(): void {
    this.tx = this.ty = this.tz = 0
  }

  /**
   * 根据向量设置平移部分
   *
   * @param {Vector3} v
   * @memberof Matrix4x3
   */
  setTranslation(v: Vector3): void {
    this.tx = v.x
    this.ty = v.y
    this.tz = v.z
  }

  /**
   * 根据向量构建平移矩阵
   *
   * @param {Vector3} v
   * @memberof Matrix4x3
   */
  setupTranslation(v: Vector3): void {
    this.identity()
    this.setTranslation(v)
  }

  /**
   * 构造物体——世界变换矩阵，物体位置和方位在世界中描述
   *
   * @param {Vector3} pos
   * @param {EulerAngles} orientation
   * @memberof Matrix4x3
   */
  setupLocalToParentFromEulerAngle(pos: Vector3, orientation: EulerAngles): void {
    let orientationMatrix = RotationMatrix.fromEulerAngle(orientation)
    this.setupLocalToParentFromRotationMatrix(pos, orientationMatrix)
  }

  /**
   * 构造物体——世界变换矩阵，物体位置和方位在世界中描述
   *
   * @param {Vector3} pos
   * @param {RotationMatrix} orientation
   * @memberof Matrix4x3
   */
  setupLocalToParentFromRotationMatrix(pos: Vector3, orientation: RotationMatrix): void {
    this.m11 = orientation.m11
    this.m12 = orientation.m12
    this.m13 = orientation.m13
    this.m21 = orientation.m21
    this.m22 = orientation.m22
    this.m23 = orientation.m23
    this.m31 = orientation.m31
    this.m32 = orientation.m32
    this.m33 = orientation.m33
    this.tx = pos.x
    this.ty = pos.y
    this.tz = pos.z
  }

  /**
   * 构造世界——物体变换矩阵，物体位置和方位在世界中描述
   *
   * @param {Vector3} pos
   * @param {EulerAngles} orientation
   * @memberof Matrix4x3
   */
  setupParentToLocalFromEulerAngle(pos: Vector3, orientation: EulerAngles): void {
    let orientationMatrix = RotationMatrix.fromEulerAngle(orientation)
    this.setupParentToLocalFromRotationMatrix(pos, orientationMatrix)
  }

  /**
   * 构造世界——物体变换矩阵，物体位置和方位在世界中描述
   *
   * @param {Vector3} pos
   * @param {RotationMatrix} orientation
   * @memberof Matrix4x3
   */
  setupParentToLocalFromRotationMatrix(pos: Vector3, orientation: RotationMatrix): void {
    this.m11 = orientation.m11
    this.m12 = orientation.m12
    this.m13 = orientation.m13
    this.m21 = orientation.m21
    this.m22 = orientation.m22
    this.m23 = orientation.m23
    this.m31 = orientation.m31
    this.m32 = orientation.m32
    this.m33 = orientation.m33
    this.tx = -(pos.x * this.m11 + pos.y * this.m21 + pos.z * this.m31)
    this.ty = -(pos.x * this.m12 + pos.y * this.m22 + pos.z * this.m32)
    this.tz = -(pos.x * this.m13 + pos.y * this.m23 + pos.z * this.m33)
  }

  /**
   * 绕坐标轴旋转
   *
   * @param {string} axis
   * @param {number} theta
   * @memberof Matrix4x3
   */
  setupRotateFromXYZAxis(axis: string, theta: number): void {
    let sin: number = Math.sin(theta)
    let cos: number = Math.cos(theta)

    switch(axis) {
      case('x'): {
        this.m11 = 1
        this.m12 = 0
        this.m13 = 0
        this.m21 = 0
        this.m22 = cos
        this.m23 = sin
        this.m31 = 0
        this.m32 = -sin
        this.m33 = cos
        break
      }
      case('y'): {
        this.m11 = cos
        this.m12 = 0
        this.m13 = -sin
        this.m21 = 0
        this.m22 = 1
        this.m23 = 0
        this.m31 = sin
        this.m32 = 0
        this.m33 = cos
        break
      }
      case('z'): {
        this.m11 = cos
        this.m12 = sin
        this.m13 = 0
        this.m21 = -sin
        this.m22 = cos
        this.m23 = 0
        this.m31 = 0
        this.m32 = 0
        this.m33 = 1
        break
      }
    }

    this.tx = 0
    this.ty = 0
    this.tz = 0
  }

  /**
   * 绕特定轴旋转
   *
   * @param {Vector3} axis
   * @param {number} theta
   * @memberof Matrix4x3
   */
  setupRotateFromVector3(axis: Vector3, theta: number): void {
    if(Math.abs(Vector3.getNorm(axis) - 1) > 0.01) {
      throw Error('旋转轴向量应为单位向量!')
    }

    let sin: number = Math.sin(theta)
    let cos: number = Math.cos(theta)
    let a: number = 1 - cos
    let ax: number = a * axis.x
    let ay: number = a * axis.y
    let az: number = a * axis.z

    this.m11 = ax * axis.x + cos
    this.m12 = ax * axis.y + axis.z * sin
    this.m13 = ax * axis.z - axis.y * sin
    this.m21 = ay * axis.x - axis.z * sin
    this.m22 = ay * axis.y + cos
    this.m23 = ay * axis.z + axis.x * sin
    this.m31 = az * axis.x + axis.y * sin
    this.m32 = az * axis.y - axis.x * sin
    this.m33 = az * axis.z + cos
    this.tx = 0
    this.ty = 0
    this.tz = 0
  }

  /**
   * 沿坐标轴缩放
   *
   * @param {Vector3} v
   * @memberof Matrix4x3
   */
  setupScale(v: Vector3): void {
    this.m11 = v.x
    this.m12 = 0
    this.m13 = 0
    this.m21 = 0
    this.m22 = v.y
    this.m23 = 0
    this.m31 = 0
    this.m32 = 0
    this.m33 = v.z
    this.tx = 0
    this.ty = 0
    this.tz = 0
  }

  /**
   * 沿任意轴缩放
   *
   * @param {Vector3} axis
   * @param {number} k
   * @memberof Matrix4x3
   */
  setupScaleFromAxis(axis: Vector3, k: number): void {
    if(Math.abs(Vector3.getNorm(axis) - 1) > 0.01) {
      throw Error('旋转轴向量应为单位向量!')
    }

    let a = k - 1
    let ax = a * axis.x
    let ay = a * axis.y
    let az = a * axis.z

    this.m11 = ax * axis.x + 1
    this.m22 = ay * axis.y + 1
    this.m33 = az * axis.z + 1
    this.m12 = this.m21 = ax * axis.y
    this.m13 = this.m31 = ax * axis.z
    this.m23 = this.m32 = ay * axis.z
    this.tx = this.ty = this.tz = 0
  }

  /**
   * 设置切变
   *
   * @param {string} axis
   * @param {number} s
   * @param {number} t
   * @memberof Matrix4x3
   */
  setupShear(axis: string, s: number, t: number): void {
    switch(axis) {
      case('x'): {
        this.m11 = 1
        this.m12 = 0
        this.m13 = 0
        this.m21 = 0
        this.m22 = 1
        this.m23 = 0
        this.m31 = s
        this.m32 = t
        this.m33 = 1
        break
      }
      case('y'): {
        this.m11 = 1
        this.m12 = 0
        this.m13 = 0
        this.m21 = s
        this.m22 = 1
        this.m23 = t
        this.m31 = 0
        this.m32 = 0
        this.m33 = 1
        break
      }
      case('z'): {
        this.m11 = 1
        this.m12 = s
        this.m13 = t
        this.m21 = 0
        this.m22 = 1
        this.m23 = 0
        this.m31 = 0
        this.m32 = 0
        this.m33 = 1
        break
      }
    }
    this.tx = this.ty = this.tx = 0
  }

  /**
   * 设置指定反射平面的反射矩阵
   *
   * @param {Vector3} n
   * @memberof Matrix4x3
   */
  setupReflection(n: Vector3): void {
    if(Math.abs(Vector3.getNorm(n) - 1) > 0.01) {
      throw Error('反射平面法向量应为单位向量!')
    }

    let ax = -2 * n.x
    let ay = -2 * n.y
    let az = -2 * n.z

    this.m11 = 1 + ax * n.x
    this.m22 = 1 + ay * n.y
    this.m33 = 1 + az * n.z
    this.m12 = this.m21 = ax * n.y
    this.m13 = this.m31 = ax * n.z
    this.m23 = this.m32 = ay * n.z
    this.tx = this.ty = this.tz = 0
  }

}

export default Matrix4x3
