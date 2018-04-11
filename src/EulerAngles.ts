import Quaternion from './Quaternion'

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


}

export default EulerAngles
