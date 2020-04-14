const domain = process.env.REACT_APP_ENV === 'development'
    ? {
        danmaku: 'https://dplayer.moerats.com/',
        API_DOMIN: 'http://api.ayioz.co',
        Img_DOMIM: 'http://img.ayioz.com'
    }
    : {
        danmaku: 'https://dplayer.moerats.com/',
        API_DOMIN: 'http://api.ayioz.com',
        Img_DOMIM: 'http://img.ayioz.com'
    }

export default {
    video: '/p/video',
    col: '/p/col',
    intro: '/p/intro',
    dl: '/p/dl',
    banner: '/p/banner',
    ...domain
}
