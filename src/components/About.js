import React from 'react'

const About = (props) => {
    return (
        <div className="about" style={{
            height: '100%',
            display: 'flex',
            flexFlow: 'column',
            textAlign: 'center'
        }}>
            <h3>免责声明</h3>
            <p>本站为非赢利性站点。</p>
            <p>本站所有内容均由互联网机器人</p>
            <p>无人值守自动采集，</p>
            <p>本站不保证数据的准确性。</p>
            <p>本站不保存、不复制、不传播、</p>
            <p>不上传、不录制、不提供下载任何视频资源。</p>
            <p>所有内容仅做技术测试使用，</p>
            <p>如有侵权请联系本站做采集屏蔽处理。</p>
            <p>本站不承担任何由于内容的合法性</p>
            <p>及健康性所引起的争议和法律责任。</p>
            <p>我们强烈建议影视爱好者购买正版音像制品！</p>
            <p>欢迎大家对本站内容进行监督。</p>
            <p>联系邮件: conts@foxmail.com</p>
            <p>版本号：v0.1.1 beta</p>
        </div>
    )
}

export default About