import { Toast } from 'antd-mobile'
import api from './api'

const CodeMap = {
    200: '成功',
    404: '未发现资源',
}

const get = (url) => {
    if (!url) {
        console.error('Lost fetch url')
        return
    }
    // Toast.loading('Loading....', 0)
    return fetch(`${api.API_DOMIN}${url}`, {
        headers: {
            'content-type': 'application/json'
        },
        mode: 'cors'
    }).then(res => {
        Toast.hide()
        if (res.ok) {
            return res.json()
        }
    }).then(json => {
        if (json.code === 200) {
            return json.data
        }
        Toast.fail(CodeMap[json.code])
    }).catch(error => {
        console.error(error);
        Toast.offline('远程连接失联了。')
    })
}

export default { get, CodeMap }