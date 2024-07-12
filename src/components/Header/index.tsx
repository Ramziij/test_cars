export interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="navbar relative top-0 z-[1] flex h-28 w-full bg-white px-5 py-0 text-black-300 shadow-xl">
      <div className="flex-1">
        <p className="btn btn-ghost text-xl">{title}</p>
      </div>
    </div>
  );
}
