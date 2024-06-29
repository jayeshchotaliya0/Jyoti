const baseUrl = 'http://172.16.50.6:4120/api/';

// const baseUrl = 'https://jsonplaceholder.typicode.com/';


const API_URL = {
  base: baseUrl,

  machineShop: {
    listing: 'machine-shops',
    add: 'machine-shops',
    update: 'machine-shops',
    getbyid: 'machine-shops',
  },
  line: {
    getList: 'lines',
    add: 'lines',
    update: 'lines',
    getbyid: 'lines',
  },
  cell: {
    listing: 'cells',
    add: 'cells',
    update: 'cells',
    getbyid: 'cells'
  },

  maincategories: {
    listing: 'machine-main-categories',
    add: 'machine-main-categories',
    update: 'machine-main-categories',
    getbyid: 'machine-main-categories'
  },
  managesubcategory: {
    listing: 'machine-sub-categories',
    add: 'machine-sub-categories',
    update: 'machine-sub-categories',
    getbyid: 'machine-sub-categories'
  },
  manageworkcenter: {
    listing: 'work-centers',
    add: 'work-centers',
    update: 'work-centers',
    getbyid: 'work-centers'
  },
  machineMake: {
    listing: 'machine-makes',
    add: 'machine-makes',
    update: 'machine-makes',
    getbyid: 'machine-makes'
  },
  manageMakeMachine: {
    listing: 'MachineMakes/GetMachineMakes',
    add: '',
    update: '',
    getbyid: ''
  },
  dispatchTo: {
    listing: 'dispatch-tos',
    add: 'dispatch-tos',
    update: 'dispatch-tos',
    getbyid: 'dispatch-tos'
  },
  downTimeReason: {
    listing: 'downtime-category-reasons',
    add: 'downtime-category-reasons',
    update: 'downtime-category-reasons',
    getbyid: 'downtime-category-reasons'

  },
  downTimeCategory: {
    listing: 'downtime-categories',
    add: 'downtime-categories',
    update: 'downtime-categories',
    getbyid: 'downtime-categories'

  },
  unPlannedprdReasons: {
    listing: 'unplanned-production-reasons',
    add: 'unplanned-production-reasons',
    update: 'unplanned-production-reasons',
    getbyid: 'unplanned-production-reasons'

  },
  drivers: {
    listing: 'drivers',
    add: 'drivers',
    update: 'drivers',
    getbyid: 'drivers'
  },
  vehicles: {
    listing: 'vehicles',
    add: 'vehicles',
    update: 'vehicles',
    getbyid: 'vehicles'
  },
  interMediateProcesses: {
    listing: 'intermediate-processes',
    add: 'intermediate-processes',
    update: 'intermediate-processes',
    getbyid: 'intermediate-processes'
  },
  materialsCode: {
    listing: 'materials',
    add: 'materials',
    update: 'materials',
    getbyid: 'materials'
  },
  preProcesses: {
    listing: 'pre-processes',
    add: 'pre-processes',
    update: 'pre-processes',
    getbyid: 'pre-processes'
  },
  preFunctions: {
    listing: 'pre-functions',
    add: 'pre-functions',
    update: 'pre-functions',
    getbyid: 'pre-functions'
  },
  supervisoursGroup: {
    listing: 'supervisor-groups',
    add: 'supervisor-groups',
    update: 'supervisor-groups',
    getbyid: 'supervisor-groups'
  },
  asstManagerMaster: {
    listing: 'employees',
    add: 'employees',
    update: 'employees',
    getbyid: 'employees'
  },
  controllerMaster: {
    listing: 'machine-controllers',
    add: 'machine-controllers',
    update: 'machine-controllers',
    getbyid: 'machine-controllers'
  },
  shiftmaster: {
    listing: 'Shifts/GetShifts',
    add: '',
    update: '',
    getbyid: ''
  },
  documentTypeMaster: {
    listing: 'document-types',
    add: 'document-types',
    update: 'document-types',
    getbyid: 'document-types'
  },
  holidays: {
    listing: 'holidays',
    add: 'holidays',
    update: 'holidays',
    getbyid: 'holidays'
  },
  manageMachine: {
    listing: 'machines',
    add: 'machines',
    update: 'machines',
    getbyid: 'machines'
  },
  palletMaster: {
    listing: 'pallets',
    add: 'pallets',
    update: 'pallets',
    getbyid: 'pallets'
  },

  unitList: {
    listing: 'units',
    add: 'units',
    update: 'units',
    getbyid: 'units'
  },
  machineShopOf: {
    listing: 'machine-shop-ofs',
    add: 'machine-shop-ofs',
    update: 'machine-shop-ofs',
    getbyid: 'machine-shop-ofs'
  },
  breakManagement: {
    listing: 'break-with-work-center-management/GetBreakWithWorkCenter',
    add: '',
    update: '',
    getbyid: ''
  },

  shiftManagement: {
    listing: 'shifts',
    add: 'shifts',
    update: 'shifts',
    getbyid: 'shifts'
  },
  specialWorking: {
    listing: 'special-working-days',
    add: 'special-working-days',
    update: 'special-working-days',
    getbyid: 'special-working-days'
  },
  employees: {
    listing: 'employees',
    add: 'employees',
    update: 'employees',
    getbyid: 'employees'
  },

  breakWithWorkCenterManagement: {
    listing: 'break-with-work-center-management/GetBreakWithWorkCenter',
    add: '',
    update: '',
    getbyid: ''
  },
  breakWithShiftManagement: {
    listing: 'breaks',
    add: 'breaks',
    update: 'breaks',
    getbyid: 'breaks'
  },
  dailyProductionMail:{
    listing: 'daily-production-mail-logs',
    add: 'daily-production-mail-logs',
    update: 'daily-production-mail-logs',
    getbyid: 'daily-production-mail-logs'
  },
  common:{
    listing: 'common'
  },
  hmiBadge:{
    listing: 'HMIBadge',
    add: 'HMIBadge',
    update: 'HMIBadge',
    getbyid: 'HMIBadge'
  }

};

export default API_URL;
