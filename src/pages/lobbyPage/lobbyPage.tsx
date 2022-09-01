import React, { useEffect, useState } from 'react'
import UserComponent from '../../components/Lobby/userComponent/userComponent';
import './lobbyPage.scss'
import { useStore } from '../../stores/store'
import { UserDTO } from '../../models/user/userInterface';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { StartGameDto } from '../../models/game/gameInterfaces';
import { observe } from 'mobx';

const LobbyPage = () => {
    const { gameStore, userStore } = useStore();

    const navigate = useNavigate();

    useEffect(() => {
        listenForGameStarting()
        listenForLobbyClosing()
        return () => {
            if(gameStore.lobby?.id !== undefined){
                if(gameStore.lobby.host === userStore.user!.id){
                    handleCloseLobby()
                }
                else {
                    handleLeaveLobby()
                }
            }
        }
    }, [])

    const listenForGameStarting = async () => {
        await gameStore.gameStarting(() => {
            navigate('/game')
        });
    }

    const listenForLobbyClosing = async () => {
        await gameStore.lobbyClosing(()=>{
            navigate('/')
            return
        })
    }

    const savePinToClipboard = () => {
        navigator.clipboard.writeText(gameStore.lobby!.pin);
    }

    const handleCloseLobby = async () => {
        await gameStore.closeLobby(gameStore.lobby!.id)
    }

    const handleLeaveLobby = async () => {
        await gameStore.leaveLobby(gameStore.lobby!.id)
        navigate('/')
    }

    const handleStartGame = async () => {
        if(gameStore.lobbyPlayers.length >= 2){
            let sg: StartGameDto = {userId: userStore.user!.id, lobbyId: gameStore.lobby!.id}
            await gameStore.startGame(sg, ()=>{
                navigate('/game')
            })
            return
        }

        // TODO error message
        console.log("you need to be at least 2 players to start a game")
    }

    return (
        <div className='Lobby_Container'>
            <div className='Lobby_Wrapper'>
                <div className='Lobby_Title'>
                    Lobby
                </div>
                <div className='Lobby_InputContainer'>
                    <div className='Lobby_PinCode' >
                        <input type="text" placeholder='Pin Code' maxLength={5} readOnly onClick={() => savePinToClipboard()} value={gameStore.lobby?.pin} />
                    </div>
                    <div className='Lobby_ButtonsContainer'>
                        {gameStore.lobby?.host === userStore.user!.id ?
                            <div className='Lobby_StartButton' onClick={handleStartGame}> Start</div> : null}
                        <div className='Lobby_StartButton' onClick={gameStore.lobby?.host === userStore.user?.id ? handleCloseLobby : handleLeaveLobby}>{`${gameStore.lobby?.host === userStore.user?.id ? 'Close Lobby' : 'Leave Lobby'}`}</div>
                    </div>
                </div>
                <div className='Lobby_PlayerContainer'>
                    {gameStore.lobbyPlayers.map((player) => (
                        <UserComponent {...player} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default observer(LobbyPage)