import { ValidateParam, ValidateData } from '@/libs/interface'

export const emailValidator = (param: ValidateParam): ValidateData => {
  const key = param.key
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(param.value)) {
    return {
      key,
      type: 'invalidEmail',
      status: false,
      message: '이메일 형식이 올바르지 않습니다. 다시 입력해주세요.',
    }
  }
  return {
    key,
    type: 'invalidEmail',
    status: true,
  }
}

export const passwordSecurityValidator = (
  param: ValidateParam
): ValidateData => {
  const key = param.key
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
      param.value
    )
  ) {
    return {
      key,
      type: 'weekPassword',
      status: true,
    }
  }
  return {
    key,
    type: 'weekPassword',
    status: false,
    message: '총 8자 이상, 영문/숫자/특수문자 중 2가지 이상 입력해주세요.',
  }
}

export const passwordConfirmValidator = (
  param: ValidateParam
): ValidateData => {
  const key = param.key
  return {
    key,
    type: 'passwordConfirmFailed',
    status: true,
  }
}

export const phoneNumberValidator = (param: ValidateParam): ValidateData => {
  const key = param.key
  return {
    key,
    type: 'invalidPhoneNumber',
    status: true,
  }
}
