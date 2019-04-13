import React from 'react'
import './progress-bar.scss'
interface IProgressBar {
  width: string
  height: string
  color: string
  fontSize: string
}

export function ProgressBar(props: IProgressBar) {
  return (
    <div className={'progressContainer'}>
      <div
        className="center progress percentage"
        style={{
          width: props.width,
          height: props.height,
          backgroundColor: props.color,
          fontSize: props.fontSize
        }}
      >
        {props.width}
      </div>
    </div>
  )
}
