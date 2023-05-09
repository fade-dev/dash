import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import DashNav from '@components/DashNav'
import secure from '@util/secure'
import Guilds from '@components/Guilds'
import botOwners from '@util/bot-owners'

const StatusChanger = () => {
  const [selectedGuild, setSelectedGuild] = useState()
  const [statuses, setStatuses] = useState([])
  const fetchRef = useRef(false)

  useEffect(() => {
    if (!fetchRef.current) {
      fetchRef.current = true
      fetchStatuses()
    }
  }, [selectedGuild, fetchStatuses]) // Include fetchStatuses in the dependency array

 const fetchStatuses = async () => {
    const { data } = await axios({
      url: '/api/statuses',
      method: 'GET',
    }).catch((err) => {
      console.error(err)
    })


    setStatuses(
      data.statuses.map((status) => {
        status.duration = secondsToMinutesAndSeconds(parseInt(status.duration))
        return status
      })
    )
  }

  const secondsToMinutesAndSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds

    return `${minutes}:${formattedSeconds}`
  }

  const minutesAndSecondsToSeconds = (timeString) => {
    const [minutesString, secondsString] = timeString.split(':')
    const minutes = parseInt(minutesString)
    const seconds = parseInt(secondsString)

    return minutes * 60 + seconds
  }

  const addStatus = () => {
    setStatuses([
      ...statuses,
      {
        text: '',
        duration: '00:00',
        activityType: 'Playing',
      },
    ])
  }

  const saveStatus = (index) => {
    const status = statuses[index]

    let url = '/api/statuses'
    url += `?text=${status.text}`
    url += `&duration=${minutesAndSecondsToSeconds(status.duration)}`
    url += `&activityType=${status.activityType}`

    if (status._id) {
      url += `&id=${status._id}`
    }

    axios({
      url,
      method: 'POST',
    }).catch((err) => {
      console.error(err)
    })
  }

  const updateStatus = (index, key, value) => {
    setStatuses(
      statuses.map((status, i) => {
        if (index === i) {
          status[key] = value
        }

        return status
      })
    )
  }

  const deleteStatus = (index) => {
    if (
      confirm(
        'Are you sure you want to delete this status? This cannot be undone.'
      )
    ) {
      const removedStatus = statuses[index]

      setStatuses(statuses.filter((_, i) => index !== i))

      if (removedStatus._id) {
        axios({
          url: `/api/statuses?id=${removedStatus._id}`,
          method: 'DELETE',
        }).catch((err) => {
          console.error(err)
        })
      }
    }
  }

  return (
    <div className="h-screen text-white md:flex">
      <DashNav />

      <Guilds selectedGuild={selectedGuild} setSelectedGuild={setSelectedGuild}>
        <div className="p-6 w-full grid auto-rows-min gap-1">
          <div className="w-full grid gap-1 mb-4">
            <div className="text-2xl font-semibold">Auto Status Changer</div>

            <div className="font-semibold text-zinc-500">
              Automatically change bot status
            </div>
          </div>

          <div className="grid gap-4">
            <button
              className="md:w-44 px-4 py-2 rounded-md font-semibold h-11 bg-blue-500"
              onClick={addStatus}
            >
              Add Status
            </button>

            <div className="grid gap-6">
              {statuses.map((status, index) => (
                <div
                  key={`statuses-${index}`}
                  className="p-4 bg-nav border border-zinc-700 rounded-md gap-4 grid md:flex"
                >
                  <div>
                    <div className="font-semibold text-gray-400">Durartion</div>

                    <input
                      value={status.duration}
                      onChange={(event) =>
                        updateStatus(index, 'duration', event.target.value)
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="md:w-2/4">
                    <div className="font-semibold text-gray-400">
                      Status Text
                    </div>

                    <input
                      value={status.text}
                      onChange={(event) =>
                        updateStatus(index, 'text', event.target.value)
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="font-semibold text-gray-400">
                      Activity Type
                    </div>

                    <select
                      className="w-full"
                      value={status.activityType}
                      onChange={(event) =>
                        updateStatus(index, 'activityType', event.target.value)
                      }
                    >
                      <option value="">Select a Type...</option>

                      {[
                        'Competing',
                        'Playing',
                        'Custom',
                        'Streaming',
                        'Listening',
                        'Watching',
                      ].map((type) => (
                        <option key={`status-type-${type}`} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="h-11 mt-auto px-9 bg-transparent border border-red-500 rounded-md"
                    onClick={() => deleteStatus(index)}
                  >
                    Delete
                  </button>

                  <button
                    className="h-11 mt-auto px-9 bg-blue-500 rounded-md"
                    onClick={() => saveStatus(index)}
                  >
                    Save Status
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Guilds>
    </div>
  )
}

export default StatusChanger

export async function getServerSideProps(context) {
  return secure(context, ({ session }) => {
    if (!botOwners.includes(session.user.email)) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }

    return {
      props: { session },
    }
  })
}
