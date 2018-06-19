import Vector3 from './Vector3';
import * as MathUtil from './MathUtil';
/**
 * 四元数类
 *
 * @class Quaternion
 */
class Quaternion {
    constructor(w = 0, x = 0, y = 0, z = 0) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * 四元数求负
     *
     * @static
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static negate(a) {
        return new Quaternion(-a.w, -a.x, -a.y, -a.z);
    }
    /**
     * 四元数求模
     *
     * @static
     * @param {Quaternion} a
     * @returns {number}
     * @memberof Quaternion
     */
    static getNorm(a) {
        return Math.sqrt(a.w * a.w + a.x * a.x + a.y * a.y + a.z * a.z);
    }
    /**
     * 四元数求共轭
     *
     * @static
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static getConjugate(a) {
        return new Quaternion(a.w, -a.x, -a.y, -a.z);
    }
    /**
     * 四元数点乘
     *
     * @static
     * @param {Quaternion} a
     * @param {Quaternion} b
     * @returns {number}
     * @memberof Quaternion
     */
    static dotProduct(a, b) {
        return a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
    }
    /**
     * 四元数叉乘
     *
     * @static
     * @param {...Quaternion[]} args
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static crossProduct(...args) {
        if (args.length < 2) {
            throw Error('四元数叉乘至少需要两个参数');
        }
        // 与标准定义相反
        return args.reduce((a, b) => {
            let w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
            let x = a.w * b.x + a.x * b.w + a.z * b.y - a.y * b.z;
            let y = a.w * b.y + a.y * b.w + a.x * b.z - a.z * b.x;
            let z = a.w * b.z + a.z * b.w + a.y * b.x - a.x * b.y;
            return new Quaternion(w, x, y, z);
        });
    }
    /**
     * 标量乘
     *
     * @static
     * @param {number} scalar
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static scalarMultiply(scalar, a) {
        return new Quaternion(scalar * a.w, scalar * a.x, scalar * a.y, scalar * a.z);
    }
    /**
     * 四元数对数
     *
     * @static
     * @param {Quaternion} a
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static log(a) {
        let theta = a.getRotationAngle();
        return new Quaternion(0, theta / 2 * a.x, theta / 2 * a.y, theta / 2 * a.z);
    }
    /**
     * 四元数求幂
     *
     * @static
     * @param {Quaternion} a
     * @param {number} exponent
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static pow(a, exponent) {
        if (Math.abs(a.w) > 0.999) {
            return a;
        }
        let alpha = MathUtil.safeAcos(a.w);
        let newAlpha = alpha * exponent;
        let mult = Math.sin(newAlpha) / Math.sin(alpha);
        return new Quaternion(Math.cos(alpha), a.x * mult, a.y * mult, a.z * mult);
    }
    /**
     * 由四元数 a 到四元数 b 的角位移
     *
     * @param {Quaternion} a
     * @param {Quaternion} b
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static getAngularDisplacement(a, b) {
        return Quaternion.crossProduct(Quaternion.getConjugate(a), b);
    }
    /**
     * 四元数 slerp 插值
     *
     * @static
     * @param {Quaternion} a
     * @param {Quaternion} b
     * @param {number} t
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static slerp(a, b, t) {
        let k0;
        let k1;
        let cosOmega = Quaternion.dotProduct(a, b);
        // 反转，找最短弧度
        if (cosOmega < 0) {
            b = Quaternion.negate(b);
            cosOmega = -cosOmega;
        }
        // 夹角过小，当做平行线
        if (cosOmega > 0.9999) {
            k0 = 1 - t;
            k1 = t;
        }
        else {
            let sinOmega = Math.sqrt(1 - cosOmega * cosOmega);
            let omega = Math.atan2(sinOmega, cosOmega);
            k0 = Math.sin((1 - t) * omega) / sinOmega;
            k1 = Math.sin(t * omega) / sinOmega;
        }
        let w = a.w * k0 + b.w * k1;
        let x = a.x * k0 + b.x * k1;
        let y = a.y * k0 + b.y * k1;
        let z = a.z * k1 + b.z * k1;
        return new Quaternion(w, x, y, z);
    }
    /**
     * 从旋转矩阵提取四元数
     *
     * @static
     * @param {RotationMatrix} m
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static fromRotationMatrix(m) {
        let w = 0;
        let x = 0;
        let y = 0;
        let z = 0;
        let fourWSquaredMinus1 = m.m11 + m.m22 + m.m33;
        let fourXSquaredMinus1 = m.m11 - m.m22 - m.m33;
        let fourYSquaredMinus1 = m.m22 - m.m11 - m.m33;
        let fourZSquaredMinus1 = m.m33 - m.m11 - m.m22;
        let biggestIndex = 0;
        let fourBiggestSquaredMinus1 = fourWSquaredMinus1;
        if (fourXSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourXSquaredMinus1;
            biggestIndex = 1;
        }
        if (fourYSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourYSquaredMinus1;
            biggestIndex = 2;
        }
        if (fourZSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourZSquaredMinus1;
            biggestIndex = 3;
        }
        let biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1) * 0.5;
        let mult = 0.25 / biggestVal;
        switch (biggestIndex) {
            case (0): {
                w = biggestVal;
                x = (m.m23 - m.m32) * mult;
                y = (m.m31 - m.m13) * mult;
                z = (m.m12 - m.m21) * mult;
                break;
            }
            case (1): {
                w = biggestVal;
                x = (m.m23 - m.m32) * mult;
                y = (m.m12 + m.m21) * mult;
                z = (m.m31 + m.m13) * mult;
                break;
            }
            case (2): {
                w = biggestVal;
                x = (m.m31 - m.m13) * mult;
                y = (m.m12 + m.m21) * mult;
                z = (m.m23 + m.m32) * mult;
                break;
            }
            case (3): {
                w = biggestVal;
                x = (m.m12 - m.m21) * mult;
                y = (m.m31 + m.m13) * mult;
                z = (m.m23 + m.m13) * mult;
                break;
            }
        }
        return new Quaternion(w, x, y, z);
    }
    /**
     * 从欧拉角构建物体——世界四元数
     *
     * @static
     * @param {EulerAngles} orientation
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static setObjectToWorldFromEulerAngles(orientation) {
        let sinHOver2 = Math.sin(orientation.heading / 2);
        let cosHOver2 = Math.cos(orientation.heading / 2);
        let sinPOver2 = Math.sin(orientation.picth / 2);
        let cosPOver2 = Math.cos(orientation.picth / 2);
        let sinBOver2 = Math.sin(orientation.bank / 2);
        let cosBOver2 = Math.cos(orientation.bank / 2);
        return new Quaternion(cosHOver2 * cosPOver2 * cosBOver2 + sinHOver2 * sinPOver2 * sinBOver2, cosHOver2 * sinPOver2 * cosBOver2 + sinHOver2 * cosPOver2 * sinBOver2, -cosHOver2 * sinPOver2 * sinBOver2 + sinHOver2 * cosPOver2 * cosBOver2, -sinHOver2 * sinPOver2 * cosBOver2 + cosHOver2 * cosPOver2 * sinBOver2);
    }
    /**
     * 从欧拉角构建世界——物体四元数
     *
     * @static
     * @param {EulerAngles} orientation
     * @returns {Quaternion}
     * @memberof Quaternion
     */
    static setWorldToObjectFromEulerAngles(orientation) {
        return Quaternion.getConjugate(Quaternion.setObjectToWorldFromEulerAngles(orientation));
    }
    /**
     * 绕 X 轴旋转
     *
     * @param {number} theta
     * @memberof Quaternion
     */
    setToRotateAboutX(theta) {
        this.w = Math.cos(theta / 2);
        this.x = Math.sin(theta / 2);
        this.y = 0;
        this.z = 0;
    }
    /**
     * 绕 Y 轴旋转
     *
     * @param {number} theta
     * @memberof Quaternion
     */
    setToRotateAboutY(theta) {
        this.w = Math.cos(theta / 2);
        this.x = 0;
        this.y = Math.sin(theta / 2);
        this.z = 0;
    }
    /**
     * 绕 Z 轴旋转
     *
     * @param {number} theta
     * @memberof Quaternion
     */
    setToRotateAboutZ(theta) {
        this.w = Math.cos(theta / 2);
        this.x = 0;
        this.y = 0;
        this.z = Math.sin(theta / 2);
    }
    /**
     * 绕指定轴旋转
     *
     * @param {Vector3} axis
     * @param {number} theta
     * @memberof Quaternion
     */
    setToRotateAboutAxis(axis, theta) {
        // 旋转轴向量必须标准化
        if (Vector3.getNorm(axis) - 1 >= 0.01) {
            throw Error('构建四元数时，旋转轴向量必须标准化');
        }
        this.w = Math.cos(theta / 2);
        this.x = Math.sin(theta / 2) * axis.x;
        this.y = Math.sin(theta / 2) * axis.y;
        this.z = Math.sin(theta / 2) * axis.z;
    }
    /**
     * 标准化四元数
     *
     * @memberof Quaternion
     */
    normalize() {
        let norm = Quaternion.getNorm(this);
        if (norm) {
            this.w = this.w / norm;
            this.x = this.x / norm;
            this.y = this.y / norm;
            this.z = this.z / norm;
        }
        else {
            this.w = 1;
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
    }
    /**
     * 提取旋转角
     *
     * @returns {number}
     * @memberof Quaternion
     */
    getRotationAngle() {
        return 2 * MathUtil.safeAcos(this.w);
    }
    /**
     * 提取旋转轴
     *
     * @returns {Vector3}
     * @memberof Quaternion
     */
    getRotationAxis() {
        let sinThetaOver2 = Math.sqrt(1 - this.w * this.w);
        if (!sinThetaOver2) {
            return new Vector3(1, 0, 0);
        }
        return new Vector3(this.x / sinThetaOver2, this.y / sinThetaOver2, this.z / sinThetaOver2);
    }
}
/**
 * 单位四元数
 *
 * @static
 * @memberof Quaternion
 */
Quaternion.QuaternionIdentity = new Quaternion(1, 0, 0, 0);
export default Quaternion;
