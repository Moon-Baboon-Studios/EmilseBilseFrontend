import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/shared/loader/loader';

import { useStore } from '../../stores/store';
import './landingPage.scss'

const LandingPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [hasPin, setHasPin] = useState(false);
    const [pinValue, setPinValue] = useState('');
    const navigate = useNavigate();
    /**
     * Example of how to use the store context
     */
    const { userStore, gameStore } = useStore();

    useEffect(() => {
        setLoaded(true);
        console.log('====================================');
        console.log(`${process.env.NODE_ENV}`);
        console.log('====================================');
    }, []);

    const handlePinChange = (e: any) => {
        setPinValue(e.target.value);
    }

    const checkPinLength = () => {
        setHasPin(pinValue.length > 0);
    }

    const handleJoinClick = async () => {
        if (userStore.user === undefined) {
            navigate('/login');
        }
        else {
            await gameStore.createHubConnection();
            await gameStore.joinLobby(userStore.user!.id, pinValue,
                () => { navigate('/lobby') });
        }
        return
    }

    const handleHostClick = async () => {
        if (userStore.user === undefined) {
            navigate('/login');
        } else {
            await gameStore.createHubConnection();
            await gameStore.createLobby(userStore.user.id,
                () => { navigate('/lobby') });
        }
        return
    }

    return (
        <>
            {!loaded ? <Loader /> :
                <div className='LandingPage-Container '>
                    <img src='https://github.githubassets.com/images/modules/site/codespaces/glow.png' alt={"glow img"}></img>
                    <div className='LandingPage-Wrapper'>
                        <div className='LandingPage-JoinWrapper'>
                            <div className='LandingPage-JoinLabel'>
                                Join Room
                            </div>
                            <div className={`LandingPage-JoinInput ${hasPin ? "active" : ""}`} >
                                <input type="text" placeholder='Pin Code' maxLength={5} onChange={(e) => handlePinChange(e)} onKeyUp={() => checkPinLength()} />
                            </div>
                            <div className='LandingPage-JoinButton' onClick={() => handleJoinClick()}>Join</div>
                        </div>
                        <div className='LandingPage-CreateRoom' onClick={() => handleHostClick()}>
                            Create Room
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default observer(LandingPage)