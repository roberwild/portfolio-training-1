'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre Nosotros', href: '/about' },
  { name: 'Contacto', href: '/contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === "system" ? systemTheme : theme

  // No renderizar nada dependiente del tema hasta que el componente esté montado
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 transition-colors duration-300 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="h-8 w-32" /> {/* Espacio para el logo */}
            <nav>
              <ul className="flex items-center gap-6">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <div className="text-sm font-medium h-4 w-16" /> {/* Espacio para el enlace */}
                  </li>
                ))}
                <li>
                  <div className="rounded-full w-9 h-9" /> {/* Espacio para el botón de tema */}
                </li>
                <li>
                  <div className="w-20 h-10" /> {/* Espacio para el botón de contacto */}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src={currentTheme === 'dark' 
                ? "/images/logo/logo-singular-bank-white.svg" 
                : "/images/logo/sb-logo-n.svg"}
              alt="Singular Bank Logo"
              width={120}
              height={32}
              className={`transition-opacity duration-300 ${isScrolled ? 'opacity-90 hover:opacity-100' : 'opacity-90 hover:opacity-100'}`}
            />
          </Link>
          <nav>
            <ul className="flex items-center gap-6">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      isScrolled 
                        ? 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white' 
                        : (currentTheme === 'dark' ? 'text-white/90 hover:text-white' : 'text-zinc-600 hover:text-black')
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`rounded-full w-9 h-9 ${
                    isScrolled 
                      ? 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white bg-white/10 dark:bg-black/10' 
                      : (currentTheme === 'dark' ? 'text-white/90 hover:text-white' : 'text-zinc-600 hover:text-black')
                  }`}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                  ) : (
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                  )}
                  <span className="sr-only">Cambiar tema</span>
                </Button>
              </li>
              <li>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium"
                >
                  Contacto
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
} 