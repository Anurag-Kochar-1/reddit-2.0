import Image from 'next/image'
import Link from 'next/link'
import logo from "../../public/images/logo.png"
import name from "../../public/images/name.png"
import offstaLogo from "../../public/images/offstaLogo.png"


const LogoWname = () => {
  return (
    <Link href={'/'} className='hidden md:inline-flex md:w-16 lg:w-36 h-full justify-between items-center space-x-2 px-2 lg:mr-4'>
        <Image src={offstaLogo} alt="logo" className='w-10 h-10 border border-black rounded-full' />
        <Image src={name} alt="name" className='w-20 h-15 hidden lg:inline-block' />
    </Link>
  )
}

export default LogoWname