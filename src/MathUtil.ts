
/**
 * 限制角度到 -pi —— pi
 *
 * @export
 * @param {number} theta
 * @returns {number}
 */
export function wrapPi(theta: number): number {
  theta += Math.PI
  theta -= Math.floor(theta * 1 / 2 / Math.PI) * 2 * Math.PI
  theta -= Math.PI
  return theta
}

/**
 * 安全 acos
 *
 * @export
 * @param {number} x
 * @returns {number}
 */
export function safeAcos(x: number): number {
  if(x >= 1) {
    return 0
  }
  if(x <= -1) {
    return Math.PI
  }
  return Math.acos(x)
}