import Image from "next/image"
import Link from "next/link"


const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-muted flex items-center min-h-svh flex-col justify-center gap-6 p-6 md:p-10'>
            <div className='flex max-w-sm w-full flex-col gap-6 '>
                <Link
                    href="/"
                    className='flex items-center gap-2 self-center font-medium'
                >
                    <Image
                        src="/logos/logo.svg"
                        width={30}
                        height={30}
                        alt='logo'
                    />
                    nodebase
                </Link>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout