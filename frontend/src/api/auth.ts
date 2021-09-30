import http from '@/api/http'
import { AxiosResponse } from 'axios'

export function login(email: string, password: string): Promise<AxiosResponse> {
  return http.post('account/login/', {
    email: email,
    password: password,
  })
}

export function register(
  name: string,
  email: string,
  password1: string,
  password2: string,
  phoneNumber: string,
  nickName: string
): Promise<AxiosResponse> {
  return http.post('account/register/', {
    username: name,
    email: email,
    password1: password1,
    password2: password2,
    phone_number: phoneNumber,
    nickname: nickName,
  })
}

export function resetPassword(email: string): Promise<AxiosResponse> {
  return http.post('account/password/reset/', { email: email })
}

export function resetPasswordConfirm(
  uid: string,
  token: string,
  password1: string,
  password2: string
): Promise<AxiosResponse> {
  return http.post('account/password/reset/confirm/', {
    uid: uid,
    token: token,
    new_password1: password1,
    new_password2: password2,
  })
}
