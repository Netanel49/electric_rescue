'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Login() {
  const { data: sessionData } = useSession();
  return (
    <a
      onClick={async () => {
        if (sessionData?.user) signOut();
        else signIn();
      }}
      className={
        sessionData?.user
          ? 'mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          : 'mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
      }
    >
      {sessionData?.user ? <>{sessionData.user.name}</> : <>login</>}
    </a>
  );
}
