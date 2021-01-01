import { ChangeEvent, FormEvent, useState } from 'react'

import { isEmpty } from '../utils/utils'

interface IFormProps {
  email?: string
  password?: string
}

export const useForm = <T>({ initialValues }: T) => {
  const [values, setValues] = useState<T>(initialValues)
  const [touched, setTouched] = useState({})

  const validate = (values: IFormProps) => {
    const errors: IFormProps = {}
    if (!values.email) {
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
    return (event: FormEvent<HTMLFormElement>) => {
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
