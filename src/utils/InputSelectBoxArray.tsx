const InputSelectBoxArray = {
  asstManagerMaster: [
    {
      htmlFor: 'name',
      labelClassName: 'block text-gray-700',
      labelText:'Asst. Manager Name',
      required: false,
      type: 'text',
      placeholder: 'Asst. Manager Name',
      className: 'block w-full px-3 py-2 border rounded mt-2',
      idName: 'name',
    },
    {
      htmlFor: 'inputText3',
      labelclassName: 'block text-gray-700',
      labelText:'Shift',
      required: true,
      type: 'select',
      placeholder: 'Shift',
      className: 'block w-full px-3 py-2.5 border bg-white rounded mt-2',
      name:"manageshop",
      idName: 'inputText3',
      keyField:"id",
      valueField:"lins" 
    },
    {
        htmlFor: 'inputText4',
        labelclassName: 'block text-gray-700',
        labelText:'Status',
        required: false,
        type: 'checkbox',
        className: "relative w-11 h-6 mt-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600",
        name:"manageshop",
        idName: 'inputText4',
      },
  ],
}

export default InputSelectBoxArray
