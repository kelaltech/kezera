import React, { useState } from 'react'

import './side-nav.scss'
import { Button } from 'gerami'

function Sidenav(props:any) {
  const [wide, setWide] = useState(true)



  return(
    <div>
      <div className={'drawer-container'} >
        <div className={'small-nav'}/>
        <div style={{
          width: wide?'78%':'0%'
        }} className={`${wide?'wide-nav':'min-nav'}`}>
          Drawer
        </div>
        <span  className={'open-close'} onClick={()=> setWide(!wide)} >
          >>
        </span>
      </div>
    </div>
  )
}

export default Sidenav;
