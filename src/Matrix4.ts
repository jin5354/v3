/**
 * mat4 标准矩阵
 *
 * @class Matrix4
 */
class Matrix4 {
  m11: number
  m12: number
  m13: number
  m14: number
  m21: number
  m22: number
  m23: number
  m24: number
  m31: number
  m32: number
  m33: number
  m34: number
  tx: number
  ty: number
  tz: number
  tw: number

  constructor(m11: number = 0, m12: number = 0, m13: number = 0, m14: number = 0, m21: number = 0, m22: number = 0, m23: number = 0, m24: number = 0, m31: number = 0, m32: number = 0, m33: number = 0, m34: number = 0, tx: number = 0, ty: number = 0, tz: number = 0, tw: number = 0) {
    this.m11 = m11
    this.m12 = m12
    this.m13 = m13
    this.m14 = m14
    this.m21 = m21
    this.m22 = m22
    this.m23 = m23
    this.m24 = m24
    this.m31 = m31
    this.m32 = m32
    this.m33 = m33
    this.m34 = m34
    this.tx = tx
    this.ty = ty
    this.tz = tz
    this.tw = tw
  }

  /**
   * 标量乘法
   *
   * @static
   * @param {number} scalar
   * @param {Matrix4} m
   * @returns {Matrix4}
   * @memberof Matrix4
   */
  static scalarMultiply(scalar: number, m: Matrix4): Matrix4 {
    return new Matrix4(
      m.m11 * scalar, m.m12 * scalar, m.m13 * scalar, m.m14 * scalar,
      m.m21 * scalar, m.m22 * scalar, m.m23 * scalar, m.m24 * scalar,
      m.m31 * scalar, m.m32 * scalar, m.m33 * scalar, m.m34 * scalar,
      m.tx * scalar, m.ty * scalar, m.tz * scalar, m.tw * scalar
    )
  }

  /**
   * 置为单位矩阵
   *
   * @memberof Matrix4
   */
  identity(): void {
    this.m11 = 1
    this.m12 = 0
    this.m13 = 0
    this.m14 = 0
    this.m21 = 0
    this.m22 = 1
    this.m23 = 0
    this.m24 = 0
    this.m31 = 0
    this.m32 = 0
    this.m33 = 1
    this.m34 = 0
    this.tx = 0
    this.ty = 0
    this.tz = 0
    this.tw = 1
  }

  /**
   * 矩阵转置
   *
   * @memberof Matrix4
   */
  transpose(): void {
    [
      this.m12, this.m13, this.m14,
      this.m23, this.m24,
      this.m34
    ] = [
      this.m21, this.m31, this.tx,
      this.m32, this.ty,
      this.tz
    ]
  }

  /**
   * 获取该矩阵的 mat4 类型化数组
   *
   * @returns {Float32Array}
   * @memberof Matrix4x3
   */
  getMat4FloatArray(): Float32Array {
    return new Float32Array([
      this.m11, this.m12, this.m13, this.m14,
      this.m21, this.m22, this.m23, this.m24,
      this.m31, this.m32, this.m33, this.m34,
      this.tx, this.ty, this.tz, this.tw
    ])
  }

  /**
   * 迭代器
   *
   * @returns {Object}
   * @memberof Matrix4x3
   */
  [Symbol.iterator](): Object {
    let values: Array<number> = [
      this.m11, this.m12, this.m13, this.m14,
      this.m21, this.m22, this.m23, this.m24,
      this.m31, this.m32, this.m33, this.m34,
      this.tx, this.ty, this.tz, this.tw
    ]
    let index: number = 0
    return {
      next(): IteratorResult<number> {
        return {
          done: index === values.length,
          value: values[index++]
        }
      }
    }
  }
}

export default Matrix4
