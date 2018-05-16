import * as MathUtil from './MathUtil';
/**
 * 欧拉角类
 * heading-picth-bank
 *
 * @class EulerAngles
 */
class EulerAngles {
    constructor(heading = 0, picth = 0, bank = 0) {
        this.heading = heading;
        this.picth = picth;
        this.bank = bank;
    }
    /**
     * 从世界——物体旋转矩阵中提取欧拉角
     *
     * @static
     * @param {RotationMatrix} m
     * @memberof EulerAngles
     */
    static fromRotationMatrix(m) {
        let heading;
        let picth;
        let bank;
        let sp = -m.m23;
        // 注意万向锁
        if (Math.abs(sp) > 0.9999) {
            picth = Math.PI / 2 * sp;
            bank = 0;
            heading = Math.atan2(-m.m31, m.m11);
        }
        else {
            picth = Math.asin(sp);
            bank = Math.atan2(m.m21, m.m22);
            heading = Math.atan2(m.m13, m.m33);
        }
        return new EulerAngles(heading, picth, bank);
    }
    /**
     * 物体——世界四元数转换为欧拉角
     *
     * @static
     * @param {Quaternion} q
     * @returns {EulerAngles}
     * @memberof EulerAngles
     */
    static fromObjectToWorldQuaternion(q) {
        let heading;
        let picth;
        let bank;
        let sp = -2 * (q.y * q.z - q.w * q.x);
        // 注意万向锁
        if (Math.abs(sp) > 0.9999) {
            picth = Math.PI / 2 * sp;
            bank = 0;
            heading = Math.atan2(-q.x * q.z + q.w * q.y, 0.5 - q.y * q.y - q.z * q.z);
        }
        else {
            picth = Math.asin(sp);
            heading = Math.atan2(q.x * q.z + q.w * q.y, 0.5 - q.x * q.x - q.y * q.y);
            bank = Math.atan2(q.x * q.y + q.w * q.z, 0.5 - q.x * q.x - q.z * q.z);
        }
        return new EulerAngles(heading, picth, bank);
    }
    static fromWorldToObjectQuaternion(q) {
        let heading;
        let picth;
        let bank;
        let sp = -2 * (q.y * q.z + q.w * q.x);
        // 注意万向锁
        if (Math.abs(sp) > 0.9999) {
            picth = Math.PI / 2 * sp;
            bank = 0;
            heading = Math.atan2(-q.x * q.z - q.w * q.y, 0.5 - q.y * q.y - q.z * q.z);
        }
        else {
            picth = Math.asin(sp);
            heading = Math.atan2(q.x * q.z - q.w * q.y, 0.5 - q.x * q.x - q.y * q.y);
            bank = Math.atan2(q.x * q.y - q.w * q.z, 0.5 - q.x * q.x - q.z * q.z);
        }
        return new EulerAngles(heading, picth, bank);
    }
    /**
     * 限制欧拉角
     * heading, bank 限制到 -pi —— pi
     * picth 限制到 -2/pi —— 2/pi
     *
     * @memberof EulerAngles
     */
    canonize() {
        // 变换 picth 到 -pi —— pi
        this.picth = MathUtil.wrapPi(this.picth);
        // 变换 picth 到 -2/pi —— 2/pi
        if (this.picth < -2 / Math.PI) {
            this.picth = -Math.PI - this.picth;
            this.heading += Math.PI;
            this.bank += Math.PI;
        }
        else if (this.picth > 2 / Math.PI) {
            this.picth = Math.PI - this.picth;
            this.heading += Math.PI;
            this.bank += Math.PI;
        }
        // 检查万向锁(允许误差)
        if (Math.abs(this.picth) > Math.PI / 2 - 0.0001) {
            // 万向锁中，要求所有绕垂直轴的旋转赋给 heading，bank 置空
            this.heading += this.bank;
            this.bank = 0;
        }
        else {
            // 非万向锁
            this.bank = MathUtil.wrapPi(this.bank);
        }
        this.heading = MathUtil.wrapPi(this.heading);
    }
}
export default EulerAngles;
