import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'

const SignUp: FC  = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] '>
        <div className='flex flex-col space-y-2 text-center'>
            <Image src='/images/tao.png' alt='Attendify' width={100} height={100} className='mx-auto'/>
            <h1 className='text-2x1 font-semibold tracking-tight'>Sign Up</h1>
            <p className='text-sm max-w-xs mx-auto'>
                By continuing, you are setting up an Attendify account and agree to our User Agreement and Private Policy.
            </p>

            <UserAuthForm />

            <p className='px-8 text-center text-sm text-zinc-700'>
                Already on Attendify?{' '}
                <Link href='/sign-in' className='hover:text-zinc-800 text-sm underline underline-offset-4'>Sign In</Link>
            </p>
        </div>
    </div>
  )
}

export default SignUp