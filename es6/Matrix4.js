/**
 * mat4 标准矩阵
 *
 * @class Matrix4
 */
class Matrix4 {
    constructor(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, tx, ty, tz, tw) {
        this.m11 = 0;
        this.m12 = 0;
        this.m13 = 0;
        this.m14 = 0;
        this.m21 = 0;
        this.m22 = 0;
        this.m23 = 0;
        this.m24 = 0;
        this.m31 = 0;
        this.m32 = 0;
        this.m33 = 0;
        this.m34 = 0;
        this.tx = 0;
        this.ty = 0;
        this.tz = 0;
        this.tw = 0;
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m14 = m14;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m24 = m24;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
        this.m34 = m34;
        this.tx = tx;
        this.ty = ty;
        this.tz = tz;
        this.tw = tw;
    }
    /**
     * 置为单位矩阵
     *
     * @memberof Matrix4
     */
    identity() {
        this.m11 = 1;
        this.m12 = 0;
        this.m13 = 0;
        this.m14 = 0;
        this.m21 = 0;
        this.m22 = 1;
        this.m23 = 0;
        this.m24 = 0;
        this.m31 = 0;
        this.m32 = 0;
        this.m33 = 1;
        this.m34 = 0;
        this.tx = 0;
        this.ty = 0;
        this.tz = 0;
        this.tw = 1;
    }
    /**
     * 矩阵转置
     *
     * @memberof Matrix4
     */
    transpose() {
        [
            this.m12, this.m13, this.m14,
            this.m23, this.m24,
            this.m34
        ] = [
            this.m21, this.m31, this.tx,
            this.m32, this.ty,
            this.tz
        ];
    }
    /**
     * 获取该矩阵的 mat4 类型化数组
     *
     * @returns {Float32Array}
     * @memberof Matrix4x3
     */
    getMat4FloatArray() {
        return new Float32Array([
            this.m11, this.m12, this.m13, this.m14,
            this.m21, this.m22, this.m23, this.m24,
            this.m31, this.m32, this.m33, this.m34,
            this.tx, this.ty, this.tz, this.tw
        ]);
    }
    /**
     * 迭代器
     *
     * @returns {Object}
     * @memberof Matrix4x3
     */
    [Symbol.iterator]() {
        let values = [
            this.m11, this.m12, this.m13, this.m14,
            this.m21, this.m22, this.m23, this.m24,
            this.m31, this.m32, this.m33, this.m34,
            this.tx, this.ty, this.tz, this.tw
        ];
        let index = 0;
        return {
            next() {
                return {
                    done: index === values.length,
                    value: values[index++]
                };
            }
        };
    }
}
export default Matrix4;
