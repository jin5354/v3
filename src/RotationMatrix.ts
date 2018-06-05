import Matrix4x3 from './Matrix4x3'
import EulerAngles from './EulerAngles'
import Quaternion from './Quaternion'
import * as MathUtil from './MathUtil'

/**
 * 旋转矩阵类
 *
 * @class RotationMatrix
 */
class RotationMatrix extends Matrix4x3 {
  m11!: number
  m12!: number
  m13!: number
  m21!: number
  m22!: number
  m23!: number
  m31!: number
  m32!: number
  m33!: number

  constructor(m11: number = 0, m12: number = 0, m13: number = 0, m21: number = 0, m22: number = 0, m23: number = 0, m31: number = 0, m32: number = 0, m33: number = 0) {
    super(m11, m12, m13, m21, m22, m23, m31, m32, m33, 0, 0, 0)
  }
}

export default RotationMatrix
