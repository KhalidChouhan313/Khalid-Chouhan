'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/header/Header';
import ChatsIcon from '@/components/common/Chat/ChatsIcon';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      {!isAdmin && <ChatsIcon />}
      {children}
    </>
  );
}
