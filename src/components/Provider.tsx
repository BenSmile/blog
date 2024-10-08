"use client";

import React from "react";

import { SessionProvider } from 'next-auth/react';
import { Session } from "next-auth";


interface ProviderI {
  children: React.ReactNode;
  session: Session
}

const Provider = ({ children, session }: ProviderI) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider