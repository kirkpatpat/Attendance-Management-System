import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "./ui/Button"
import { getAuthSession } from "@/lib/auth"
import UserAccountNav from "./UserAccountNav"

const Navbar = async () => {

    const session = await getAuthSession()

    return <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc300 z-[10] py-2 shadow-md">
        <div className="container max-w-7x1 h-full mx-auto flex items-center justify-between gap-2">
            <Link href='/' className="flex gap-2 items-center">
                <Image src="/images/Attendify.png" alt="Attendify" width={100} height={100} className="object-contain" />
            </Link>

            {session?.user ? (
                <UserAccountNav user={session.user} />
            ) : (
                <Link href='/sign-in' className={buttonVariants()}>Sign In</Link>
        
            )}
            

        </div>
    </div>
}

export default Navbar