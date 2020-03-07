import React, { useState, useEffect } from 'react'
import './Intro.css'
import api from '../utils/api'
import Fetch from '../utils/fetch'

const Intro = (props) => {
    const { videoid } = props
    const [video, setVideo] = useState({})

    useEffect(() => {
        Fetch.get(`${api.intro}/${videoid}`)
            .then(data => {
                setVideo(data)
            })
    }, [videoid])

    return (
        <div className="intro-container">
            <div className="base">
                <div className="img">
                    <img alt={video.name} src={video.pic} />
                </div>
                <div style={{ boxShadow: 'none' }}>
                    <h4>{video.name}</h4>
                    <em />
                    <p>{video.type}</p>
                    <p>{video.lang}</p>
                    <p>{video.area}</p>
                    <p>{video.year}</p>
                </div>
            </div>
            <div className="text">
                导演
                <em />
                {video.director}
            </div>
            <div className="text">
                演员
                <em />
                {video.actor}
            </div>
            <div className="text">
                简介
                <em />
                {video.des}
            </div>
            <div className="text" style={{ color: '#b97e7e' }}>注：本站数据均采集自互联网，不保证准确性。</div>
        </div>
    )
}

export default Intro