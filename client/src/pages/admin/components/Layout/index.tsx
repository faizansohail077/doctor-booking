import { ReactNode, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { adminRoutes } from './data';
import './style.css'


import { Menu } from 'lucide-react';
import { UserAvatar } from '@/components';
import { getToken, removeToken } from '@/lib/helpers';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

type adminRoutes = {
    title: string;
    path: string;
    cName: string;
    icon: JSX.Element
}

const SidebarComponent = ({ children }: { children: ReactNode }) => {

const navigate = useNavigate()
    const [sidebar, setSidebar] = useState(true);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [route, setRoutes] = useState<adminRoutes[]>([])
    const location = useLocation()

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


    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    const showSidebar = () => setSidebar(!sidebar);



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
                                    <Link className={`${location.pathname == item?.path || `/${location.pathname.split('/')[1]}/${location.pathname.split('/')[2]}` == item?.path ? `bg-deepTeal !text-white ` : "bg-transparent !text-black"} hover:bg-teal/95 hover:!text-white`} to={item?.path} >
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
                style={{ display: windowSize.innerWidth <= 450 && sidebar ? 'none' : undefined, paddingLeft: !sidebar ? '1%' : '230px', paddingRight: !sidebar ? '1%' : undefined }} >
                {children}
            </div>
        </>
    )
}

export default SidebarComponent