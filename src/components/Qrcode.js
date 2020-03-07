import React from 'react'
import './Qrcode.css'

const Qrcode = (props) => {
    return (
        <div className="qrcode-container">
            <img className="qrcode" width="100%" height="100%" src={`${process.env.PUBLIC_URL}/ymlshow_qrcode.jpg`} alt='微信公众号：ymlshow' />
            <p className="text">扫码关注微信公众号</p>
            <p className="text">获取更多影视资讯</p>
        </div>
    )
}

export default Qrcode