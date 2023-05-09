import Image from 'next/image'

const ZPattern = ({ children, imageProps, className = '' }) => {
  return (
    <div
      className={`flex flex-col md:flex-row text-white text-center md:text-left mx-auto w-full items-center ${className}`}
    >
      {children}

      <Image {...imageProps} />
    </div>
  )
}

export default ZPattern
