"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 限制角度到 -pi —— pi
 *
 * @export
 * @param {number} theta
 * @returns {number}
 */
function wrapPi(theta) {
    theta += Math.PI;
    theta -= Math.floor(theta * 1 / 2 / Math.PI) * 2 * Math.PI;
    theta -= Math.PI;
    return theta;
}
exports.wrapPi = wrapPi;
/**
 * 安全 acos
 *
 * @export
 * @param {number} x
 * @returns {number}
 */
function safeAcos(x) {
    if (x >= 1) {
        return 0;
    }
    if (x <= -1) {
        return Math.PI;
    }
    return Math.acos(x);
}
exports.safeAcos = safeAcos;
