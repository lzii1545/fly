/**
 * 兑换卡密生成
 * Author：Yui
 * Create time：2022年8月13日
 * Modified on：2022年8月13日
 */
import { config } from "../config/config";
import { exec, sql } from 'mysqls';
import { LOGGER } from './logger';

interface KeyDate {
    e_code: string,
    e_info: string,
    e_endTime: string,
    e_startTime: string,
    e_cid: number,
    e_msg: string,
    update_datetime: Date
}

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
    /**
     * 生成卡密
     * @param num 生成key的数量
     * @param info key奖励的物品id和数量
     * @param endTime key失效时间
     * @param cid 生成者id
     * @param msg 备注
     * @returns 生成的key list
     */
    CreateExchangeCode: function (num: number, info: string, endTime: string, cid: number, msg: string) {
        let keyList = this.KeyRandomWithNum(10);
        let startTime = new Date().getTime().toString();
        let data: KeyDate[] = [];
        keyList.forEach(item => {
            data.push({
                e_code: item,
                e_info: info,
                e_endTime: endTime,
                e_startTime: startTime,
                e_cid: cid,
                e_msg: msg,
                update_datetime: new Date(),
            })
        })
        this.SaveKeyToMySQL(data);
        return data
    },
    /**
     * 将生成的key保存到数据库
     * @param data 生成的key list
     */
    SaveKeyToMySQL: function (data: KeyDate[]) {
        const sqlStr = sql.table('exchange_code').data(data).insert().toString();
        exec(sqlStr).then(res => {
            LOGGER.Log(JSON.stringify(res))
        }).catch(err => {
            LOGGER.Log(err)
        })
    }
} 