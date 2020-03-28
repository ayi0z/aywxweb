import React, { useState, useEffect } from 'react'
import { Tabs, ActivityIndicator } from 'antd-mobile'
import api from '../utils/api'
import Fetch from '../utils/fetch'
import './Player.css'
import Screen from './Screen'

const tabs = (collectList) => {
    return collectList.map((c, index) => {
        return ({
            title: <div key={c.cid}
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                    lineHeight: '18px',
                }}>
                <div style={{ fontSize: '12px' }}>{c.name}</div>
                <div style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>{c.note}</div>
            </div>
        })
    })
}

const Dl = (props) => {
    const { dllist, onPlay, currentdl } = props
    return (
        <div className="dlContainer">
            {
                dllist.map((c, index) => {
                    return <button key={index} className="dl" style={currentdl.id === c.id ? { backgroundColor: '#78c1e0' } : null} onClick={() => onPlay && onPlay(c)}>{c.title}</button>
                })
            }
        </div >
    )
}

const Player = (props) => {
    const { videoid } = props
    const [collectList, setCollectList] = useState([])
    const [currentCid, setCurrentCid] = useState(0)
    const [dlList, setDlList] = useState([])
    const [currentDl, setCurrentDl] = useState(0)

    useEffect(() => {
        if (videoid) {
            Fetch.get(`${api.col}/${videoid}`)
                .then(data => {
                    setCollectList(data)
                    setCurrentCid(data && data[0].cid)
                })
        }
    }, [videoid])

    useEffect(() => {
        if (currentCid && videoid) {
            Fetch.get(`${api.dl}/${videoid}/${currentCid}`)
                .then(data => {
                    setDlList(data)
                })
        }
    }, [videoid, currentCid])

    const onTabChange = (tab, index) => {
        setCurrentCid(tab.title.key)
        setDlList([])
    }

    const onPlay = (dl) => setCurrentDl(dl)

    const onSwitchDl = dl => setCurrentDl(dl)

    return (
        <div className="player">
            <Screen currentdl={currentDl}
                playlist={dlList}
                switchdl={onSwitchDl} />
            <Tabs tabs={tabs(collectList)} onChange={onTabChange}>
                {
                    (!dlList || !dlList.length) 
                    ? (<ActivityIndicator size="large" />)
                    : (<Dl dllist={[...dlList].sort(() => (-1))} currentdl={currentDl} onPlay={onPlay} />)
                }
            </Tabs>
        </div>
    )
}

export default Player