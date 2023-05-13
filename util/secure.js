import { getSession } from 'next-auth/react'

export default async (context, callback) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return callback({ session })
}
