import Quaternion from './Quaternion'
import * as MathUtil from './MathUtil'

/**
 * 欧拉角类
 * heading-picth-bank
 *
 * @class EulerAngles
 */
class EulerAngles {
  heading: number = 0
  picth: number = 0
  bank: number = 0

  constructor(heading: number, picth: number, bank: number) {
    this.heading = heading
    this.picth = picth
    this.bank = bank
  }

  /**
   * 限制欧拉角
   * heading, bank 限制到 -pi —— pi
   * picth 限制到 -2/pi —— 2/pi
   *
   * @memberof EulerAngles
   */
  canonize(): void {
    // 变换 picth 到 -pi —— pi
    this.picth = MathUtil.wrapPi(this.picth)
    // 变换 picth 到 -2/pi —— 2/pi
    if(this.picth < -2 / Math.PI) {
      this.picth = -Math.PI - this.picth
      this.heading += Math.PI
      this.bank += Math.PI
    }else if(this.picth > 2 / Math.PI) {
      this.picth = Math.PI - this.picth
      this.heading += Math.PI
      this.bank += Math.PI
    }

    //检查万向锁(允许误差)
    if(Math.abs(this.picth) > Math.PI / 2 - 0.0001) {
      // 万向锁中，要求所有绕垂直轴的旋转赋给 heading，bank 置空
      this.heading += this.bank
      this.bank = 0
    } else {
      // 非万向锁
      this.bank = MathUtil.wrapPi(this.bank)
    }

    this.heading = MathUtil.wrapPi(this.heading)
  }


}

export default EulerAngles
