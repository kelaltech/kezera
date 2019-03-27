import React, {
  DependencyList,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react'

import useLocale from '../use-locale/use-locale'

type UseFieldConfig = {
  initialValue?: string
  validation?:
    | RegExp
    | [RegExp, string?]
    | ((value: string) => Promise<boolean | string | void>)

  /**
   * @default true
   */
  validateOnBlur?: boolean
  /**
   * @default false
   */
  validateOnChange?: boolean
  /**
   * @default false
   */
  validateOnInit?: boolean
  /**
   * @default config.validateOnInit || deps.length
   */
  validateOnUpdate?: boolean

  /**
   * @default false
   */
  optional?: boolean

  maxLength?: number | [number, string]
  minLength?: number | [number, string]

  /**
   * @default true
   */
  active?: boolean
}

type UseFieldResponse<T> = {
  ref: MutableRefObject<T> | RefObject<T>

  value: string
  setValue: (value: string, runValidation?: boolean) => Promise<void>
  onBlur: (event: any, runValidation?: boolean) => Promise<void>
  onChange: (event: any, runValidation?: boolean) => Promise<void>

  validate: (value: string) => Promise<boolean>

  error: string | null
  setError?: (error: string | null) => void

  active: boolean
  setActive: (active: boolean) => void

  config: UseFieldConfig

  inputProps: {
    value: string
    onBlur: (event: any, runValidation?: boolean) => Promise<void>
    onChange: (event: any, runValidation?: boolean) => Promise<void>
    readOnly: boolean
  }
}

function useField<T>(
  config: UseFieldConfig = {},
  deps: DependencyList = []
): UseFieldResponse<T> {
  const { t } = useLocale()

  const defaultError = t`validation-failed`

  const ref = useRef<T | null>(null)

  const [value, setValue] = useState(config.initialValue || '')
  const [error, setError] = useState<string | null>(null)
  const [active, setActive] = useState(config.active || true)

  const validate = async (value: string): Promise<boolean> => {
    let passed = true
    let error: string | null = null

    if (
      config.maxLength &&
      value.length >
        (Array.isArray(config.maxLength) && config.maxLength.length === 2
          ? config.maxLength[0]
          : config.maxLength)
    ) {
      error =
        Array.isArray(config.maxLength) && config.maxLength.length === 2
          ? config.maxLength[1]
          : error || defaultError
    }

    if (
      config.minLength &&
      value.length <
        (Array.isArray(config.minLength) && config.minLength.length === 2
          ? config.minLength[0]
          : config.minLength)
    ) {
      error =
        Array.isArray(config.minLength) && config.minLength.length === 2
          ? config.minLength[1]
          : error || defaultError
    }

    if (!config.validation || (config.optional === true && !value)) {
      return passed
    } else if (typeof config.validation === 'function') {
      let response: boolean | string | void
      try {
        response = await config.validation(value)
      } catch (e) {
        passed = false
        error = (e && e.message) || error || defaultError
      }
      if (typeof response === 'boolean') {
        passed = response
        error = error || defaultError
      } else {
        passed = false
        error = response == undefined ? error || defaultError : response
      }
    } else if (Array.isArray(config.validation) && config.validation.length === 2) {
      passed = !!value.match(config.validation[0])
      error =
        config.validation[1] == undefined ? error || defaultError : config.validation[1]
    } else {
      passed = !!value.match(config.validation as RegExp)
      error = error || defaultError
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

  const onBlur = async (event: any, runValidation = config.validateOnBlur || true) =>
    setValueWithValidation(event.target.value, runValidation)
  const onChange = async (event: any, runValidation = config.validateOnChange || false) =>
    setValueWithValidation(event.target.value, runValidation)

  useEffect(() => {
    if (config.validateOnInit) validate(value).catch(console.error)
  }, [])

  useEffect(() => {
    if (
      config.validateOnUpdate ||
      (config.validateOnUpdate !== false && (config.validateOnInit || deps.length))
    )
      validate(value).catch(console.error)
    else if (config.validateOnInit || deps.length) config.validateOnUpdate = true
  }, deps)

  return {
    ref,

    value,
    setValue: setValueWithValidation,
    onBlur,
    onChange,

    validate,

    error,
    setError,

    active,
    setActive,

    config,

    // shortcut
    inputProps: {
      value,
      onBlur,
      onChange,
      readOnly: !active
    }
  }
}

export default useField
