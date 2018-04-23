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

  setupParentToLocalFromEulerAngle(pos: Vector3, orientation: EulerAngles): void {

  }

  setupParentToLocalFromRotationMatrix(pos: Vector3, orientation: RotationMatrix): void {

  }

}

export default Matrix4x3
