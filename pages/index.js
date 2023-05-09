import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

import Nav from '@components/Nav'
import Footer from '@components/Footer'
import ZPattern from '@components/ZPattern'
import InviteToServer from '@components/InviteToServer'

const Home = () => {
  const [guildCount, setGuildCount] = useState(0)
  const fetchRef = useRef(false)

  useEffect(() => {
    if (!fetchRef.current) {
      fetchRef.current = true

      fetchGuildCount()
    }
  }, [])

  const fetchGuildCount = async () => {
    const { data } = await axios({
      url: '/api/guild-count',
      method: 'GET',
    }).catch((err) => {
      console.error(err)
    })

    setGuildCount(data.amount)
  }

  return (
    <div>
      <Head>
        <title>LUYB Dashboard</title>
      </Head>

      <div className="mx-auto max-w-5xl">
        <Nav />

        <div className="px-4 flex flex-col my-20 gap-y-40">
          {/* Hero section / above the fold */}
          <ZPattern
            imageProps={{
              src: '/placeholder.png',
              width: 283,
              height: 283,
              className: 'order-1 md:order-2 md:ml-auto',
            }}
          >
            <div className="flex flex-col gap-y-8 mt-8 md:mt-0 order-2 md:order-1">
              <h1 className="font-black text-3xl md:text-7xl md:max-w-xl">
                Insert Main Heading Here
              </h1>

              <h2 className="font-semibold text-lg md:text-2xl">
                What the bot offers here
              </h2>

              <InviteToServer />
            </div>
          </ZPattern>

          {/* ZPattern 1 */}
          <ZPattern
            imageProps={{
              src: '/placeholder.png',
              height: 222,
              width: 222,
              className: 'md:ml-auto',
            }}
          >
            <div className="flex flex-col gap-y-8 mb-8">
              <h2 className="font-black text-2xl md:text-4xl">
                Insert Benefit here
              </h2>

              <p className="text-sm md:text-xl font-semibold leading-8 md:max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Tristique senectus et netus et malesuada fames ac turpis.
                Sodales ut etiam sit amet nisl purus in.
              </p>
            </div>
          </ZPattern>

          {/* ZPattern 2 */}
          <ZPattern
            imageProps={{
              src: '/placeholder.png',
              height: 222,
              width: 222,
              className: 'md:order-1',
            }}
          >
            <div className="flex flex-col gap-y-8 mb-8 md:order-2 md:ml-auto">
              <h2 className="font-black text-2xl md:text-4xl">
                Insert Benefit here
              </h2>

              <p className="text-sm md:text-xl font-semibold leading-8 md:max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Tristique senectus et netus et malesuada fames ac turpis.
                Sodales ut etiam sit amet nisl purus in.
              </p>
            </div>
          </ZPattern>

          {/* ZPattern 3 */}
          <ZPattern
            imageProps={{
              src: '/placeholder.png',
              height: 222,
              width: 222,
              className: 'md:ml-auto',
            }}
          >
            <div className="flex flex-col gap-y-8 mb-8">
              <h2 className="font-black text-2xl md:text-4xl">
                Insert Benefit here
              </h2>

              <p className="text-sm md:text-xl font-semibold leading-8 md:max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Tristique senectus et netus et malesuada fames ac turpis.
                Sodales ut etiam sit amet nisl purus in.
              </p>
            </div>
          </ZPattern>

          <div className="text-white text-center flex flex-col gap-y-6">
            {guildCount ? (
              <div className="font-bold text-2xl md:text-4xl">
                {guildCount.toLocaleString()} server owners are using our bot to
                do Y
              </div>
            ) : null}

            <div className="mx-auto">
              <InviteToServer />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
