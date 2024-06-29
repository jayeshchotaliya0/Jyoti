import React from 'react';

const ExpandableIcon = ({ isExpanded }:any) => (
  <div>
    {isExpanded ?   <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 16 2"> 
   <path d="M4,12a1,1,0,0,1,1-1H19a1,1,0,0,1,0,2H5A1,1,0,0,1,4,12Z" transform="translate(-4 -11)"> 
   </path> 
   </svg> :  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 24 24"> 
   <path d="M119,1495h-6v6h-2v-6h-6v-2h6v-6h2v6h6Z" transform="translate(-100 -1482)"> 
   </path> 
   </svg> }
  </div>
);

export default ExpandableIcon;