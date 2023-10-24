import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const baseUrl = 'https://ya-praktikum.tech/api/v2'

export const useAuthUser = () => {
  const configAxios: AxiosRequestConfig = {
    url: `${baseUrl}/auth/user`,
    method: 'GET',
    responseType: 'json',
  }

  configAxios.withCredentials = true
  const checkIsAuth = async () =>
    // eslint-disable-next-line no-return-await
    await axios(configAxios)
      .then((res: AxiosResponse) => {
        sessionStorage.setItem('auth', 'true')
        console.log(res, 'authtrue')
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      })
  return checkIsAuth
}

export const useLoginUser = () => {
  const login = async (data: { login: string; password: string }) => {
    const configAxios: AxiosRequestConfig = {
      url: `${baseUrl}/auth/signin`,
      method: 'POST',
      data,
      responseType: 'json',
    }

    configAxios.withCredentials = true

    const result = axios(configAxios)
      // eslint-disable-next-line consistent-return
      .then((res: AxiosResponse) => {
        console.log(res.status === 200)
        if (res.status === 200) {
          sessionStorage.setItem('auth', 'true')
          return true
        }
      })
      .catch(err => {
        console.log(err)
        return false
      })
    return result || false
  }
  return login
}

export const useLogoutUser = () => {
  const logout = async () => {
    const configAxios: AxiosRequestConfig = {
      url: `${baseUrl}/auth/logout`,
      method: 'POST',
      responseType: 'json',
    }

    configAxios.withCredentials = true

    const result = axios(configAxios)
      // eslint-disable-next-line consistent-return
      .then((res: AxiosResponse) => {
        console.log(res)
        if (res.status === 200) {
          sessionStorage.setItem('auth', 'false')
          return true
        }
      })
      .catch(err => {
        console.log(err)
        return false
      })
    return result || false
  }
  return logout
}
