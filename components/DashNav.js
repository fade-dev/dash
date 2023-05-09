import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'

const links = [
  {
    name: 'Button Roles',
    url: '/dashboard/button-roles',
    icon: '/button-roles.png',
  },
  {
    name: 'Status Changer',
    url: '/dashboard/status-changer',
    icon: '/status-changer.png',
  },
]

const DashNav = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const currentPage = router.pathname.split('/dashboard/')[1]

  return (
    <header className="relative bg-nav md:h-full md:w-20 md:border-r-2 md:border-zinc-700 text-white py-2">
      <div className="container mx-auto flex items-center justify-between">
        <nav className="hidden md:grid justify-items-center w-full gap-6 mt-4">
          {links.map(({ name, url, jsx, icon }) => {
            if (url) {
              return (
                <div
                  key={name}
                  className="w-full h-10 grid place-items-center relative"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{
                      backgroundColor: url.endsWith(currentPage)
                        ? '#4A82EF'
                        : 'transparent',
                    }}
                  />

                  <Link href={url} title={name}>
                    <Image src={icon} width={24} height={24} alt={name} />
                  </Link>
                </div>
              )
            }

            return jsx
          })}
        </nav>

        <button
          className="flex flex-col md:hidden gap-1 p-2 ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-1 bg-white rounded-md"></div>
          <div className="w-6 h-1 bg-white rounded-md"></div>
          <div className="w-6 h-1 bg-white rounded-md"></div>
        </button>

        <nav
          className={`bg-nav w-full p-4 absolute top-12 left-0 ${
            isOpen ? 'flex md:hidden' : 'hidden'
          }`}
        >
          <div className="flex flex-col gap-1 w-full">
            {links.map(({ name, url, jsx }) => {
              if (url) {
                return (
                  <Link
                    key={name}
                    href={url}
                    className="w-full text-lg font-semibold p-2 block"
                  >
                    {name}
                  </Link>
                )
              }

              return jsx
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default DashNav
