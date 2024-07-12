import React from 'react';
export interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="navbar relative top-0 z-[1] flex h-28 w-full bg-white px-5 py-0 text-black-300 shadow-xl">
      <div className="flex-1">
        <p className="btn btn-ghost text-xl">{title}</p>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
