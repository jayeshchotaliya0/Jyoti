import moment from 'moment';

export const setCookie = (name: string, value: string, days?: number): void => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/; localhost`; // Simplified concatenation
};

export const onlyAllowNumber = (evt: string): string => {
  const numValue = evt.replace(/[^0-9.]/g, '');
  return numValue;
};
export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  if (typeof document !== 'undefined') {
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
  }
  // Return null if the cookie with the given name is not found
  return null;
};
export const clearCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const formatPathname=(pathname:any)=> {
  return pathname
    .replace(/^\/+/, '') // Remove leading slashes
    .replace(/-/g, ' ') // Replace all hyphens with spaces
    .split(' ')
    .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const StatusColumn: React.FC<{
  row: {
      id: number;
      status: boolean;
  };
  onStatusChange?: (id: number) => void;
}> = ({ row, onStatusChange }:any) => (
  <label className="inline-flex items-center cursor-pointer">
      <input
          type="checkbox"
          className="sr-only peer"
          checked={row?.status}
          onChange={() => onStatusChange(row?.id)}
      />
      <div className="relative w-11 h-6 mt-2 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
  </label>
);


export const showFormattedDate = (date:any) => {
  return date ? moment(date).format("DD-MMMM-YYYY") : null;
};

export const showFormattedTime = (time:any) => {
  return time ? moment(time, "HH:mm:ss").format("hh:mm:ss A") : null;
};
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Convert hours to 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${period}`;
};