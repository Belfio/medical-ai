// import UserNav from "./UserNav";

import Search from "./Search";

export default function Header({ user }: { user?: { email: string } }) {
  console.log("user", user);
  return (
    <header className="bg-white border-b border-muted dark:border-muted  ">
      <div className="flex items-center justify-between h-16 px-4 pr-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Medical AI</h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          {/* <UserNav user={user} /> */}
        </div>
      </div>
    </header>
  );
}
