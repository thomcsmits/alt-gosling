import React, { useEffect, useRef, useState } from 'react'
import gosling, { GoslingComponent } from 'gosling.js'
import './Demo.css'
import { bar } from './examples/bar';

function Demo() {

  const [goslingSpec, setGoslingSpec] = useState<gosling.GoslingSpec>();
  const gosRef = useRef<gosling.GoslingRef>(null);
  
  useEffect(() => {
    setGoslingSpec(bar)
  }, []);

  return (
    <>
      <div className='demo'>
        {goslingSpec ? 
          <GoslingComponent spec={goslingSpec} /> 
          : null}
      </div>
    </>
  )
}

export default Demo
