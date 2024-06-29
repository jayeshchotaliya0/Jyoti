import TabArray from '@/utils/SearchTabingArray'
import { usePathname } from 'next/navigation'
import React from 'react'

const Search = () => {
  const pathname = usePathname()
  const isOperationMonitoring = TabArray.some(tab => tab.url === pathname && tab.showTab === true);
  const matchingTab = TabArray.find(tab => tab.url === pathname);

  const searchInput = (
    <>
      <span className="mr-2">Search:</span>
      <input type="text" className="border h-8 px-2" />
    </>
  );

  if (isOperationMonitoring) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="text-left"></div>
        <div className="text-right mt-2">
          {searchInput}
        </div>
      </div>
    );
  }

  if (matchingTab?.type === false) {
    return null;
  }

  return (
    <div className="flex justify-end items-center mb-4">
      <div className="flex items-center justify-end">
        {searchInput}
      </div>
    </div>
  );
}

export default Search
