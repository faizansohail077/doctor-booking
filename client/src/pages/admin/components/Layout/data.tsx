import { FaPeopleGroup } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";

export const adminRoutes = [
   
    {
        title: 'Dashoard',
        path: '/admin/home',
        cName: 'nav-text',
        icon: <MdDashboard/>

    },
    {
        title: 'Doctors',
        path: '/admin/doctors',
        cName: 'nav-text',
        icon: <FaPeopleGroup/>

    },
    {
        title: 'Patients',
        path: '/admin/patients',
        cName: 'nav-text',
        icon: <ImProfile/>

    },
    

];

