import { FC } from 'react'
import * as HIcons from '@heroicons/react/outline'

const DynamicHeroIcon: FC<{icon: string}> = (props) => {
  const {...icons} = HIcons
  // @ts-ignore
  const TheIcon: JSX.Element = icons[props.icon]

  return (
    <>
      {/* @ts-ignore */}
      <TheIcon className='mr-3 flex-shrink-0 h-6 w-6 text-white group-hover:text-white' aria-hidden="true" />
    </>
  )
}

export default DynamicHeroIcon