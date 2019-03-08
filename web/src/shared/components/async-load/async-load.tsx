import React, { ComponentType } from 'react'
import Loadable, { Options, OptionsWithoutRender } from 'react-loadable'
import { Loading } from 'gerami'

export default function AsyncLoad<Props, Exports extends object>(
  loader: () => Promise<ComponentType<Props> | { default: ComponentType<Props> }>,
  opts?: Options<Props, Exports>
) {
  return Loadable(
    Object.assign(
      {
        loader,
        loading: () => <Loading />,
        delay: 200,
        timeout: 30000
      } as OptionsWithoutRender<Props>,
      opts
    )
  )
}
