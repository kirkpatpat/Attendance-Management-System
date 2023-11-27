import { FC } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button'
import SignIn from '@/components/SignIn'

const page: FC = () => {
  return (
    <div className='absolute inset-0'>
        <div className='h-full max-w-2x1 mx-auto flex flex-col items-center justify-center gap-20'>
        
            <SignIn />

        </div>
    </div>
  )
}

export default page