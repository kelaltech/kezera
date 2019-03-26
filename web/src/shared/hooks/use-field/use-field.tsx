import React, { Ref, useRef, useState } from 'react'
import useLocale from '../use-locale/use-locale'

type UseFieldConfig = {
  initialValue?: string
  validation?: RegExp | [RegExp, string?] | (() => Promise<boolean | string | void>)

  /**
   * @default: true
   */
  validateOnBlur?: boolean
  /**
   * @default: false
   */
  validateOnChange?: boolean

  active?: boolean
}

type UseFieldResponse<T> = {
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

  config: UseFieldConfig
}

function useField<T = HTMLInputElement>(
  config: UseFieldConfig = {}
): UseFieldResponse<T> {
  const { t } = useLocale()

  const defaultError = t`validation-failed`

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
        error = (e && e.message) || defaultError
      }
      if (typeof response === 'boolean') {
        passed = true
      } else {
        passed = false
        error = response == undefined ? defaultError : response
      }
    } else if (Array.isArray(config.validation) && config.validation.length === 2) {
      passed = !!value.match(config.validation[0])
      error = config.validation[1] == undefined ? defaultError : config.validation[1]
    } else {
      passed = !!value.match(config.validation as RegExp)
      error = defaultError
    }

    setError(passed ? null : error)
    return passed
  }

  const setValueWithValidation = async (
    newValue?: string,
    runValidation?: boolean
  ): Promise<void> => {
    if (newValue == undefined) return
    setValue(newValue)
    if (runValidation) await validate(newValue)
  }

  return {
    ref,

    value: value,
    setValue: setValueWithValidation,
    onBlur: async (
      e: React.FormEvent<T>,
      runValidation = config.validateOnBlur || true
    ) => setValueWithValidation((e.target as any).value, runValidation),
    onChange: async (
      e: React.FormEvent<T>,
      runValidation = config.validateOnChange || false
    ) => setValueWithValidation((e.target as any).value, runValidation),

    validate,

    error,
    setError,

    active,
    setActive,

    config
  }
}

export default useField
