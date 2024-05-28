import { FaPeopleGroup } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";

export const doctorRoutes = [

    {
        title: 'Dashboard',
        path: '/doctor/home',
        cName: 'nav-text',
        icon: <MdDashboard/>
    },

    {
        title: 'Patients',
        path: '/doctor/patients',
        cName: 'nav-text',
        icon: <FaPeopleGroup/>

    },
    {
        title: 'Profile',
        path: '/doctor/profile',
        cName: 'nav-text',
        icon: <ImProfile/>

    },


];

