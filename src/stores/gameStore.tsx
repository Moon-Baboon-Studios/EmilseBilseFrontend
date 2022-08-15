import { observable, makeAutoObservable, runInAction, toJS, action } from "mobx";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { GameRoom, Lobby, CloseLobbyDto, LeaveLobbyDto } from "../models/game/gameInterfaces";
import { UserDTO, SimpleUser } from "../models/user/userInterface";
import { useNavigate } from 'react-router-dom';

export default class GameStore {
    @observable gameRoom: GameRoom | undefined;
    @observable lobby: Lobby | undefined;
    @observable tiles: any[] = [{ id: 1, action: 'test action', to: 'test to', by: 'test by', shown: false }]
    @observable players: any[] = [{ username: 'Test', nickname: 'Hovedskovasddasdas' }]
    @observable lobbyPlayers: SimpleUser[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = async () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_GAME_SOCKET !== undefined ? process.env.REACT_APP_GAME_SOCKET : "http://localhost:5121/")
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        await this.hubConnection.start()
            .then(result => console.log("connected"))
            .catch(error => {
                console.log(error)
            });

        this.hubConnection.on('server_StartGame', (game) => {
            runInAction(() => {
                this.gameRoom = game;
            });
        });

        this.hubConnection.on('server_JoinLobby', (lobby) => {
            runInAction(() => {
                this.lobby = lobby;
            });
        });

        this.hubConnection.on('lobbyPlayerListUpdate', (players: SimpleUser[]) => {
            runInAction(() => {
                this.lobbyPlayers = players;
            });
        })

        this.hubConnection.on('lobbyClosed', () => {
            runInAction(async () => {
                this.lobby = undefined;
                console.log('lobby is Closed');
                return;
            });
        });
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => { });
    }

    createLobby = async (userId: string, func: Function) => {
        this.hubConnection?.invoke('CreateLobby', userId);
        this.hubConnection?.on('receiveLobby', async (lobby) => {
            runInAction(async () => {
                this.lobby = await lobby;
                func()
            });
        });
    }

    startGame = async (user: UserDTO) => {
        if (this.lobby?.host.id !== user.id) { return }
        this.hubConnection?.invoke('client_StartGame')
        return true;
    }

    joinLobby = async (userId: string, lobbyPin: string, func: Function) => {
        this.hubConnection?.invoke('JoinLobby', userId, lobbyPin)
        this.hubConnection?.on('receiveLobby', async (lobby: Lobby) => {
            this.lobby = await lobby;
            func();
        });
        return true;
    }

    closeLobby = async (lobbyId: string, hostId: string) => {
        let cl: CloseLobbyDto = { lobbyID: lobbyId, hostID: hostId }
        this.hubConnection?.invoke('CloseLobby', cl)
        return true;
    }

    kickPlayer = async (userId: string) => {
        console.log(userId);
        return true;
    }

    leaveLobby = async (lobbyId: string, userId: string) => {
        let ll: LeaveLobbyDto = { lobbyID: lobbyId, userID: userId }
        this.hubConnection?.invoke('LeaveLobby', ll)
        return true;
    }

}
