"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 欧拉角类
 * heading-picth-bank
 *
 * @class EulerAngles
 */
var EulerAngles = /** @class */ (function () {
    function EulerAngles(heading, picth, bank) {
        this.heading = 0;
        this.picth = 0;
        this.bank = 0;
        this.heading = heading;
        this.picth = picth;
        this.bank = bank;
    }
    return EulerAngles;
}());
exports.default = EulerAngles;
