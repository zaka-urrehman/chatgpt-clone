'use client'
// This component displays the profile of the current logged in user in the bottom of the side bar
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

const Profile = () => {
    const { data: session } = useSession()

    // on the basis of this state, the signout button will be shown
    const [visible,setVisible] = useState(false)

    return (
        <div >
            {/* show signout button when profile image is clicked */}
            {visible? <div className=" flex justify-center items-center pb-4">
                <button 
               className="bg-gray-500 hover:bg-gray-700 text-white  py-2 px-4 rounded-xl text-lg"
                onClick={()=>signOut()}>Signout</button> 
            </div>:<div></div>}
           

            <img src={session?.user?.image as string} alt=" image "
             className='rounded-full h-12 w-12 mx-auto '
             onClick={()=>setVisible(!visible)} />

        </div>
    )
}

export default Profile