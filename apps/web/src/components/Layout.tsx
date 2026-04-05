import Link from 'next/link';
import { PropsWithChildren } from 'react';

const nav = [
  { href: '/', label: 'Dashboard' },
  { href: '/receipt-scanner', label: 'Receipt Scanner' },
  { href: '/scam-checker', label: 'Scam Checker' },
  { href: '/history', label: 'History' },
];

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>SmartSpend Guard</h1>
      </header>
      <nav className="nav-grid">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="nav-card">
            {item.label}
          </Link>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  );
}
