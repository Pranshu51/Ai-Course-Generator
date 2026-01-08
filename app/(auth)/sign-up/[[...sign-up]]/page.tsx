import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex mt-5 h-full items-centre justify-center'>
        <SignUp />
    </div>
  )
}