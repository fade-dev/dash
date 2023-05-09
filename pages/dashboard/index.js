import DashNav from '@components/DashNav'
import secure from '@util/secure'

const Dashboard = () => {
  return (
    <div className="h-screen">
      <DashNav />
    </div>
  )
}

export default Dashboard

export async function getServerSideProps(context) {
  return secure(context, ({ session }) => {
    return {
      props: { session },
    }
  })
}
