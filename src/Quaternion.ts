import Vector3 from './Vector3'
import * as MathUtil from './MathUtil'

/**
 * 四元数类
 *
 * @class Quaternion
 */
class Quaternion {

  /**
   * 单位四元数
   *
   * @static
   * @memberof Quaternion
   */
  static QuaternionIdentity = new Quaternion(1, 0, 0, 0)

  w: number = 0
  x: number = 0
  y: number = 0
  z: number = 0

  constructor(w: number, x: number, y: number, z: number) {
    this.w = w
    this.x = x
    this.y = y
    this.z = z
  }

  /**
   * 四元数求负
   *
   * @static
   * @param {Quaternion} a
   * @returns {Quaternion}
   * @memberof Quaternion
   */
  static negate(a: Quaternion): Quaternion {
    return new Quaternion(-a.w, -a.x, -a.y, -a.z)
  }

  /**
   * 四元数求模
   *
   * @static
   * @param {Quaternion} a
   * @returns {number}
   * @memberof Quaternion
   */
  static getNorm(a: Quaternion): number {
    return Math.sqrt(a.w * a.w + a.x * a.x + a.y * a.y + a.z * a.z)
  }

  /**
   * 四元数求共轭
   *
   * @static
   * @param {Quaternion} a
   * @returns {Quaternion}
   * @memberof Quaternion
   */
  static getConjugate(a: Quaternion): Quaternion {
    return new Quaternion(a.w, -a.x, -a.y, -a.z)
  }

  /**
   * 四元数叉乘
   *
   * @static
   * @param {...Quaternion[]} args
   * @returns {Quaternion}
   * @memberof Quaternion
   */
  static crossProduct(...args: Quaternion[]): Quaternion {
    if(args.length < 2) {
      throw Error('四元数叉乘至少需要两个参数')
    }
    // 与标准定义相反
    return args.reduce((a: Quaternion, b: Quaternion): Quaternion => {
      let w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
      let x = a.w * b.x + a.x * b.w + a.z * b.y - a.y * b.z
      let y = a.w * b.y + a.y * b.w + a.x * b.z - a.z * b.x
      let z = a.w * b.z + a.z * b.w + a.y * b.x - a.x * b.y
      return new Quaternion(w, x, y, z)
    })
  }

  /**
   * 绕 X 轴旋转
   *
   * @param {number} theta
   * @memberof Quaternion
   */
  setToRotateAboutX(theta: number): void {
    this.w = Math.cos(theta / 2)
    this.x = Math.sin(theta / 2)
    this.y = 0
    this.z = 0
  }

  /**
   * 绕 Y 轴旋转
   *
   * @param {number} theta
   * @memberof Quaternion
   */
  setToRotateAboutY(theta: number): void {
    this.w = Math.cos(theta / 2)
    this.x = 0
    this.y = Math.sin(theta / 2)
    this.z = 0
  }

  /**
   * 绕 Z 轴旋转
   *
   * @param {number} theta
   * @memberof Quaternion
   */
  setToRotateAboutZ(theta: number): void {
    this.w = Math.cos(theta / 2)
    this.x = 0
    this.y = 0
    this.z = Math.sin(theta / 2)
  }

  /**
   * 绕指定轴旋转
   *
   * @param {Vector3} axis
   * @param {number} theta
   * @memberof Quaternion
   */
  setToRotateAboutAxis(axis: Vector3, theta: number): void {
    // 旋转轴向量必须标准化
    if(Vector3.getNorm(axis) - 1 >= 0.01) {
      throw Error('构建四元数时，旋转轴向量必须标准化')
    }

    this.w = Math.cos(theta / 2)
    this.x = Math.sin(theta / 2) * axis.x
    this.y = Math.sin(theta / 2) * axis.y
    this.z = Math.sin(theta / 2) * axis.z
  }

  /**
   * 标准化四元数
   *
   * @memberof Quaternion
   */
  normalize(): void {
    let norm = Quaternion.getNorm(this)

    if(norm) {
      this.w = this.w / norm
      this.x = this.x / norm
      this.y = this.y / norm
      this.z = this.z / norm
    }else {
      this.w = 1
      this.x = 0
      this.y = 0
      this.z = 0
    }
  }

  /**
   * 提取旋转角
   *
   * @returns {number}
   * @memberof Quaternion
   */
  getRotationAngle(): number {
    return 2 * MathUtil.safeAcos(this.w)
  }

  /**
   * 提取旋转轴
   *
   * @returns {Vector3}
   * @memberof Quaternion
   */
  getRotationAxis(): Vector3 {
    let sinThetaOver2 = Math.sqrt(1 - this.w * this.w)
    if(!sinThetaOver2) {
      return new Vector3(1, 0, 0)
    }

    return new Vector3(this.x / sinThetaOver2, this.y / sinThetaOver2, this.z / sinThetaOver2)
  }

}

export default Quaternion
