import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Slab } from 'next/font/google'

const roboto = Roboto_Slab({subsets:["latin"]}); 

export const metadata: Metadata = {
  title: 'Markdown editor',
  description: 'Markdown editor in web',
  authors: [{
    name:"Guido Olguin",
    url:"https://portfolio-guidoolguin.vercel.app/"
  }]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
