import { DashboardDetailsIcon, MachinePart, MachineShopIcon, MasterIcon} from "./icons/icons"

interface MenuItem {
  id: string
  icon?: React.ReactNode;
  title?: string
  path?: string
  subMenu?: any
}

const SidebarArray: MenuItem[] = [
  {
    id: '1',
    title: 'Master',
    icon: <MasterIcon />,
    subMenu: [
      {
        id: '1',
        name: 'Unit',
        link: 'unit-management-master',
        active: '/unit-management-master',
      },
      {
        id: '1',
        name: 'Machine Shop',
        link: 'manage-machine-shop',
        active: '/manage-machine-shop',
      },
      {
        id: '1',
        name: 'Line',
        link: 'manage-line',
        active: '/manage-line',
      },
      {
        id: '1',
        name: 'Machine Main Category',
        link: 'manage-main-category',
        active: '/manage-main-category',
      },
      {
        id: '1',
        name: 'Machine Sub Category',
        link: 'manage-sub-category',
        active: '/manage-sub-category',
      },
      {
        id: '1',
        name: 'Manage Work Center',
        link: 'manage-work-center',
        active: '/manage-work-center',
      },
      {
        id: '1',
        name: 'Machine Make',
        link: 'manage-machine-make',
        active: '/manage-machine-make',
      },
      {
        id: '1',
        name: 'Machine',
        link: 'manage-machine',
        active: '/manage-machine',
      },
      {
        id: '1',
        name: 'Cell',
        link: 'manage-cell',
        active: '/manage-cell',
      },
      {
        id: '1',
        name: 'Manage Downtime Category',
        link: 'manage-downtime-category',
        active: '/manage-downtime-category',
      },
    
      {
        id: '1',
        name: 'Downtime Reason Generic',
        link: 'downtime-reason-generic',
        active: '/downtime-reason-generic',
      },
      {
        id: '1',
        name: 'Unplanned Production Reason',
        link: 'manage-unplanned-production-reason',
        active: '/manage-unplanned-production-reason',
      },
      {
        id: '1',
        name: 'Manage Dispatch To',
        link: 'manage-dispatch-to',
        active: '/manage-dispatch-to',
      },
      {
        id: '1',
        name: 'Driver',
        link: 'manage-driver',
        active: '/manage-driver',
      },
      {
        id: '1',
        name: 'Vehicle',
        link: 'manage-vehicle',
        active: '/manage-vehicle',
      },

      {
        id: '1',
        name: 'Break Management',
        link: 'break-with-shift-management',
        active: '/break-with-shift-management',
      },
      {
        id: '1',
        name: 'Shift Management',
        link: 'manage-shift-management',
        active: '/manage-shift-management',
      },
      
      {
        id: '1',
        name: 'Special Working Day',
        link: 'manage-special-working-day',
        active: '/manage-special-working-day',
      },
      {
        id: '1',
        name: 'Holiday',
        link: 'manage-holiday',
        active: '/manage-holiday',
      },
      {
        id: '1',
        name: 'Intermediate Process',
        link: 'manage-intermediate-process',
        active: '/manage-intermediate-process',
      },
      {
        id: '1',
        name: 'Material Code',
        link: 'manage-material-code',
        active: '/manage-material-code',
      },
      {
        id: '1',
        name: 'Pre Process',
        link: 'manage-pre-process',
        active: '/manage-pre-process',
      },
      {
        id: '1',
        name: 'Pre Function',
        link: 'manage-pre-function',
        active: '/manage-pre-function',
      },
      {
        id: '1',
        name: 'Daily Production Mail',
        link: 'manage-daily-production-mail',
        active: '/manage-daily-production-mail',
      },
      {
        id: '1',
        name: 'Planning Log',
        link: 'manage-planning-log',
        active: '/manage-planning-log',
      },
      {
        id: '1',
        name: 'HMI Badge',
        link: 'manage-hmi-badge',
        active: '/manage-hmi-badge',
      },
      {
        id: '1',
        name: 'Badge Document',
        link: 'manage-badge-document',
        active: '/manage-badge-document',
      },
      {
        id: '1',
        name: 'Supervisor Group',
        link: 'manage-supervisor-group',
        active: '/manage-supervisor-group',
      },
      // { name: 'Work Center', link: 'manage-work-center', active: '/manage-work-center' },
      {
        id: '1',
        name: 'Role Permission',
        link: 'role-permission',
        active: '/role-permission',
      },
      {
        id: '1',
        name: 'User Permission',
        link: 'user-permission',
        active: '/user-permission',
      },
      {
        id: '1',
        name: 'User and Role Management',
        link: 'user-and-role-management',
        active: '/user-and-role-management',
      },
      {
        id: '1',
        name: 'Manage Document Type',
        link: 'manage-document-type',
        active: '/manage-document-type',
      },
      {
        id: '1',
        name: 'Work Center Type Master',
        link: 'work-center-type-master',
        active: '/work-center-type-master',
      },
      // {
      //   id: '1',
      //   name: 'Supervisor Master',
      //   link: 'supervisor-master',
      //   active: '/supervisor-master',
      // },
      {
        id: '1',
        name: 'Asst. Manager Master',
        link: 'asst-manager-master',
        active: '/asst-manager-master',
      },
      {
        id: '1',
        name: 'Batch Timing',
        link: 'batch-timing',
        active: '/batch-timing',
      },
      {
        id: '1',
        name: 'Machine Shop Of',
        link: 'machine-shop-of',
        active: '/machine-shop-of',
      },
      {
        id: '1',
        name: 'Manage Controller',
        link: 'manage-controller',
        active: '/manage-controller',
      },
      {
        id: '1',
        name: 'Work center and Cell Mapping',
        link: 'work-center-and-cell-mapping',
        active: '/work-center-and-cell-mapping',
      },
    
      // {
      //   id: '1',
      //   name: 'Shift Master',
      //   link: 'shift-master',
      //   active: '/shift-master',
      // },
      {
        id: '1',
        name: 'Unit and Break Mapping',
        link: 'unit-shift-and-break-mapping',
        active: '/unit-shift-and-break-mapping',
      },
      {
        id: '1',
        name: 'Pallet Master',
        link: 'pallet-master',
        active: '/pallet-master',
      },
      {
        id: '1',
        name: 'Manage Unit And Work Center Mapping',
        link: 'manage-unit-and-work-center-mapping',
        active: '/manage-unit-and-work-center-mapping',
      },
     
      {
        id: '1',
        name: 'Manage Priority and Weightage',
        link: 'manage-priority-and-weightage',
        active: '/manage-priority-and-weightage',
      },
      {
        id: '1',
        name: 'Downtime Reason Mapping with work center',
        link: 'downtime-reason-mapping-work-center',
        active: '/downtime-reason-mapping-work-center',
      },
      {
        id: '1',
        name: 'Break With Work Center Management',
        link: 'break-with-work-center-management',
        active: '/break-with-work-center-management',
      },
    ],
  },
  {
    id: '2',
    title: 'Machine Parts',
    icon: <MachinePart />,
    subMenu: [
      {
        id: '2',
        name: 'Machine Parts Details',
        link: 'machine-parts',
        active: '/machine-parts',
      },
      {
        id: '2',
        name: 'BOM',
        link: 'bom',
        active: '/bom',
      },
    
    ],
  },
  {
    id: '3',
    title: 'Machine Shop',
    icon: <MachineShopIcon />,
    subMenu: [
      {
        id: '3',
        name: 'Machine Shop Planning',
        link: 'machine-shop-planning',
        active: '/machine-shop-planning',
      },
      {
        id: '3',
        name: 'Future Planning',
        link: 'future-plus-planning',
        active: '/future-plus-planning',
      },
      {
        id: '3',
        name: 'Future Planning Simulator',
        link: 'future-planning-simulator',
        active: '/future-planning-simulator',
      },
      {
        id: '3',
        name: 'Future Load Balancer',
        link: 'future-load-balancer',
        active: '/future-load-balancer',
      },
    ],
  },
  {
    id: '4',
    title: 'Dashboard Details',
    icon: <DashboardDetailsIcon />,
    subMenu: [
      {
        id: '4',
        name: 'Machine Shop Dashboard',
        link: 'machine-shop-dashboard',
        active: '/machine-shop-dashboard',
      },
      {
        id: '4',
        name: 'Operation Monitoring ',
        link: 'operation-monitoring ',
        active: '/operation-monitoring ',
      },
      {
        id: '4',
        name: 'Operation Monitoring-Work Center wise',
        link: 'operation-monitoring-work-center-wise',
        active: '/operation-monitoring-work-center-wise',
      },
    ],
  },

]

export default SidebarArray
