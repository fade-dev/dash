import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import commonStrings from '@util/common-strings'

const allowedServers = ['Worn Off Keys', 'WOK Testing']
const cachedGuildsKey = 'cached-guilds'
const selectedGuildKey = 'guild'

const Guilds = ({ children, selectedGuild, setSelectedGuild }) => {
  const session = useSession()
  const [guilds, setGuilds] = useState([])
  const fetchRef = useRef(false)

  useEffect(() => {
    if (!fetchRef.current) {
      fetchRef.current = true

      const guild = localStorage.getItem(selectedGuildKey)
      if (guild) {
        setSelectedGuild(JSON.parse(guild))
      }

      fetchUserGuilds()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(selectedGuildKey, JSON.stringify(selectedGuild))
  }, [selectedGuild])

  const fetchUserGuilds = async () => {
    const cachedGuilds = localStorage.getItem(cachedGuildsKey)
    if (cachedGuilds) {
      setGuilds(JSON.parse(cachedGuilds))
    }

    const result = await axios({
      url: 'https://discord.com/api/v10/users/@me/guilds',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.data.accessToken}`,
      },
    }).catch((err) => {
      console.error(err)
    })

    if (!result) {
      return
    }

    const guilds = result.data.filter(
      (guild) => guild.owner && allowedServers.includes(guild.name)
    )

    const matchingGuilds = await fetchMatchingBotGuilds(guilds)

    localStorage.setItem(cachedGuildsKey, JSON.stringify(matchingGuilds))
    setGuilds(matchingGuilds)
  }

  const fetchMatchingBotGuilds = async (guilds) => {
    const guildIds = guilds.map((guild) => guild.id)

    const result = await axios({
      url: `/api/guilds-with-bot?ids=${guildIds}`,
      method: 'GET',
    }).catch((err) => {
      console.error(err)
    })

    if (!result) {
      return
    }

    return guilds.filter(({ id }) => result.data.includes(id))
  }

  if (selectedGuild) {
    return (
      <div className="overflow-x-auto w-full">
        <div className="mt-4 w-full px-6 md:px-0 md:w-40 md:absolute top-4 right-7">
          <button
            className="w-full h-11 bg-transparent border border-zinc-700 rounded-md"
            onClick={() => {
              setSelectedGuild(null)
              localStorage.removeItem(selectedGuildKey)
            }}
          >
            Change Guild
          </button>
        </div>

        {children}
      </div>
    )
  }

  return (
    <div className="p-6 w-full grid auto-rows-min gap-1">
      <div className="w-full flex">
        <div>
          <div className="text-2xl font-semibold">Servers</div>
          <div className="font-semibold text-zinc-500">
            These are the servers you have access to:
          </div>
        </div>

        <div className="hidden md:flex ml-auto">
          <a
            href={commonStrings.inviteUrl}
            target="_blank"
            className="px-4 py-2 bg-blue-500 rounded-md font-semibold h-11"
          >
            Invite Another Server
          </a>
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        {guilds.map((guild) => {
          const { id, icon, name } = guild
          const letters = name.match(/\b[A-Z]/g).join('')

          return (
            <div key={id} className="grid place-items-center cursor-pointer">
              {icon ? (
                <img
                  src={`https://cdn.discordapp.com/icons/${id}/${icon}`}
                  className="rounded-full"
                  title={name}
                  onClick={setSelectedGuild.bind(null, guild)}
                  width={80}
                  height={80}
                  alt={name}
                />
              ) : (
                <div
                  className="rounded-full bg-gray-800 w-20 h-20 grid place-items-center text-2xl"
                  title={name}
                  onClick={setSelectedGuild.bind(null, guild)}
                >
                  {letters}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Guilds
