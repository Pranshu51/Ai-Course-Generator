import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
      <div className='flex mt-10 h-full items-centre justify-center'>
          <SignIn />
      </div>
    )
}