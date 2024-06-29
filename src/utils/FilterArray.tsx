const FilterArray = {
  machineShop: [
    {
      name: 'Machine Shop Name',
      type: 'text',
      placeholder: 'Machine Shop Name',
    },
    {
      name: 'Machine Code',
      type: 'text',
      placeholder: 'Machine Code',
    },
    {
      name: 'Number of Line',
      type: 'text',
      placeholder: 'Number of Line',
    },
    {
      name: 'Machine Shop of',
      type: 'text',
      placeholder: 'Machine Shop of',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  machineLine: [
    {
      name: 'Machine Shop Name',
      type: 'text',
      placeholder: 'Machine Shop Name',
    },
    {
      name: 'Machine Shop Code',
      type: 'text',
      placeholder: 'Machine Shop Code',
    },
    {
      name: 'Machine Line',
      type: 'text',
      placeholder: 'Machine Line',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  machineManageMainCategory: [
    {
      name: 'Main Company',
      type: 'text',
      placeholder: 'Main Company',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  machineManageSubCategory: [
    {
      name: 'Main Category',
      type: 'text',
      placeholder: 'Main Category',
    },
    {
      name: 'Sub Category',
      type: 'text',
      placeholder: 'Sub Category',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  workCenter: [
    {
      name: 'Sr. No.',
      type: 'text',
      placeholder: 'Sr. No',
    },
    {
      name: 'Work Center Name',
      type: 'text',
      placeholder: 'Work Center Name',
    },
    {
      name: 'Workshop Description',
      type: 'text',
      placeholder: 'Workshop Description',
    },
    {
      name: 'Work center Type',
      type: 'text',
      placeholder: 'Work center Type',
    },
    {
      name: 'Asst. Manager',
      type: 'text',
      placeholder: 'Asst. Manager',
    },
    {
      name: 'Supervisor Group',
      type: 'text',
      placeholder: 'Supervisor Group',
    },
    {
      name: 'Machine Category',
      type: 'text',
      placeholder: 'Machine Category',
    },
    {
      name: 'Cell Eligible',
      type: 'text',
      placeholder: 'Cell Eligible',
    },
    {
      name: 'Pallet Name',
      type: 'text',
      placeholder: 'Pallet Name',
    },
    {
      name: 'Machine Shop',
      type: 'text',
      placeholder: 'Machine Shop',
    },
    {
      name: 'Line',
      type: 'text',
      placeholder: 'Line',
    },
    {
      name: 'Shift',
      type: 'text',
      placeholder: 'Shift',
    },
    {
      name: 'Consider for Operational Review',
      type: 'text',
      placeholder: 'Consider for Operational Review',
    },
    {
      name: 'Downtime Reason',
      type: 'text',
      placeholder: 'Downtime Reason',
    },
    {
      name: 'Customer',
      type: 'text',
      placeholder: 'Customer',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },

  ],
  manageMachineMake: [
    {
      name: 'Machine Make',
      type: 'text',
      placeholder: 'Machine Make',
    },
    {
      name: 'Manufacturing Country',
      type: 'selectbox',
      placeholder: 'Please select manufacturing country',
      options: ['Country 1', 'Country 2', 'Country 3'], // Example options
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  manageMachine: [
    {
      name: 'Machine Shop',
      type: 'text',
      placeholder: 'Machine Shop',
    },
    {
      name: 'Unit Name',
      type: 'text',
      placeholder: 'Unit Name',
    },
    {
      name: 'Line',
      type: 'text',
      placeholder: 'Line',
    },
    {
      name: 'Work Center',
      type: 'text',
      placeholder: 'Work Center',
    },
    {
      name: 'Machine Modal',
      type: 'text',
      placeholder: 'Machine Modal',
    },
    {
      name: 'Machine Make',
      type: 'text',
      placeholder: 'Machine Make',
    },
    {
      name: 'Machine Code',
      type: 'text',
      placeholder: 'Machine Code',
    },
    {
      name: 'Pallet Count',
      type: 'text',
      placeholder: 'Pallet Count',
    },
    {
      name: 'End Date',
      type: 'date',
      placeholder: 'End Date',
    },
    {
      name: 'Remarks',
      type: 'text',
      placeholder: 'Remarks',
    },
    {
      name: 'Installation Date',
      type: 'text',
      placeholder: 'Installation Date',
    },
    {
      name: 'Controller- Software Ver.',
      type: 'text',
      placeholder: 'Controller- Software Ver.',
    },
    {
      name: 'Warranty status',
      type: 'text',
      placeholder: 'Warranty status',
    },
    {
      name: 'Start Date',
      type: 'text',
      placeholder: 'Start Date',
    },
    {
      name: 'End Date',
      type: 'text',
      placeholder: 'End Date',
    },
    {
      name: 'Remarks',
      type: 'text',
      placeholder: 'Remarks',
    },

    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },

  ],
  manageCell: [
    {
      name: 'Cell Name',
      type: 'text',
      placeholder: 'Cell Name',
    },
    {
      name: 'Unit Name',
      type: 'text',
      placeholder: 'Unit Name',
    },
    {
      name: 'Cell Owner',
      type: 'selectbox',
      placeholder: 'Please select Cell Owner',
      options: ['Owner 1', 'Owner 2', 'Owner 3'], // Example options
    },
    {
      name: 'Work Center',
      type: 'selectbox',
      placeholder: 'Please select Work Center',
      options: ['Center 1', 'Center 2', 'Center 3'], // Example options
    },
    {
      name: 'Cell Planner',
      type: 'selectbox',
      placeholder: 'Please select Cell Planner',
      options: ['Planner 1', 'Planner 2', 'Planner 3'], // Example options
    },
    {
      name: 'status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  ManageDowntownReason: [
    {
      name: 'Downtime Reason',
      type: 'text',
      placeholder: 'Downtime Reason',
    },
    {
      name: 'Code',
      type: 'text',
      placeholder: 'Code',
    },
    {
      name: 'Downtime Category',
      type: 'selectbox',
      placeholder: 'Select Downtime Category',
      options: ['Category 1', 'Category 2', 'Category 3'], // Example options
    },
    {
      name: 'Down Work Center',
      type: 'text',
      placeholder: 'Select Down Work Center',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Select Status',
      options: ['Active', 'Inactive'],
    },
  ],
  ManageUnplannedProductionReason: [
    {
      name: 'Unplanned Production Reason ',
      type: 'text',
      placeholder: 'Select Unplanned Production Reason',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Select Status',
      options: ['Active', 'Inactive'],
    },
  ],
  manageDispatch: [
    {
      name: 'Dispatch Name',
      type: 'text',
      placeholder: 'Dispatch Name',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Select Status',
      options: ['Active', 'Inactive'],
    },
  ],
  manageDriver: [
    {
      name: 'Pay Roll Name',
      type: 'text',
      placeholder: 'Pay Roll Name',
    },
    {
      name: 'Employee Code',
      type: 'text',
      placeholder: 'Employee Code',
    },
    {
      name: 'Driver Number',
      type: 'text',
      placeholder: 'Driver Numbe',
    },

    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Select Status',
      options: ['Active', 'Inactive'],
    },
  ],
  vehicleFilter: [
    {
      name: 'Vehicle Number',
      type: 'text',
      placeholder: 'Vehicle Number',
    },
    {
      name: 'Vehicle Name',
      type: 'text',
      placeholder: 'Vehicle Name',
    },
    {
      name: 'Loading Capacity',
      type: 'text',
      placeholder: 'Loading Capacity',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  breakManagementFilter: [
    {
      name: 'Break Name',
      type: 'text',
      placeholder: 'Break Name',
    },
    {
      name: 'Shift Name',
      type: 'text',
      placeholder: 'Shift Name',
    },
    {
      name: 'Start Time',
      type: 'text',
      placeholder: 'Start Time',
    },
    {
      name: 'End Time',
      type: 'text',
      placeholder: 'End Time',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  shiftManagementFilter: [
    {
      name: 'Shift Name',
      type: 'text',
      placeholder: 'Shift Name',
    },
    {
      name: 'Shift Type',
      type: 'text',
      placeholder: 'Shift Type',
    },
    {
      name: 'Start Time',
      type: 'text',
      placeholder: 'Start Time',
    },
    {
      name: 'End Time',
      type: 'text',
      placeholder: 'End Time',
    },
    // {
    //   name: 'Break',
    //   type: 'text',
    //   placeholder: 'Break',
    // },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  specialWorkingFilter: [
    {
      name: 'Day Name',
      type: 'text',
      placeholder: 'Day Name',
    },
    {
      name: 'Reason',
      type: 'text',
      placeholder: 'Reason',
    },
    {
      name: 'Start Date',
      type: 'date',
      placeholder: 'Start Date',
    },
    {
      name: 'Start Time',
      type: 'time',
      placeholder: 'Start Time',
    },
    {
      name: 'End Date',
      type: 'date',
      placeholder: 'End Date',
    },
    {
      name: 'End Time',
      type: 'time',
      placeholder: 'End Time',
    },
    {
      name: 'Work Center',
      type: 'text',
      placeholder: 'Work Center',
    },
    {
      name: 'Unit Name',
      type: 'text',
      placeholder: 'Unit Name',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  holidayFilter: [
    {
      name: 'Holiday Name',
      type: 'text',
      placeholder: 'Holiday Name',
    },
    {
      name: 'Unit Name',
      type: 'text',
      placeholder: 'Unit Name',
    },
    {
      name: 'Holiday/Week Off Name',
      type: 'text',
      placeholder: 'Holiday/Week Off Name',
    },
    {
      name: 'Start Date',
      type: 'date',
      placeholder: 'Start Date',
    },
    {
      name: 'Start Time',
      type: 'date',
      placeholder: 'Start Time',
    },
    {
      name: 'End Date',
      type: 'date',
      placeholder: 'End Date',
    },
    {
      name: 'End Time',
      type: 'date',
      placeholder: 'End Time',
    },
    {
      name: 'Total Days',
      type: 'text',
      placeholder: 'Total Days',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  intermediateFilter: [
    {
      name: 'Enter Process Name',
      type: 'text',
      placeholder: 'Enter Process Name',
    },
    {
      name: 'Process Code',
      type: 'text',
      placeholder: 'Process Code',
    },
    {
      name: 'Process Name',
      type: 'text',
      placeholder: 'Process Name',
    },
    {
      name: 'Purchase Order Next',
      type: 'text',
      placeholder: 'Purchase Order Next',
    },
    {
      name: 'Enter Order Next',
      type: 'text',
      placeholder: 'Enter Order Next',
    },
    {
      name: 'Vendors',
      type: 'text',
      placeholder: 'Vendors',
    },
    {
      name: 'Start Time',
      type: 'text',
      placeholder: 'Start Time',
    },
    {
      name: 'End Time',
      type: 'text',
      placeholder: 'End Time',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],

  materialCode: [
    {
      name: 'Material Code',
      type: 'text',
      placeholder: 'Material Code',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  preProcessFilter: [
    {
      name: 'Description',
      type: 'text',
      placeholder: 'Description',
    },
    {
      name: 'Short Form',
      type: 'text',
      placeholder: 'Short Form',
    },
    {
      name: 'BUN',
      type: 'text',
      placeholder: 'BUN',
    },
    {
      name: 'Material Code',
      type: 'text',
      placeholder: 'Material Code',
    },
    {
      name: 'Procurement Type',
      type: 'text',
      placeholder: 'Procurement Type',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  preFunctionFilter: [
    {
      name: 'Functions',
      type: 'text',
      placeholder: 'Functions',
    },
    {
      name: 'Description',
      type: 'text',
      placeholder: 'Description',
    },
  ],
  dailyProductionMailFilter: [
    {
      name: 'Planning Type',
      type: 'text',
      placeholder: 'Planning Type',
    },
    {
      name: 'Mails',
      type: 'text',
      placeholder: 'Mails',
    },
    {
      name: 'Planning Running',
      type: 'text',
      placeholder: 'Planning Running',
    },
    {
      name: 'Planning Start Date',
      type: 'date',
      placeholder: 'Planning Start Date',
    },
    {
      name: 'Planning End Date',
      type: 'date',
      placeholder: 'Planning End Date',
    },
    {
      name: 'Plan Duration',
      type: 'text',
      placeholder: 'Plan Duration',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  planningLogFilter: [
    {
      name: 'Planning Type',
      type: 'text',
      placeholder: 'Planning Type',
    },
    {
      name: 'Call Type',
      type: 'text',
      placeholder: 'Call Type',
    },

    {
      name: 'Done By',
      type: 'text',
      placeholder: 'Done By',
    },
    {
      name: 'Start Date and Time',
      type: 'date',
      placeholder: 'Start Date and Time',
    },
    {
      name: 'End Date and Time',
      type: 'date',
      placeholder: 'End Date and Time',
    },

    {
      name: 'Duration',
      type: 'text',
      placeholder: 'Duration',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  hmiBudgeFilter: [
    {
      name: 'Hmi Badge',
      type: 'text',
      placeholder: 'Hmi Badge',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  badgeDocumentFilter: [
    {
      name: 'Badge',
      type: 'text',
      placeholder: 'Badge',
    },
    {
      name: 'Name of Document',
      type: 'text',
      placeholder: 'Name of Document',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  supervisorGroupFilter: [
    {
      name: 'Supervisor Group Name',
      type: 'text',
      placeholder: 'Supervisor Group Name',
    },
    {
      name: 'Supervisor',
      type: 'text',
      placeholder: 'Supervisor',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ], 
  machineshopofFilter:[
    {
      name: 'Name',
      type: 'text',
      placeholder: 'Name',
    },
    {
      name: 'Unit Name',
      type: 'text',
      placeholder: 'Unit Name',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },

  ], 
  controllermasterFilter:[
    {
      name: 'Name',
      type: 'text',
      placeholder: 'Name',
    },
    {
      name: 'Warranty status',
      type: 'text',
      placeholder: 'Warranty status',
    },
    {
      name: 'Start Date',
      type: 'text',
      placeholder: 'Start Date',
    },
    {
      name: 'End Date',
      type: 'text',
      placeholder: 'End Date',
    },
    {
      name: 'Remarks',
      type: 'text',
      placeholder: 'Remarks',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },

  ], 
  workcenterandcellmappingFilter:[
    {
      name: 'Cell Name',
      type: 'text',
      placeholder: 'Cell Name',
    },
    {
      name: 'Work Center',
      type: 'text',
      placeholder: 'Work Center',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  workcenteranddowntimereasonmappingFilter:[
    {
      name: 'Work Center',
      type: 'text',
      placeholder: 'Work Center',
    },
    {
      name: 'Downtime Reason',
      type: 'text',
      placeholder: 'Downtime Reason',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  shiftmasterFilter:[
    {
      name: 'Shift Name',
      type: 'text',
      placeholder: 'Shift Name',
    },
    {
      name: 'Shift Start Time',
      type: 'text',
      placeholder: 'Shift Start Time',
    },
    {
      name: 'End Time ',
      type: 'text',
      placeholder: 'End Time ',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  unitshiftandbreakmappingFilter:[
    {
      name: 'Unit Name',
      type: 'text',
      placeholder: 'Unit Name',
    },
    {
      name: 'Shift Name',
      type: 'text',
      placeholder: 'Shift Name',
    },
    {
      name: 'Break Name',
      type: 'text',
      placeholder: 'Break Name',
    },
    {
      name: 'Break Duration',
      type: 'text',
      placeholder: 'Break Duration',
    },
  ],
  palletmasterFilter:[
    {
      name: 'Pallet Name',
      type: 'text',
      placeholder: 'Pallet Name',
    },
    {
      name: 'Pallet Count',
      type: 'text',
      placeholder: 'Pallet Count',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  unitandworkcentermappingFilter:[
    {
      name: 'Unit Name',
      type: 'text',
      placeholder: 'Unit Name',
    },
    {
      name: 'Work Center',
      type: 'text',
      placeholder: 'Work Center',
    },
    // {
    //   name: 'Status',
    //   type: 'selectbox',
    //   placeholder: 'Please select status',
    //   options: ['Active', 'Inactive'],
    // },
  ],
  manageproductiondataFilter:[
    {
      name: 'HPriority',
      type: 'text',
      placeholder: 'HPriority',
    },
    {
      name: 'Order No.',
      type: 'text',
      placeholder: 'Order No.',
    },
    {
      name: 'Priority',
      type: 'text',
      placeholder: 'Priority',
    },
    {
      name: 'Part No.',
      type: 'text',
      placeholder: 'Part No.',
    },
    {
      name: 'Quantity',
      type: 'text',
      placeholder: 'Quantity',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  futureplusplanningFilter:[
    {
      name: 'Order No.',
      type: 'text',
      placeholder: 'Order No.',
    },
    {
      name: 'Part No',
      type: 'text',
      placeholder: 'Part No',
    },
    {
      name: 'Op. No',
      type: 'text',
      placeholder: 'Op. No',
    },
    {
      name: 'Start Time',
      type: 'date',
      placeholder: 'Start Time',
    },
    {
      name: 'End Time',
      type: 'date',
      placeholder: 'End Time',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
  ],
  ordermaterailresourcepriorirtyFilter:[
    {
      name: 'Customer ID.',
      type: 'text',
      placeholder: 'Customer ID.',
    },
    {
      name: 'Order ID.',
      type: 'text',
      placeholder: 'Order ID.',
    },
  ],
  bomFilter:[
    {
      name: 'Part No.',
      type: 'text',
      placeholder: 'Part No',
    },
    {
      name: 'Part Name',
      type: 'text',
      placeholder: 'Part Name',
    },
    {
      name: 'Work Center',
      type: 'selectbox',
      placeholder: 'Work Center',
      options: ['Work 1', 'Work 2', 'Work 3'], // Example options
    },
    {
      name: 'Last Changed Date',
      type: 'selectbox',
      placeholder: 'Last Changed Date',
      options: ['2022-12-11 14:11:06', '2023-12-11 14:11:06', '2024-12-11 14:11:06'], // Example options
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['Active', 'Inactive'],
    },
    {
      name: 'Plan of',
      type: 'selectbox',
      placeholder: 'Select',
      options: ['Select 1', 'Select 2'],
    },
  ],
  machinePartsFilter:[
    {
      name: 'Part No.',
      type: 'text',
      placeholder: 'Part No',
    },
    {
      name: 'Part Name',
      type: 'text',
      placeholder: 'Part Name',
    },
    {
      name: 'MSQ',
      type: 'text',
      placeholder: 'MSQ',
    },
    {
      name: 'Generic Name',
      type: 'text',
      placeholder: 'Generic Name',
    },
    {
      name: 'Cell Name',
      type: 'selectbox',
      placeholder: 'Last Changed Date',
      options: ['03 SPINDLE-Cartridge', '04 SPINDLE-Cartridge', '03 SPINDLE-Cartridge'],
    }
  ],
  machineshopplanning:[
    {
      name: 'Order Number',
      type: 'text',
      placeholder: 'example',
    },
    {
      name: 'Search By Part No./Part Name',
      type: 'text',
      placeholder: 'example',
    },
    {
      name: 'Model',
      type: 'selectbox',
      placeholder: 'example',
    //  options: ['example'],  Example options
    },
    {
      name: 'Sub Assm. Code',
      type: 'selectbox',
      placeholder: 'example',
     // options: ['Work 1', 'Work 2', 'Work 3'],  Example options
    },
    {
      name: 'Search By Part No.',
      type: 'text',
      placeholder: 'example',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['All', 'Pending', 'Accepted','Hold'],
    },
    {
      name: 'Plan of',
      type: 'text',
      placeholder: 'example',
    },
    {
      name: 'Created Date',
      type: 'date',
      placeholder: 'Select',
    },
  ],
  operationmonitoringFilter:[
    {
      name: 'Date',
      type: 'date',
      placeholder: '04/06/2024',
    },
    {
      name: 'Supervisor',
      type: 'selectbox',
      placeholder: 'Select Supervisor',
      options: ['Supervisor 01', 'Supervisor 02', 'Supervisor 03'],
    },
    {
      name: 'Cell',
      type: 'selectbox',
      placeholder: 'Select cell',
      options: ['Cell 01', 'Cell 02', 'Cell 03'],
    },
    {
      name: 'Work center',
      type: 'text',
      placeholder: 'example',
    },
  ],
  futureplanningsimulatorFilter:[
    {
      name: 'Order No.',
      type: 'text',
      placeholder: 'Order No.',
    },
    {
      name: 'Part No. - Part Name',
      type: 'selectbox',
      placeholder: 'Search Part',
      options: ['Search Part 01', 'Search Part 02', 'Search Part 03'],
    },
    {
      name: 'Model',
      type: 'selectbox',
      placeholder: 'Search Model',
      options: ['Search Model 01', 'Search Model 02', 'Search Model 03'],
    },
    {
      name: 'Sub Assm. Code',
      type: 'selectbox',
      placeholder: 'example',
      options: ['example 01', 'example 02', 'example 03'],
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['All', 'Pending', 'Accepted','Hold'],
    },
    {
      name: 'Cell',
      type: 'selectbox',
      placeholder: 'Select cell',
      options: ['Cell 01', 'Cell 02', 'Cell 03'],
    },
  ],
  
  asstManagermaster:[
    {
      name: 'Asst.Manager Name',
      type: 'text',
      placeholder: 'Asst.Manager Name',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['All', 'Pending', 'Accepted','Hold'],
    },
  ],
  managedowntimecategory:[
    {
      name: 'Downtime Category',
      type: 'text',
      placeholder: 'Downtime Category',
    },
    {
      name: 'Status',
      type: 'selectbox',
      placeholder: 'Please select status',
      options: ['All', 'Pending', 'Accepted','Hold'],
    },
  ],

}

export default FilterArray
