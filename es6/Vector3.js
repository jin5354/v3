/**
 * 3D向量类
 *
 * @class Vector3
 */
class Vector3 {
    constructor(x, y, z) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * isEqual 判断两向量是否相等
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {boolean}
     * @memberof Vector3
     */
    static isEqual(a, b) {
        return a.x === b.x && a.y === b.y && a.z === b.z;
    }
    /**
     * negate 求负向量
     *
     * @static
     * @param {Vector3} a
     * @returns {Vector3}
     * @memberof Vector3
     */
    static negate(a) {
        return new Vector3(-a.x, -a.y, -a.z);
    }
    /**
     * plus 向量求和
     *
     * @static
     * @param {...Vector3[]} args
     * @returns {Vector3}
     * @memberof Vector3
     */
    static plus(...args) {
        if (args.length === 2) {
            return new Vector3(args[0].x + args[1].x, args[0].y + args[1].y, args[0].z + args[1].z);
        }
        else {
            let x = args.map((a) => a.x).reduce((a, b) => a + b, 0);
            let y = args.map((a) => a.y).reduce((a, b) => a + b, 0);
            let z = args.map((a) => a.z).reduce((a, b) => a + b, 0);
            return new Vector3(x, y, z);
        }
    }
    /**
     * scalarMultiply 标量乘法
     *
     * @static
     * @param {number} scalar
     * @param {Vector3} a
     * @returns {Vector3}
     * @memberof Vector3
     */
    static scalarMultiply(scalar, a) {
        return new Vector3(scalar * a.x, scalar * a.y, scalar * a.z);
    }
    /**
     * getNorm 向量取模
     *
     * @static
     * @param {Vector3} a
     * @returns {number}
     * @memberof Vector3
     */
    static getNorm(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
    }
    /**
     * getDistance 求两点间距离
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {number}
     * @memberof Vector3
     */
    static getDistance(a, b) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z));
    }
    /**
     * dotProduct 向量点乘
     * 反应两向量相似程度
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {number}
     * @memberof Vector3
     */
    static dotProduct(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    /**
     * getAngle 求两向量夹角
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {number}
     * @memberof Vector3
     */
    static getAngle(a, b) {
        return Math.acos(Vector3.dotProduct(a, b) / (Vector3.getNorm(a) * Vector3.getNorm(b)));
    }
    /**
     * crossProduct 向量叉乘
     * 创建垂直于平面的向量
     *
     * @static
     * @param {Vector3} a
     * @param {Vector3} b
     * @returns {Vector3}
     * @memberof Vector3
     */
    static crossProduct(a, b) {
        return new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }
    /**
     * normalize 向量标准化
     *
     * @memberof Vector3
     */
    normalize() {
        let norm = Vector3.getNorm(this);
        if (norm) {
            this.x = this.x / norm;
            this.y = this.y / norm;
            this.z = this.z / norm;
        }
    }
    [Symbol.iterator]() {
        let values = [this.x, this.y, this.z];
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
export default Vector3;
