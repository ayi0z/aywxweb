import React, { useState, useCallback, useEffect } from 'react'
import Hls from 'hls.js'
import 'dplayer/dist/DPlayer.min.css'
import DPlayer from 'dplayer'
import api from '../utils/api'
import Fetch from '../utils/fetch'
import { Carousel } from 'antd-mobile'

const Screen = props => {
    const { currentdl, playlist, switchdl } = props
    const [currentDl, setCurrentDl] = useState(currentdl)
    const [bannerList, setBannerList] = useState([])

    const bannerHeight = 180

    useEffect(() => {
        setCurrentDl(currentdl)
    }, [currentdl])

    useEffect(() => {
        Fetch.get(api.banner)
            .then(data => {
                data = data.sort((a, b) => (a.sort - b.sort))
                setBannerList(data)
            })
    }, [])

    const refHandler = useCallback(el => {
        if (el && currentDl) {
            const dpp = new DPlayer({
                container: el,
                autoplay: true,
                theme: '#FADFA3',
                lang: 'zh-cn',
                screenshot: true,
                hotkey: true,
                preload: 'auto',
                volume: 0.7,
                mutex: true,
                video: {
                    url: currentDl.url,
                    type: 'customHls',
                    pic: `${process.env.PUBLIC_URL}/screenbg.png`,
                    customType: {
                        customHls: function (video, player) {
                            const hls = new Hls();
                            hls.loadSource(video.src);
                            hls.attachMedia(video);
                        },
                    }
                },
                danmaku: {
                    id: currentDl.id,
                    api: api.danmaku || 'https://dplayer.moerats.com/',
                    maximum: 1000,
                    bottom: '15%',
                    unlimited: true,
                },
            })
            dpp.on('waiting', () => {
                dpp.notice('正在拼命加载, 请稍后...')
            })

            dpp.on('danmaku_send', () => {
                document.activeElement.scrollIntoViewIfNeeded()
            })
            if (playlist) {
                dpp.on('ended', () => {
                    const currentIdx = playlist.findIndex(c => c.id === currentDl.id)
                    const nextdl = playlist[currentIdx + 1]
                    if (nextdl) {
                        dpp.notice(`即将播放 ${nextdl.title}`)
                        setCurrentDl(nextdl)
                        if (switchdl) switchdl(nextdl)
                    } else {
                        dpp.notice('播放结束')
                    }
                })
            }
        }
    }, [currentDl.url])

    if (!currentDl && !currentDl.url) {
        return (<Carousel
            autoplay={true}
            infinite={true}
            dots={true} >
            {
                bannerList.map((b, i) => {
                    return (
                        <a key={i} href={b.href || '#'}
                            style={{ display: 'inline-block', width: '100%', height: bannerHeight }}
                        ><img src={b.src}
                            alt={b.alt}
                            style={{ width: '100%', verticalAlign: 'top' }}
                            />
                        </a>
                    )
                })
            }
        </Carousel>)
    }

    return (<div
        ref={refHandler}
        style={{
            width: '100%',
            height: bannerHeight,
        }}></div>)
}

export default Screen