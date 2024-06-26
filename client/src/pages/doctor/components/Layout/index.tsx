import { ReactNode, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { doctorRoutes } from './data';
import './style.css'
import { jwtDecode } from 'jwt-decode'


import { Menu } from 'lucide-react';
import { UserAvatar } from '@/components';
import { getToken, getUser, removeToken } from '@/lib/helpers';
import toast from 'react-hot-toast';
import Banner from '@/components/Banner';

type doctorRoutes = {
    title: string;
    path: string;
    cName: string;
    icon: JSX.Element
}

const SidebarComponent = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()

    const [sidebar, setSidebar] = useState(true);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [route, setRoutes] = useState<doctorRoutes[]>([])
    const location = useLocation()

    useEffect(() => {
        setRoutes(doctorRoutes)
    }, [])

    useEffect(() => {
        if (getToken()) {
            const expiryCheck: any = jwtDecode(getToken());

            if (Date.now() >= expiryCheck.exp * 1000) {
                removeToken()
                toast.error("Session Expired")
                navigate('/login')
            }
        }
        return () => { }

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
    const user = getUser()

    return (
        <>
            <div className='navbar shadow-sm'>
                <Menu cursor={"pointer"} onClick={showSidebar} />
                <div className="flex items-center gap-5">
                    <UserAvatar />

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
                                        {item?.icon}
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
                style={{ display: windowSize.innerWidth <= 450 && sidebar ? 'none' : undefined, paddingLeft: !sidebar ? '3%' : '230px', paddingRight: !sidebar ? '1%' : undefined }} >
                {!user?.isProfileCompleted && <Banner text='Complete Profile in order to be Approved' varient={"error"} />}
                {user?.isProfileCompleted && !user?.isApproved && <Banner text='Admin will approve your profile' varient={"success"} />}
                {children}
            </div>
        </>
    )
}

export default SidebarComponent