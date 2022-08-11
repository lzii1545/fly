import { UTILS } from "./utils/utils";
import { LOGGER } from './utils/logger';
import { config } from "./config/config";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "./utils/socket";
import { Server } from "socket.io";

// Socket配置
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

io.on("connection", (socket) => {
    socket.emit("basicEmit", 0, 'all', Buffer.from('Welcome to Fly!'));
});

io.listen(config.SOCKET_PORT);

// console.log(`道历：${UTILS.GetDaoTime()}年`)
// LOGGER.Warn("test")
/**
 * 数据库连接测试代码(暂时不用)
 */
//  import { init, exec, sql, transaction } from 'mysqls'
//  init(config.MYSQL);
// async function ServerInit() {
//     const sqlstr = sql.table('fly_dev_test').select()
//     const result = await exec(sqlstr.toString());
//     LOGGER.Succ(JSON.stringify(result));
// }
// ServerInit()