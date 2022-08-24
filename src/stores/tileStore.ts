import { action, makeAutoObservable, observable } from "mobx";
import {TileDTO, TileForUser, TileNewFromUser } from "../models/tile/tileInterface";
import tileService from "../services/tileService";

export class TileStore {
    deleteTile(id: string) {
        throw new Error('Method not implemented.');
    }
    @observable tilesAboutUser: TileDTO[] | undefined;
    @observable createdTiles: TileDTO[] | undefined;
    @observable createdtile: TileDTO | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    getTilesAboutUser = async (userId: string) => {
        const response = await (await tileService.getTilesAboutUser(userId));
        this.tilesAboutUser = response.data;
    }
    @action
    getCreatedTiles = async (userId: string) => {
        const response = await tileService.getCreatedTiles(userId);
        this.createdTiles = response.data;
    }

    @action
    createNewTile_User = async (tile: TileNewFromUser) => {
        const response = await tileService.createTile(tile)
        this.createdtile = response.data
        return response;
    }

}