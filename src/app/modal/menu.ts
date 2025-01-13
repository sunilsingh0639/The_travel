export const AdminMenuList = [
    {
        label: 'Home',
        link: '/app/home/admin-home',
        icon: 'mdi mdi-speedometer',
        childrens: [],
        privilegeCode: 'managehome'
    },
   
    {
        label: 'Users',
        link: '/app/users',
        icon: 'mdi mdi-account-group-outline',
        privilegeCode: 'manageusers',
        childrens: [
            {
                label: 'Users',
                link: '/app/users',
                icon: null,
                privilegeCode: 'manageusers',
            },
            {
                label: 'Roles',
                link: '/app/roles',
                icon: null,
                privilegeCode: 'manageroles',
            }
        ]
    },
    {
        label: 'Subscribers ',
        link: '/app/subscribers',
        icon: 'mdi mdi-sticker-text-outline',
        childrens: [        ],
        privilegeCode: 'managesubscribers',
    },
   
] 
export const SubscribersMenuList = [
    {
        label: 'Home',
        link: '/app/home',
        icon: 'mdi mdi-home',
        privilegeCode: 'managehome',
        childrens: [
           
        ]
    },
    {
        label: 'Dashboard',
        link: '/app/dashboard',
        icon: 'mdi mdi-speedometer',
        privilegeCode: 'managedashboard',
        childrens: [
            {
                label: 'Yearly Recon ',
                link: '/app/dashboard/Yearly-Recon-Dashboard',
                icon: null,
                privilegeCode: 'manageyearlydashboard'
            },
       
            {
                label: 'Monthly Recon ',
                link: '/app/dashboard/Monthly-Recon-Dashboard',
                icon: null,
                privilegeCode: `managemonthlydashboard`
            },
            {
                label: 'Supplier Recon ',
                link: '/app/dashboard/Supplier-Recon-Dashboard',
                icon: null,
                privilegeCode: `managesupplierdashboard`
            },
        ]
    },
    {
        label: 'Clients',
        link: '/app/clients',
        icon: 'mdi mdi-home',
        childrens: [
          
        ],
        privilegeCode: `manageclients`

    },
    {
        label: 'Users',
        link: '/app/users',
        icon: 'mdi mdi-account-group-outline',
        privilegeCode: 'manageusers',
        childrens: [
            {
                label: 'Users',
                link: '/app/users',
                icon: null,
                privilegeCode: 'manageusers',
            },
            {
                label: 'Roles',
                link: '/app/roles',
                icon: null,
                privilegeCode: 'manageroles',
            }
        ]
    },
    
    
    {
        label: 'Transactions',
        link: '/app/transactions',
        icon: 'mdi mdi-sticker-text-outline',
        privilegeCode: 'managetransactions',
        childrens: [       
        ]
    },
    {
        label: 'Operations',
        link: '/app/operations',
        icon: 'mdi mdi-message-text-outline',
        privilegeCode: 'manageoperations',
        childrens: [
                {
                label: 'Rules' ,
                link: '/app/operations/rule-list',
                icon: null,
                privilegeCode: 'manageoperations',
            },
            {
                label: 'File Uploads' ,
                link: '/app/operations/file-upload',
                icon: null,
                privilegeCode: 'manageoperations',
            },
            {
                label: 'Recons',
                link: '/app/operations/recon',
                icon: null,
                privilegeCode: 'manageoperations',
            },
            {
                label: 'Recon Executions',
                link: '/app/operations/recon-executions',
                icon: null,
                privilegeCode: 'manageoperations',
            },
            {
                label: 'Manual Match',
                link: '/app/operations/manual-match',
                icon: null,
                privilegeCode: 'manageoperations',
            }
        ]
    },
    {
        label: 'Reports',
        link: '/app/reports/',
        icon: 'mdi mdi-download',
        privilegeCode: 'managereports',
        childrens: [
            {
                label: 'GSTR9B Report' ,
                link: '/app/reports/download-gstr9b',
                icon: null,
                privilegeCode: 'managedownloadgstr9',
            },
      
        ]
    }
   
   
]
export const SubscribersIndividualMenuList =  [
    {
        label: 'Home',
        link: '/app/home',
        icon: 'mdi mdi-home',
        childrens: [
           
        ],
        privilegeCode: 'managehome'
    },
    {
        label: 'Dashboard',
        link: '/app/dashboard',
        icon: 'mdi mdi-speedometer',
        privilegeCode: 'managedashboard',
        childrens: [
            {
                label: 'Yearly Recon ',
                link: '/app/dashboard/Yearly-Recon-Dashboard',
                icon: null,
                privilegeCode: 'manageyearlydashboard'
            },
       
            {
                label: 'Monthly Recon ',
                link: '/app/dashboard/Monthly-Recon-Dashboard',
                icon: null,
                privilegeCode: `managemonthlydashboard`
            },
            {
                label: 'Supplier Recon ',
                link: '/app/dashboard/Supplier-Recon-Dashboard',
                icon: null,
                privilegeCode: `managesupplierdashboard`
            },
        ]
    },
    {
        label: 'Users',
        link: '/app/users',
        icon: 'mdi mdi-account-group-outline',
        privilegeCode: 'manageusers',
        childrens: [
            {
                label: 'Users',
                link: '/app/users',
                icon: null,
                privilegeCode: 'manageusers',
            },
            {
                label: 'Roles',
                link: '/app/roles',
                icon: null,
                privilegeCode: 'manageroles',
            }
        ]
    },
    
    {
        label: 'Transactions',
        link: '/app/transactions',
        icon: 'mdi mdi-sticker-text-outline',
        privilegeCode: 'managetransactions',
        childrens: [       
        ]
    },
    {
        label: 'Operations',
        link: '/app/operations',
        icon: 'mdi mdi-message-text-outline',
        privilegeCode: 'manageoperations',
        childrens: [
                {
                label: 'Rules' ,
                link: '/app/operations/rule-list',
                icon: null,
                privilegeCode: 'manageoperations',
            },
            {
                label: 'File Uploads' ,
                link: '/app/operations',
                icon: null,
                privilegeCode: 'manageoperations',
            },
            {
                label: 'Recons',
                link: '/app/operations/recon',
                icon: null,
                privilegeCode: 'manageoperations',
            },
            {
                label: 'Recon Executions',
                link: '/app/operations/recon-executions',
                icon: null,
                privilegeCode: 'manageoperations',
            },
            {
                label: 'Manual Match',
                link: '/app/operations/manual-match',
                icon: null,
                privilegeCode: 'manageoperations',
            }
        ]
    },
    {
        label: 'Reports',
        link: '/app/reports/',
        icon: 'mdi mdi-download',
        privilegeCode: 'managereports',
        childrens: [
            {
                label: 'GSTR9B Report' ,
                link: '/app/reports/download-gstr9b',
                icon: null,
                privilegeCode: 'managedownloadgstr9',
            },
      
        ]
    },
   
   
]