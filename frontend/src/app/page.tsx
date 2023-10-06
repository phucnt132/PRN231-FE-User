import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        <li><Link href={'/auth/login'} className="hover:text-blue-600">Login page</Link></li>
        <li><Link href={'/auth/register'} className="hover:text-blue-600">Register page</Link></li>
        <li><Link href={'/movie'} className="hover:text-blue-600">Movie page</Link></li>
        <li><Link href={'/movie/1'} className="hover:text-blue-600">Movie detail with id = 1</Link></li>
      </ul>
    </main>
  )
}
