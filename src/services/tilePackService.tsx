import http from "../http-common"
import {TilePack } from "../models/tile/tileInterface";
class tilePackService {

    getAll = async () => {
        return await http.get<TilePack[]>("/TilePack")
    }


}
export default new tilePackService();