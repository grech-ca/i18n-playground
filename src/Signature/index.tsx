import Link from 'next/link'

export const Signature = () => {
  return (
    <div className="pb-8 text-center text-lg">
      <span className="text-slate-600">by</span>{' '}
      <Link href="https://grech.dev" className="text-white" target="_blank">
        Mikhail Grechka
      </Link>
    </div>
  )
}
