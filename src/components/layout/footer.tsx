'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t h-[80px] flex items-center">
      <div className="container flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Your Company. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/about" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
} 