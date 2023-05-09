import { useEffect, useRef, useState } from 'react'

import DashNav from '@components/DashNav'
import secure from '@util/secure'
import Guilds from '@components/Guilds'
import axios from 'axios'

function ButtonRoles() {
  const [channels, setChannels] = useState([])
  const [selectedGuild, setSelectedGuild] = useState(null)

}

const ButtonRoles = () => {
  const [selectedGuild, setSelectedGuild] = useState()
  const [availableChannels, setAvailableChannels] = useState([])
  const [channel, setChannel] = useState()
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('Random')
  const [buttons, setButtons] = useState([])
  const [roles, setRoles] = useState([])
  const [startingValues, setStartingValues] = useState([])
  const fetchChannelRef = useRef(false)

  
  useEffect(() => {
    if (selectedGuild) {
      fetchChannels()
    }
  }, [selectedGuild, fetchChannels])
}

  const fetchChannels = async () => {
    const result = await axios({
      url: `/api/button-roles?guildId=${selectedGuild.id}`,
      method: 'GET',
    }).catch((err) => {
      console.error(err)
    })

    if (!result) {
      return
    }

    const { data } = result

    setAvailableChannels(data.textChannels)
    setChannel(data.channelId)
    setMessage(data.text)
    setColor(data.hexColor)
    setButtons(
      data.buttons.map((button) => {
        button.link = button.link || ''
        return button
      })
    )
    setRoles(data.roles)
    setStartingValues([
      data.channelId,
      data.text,
      data.hexColor,
      JSON.stringify(data.buttons),
    ])
  }

  const updateMessage = () => {
    const roleIds = []

    for (const button of buttons) {
      if (roleIds.includes(button.roleId)) {
        alert('You cannot have two buttons with the same role!')
        return
      }

      roleIds.push(button.roleId)
    }

    const data = {
      guildId: selectedGuild.id,
      channelId: channel,
      text: message,
      hexColor: color,
      buttons,
    }

    axios({
      url: '/api/button-roles',
      method: 'POST',
      data,
    }).catch((err) => {
      console.error(err)
    })
  }

  const addButton = () => {
    setButtons([
      ...buttons,
      {
        buttonEmoji: '',
        buttonText: '',
        buttonStyle: '',
        roleId: '',
        link: '',
      },
    ])
  }

  const deleteButton = (index) => {
    if (
      confirm(
        'Are you sure you want to delete this button? This cannot be undone.'
      )
    ) {
      setButtons(buttons.filter((_, i) => index !== i))
    }
  }

  const updateButton = (index, key, value) => {
    setButtons(
      buttons.map((button, i) => {
        if (index === i) {
          button[key] = value
        }

        return button
      })
    )
  }

  const hasChanged =
    startingValues.length > 0 &&
    (startingValues[0] !== channel ||
      startingValues[1] !== message ||
      startingValues[2] !== color ||
      startingValues[3] !== JSON.stringify(buttons))

  return (
    <div className="h-screen text-white md:flex">
      <DashNav />

      <Guilds selectedGuild={selectedGuild} setSelectedGuild={setSelectedGuild}>
        <div className="p-6 w-full grid auto-rows-min gap-1">
          <div className="w-full grid gap-1 mb-4">
            <div className="text-2xl font-semibold">Button Roles</div>

            <div className="font-semibold text-zinc-500">
              Roles to be set via buttons
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <div className="font-semibold text-gray-400">Channel</div>

              <select
                value={channel}
                onChange={(event) => setChannel(event.target.value)}
                className="w-full md:w-96"
              >
                <option value="">Select a Channel...</option>
                {availableChannels.length > 0 ? (
                  availableChannels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      #{channel.name}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </select>
            </div>

            <div>
              <div className="font-semibold text-gray-400">Message</div>

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="w-full md:w-96 max-h-32 resize"
              />
            </div>

            <div>
              <div className="font-semibold text-gray-400">Hex Color</div>

              <input
                value={color}
                onChange={(event) => setColor(event.target.value)}
                className="w-full md:w-96"
              />
            </div>

            <button
              className={`md:w-96 px-4 py-2 rounded-md font-semibold h-11 ${
                hasChanged ? 'bg-blue-500' : 'bg-nav'
              }`}
              disabled={!hasChanged}
              title={
                hasChanged
                  ? 'Click to update message!'
                  : 'The channel, text, or color has not changed'
              }
              onClick={updateMessage}
            >
              {startingValues && startingValues[0] ? 'Update' : 'Send'} Message
            </button>

            <div>
              <div className="font-semibold text-gray-400">Buttons</div>

              <button
                className="w-full md:w-96 px-4 py-2 rounded-md font-semibold h-11 bg-blue-500"
                onClick={addButton}
              >
                Add Another Button
              </button>
            </div>

            <div className="grid gap-6">
              {buttons.map((button, index) => (
                <div
                  key={`button-${index}`}
                  className="p-4 bg-nav border border-zinc-700 rounded-md gap-4 grid md:flex"
                >
                  <div>
                    <div>Emoji</div>

                    <input
                      className="w-full"
                      value={button.buttonEmoji}
                      onChange={(event) =>
                        updateButton(index, 'buttonEmoji', event.target.value)
                      }
                    />
                  </div>

                  <div>
                    <div>Button Text</div>

                    <input
                      className="w-full"
                      value={button.buttonText}
                      onChange={(event) =>
                        updateButton(index, 'buttonText', event.target.value)
                      }
                    />
                  </div>

                  <div>
                    {button.buttonStyle === 'Link' ? (
                      <div>
                        <div>Link URL</div>

                        <input
                          className="w-full"
                          value={button.link}
                          onChange={(event) =>
                            updateButton(index, 'link', event.target.value)
                          }
                        />
                      </div>
                    ) : (
                      <div>
                        <div>Role</div>

                        <select
                          className="w-full"
                          value={button.roleId}
                          onChange={(event) =>
                            updateButton(index, 'roleId', event.target.value)
                          }
                        >
                          <option value="">Select a Role...</option>

                          {roles.map((role) => (
                            <option key={`role-${role.id}`} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <div>Button Style</div>

                    <select
                      className="w-full"
                      value={button.buttonStyle}
                      onChange={(event) =>
                        updateButton(index, 'buttonStyle', event.target.value)
                      }
                    >
                      <option value="">Select a Style...</option>

                      {[
                        'Primary',
                        'Secondary',
                        'Success',
                        'Danger',
                        'Link',
                      ].map((style) => (
                        <option key={`button-style-${style}`} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="h-11 mt-auto px-9 bg-transparent border border-red-500 rounded-md"
                    onClick={() => deleteButton(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Guilds>
    </div>
  )


export default ButtonRoles

export async function getServerSideProps(context) {
  return secure(context, ({ session }) => {
    return {
      props: { session },
    }
  })
}
