import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    title: 'Category',
    links: [
      {
        name: 'Some Link',
        url: '#',
      },
      {
        name: 'Some Link',
        url: '#',
      },
      {
        name: 'Some Link',
        url: '#',
      },
    ],
  },
  {
    title: 'Category',
    links: [
      {
        name: 'Some Link',
        url: '#',
      },
      {
        name: 'Some Link',
        url: '#',
      },
      {
        name: 'Some Link',
        url: '#',
      },
    ],
  },
]

const Footer = () => {
  return (
    <footer className="bg-nav text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          <div className="flex justify-center">
            <Link href="/">
              <Image src="/logo.png" width={56} height={56} alt="Logo" />
            </Link>
          </div>

          {categories.map((category, index) => (
            <div key={`footer-${index}`} className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>

              <ul>
                {category.links.map((link) => (
                  <li key={`footer-link-${link.name}`} className="mb-1">
                    <Link href={link.url} className="text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
