import axios, { AxiosTranformer } from '../../src/index'
import qs from 'qs'

axios({
  method: 'post',
  url: '/transform/post',
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    axios.defaults.transformRequest as AxiosTranformer
  ],
  transformResponse: [
    axios.defaults.transformRequest as AxiosTranformer,
    function(data) {
      if (typeof data === 'object') {
        data.qiangf = 'qiangf'
      }
    }
  ],
  data: {
    a: 1,
    b: 2
  }
}).then(res=>{
  console.log(res)
})
