'use client'

import { useState, useMemo } from 'react'
import { createTranslator } from 'use-intl/core';

const HomePage = () => {
  const [template, setTemplate] = useState('')
  const [value, setValue] = useState('')

  return (
    <div className="">
      <label>
        <span>Template</span>
        <input value={template} onChange={e => setTemplate(e.target.value)} />
      </label>
      <label>
        <span>Value</span>
        <input />
      </label>
    </div>
  )
}

export default HomePage
