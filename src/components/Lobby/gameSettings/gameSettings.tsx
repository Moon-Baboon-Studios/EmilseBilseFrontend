import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../../stores/store';
import Icon from '../../shared/icon/Icon';
import InvertedCornerQ1 from '../../shared/invertedCorners/invertedCornerQ1';
import './gameSettings.scss'
import {TilePack, TilePackSetting} from "../../../models/tile/tileInterface";

const GameSettings = (GSCom:GameSettingCom) => {
    const {tileStore, popupStore } = useStore();
    const [isShown, setIsShown] = useState(false);
    const [restIsShown, setRestIsShown] = useState(false);
    const [gamemodeSettingsShown, setGamemodeSettingsShown] = useState(false);
    const [tilepackSettingsShown, setTilepackSettingsShown] = useState(false);

    const initTilePacks = async () => {
        GSCom.setTilePacks([])
        let tpList = await tileStore.getOwnedTilePack()
        let tpSetList:TilePackSetting[] = []

        tpList.forEach((tom)=>{
            let tpSetting: TilePackSetting = {isActivated: false, tilePack: tom}
            tpSetList.push(tpSetting)
        })

        GSCom.setTilePacks(tpSetList)
    }

    useEffect(()=>{
        initTilePacks()
    },[])

    const handleSettingsClicked = () => {
        setIsShown(true);
        setTimeout(() => {
            setRestIsShown(true);
        }, 200);
    }

    const handleGamemodeSettingsClick = () => {
        setGamemodeSettingsShown(true);
        setTilepackSettingsShown(false);
    }

    const handleTilepackSettingsClick = () => {
        setTilepackSettingsShown(true);
        setGamemodeSettingsShown(false);
    }

    const handleCancelClick = () => {
        setRestIsShown(false);
        setIsShown(false);
    }

    const handleSaveClick = () => {
        setRestIsShown(false);
        setIsShown(false);
    }

    const handleOnClickBackground = () => {
        popupStore.showConfirmation("Are you sure?", "If you leave without saving, your changes wont be saved. ", handleCancelClick, ()=>{handleSaveClick})
    }


    const toggleTilepack = (id: string) => {
        const newTilePacks = GSCom.tilePacks.map(tilePack => {
            if (tilePack.tilePack.id === id) {
                tilePack.isActivated = !tilePack.isActivated;
            }
            return tilePack;
        })
        GSCom.setTilePacks(newTilePacks);
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
                    <div className={`LoggedInBar-Wrapper ${gamemodeSettingsShown ? 'asdasdasd ' : ''}`} onClick={handleGamemodeSettingsClick}>
                        <div className={`LoggedInBar-ComponentTitle ${isShown ? 'shown' : ''} ${gamemodeSettingsShown ? 'activated' : ''}`}>
                            <div className='LoggedInBar-ComponentTitleIcon'><Icon name="gamemodes" /></div>
                            <div className='LoggedInBar-ComponentTitleText shown'>Gamemodes</div>
                        </div>
                        <div className={`LoggedInBar-ComponentContainer ${gamemodeSettingsShown ? 'asdasd' : ''}`}>
                            {
                                <>
                                    {GSCom.tilePacks.map((tilePack) => {
                                        return (
                                            <div className={`GameSettings_TilePackComponentContainer ${tilePack.isActivated ? 'GameSettings_TilepackActivated' : ''}`} onClick={() => { toggleTilepack(tilePack.tilePack.id!); console.log(tilePack.isActivated) }}>
                                                <div className='GameSettings_TilePackText'>{tilePack.tilePack.name}</div>
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
                    <div className={`LoggedInBar-Wrapper ${tilepackSettingsShown ? 'asdasdasd ' : ''}`} onClick={handleTilepackSettingsClick}>
                        <div className={`LoggedInBar-ComponentTitle ${isShown ? 'shown' : ''} ${tilepackSettingsShown ? 'activated' : ''}`}>
                            <div className='LoggedInBar-ComponentTitleIcon'><Icon name="tilepack_creator" /></div>
                            <div className='LoggedInBar-ComponentTitleText shown'>Tile packs</div>
                        </div>
                        <div className={`LoggedInBar-ComponentContainer ${tilepackSettingsShown ? 'asdasd' : ''}`}>
                            {
                                <>
                                    {GSCom.tilePacks.map((tilePack) => {
                                        return (
                                            <div className={`GameSettings_TilePackComponentContainer ${tilePack.isActivated ? 'GameSettings_TilepackActivated' : ''}`} onClick={() => { toggleTilepack(tilePack.tilePack.id!); console.log(tilePack.isActivated) }}>
                                                <div className='GameSettings_TilePackText'>{tilePack.tilePack.name}</div>
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
                <div className='GameSettings_CloseContainer' onClick={handleOnClickBackground}></div>
            }
        </>
    )
}

export default observer(GameSettings)

interface GameSettingCom {
    tilePacks: TilePackSetting[]
    setTilePacks: (tps:TilePackSetting[])=>void
}