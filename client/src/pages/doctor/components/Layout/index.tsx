import { ReactNode, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { adminRoutes } from './data';
import './style.css'
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

import { Menu, LogOut, Settings, User } from 'lucide-react';
import { getUser, removeToken } from '@/lib/helpers';

type adminRoutes = {
    title: string;
    path: string;
    cName: string;
}

const SidebarComponent = ({ children }: { children: ReactNode }) => {


    const [sidebar, setSidebar] = useState(true);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [route, setRoutes] = useState<adminRoutes[]>([])
    const location = useLocation()
    const user = getUser()
    const navigate = useNavigate()

    useEffect(() => {
        setRoutes(adminRoutes)
    }, [])

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (windowSize.innerWidth <= 800) {
            setSidebar(false)
        }
        else {
            setSidebar(true)
        }

    }, [windowSize.innerWidth])


    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    const showSidebar = () => setSidebar(!sidebar);

    const logout = () => {
        removeToken()
        navigate('/')
    }

    return (
        <>
            <div className='navbar shadow-sm'>
                <Menu cursor={"pointer"} onClick={showSidebar} />
                <div className="flex items-center gap-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger className='cursor-pointer' asChild>
                            <Avatar className='cursoir-pointer bg-primary text-white dark:text-black flex items-center justify-center text-xl' >
                                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                <p className='select-none'>{user?.email[0]?.toUpperCase()}</p>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">

                            <DropdownMenuGroup>
                                <DropdownMenuItem className='cursor-pointer'>
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
                    {/* <ModeToggle/> */}
                </div>
            </div>


            <nav className={`${sidebar ? 'nav-menu active shadow-md' : 'nav-menu shadow-md '} bg-white`}>
                <ul className='nav-menu-items'>
                    <div>
                        {route.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link className={`${location.pathname == item?.path ? `bg-deepTeal !text-white ` : "bg-transparent !text-black"} hover:bg-teal/95 hover:!text-white`} to={item?.path} >
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </div>
                </ul>
            </nav>
            <div
                className='flex overflow-scroll md:h-[80vh] mb-10 md:mb-0 mt-5 flex-col gap-5 md:gap-10  p-5'
                style={{ display: windowSize.innerWidth <= 450 && sidebar ? 'none' : undefined, paddingLeft: !sidebar ? '1%' : '210px', paddingRight: !sidebar ? '1%' : undefined }} >
                {children}
            </div>
        </>
    )
}

export default SidebarComponent