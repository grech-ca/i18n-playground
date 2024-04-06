import {Fragment} from 'react'

import Link from 'next/link'

import {supportedPackages} from 'common/data'

export const Hero = () => {
  return (
    <div className="mb-6 grid gap-y-5 text-center text-white">
      <h1 className="text-4xl font-medium md:text-5xl">🌍 i18n Playground</h1>
      <p className="text-xl">
        <span>Debug</span>{' '}
        {supportedPackages.map(({name, url}, index, array) => (
          <Fragment key={name}>
            <Link
              href={url}
              className="relative inline-block transition-transform after:absolute after:inset-x-0 after:top-[95%] after:h-0.5 after:bg-white active:scale-95"
              target="_blank"
            >
              {name}
            </Link>
            {index < array.length - 1 && ', '}
          </Fragment>
        ))}
      </p>
    </div>
  )
}
