
import { FC } from 'react'
import dynamic from 'next/dynamic'



interface pageProps {}

const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });
const AttendanceImport = dynamic(() => import('@/components/AttendanceImport'), { ssr: false });


const page: FC<pageProps> = ({}) => {
 



  return <div>
    <Sidebar /> 

<div>
<AttendanceImport />

</div>
  </div>

}

export default page