
import { useStore } from '../../../stores/store';
import Icon from '../../shared/icon/Icon'
import './userComponent.scss'

const UserComponent = (user: any) => {

    const { gameStore } = useStore();

    const kickPlayer = () => {
        gameStore.kickPlayer(user.user.id);
    }

    return (
        <div className='UserComponent-Container'>
            <div className='UserComponent-ImageContainer'>
                <img src={user.user.profilePicture !== undefined ? user.user.profilePicture : 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'} alt="PB" />
            </div>
            <div className='UserComponent-KickContainer' onClick={() => kickPlayer()}><Icon name="cross" /></div>
            <div className='UserComponent-UserDetails'>
                <div className='UserComponent-UserNickName'>
                    {user.user.nickname}
                </div>
                <div className='UserComponent-UserUsername'>
                    {user.user.username}
                </div>
            </div>
        </div>
    )
}

export default UserComponent