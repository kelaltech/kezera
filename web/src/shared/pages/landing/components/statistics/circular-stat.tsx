import React from 'react'
import './circular-stat.scss'

interface ICircularStat {
  count: string
  title: string
  className?: string
}

function CircularStat(props: ICircularStat) {
  const { className, count, title } = props
  return (
    <div className={`stat-card-container ${className ? className : ''}`}>
      <div className={'stat-count-cont'}>
        <h2>{count}</h2>
      </div>
      <div className={'stat-title'}>{title}</div>
    </div>
  )
}

export default CircularStat
