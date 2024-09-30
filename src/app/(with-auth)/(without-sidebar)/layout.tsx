"use client";
import type {ReactNode} from "react";

import {App} from "@/components/app";

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <App showSidebar={false}>
        {children}
      </App>
      </body>
    </html>
  )
}
