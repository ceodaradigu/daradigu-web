'use client';

import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Crear IA', href: '/crear' },
  { name: 'Automatizar', href: '/automatizar' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Dashboard', href: '/dashboard' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Disclosure as="nav" className="bg-gradient-to-r from-purple-900 via-black to-blue-900 shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex items-center">
                  <h1 className="text-white font-bold text-xl">Daradigu IA</h1>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <a key={item.name} href={item.href} className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white">
                    {open ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white p-8">
        {children}
      </main>
    </>
  );
}