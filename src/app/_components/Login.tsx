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
      className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      {sessionData?.user ? <>logout</> : <>login</>}
    </a>
  );
}
