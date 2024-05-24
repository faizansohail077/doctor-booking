import { getUser, removeToken } from '@/lib/helpers'
import { useNavigate } from 'react-router-dom'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
} from "@/components/ui/avatar"

import { LogOut, Settings, User } from 'lucide-react';


const UserAvatar = () => {
    const user = getUser()
    const navigate = useNavigate()
    console.log(user?.role, 'user?.role[2]')
    const goToProfile = () => {

        switch (user?.role) {
            case "DOCTOR":
                navigate('/doctor/profile')
                break;
            default:
                break;
        }
    }

    const logout = () => {
        removeToken()
        navigate('/')
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer' asChild>
                <Avatar className='cursoir-pointer bg-primary text-white dark:text-black flex items-center justify-center text-xl' >
                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                    <p className='select-none'>{user?.email[0]?.toUpperCase()}</p>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">

                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={goToProfile} className='cursor-pointer'>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className='cursor-pointer'>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => logout()} className='text-red-600 cursor-pointer hover:!text-red-600' >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatar