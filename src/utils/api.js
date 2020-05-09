const domain = {
    danmaku: process.env.REACT_APP_DANMU,
    API_DOMIN: process.env.REACT_APP_API_DOMIN,
    Img_DOMIM: process.env.REACT_APP_IMG_DOMIM
}

export default {
    video: '/p/video',
    col: '/p/col',
    intro: '/p/intro',
    dl: '/p/dl',
    banner: '/p/banner',
    view_video: '/p/view/v',
    view_videocollect: '/p/view/vc',
    ...domain
}
