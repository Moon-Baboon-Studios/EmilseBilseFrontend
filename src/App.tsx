import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import RegisterPage from './pages/registerPage/registerPage';
import LoginPage from './pages/LoginPage/loginPage';
import Navbar from './components/shared/navbar/Navbar';
import TestPage from './pages/test/testPage';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';
import LobbyPage from './pages/lobbyPage/lobbyPage';
import GameboardPage from './pages/gameboardPage/gameboardPage';
import PageNotFound from './pages/pageNotFound/pageNotFound';
import LoggedInBar from './components/shared/loggedInBar/LoggedInBar';
import FriendsPage from './pages/friendsPage/friendsPage';
import FriendRequestPage from './pages/friendRequestPage/friendRequestPage';
import AddFriendPage from './pages/addFriendPage/addFriendPage';
import TilesForYouPage from './pages/tilesPages/tilesForYouPage/tilesForYouPage';
import TilesMadeByYouPage from './pages/tilesPages/tilesMadeByYouPage/tilesMadeByYouPage';
import AboutUsPage from './pages/aboutUsPage/aboutUsPage';
import TilepackCreatorPage from './pages/tilesPages/tilepackCreatorPage/tilepackCreatorPage';
import NewTilepackCreatorPage from './pages/tilesPages/tilepackCreatorPage/NewTilepackCreatorPage/newTilepackCreatorPage';
import Popup from './components/shared/popups/popup';
import MobileNav from './components/shared/navbar/mobileNavbar/mobileNav';
import Winnerscreen from './components/gameBoard/winnerscreen/winnerscreen';
import LandscapeOrientation from './components/shared/orientation/landscapeOrientation/landscapeOrientation';
import PortraitOrientation from './components/shared/orientation/potraitOrientation/portraitOrientation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51Lf0qhHlPakEYz1FbXf2tOuCqoV5jPQcIoPASo8amOG1px2sOMObFsPGFhfDPaZZ5tT2RcjCBQZtgrN63khxdS8P00HCW9k4rl');

function App() {

  const { userStore, popupStore, mobileStore, themeStore, stripeStore} = useStore();
  const [showPortraitError, setShowPortraitError] = useState(false);
  const [showLandscapeError, setShowLandscapeError] = useState(false);

  const apperance = {
    theme: "stripe",

    variables: {
      fontFamily: "caviar-dreams",
      colorPrimary: "var(--color-textSecondary)",
      colorBackground: "var(--color-background)",
      colorText: "var(--color-text)",
      colorDanger: "#ff0000",
      borderRadius: "5px",

    },
    
    rules: {
      '.tab': {
        background: 'var(--color-input-background)',
        color: 'var(--color-text)',
        border: '1px solid var(--color-input-border)',
        backdropFilter: 'blur(5px)',
        transition: 'box-shadow 0.2s ease-in-out',
      },

      '.tab:hover': {
        boxShadow: 'var(--color-highlighthover) 0 0 0 2px inset', 
      },

      '.tab:active': {
        boxShadow: 'var(--color-highlighthover) 0 0 0 2px inset',
      }
    }
  }

  const options = {
    // passing the client secret obtained from the server
    clientSecret: stripeStore.clientSecret,
    fonts: [
      {
        cssSrc: 'https://allfont.net/cache/css/caviar-dreams.css',
      },
    ],
    apperance: apperance,
  };

  const routes = [
    { path: "/", element: <LandingPage />, isLandscape: false },
    { path: "/register", element: <RegisterPage />, isLandscape: false },
    { path: "/login", element: <LoginPage />, isLandscape: false },
    { path: "/lobby/:pin", element: <LobbyPage />, isLandscape: false },
    { path: "/game/:id", element: <GameboardPage />, isLandscape: true },
    { path: "/user/friendlist/:id", element: <FriendsPage />, isLandscape: false },
    { path: "/test", element: <Elements stripe={stripePromise} options={options}><TestPage /></Elements>, isLandscape: false },
    { path: "/user/addfriend/", element: <AddFriendPage />, isLandscape: false },
    { path: "/user/friendRequests", element: <FriendRequestPage />, isLandscape: false },
    { path: "/user/tiles/:id", element: <TilesForYouPage />, isLandscape: false },
    { path: "/user/tilesby/:id", element: <TilesMadeByYouPage />, isLandscape: false },
    { path: "/admin/tilepackcreator", element: <TilepackCreatorPage />, isLandscape: false },
    { path: "/admin/tilepackcreator/addnew/", element: <NewTilepackCreatorPage />, isLandscape: false },
    { path: "/admin/tilepackcreator/edit/:id", element: <NewTilepackCreatorPage />, isLandscape: false },
    { path: "/AboutUs", element: <AboutUsPage />, isLandscape: false },
    { path: "/game/won/:id", element: <Winnerscreen />, isLandscape: false },
    { path: "*", element: <PageNotFound />, isLandscape: false }
  ];


  useEffect(() => {
    userStore.getLogged()
    if (window.screen.availWidth < 768) {
      mobileStore.setIsMobile(true);
    } else {
      mobileStore.setIsMobile(false);
    }
    themeStore.setTheme();


    let r = routes.find(r => r.path.toLowerCase() === window.location.pathname.toLowerCase());

    if (mobileStore.isMobile) {
      if (r?.isLandscape === true && window.screen.orientation.type === "portrait-primary") {
        setShowLandscapeError(true);
      }
      else if (r?.isLandscape === false && window.screen.orientation.type === "landscape-primary") {
        setShowPortraitError(true);
      }
      else {
        setShowLandscapeError(false);
        setShowPortraitError(false);
      }
    }
  }, [])

  useEffect(() => {

    window.screen.orientation.addEventListener('change', () => {
      let r = routes.find(r => r.path.toLowerCase() === window.location.pathname.toLowerCase());
      
      if (r?.isLandscape === true && window.screen.orientation.type === "portrait-primary") {
        setShowLandscapeError(true);
      }
      else if (r?.isLandscape === false && window.screen.orientation.type === "landscape-primary") {
        setShowPortraitError(true);
      }
      else {
        setShowLandscapeError(false);
        setShowPortraitError(false);
      }

    })
  })

  return (
    <>
      {showLandscapeError && <LandscapeOrientation />}
      {showPortraitError && <PortraitOrientation />}
      <div className="App">
        {popupStore.isShown && <Popup isConfirmation={popupStore.isConfirmation} title={popupStore.title} errorMessage={popupStore.errorMessage} handleClose={popupStore.onCancel} handleConfirm={popupStore.onConfirm} />}
        <Router>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={
                <>
                  {!mobileStore.isMobile &&
                    <>
                      <Navbar />
                      <div style={{ "zIndex": "2", "height": "70px", "width": "100%", "backgroundColor": "var(--color-foreground)" }}></div>
                    </>
                  }
                  <div style={{ "display": "flex", "flexDirection": "row", "flex": "1", "overflow": "hidden", "position": "relative" }}>
                    {userStore.user !== undefined && !mobileStore.isMobile && <LoggedInBar />}
                    {route.element}
                  </div>
                  {mobileStore.isMobile && <MobileNav />}
                </>
              } />
            ))}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default observer(App);
