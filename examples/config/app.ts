import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123


axios({
  method: 'post',
  url: '/config/post',
  headers: {
    test: '321'
  },
  data: qs.stringify({
    a: 2
  })
}).then(res => {
  console.log(res.data)
})
