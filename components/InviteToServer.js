import commonStrings from '@util/common-strings'

const InviteToServer = () => {
  return (
    <a
      href={commonStrings.inviteUrl}
      className="font-semibold text-sm md:text-xl rounded-md py-3.5 px-10 bg-cta-button w-56"
    >
      Invite to Server
    </a>
  )
}

export default InviteToServer
