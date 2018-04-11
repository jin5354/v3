/**
 * 变换矩阵
 *
 * @class TransformMatrix
 */
class TransformMatrix {
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
    this.m11 = m11
    this.m12 = m12
    this.m13 = m13
    this.m21 = m21
    this.m22 = m22
    this.m23 = m23
    this.m31 = m31
    this.m32 = m32
    this.m33 = m33
  }
}

export default TransformMatrix
