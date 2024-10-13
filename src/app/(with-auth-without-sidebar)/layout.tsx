"use client";
import type {ReactNode} from "react";

import {App} from "@/components/app";

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <App showSidebar={false}>
      {children}
    </App>
  )
}
