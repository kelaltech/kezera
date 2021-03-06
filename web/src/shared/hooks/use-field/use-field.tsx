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

  setValueHook?: (value: string) => Promise<void | string>
  validateHook?: (
    value: string,
    passed: boolean,
    error: string | null,
    validation?:
      | RegExp
      | [RegExp, string?]
      | ((value: string) => Promise<boolean | string | void>)
  ) => Promise<void | [boolean, string]>

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
  setValue: (value: string, runValidation?: boolean) => void

  onBlur: (event: any, runValidation?: boolean) => void
  onChange: (event: any, runValidation?: boolean) => void

  validate: (value: string) => Promise<boolean>

  error: string | null
  setError?: (error: string | null) => void

  active: boolean
  setActive: (active: boolean) => void

  config: UseFieldConfig

  inputProps: {
    value: string
    onBlur: (event: any, runValidation?: boolean) => void
    onChange: (event: any, runValidation?: boolean) => void
    readOnly: boolean
  }

  textAreaProps: {
    // todo: may not be working.. updating the state
    children: string
    onBlur: (event: any, runValidation?: boolean) => void
    onChange: (event: any, runValidation?: boolean) => void
    readOnly: boolean
  }
}

function useField<T>(
  config: UseFieldConfig = {},
  validationDependencies: DependencyList = [],
  initialValueDependencies: DependencyList = []
): UseFieldResponse<T> {
  const { t } = useLocale()

  const defaultError = t`validation-failed`

  const ref = useRef<T | null>(null)

  const [value, setValueOnState] = useState(config.initialValue || '')
  const [error, setError] = useState<string | null>(null)
  const [active, setActive] = useState(config.active !== undefined ? config.active : true)

  useEffect(() => {
    setValueOnState(config.initialValue || '')
  }, initialValueDependencies)

  const validate = async (value: string): Promise<boolean> => {
    let passed = true
    let error: string | null = null

    const maxLength =
      config.maxLength === undefined
        ? null
        : Array.isArray(config.maxLength) &&
          config.maxLength.length === 2 &&
          config.maxLength[0] != undefined
        ? config.maxLength[0]
        : config.maxLength

    const minLength =
      config.minLength === undefined
        ? null
        : Array.isArray(config.minLength) &&
          config.minLength.length === 2 &&
          config.minLength[0] != undefined
        ? config.minLength[0]
        : config.minLength

    if (
      (config.validation === undefined &&
        config.maxLength === undefined &&
        config.minLength === undefined) ||
      (config.optional === true && !value)
    ) {
      passed = true
    } else if (maxLength !== null && value.length > maxLength) {
      passed = false
      error =
        (Array.isArray(config.maxLength) &&
          config.maxLength.length === 2 &&
          config.maxLength[1]) ||
        defaultError
    } else if (minLength !== null && value.length < minLength) {
      passed = false
      error =
        (Array.isArray(config.minLength) &&
          config.minLength.length === 2 &&
          config.minLength[1]) ||
        defaultError
    } else if (typeof config.validation === 'function') {
      let response: boolean | string | void
      try {
        response = await config.validation(value)
      } catch (e) {
        passed = false
        error = (e && e.message) || defaultError
      }
      if (typeof response === 'boolean') {
        passed = response
        error = defaultError
      } else {
        passed = false
        error = response == undefined ? defaultError : response
      }
    } else if (Array.isArray(config.validation) && config.validation.length === 2) {
      passed =
        config.validation[0] !== undefined ? !!value.match(config.validation[0]) : passed
      error = config.validation[1] !== undefined ? config.validation[1] : defaultError
    } else {
      passed = !!value.match(config.validation as RegExp)
      error = defaultError
    }

    if (config.validateHook) {
      const response = await config.validateHook(value, passed, error, config.validation)
      if (Array.isArray(response) && response.length === 2) {
        passed = response[0] !== undefined ? response[0] : passed
        error = response[1] !== undefined ? response[1] : defaultError
      }
    }

    setError(passed ? null : error)
    return passed
  }

  const setValueWithValidation = async (
    newValue?: string,
    runValidation?: boolean
  ): Promise<void> => {
    if (newValue == undefined) return

    if (config.setValueHook) {
      const response = await config.setValueHook(newValue)
      if (typeof response === 'string') newValue = response
    }

    setValueOnState(newValue)
    if (runValidation) await validate(newValue)
  }

  const handleSet = (
    value: string,
    runValidation = config.validateOnBlur || true
  ): void => {
    setValueOnState(value)
    setValueWithValidation(value, runValidation).catch(setError)
  }
  const handleSetFromEvent = (
    event: any,
    runValidation = config.validateOnBlur || true
  ): void => {
    handleSet(event.target.value, runValidation)
  }

  useEffect(() => {
    if (config.validateOnInit) validate(value).catch(console.error)
  }, [])

  useEffect(() => {
    if (
      config.validateOnUpdate ||
      (config.validateOnUpdate !== false &&
        (config.validateOnInit || validationDependencies.length))
    )
      validate(value).catch(console.error)
    else if (config.validateOnInit || validationDependencies.length)
      config.validateOnUpdate = true
  }, validationDependencies)

  return {
    ref,

    value,
    setValue: handleSet,

    onBlur: handleSetFromEvent,
    onChange: handleSetFromEvent,

    validate,

    error,
    setError,

    active,
    setActive,

    config,

    // shortcuts
    inputProps: {
      value,
      onBlur: handleSetFromEvent,
      onChange: handleSetFromEvent,
      readOnly: !active
    },
    textAreaProps: {
      children: value,
      onBlur: handleSetFromEvent,
      onChange: handleSetFromEvent,
      readOnly: !active
    }
  }
}

export default useField
