import { ChangeEvent, FormEvent, useState } from 'react'
import { IFormProps, IStringObject } from './../interfaces/'

import { isEmpty } from '../utils/utils'

export const useForm = ({ name, email, password }: IFormProps) => {
  const [values, setValues] = useState({ name, email, password })
  const [touched, setTouched] = useState<IStringObject>({})

  const validate = (values) => {
    const errors: IStringObject = {}
    if (!email) {
      errors.email = 'Email is required'
    }
    if (!values.password) {
      errors.password = 'Password is required'
    }

    return errors
  }

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target

    const value = event.target.value
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const errors = validate ? validate(values) : {}
  const valid = isEmpty(errors)

  const handleSubmit = (onSubmit) => {
    return (event: FormEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (valid) {
        onSubmit(values, event)
      }
    }
  }

  return {
    values,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    valid,
    touched,
  }
}
