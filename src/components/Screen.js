import React, { useState, useEffect, useRef } from 'react'
import Hls from 'hls.js'
import 'dplayer/dist/DPlayer.min.css'
import DPlayer from 'dplayer'
import api from '../utils/api'
import Fetch from '../utils/fetch'
import { Carousel } from 'antd-mobile'

const Screen = props => {
    const { currentdl, playlist, switchdl, reportview } = props
    const [bannerList, setBannerList] = useState([])
    const bannerHeight = 180

    const refHandler = useRef()
    useEffect(() => {
        if (refHandler.current && currentdl) {
            const dpp = new DPlayer({
                container: refHandler.current,
                theme: '#FADFA3',
                lang: 'zh-cn',
                autoplay: true,
                screenshot: true,
                hotkey: true,
                preload: 'auto',
                volume: 0.7,
                mutex: true,
                video: {
                    url: currentdl.url,
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
                    id: currentdl.id,
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
            dpp.on('timeupdate', () => {
                if (dpp.video.currentTime > 5 && dpp.video.currentTime < 6) {
                    reportview(currentdl.vid, currentdl.cid)
                }
            })
            if (playlist) {
                dpp.on('ended', () => {
                    const currentIdx = playlist.findIndex(c => c.id === currentdl.id)
                    const nextdl = playlist[currentIdx + 1]
                    if (nextdl) {
                        dpp.notice(`即将播放 ${nextdl.title}`)
                        if (switchdl) switchdl(nextdl)
                    } else {
                        dpp.notice('播放结束')
                    }
                })
            }

            return () => { dpp.destroy() }
        }
    }, [currentdl])

    useEffect(() => {
        Fetch.get(api.banner)
            .then(data => {
                data = data.sort((a, b) => (a.sort - b.sort))
                setBannerList(data)
            })
    }, [])

    if (!currentdl && !currentdl.url) {
        return (<Carousel
            autoplay={true}
            infinite={true}
            dots={true} >
            {
                bannerList.map((b, i) => {

                    if (!b.href || b.href.trim() === '#') {
                        return (<img key={i} src={b.src}
                            alt={b.alt}
                            style={{ display: 'inline-block', width: '100%', verticalAlign: 'top', height: bannerHeight }}
                        />)
                    } else {
                        return (
                            <a key={i} href={b.href || '#'}
                                style={{ display: 'inline-block', width: '100%', height: bannerHeight }}
                            ><img src={b.src}
                                alt={b.alt}
                                style={{ width: '100%', verticalAlign: 'top' }}
                                />
                            </a>
                        )

                    }
                })
            }
        </Carousel>)
    }

    return (<div
        ref={refHandler}
        style={{
            width: '100%',
            minHeight: bannerHeight,
        }}></div>)
}

export default Screen