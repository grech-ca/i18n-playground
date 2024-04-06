import {Fragment} from 'react'

import {Popover, Transition} from '@headlessui/react'
import {MdOutlineSettings} from 'react-icons/md'

import {useSettingsStore} from 'common/hooks'

import {IconButton} from 'common/IconButton'
import {Checkbox} from 'common/Checkbox'

export const SettingsButton = () => {
  const settings = useSettingsStore()

  return (
    <Popover className="relative">
      {({open}) => (
        <Fragment>
          <Popover.Button as={IconButton} icon={MdOutlineSettings} />

          <Transition
            as={Fragment}
            show={open}
            enter="transition-all origin-top-right"
            enterFrom="scale-50 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition-opacity duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel
              static
              className="absolute right-0 top-12 grid w-80 content-start gap-y-2 rounded-lg bg-white p-3 shadow-lg shadow-black/5"
            >
              <label className="text-gray-600">Settings</label>
              <Checkbox
                onChange={settings.toggleWhitespacePreservation}
                checked={settings.isWhitespacePreservationEnabled}
                label="Enable whitespace preservation"
              />
            </Popover.Panel>
          </Transition>
        </Fragment>
      )}
    </Popover>
  )
}
