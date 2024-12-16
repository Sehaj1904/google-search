import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto bg-[#171717] text-[#9aa0a6]">
      <div className="px-6 py-3 border-b border-[#3c4043]">
        <span>India</span>
      </div>
      <div className="px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="#" className="text-sm hover:text-white" title="Advertising">Advertising</Link>
          <Link href="#" className="text-sm hover:text-white" title="Business">Business</Link>
          <Link href="#" className="text-sm hover:text-white" title="How Search works">How Search works</Link>
        </div>
        <div className="flex gap-6">
          <Link href="#" className="text-sm hover:text-white" title="Privacy">Privacy</Link>
          <Link href="#" className="text-sm hover:text-white" title="Terms">Terms</Link>
          <Link href="#" className="text-sm hover:text-white" title="Settings">Settings</Link>
        </div>
      </div>
    </footer>
  )
}

