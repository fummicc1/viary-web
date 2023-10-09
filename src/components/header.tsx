import Image from "next/image";
import { LogOutButton } from "./auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession();
  if (!session) {
    return <div></div>;
  }
  const { user } = session;
  if (!user) {
    return <div></div>;
  }
  return (
    <header className="border-b flex items-center p-2">
      <h1 className="text-xl m-2">
        <a href="/">Viary</a>
      </h1>
      <div className="grow"></div>
      <Link className="flex items-center" href={"/profile"}>
        <Image
          className="rounded-full"
          src={user.image || ""}
          alt="user profile image"
          width={32}
          height={32}
        ></Image>
        <p className="m-2">{user?.name}</p>
      </Link>
      <div className="ml-4">
        <LogOutButton></LogOutButton>
      </div>
    </header>
  );
}
