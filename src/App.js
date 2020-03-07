import React, { useState, useEffect } from 'react'
import { TabBar } from 'antd-mobile'
import api from './utils/api'
import Fetch from './utils/fetch'
import './App.css'
import film from './assets/film.svg'
import film2 from './assets/film2.svg'
import play from './assets/play.svg'
import play2 from './assets/play2.svg'
import about from './assets/about.svg'
import about2 from './assets/about2.svg'
import Qrcode from './components/Qrcode'
import About from './components/About'
import Player from './components/Player'
import Intro from './components/Intro'

const code = () => {
  let patter = window.location.pathname.match(/^\/p\/[A-Za-z0-9]+$/gi)
  return patter && patter[0] && patter[0].replace('/p/', '')
}

const Main = (props) => {
  const { playcode } = props
  const [selectedTab, setSelectedTab] = useState('play')
  const [videoId, setVideoId] = useState(0)

  useEffect(() => {
    Fetch.get(`${api.video}/${playcode}`)
      .then(data => {
        document.title = (data && data.name) || 'ymlshow'
        setVideoId(data && data.id)
      })
  }, [playcode])

  if (videoId) {
    return (<TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      prerenderingSiblingsNumber={0}>
      <TabBar.Item
        title="播放"
        key="play"
        icon={{ uri: play }}
        selectedIcon={{ uri: play2 }}
        selected={selectedTab === 'play'}
        onPress={() => { setSelectedTab('play') }}
      >
        <Player videoid={videoId} />
      </TabBar.Item>
      <TabBar.Item
        title="简介"
        key="film"
        icon={{ uri: film }}
        selectedIcon={{ uri: film2 }}
        selected={selectedTab === 'film'}
        onPress={() => { setSelectedTab('film') }}
      >
        <Intro videoid={videoId} />
      </TabBar.Item>
      <TabBar.Item
        title="声明"
        key="about"
        icon={{ uri: about }}
        selectedIcon={{ uri: about2 }}
        selected={selectedTab === 'about'}
        onPress={() => { setSelectedTab('about') }}
      >
        <About />
      </TabBar.Item>
    </TabBar >)
  }
  return (<Qrcode />)
}

const App = (props) => {
  const playcode = code()
  return (
    <div className="App">
      <Main playcode={playcode} />
    </div>
  );
}

export default App;
