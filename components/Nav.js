import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const links = [
  {
    name: 'Login',
    jsx: (
      <button
        key="login-button"
        className="bg-nav border border-nav-button py-2 px-5 rounded-md font-semibold cursor-pointer"
        onClick={() =>
          signIn('discord', {
            callbackUrl: '/dashboard',
          })
        }
      >
        Login
      </button>
    ),
  },
]

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-nav md:bg-transparent md:mt-6 relative text-white py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="w-8 h-8 md:w-14 md:h-14">
          <Image
            className="w-full h-full"
            src="/logo.png"
            width={56}
            height={56}
            alt="Logo"
          />
        </Link>

        <nav className="hidden md:flex">
          {links.map(({ name, url, jsx }) => {
            if (url) {
              return (
                <Link
                  key={name}
                  href={url}
                  className="bg-nav border border-nav-button py-2 px-5 rounded-md font-semibold"
                >
                  {name}
                </Link>
              )
            }

            return jsx
          })}
        </nav>

        <button
          className="flex flex-col md:hidden gap-1 p-2"
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

export default Nav
