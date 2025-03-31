'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import Contact from "./Contact";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-black text-2xl font-bold bg-gradient-to-r bg-clip-text">
              Fantastic Furniture
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" currentPath={pathname}>
              Home
            </NavLink>
            <NavLink href="/deals" currentPath={pathname}>
                Deals
            </NavLink>
            <NavLink href="/favorites" currentPath={pathname}>
              Favorites
            </NavLink>
            <NavLink href="/cart" currentPath={pathname}>
              Cart
            </NavLink>
            <Contact/>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-500 hover:text-gray-900 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>


      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          <MobileNavLink href="/" currentPath={pathname}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/deals" currentPath={pathname}>
            Deals
          </MobileNavLink>
          <MobileNavLink href="/favorites" currentPath={pathname}>
            Favorites
          </MobileNavLink>
          <MobileNavLink href="/cart" currentPath={pathname}>
            Cart
          </MobileNavLink>
          <MobileNavLink href="/contact" currentPath={pathname}>
            Contact
          </MobileNavLink>
        </div>
      </div>
    </header>
  );
}

// Component for desktop navigation links
function NavLink({ href, currentPath, children }: { href: string; currentPath: string | null; children: React.ReactNode }) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></span>
      )}
    </Link>
  );
}

function MobileNavLink({ href, currentPath, children }: { href: string; currentPath: string | null; children: React.ReactNode }) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {children}
    </Link>
  );
}