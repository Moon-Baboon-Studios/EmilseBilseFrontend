import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../../stores/store';
import Icon from '../../shared/icon/Icon';
import InvertedCornerQ1 from '../../shared/invertedCorners/invertedCornerQ1';
import './gameSettings.scss'

const GameSettings = () => {
    const { lobbyStore } = useStore();
    const [isShown, setIsShown] = useState(false);
    const [restIsShown, setRestIsShown] = useState(false);
    const [generalSettingsShown, setGeneralSettingsShown] = useState(false);
    const [tilepackSettingsShown, setTilepackSettingsShown] = useState(false);
    const [testTilePacks, setTestTilePacks] = useState([{
        id: 1,
        name: "test",
        isActivated: false
    },
    {
        id: 2,
        name: "test2",
        isActivated: false
    }])

    const handleSettingsClicked = () => {
        setIsShown(true);
        setTimeout(() => {
            setRestIsShown(true);
        }, 200);
    }

    const handleGeneralSettingsClick = () => {
        setGeneralSettingsShown(!generalSettingsShown);
    }

    const handleTilepackSettingsClick = () => {
        setTilepackSettingsShown(true);
    }

    const handleCancelClick = () => {
        setRestIsShown(false);
        setIsShown(false);
    }

    const handleSaveClick = () => {
        setRestIsShown(false);
        setIsShown(false);
    }


    const toggleTilepack = (id: number) => {
        const newTilePacks = testTilePacks.map(tilePack => {
            if (tilePack.id === id) {
                tilePack.isActivated = !tilePack.isActivated;
            }
            return tilePack;
        })
        setTestTilePacks(newTilePacks);
    }




    return (
        <>
            <div className={`LoggedInBar-Container ${isShown ? 'shown' : ''}`}>
                <div className={`LoggedInBar-Wrapper ${isShown ? '' : ''}`} onClick={handleSettingsClicked}>
                    <div className={`LoggedInBar-ComponentTitle ${isShown ? 'shown' : ''} ${isShown ? 'activated' : ''}`}>
                        <div className='LoggedInBar-ComponentTitleIcon'><Icon name="settings" /></div>
                        <div className='LoggedInBar-ComponentTitleText shown'>Game settings</div>
                    </div>
                </div>

                {restIsShown && <>
                    <div className={`LoggedInBar-Wrapper ${isShown ? 'asdasdasd ' : ''}`} onClick={handleTilepackSettingsClick}>
                        <div className={`LoggedInBar-ComponentTitle ${isShown ? 'shown' : ''} ${tilepackSettingsShown ? 'activated' : ''}`}>
                            <div className='LoggedInBar-ComponentTitleIcon'><Icon name="settings" /></div>
                            <div className='LoggedInBar-ComponentTitleText shown'>Tile packs</div>
                        </div>
                        <div className={`LoggedInBar-ComponentContainer ${tilepackSettingsShown ? 'asdasd' : ''}`}>
                            {
                                <>
                                    {testTilePacks.map((tilePack) => {
                                        return (
                                            <div className={`GameSettings_TilePackComponentContainer ${tilePack.isActivated ? 'GameSettings_TilepackActivated' : ''}`} onClick={() => { toggleTilepack(tilePack.id); console.log(tilePack.isActivated) }}>
                                                <div className='GameSettings_TilePackText'>{tilePack.name}</div>
                                                {tilePack.isActivated &&
                                                    <div className='GameSettings_TilePackIcon'>
                                                        <Icon name="check_circle" />
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}
                                </>
                            }
                        </div>
                    </div>
                </>
                }

                <div className='GameSettings_ButtonContainer'>
                    {restIsShown &&
                        <>
                            <div className='GameSettings_Button cancel' onClick={handleCancelClick}>
                                Cancel
                            </div>
                            <div className='GameSettings_Button save' onClick={handleSaveClick}>
                                Save
                            </div>
                        </>
                    }
                </div>
            </div >
            <InvertedCornerQ1 />
            {isShown &&
                <div className='GameSettings_CloseContainer'></div>
            }
        </>
    )
}

export default observer(GameSettings)