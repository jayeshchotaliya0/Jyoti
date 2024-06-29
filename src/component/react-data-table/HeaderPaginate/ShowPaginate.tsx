import TabArray from '@/utils/SearchTabingArray';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const ShowPaginate = () => {
  const pathname = usePathname();
  const matchingTab = TabArray.find((tab) => tab.url === pathname);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex:any) => {
    setActiveTab(tabIndex);
  };

  if (matchingTab && matchingTab.showTab && matchingTab.tab) {
    return (
      <div className={`flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 grid grid-cols-${matchingTab?.tab?.length} gap-4 w-full`}>
        {matchingTab.tab.map((tab, index) => (
          <div className="flex cursor-pointer w-full" key={index}>
            <div
              className={`inline-block px-4 py-3 rounded-lg ${
                activeTab === index + 1
                  ? "text-black w-full border-b-2 border-green-500"
                  : "hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white w-full"
              }`}
              aria-current={activeTab === index + 1 ? "page" : undefined}
              onClick={() => handleTabClick(index + 1)}
            >
              {tab}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default ShowPaginate;
