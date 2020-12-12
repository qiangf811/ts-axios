import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})


axios.get('/simple/get', {
  params: {
    a: 1,
    b: 2
  }
})

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: string
}


function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res =>res.data)
    .catch(err => console.error(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.age)
  }
}
test()
