import React from 'react'

const Footer = () => {
  return (
    <div className="mb-16 flex flex-col">
  <div className="flex-grow">
    {/* Your main content goes here */}
  </div>
  <div className="footer bg-white py-2 w-full fixed bottom-0 text-xs">
    <div className="container mx-auto">
      <div className="flex mx-96">
        <div className="text-gray-600 mx-28">
          &copy; 2024 SmartPPC. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Footer
