import React, { useEffect } from 'react'
import useLocale from '../use-locale/use-locale'

type IUseTitleOptions = {
  blurTitle?: string | null
}

function useTitle(title?: string, { blurTitle }: IUseTitleOptions = {}): void {
  const { loaded, t } = useLocale()

  useEffect(() => {
    const backup = document.title

    const onBlur = () => {
      if (blurTitle !== null) document.title = blurTitle || t`default-blur-title`
    }
    const onFocus = () => {
      document.title = title || backup
    }

    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)

    onFocus()

    return () => {
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)

      document.title = backup
    }
  }, [loaded])
}

export default useTitle
