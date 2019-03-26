import React, { Ref, useRef, useState } from 'react'

type UseFieldConfig = {
  initialValue?: string
  validation?: RegExp | [RegExp, string] | (() => Promise<boolean | string | void>)

  active?: boolean
}

type UseFieldProperties<T> = {
  ref: Ref<T | undefined>

  value: string
  setValue: (value: string, runValidation?: boolean) => Promise<void>
  onBlur: (e: React.FormEvent<T>, runValidation?: boolean) => Promise<void>
  onChange: (e: React.FormEvent<T>, runValidation?: boolean) => Promise<void>

  validate: (value: string) => Promise<boolean>

  error: string | null
  setError?: (error: string | null) => void

  active: boolean
  setActive: (active: boolean) => void
}

function useField<T = HTMLInputElement>(config: UseFieldConfig): [UseFieldProperties<T>] {
  const ref = useRef<T>()

  const [value, setValue] = useState(config.initialValue || '')
  const [error, setError] = useState<string | null>(null)
  const [active, setActive] = useState(config.active || true)

  const validate = async (value: string): Promise<boolean> => {
    let passed = true
    let error: string | null = null

    if (!config.validation) {
      return passed
    } else if (typeof config.validation === 'function') {
      let response: boolean | string | void
      try {
        response = await config.validation()
      } catch (e) {
        passed = false
        error = (e && e.message) || error
      }
      if (typeof response === 'boolean') {
        passed = true
      } else {
        passed = false
        error = response || error
      }
    } else if (Array.isArray(config.validation) && config.validation.length === 2) {
      passed = !!value.match(config.validation[0])
      error = config.validation[1]
    } else {
      passed = !!value.match(config.validation as RegExp)
    }

    setError(error)
    return passed
  }

  const setValueWithValidation = async (
    value: string,
    runValidation?: boolean
  ): Promise<void> => {
    setValue(value)
    if (runValidation) await validate(value)
  }

  return [
    {
      ref,

      value: value,
      setValue: setValueWithValidation,
      onBlur: (e: React.FormEvent<T>, runValidation?: boolean) =>
        setValueWithValidation(value, runValidation),
      onChange: (e: React.FormEvent<T>, runValidation?: boolean) =>
        setValueWithValidation(value, runValidation),

      validate,

      error,
      setError,

      active,
      setActive
    }
  ]
}

export default useField
