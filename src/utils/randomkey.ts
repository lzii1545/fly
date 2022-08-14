/**
 * 兑换卡密生成
 * Author：Yui
 * Create time：2022年8月13日
 * Modified on：2022年8月13日
 */
import { config } from "../config/config";

export const R_KEY = {
    /**
     * 生成随机的key
     * @returns key
     */
    KeyRandom: function (): string {
        let key = config.KEY_START_BY;
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        for (let i = 0; i < config.KEY_LEN; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key
    },
    /**
     * 生成指定数量的key
     * @param num 生成数量
     * @returns key
     */
    KeyRandomWithNum: function (num: number): string[] {
        let KeyList = [];
        for (let i = 0; i < num; i++) {
            KeyList.push(this.KeyRandom());
        }
        return KeyList
    },
    
} 