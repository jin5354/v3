import TransformMatrix from './TransformMatrix'
import EulerAngles from './EulerAngles'
import Quaternion from './Quaternion'
import * as MathUtil from './MathUtil'

/**
 * 旋转矩阵类
 *
 * @class RotationMatrix
 */
class RotationMatrix extends TransformMatrix {
  m11: number = 0
  m12: number = 0
  m13: number = 0
  m21: number = 0
  m22: number = 0
  m23: number = 0
  m31: number = 0
  m32: number = 0
  m33: number = 0

  constructor(m11: number, m12: number, m13: number, m21: number, m22: number, m23: number, m31: number, m32: number, m33: number) {
    super(m11, m12, m13, m21, m22, m23, m31, m32, m33)
  }

  /**
   * 通过欧拉角构建旋转矩阵
   *
   * @static
   * @param {EulerAngles} orientation
   * @returns {RotationMatrix}
   * @memberof RotationMatrix
   */
  static setup(orientation: EulerAngles): RotationMatrix {
    let sinH = Math.sin(orientation.heading)
    let cosH = Math.cos(orientation.heading)
    let sinP = Math.sin(orientation.picth)
    let cosP = Math.cos(orientation.picth)
    let sinB = Math.sin(orientation.bank)
    let cosB = Math.cos(orientation.bank)

    let m11 = cosH * cosB + sinH * sinP * sinB
    let m12 = -cosH * sinB + sinH * sinP * cosB
    let m13 = sinH * cosP
    let m21 = sinB * cosP
    let m22 = cosB * cosP
    let m23 = -sinP
    let m31 = -sinH * cosB + cosH * sinP * sinB
    let m32 = sinB * sinH + cosH * sinP * cosB
    let m33 = cosH * cosP

    return new RotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33)
  }

  /**
   * 从世界-物体四元数构建旋转矩阵
   *
   * @static
   * @param {Quaternion} q
   * @returns {RotationMatrix}
   * @memberof RotationMatrix
   */
  static fromWorldToObjectQuaternion(q: Quaternion): RotationMatrix {
    let m11 = 1 - 2 * q.y * q.y - 2 * q.z * q.z
    let m12 = 2 * q.x * q.y + 2 * q.w * q.z
    let m13 = 2 * q.x * q.z - 2 * q.w * q.y
    let m21 = 2 * q.x * q.y - 2 * q.w * q.z
    let m22 = 1 - 2 * q.x * q.x - 2 * q.z * q.z
    let m23 = 2 * q.y * q.z + 2 * q.w * q.x
    let m31 = 2 * q.x * q.z + 2 * q.w * q.y
    let m32 = 2 * q.y * q.z - 2 * q.w * q.x
    let m33 = 1 - 2 * q.x * q.x - 2 * q.y * q.y

    return new RotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33)
  }

  /**
   * 从物体——世界四元数构建旋转矩阵
   *
   * @static
   * @param {Quaternion} q
   * @returns {RotationMatrix}
   * @memberof RotationMatrix
   */
  static fromObjectToWorldQuaternion(q: Quaternion): RotationMatrix {
    let m11 = 1 - 2 * q.y * q.y - 2 * q.z * q.z
    let m12 = 2 * q.x * q.y - 2 * q.w * q.z
    let m13 = 2 * q.x * q.z + 2 * q.w * q.y
    let m21 = 2 * q.x * q.y + 2 * q.w * q.z
    let m22 = 1 - 2 * q.x * q.x - 2 * q.z * q.z
    let m23 = 2 * q.y * q.z - 2 * q.w * q.x
    let m31 = 2 * q.x * q.z - 2 * q.w * q.y
    let m32 = 2 * q.y * q.z + 2 * q.w * q.x
    let m33 = 1 - 2 * q.x * q.x - 2 * q.y * q.y

    return new RotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33)
  }

}

export default RotationMatrix
