import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/UserContext';
import Head from 'next/head'
//import Header from '@/Components/Header'
import Production from '@/Components/Production'
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';


function Startproduction() {
  const { user, handleLogout } = useContext(UserContext);
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [user, router]);

  // const handleLogout = () => {
  //   setUser(null);
  //   router.push('/login');
  // };
  return (
    <>
    <Head>
        <title>MSSPL Start / Resume Production</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content h-100">

        {/* Header Component */}
        <section>
        <div className="row">
        <div className="col">
        <Link href="/production-home">
               
                  <Image
                    className="header-logo"
                    src="/msspl-logo.png"
                    alt="logo"
                    width={115}
                    height={115}
                  />
                
              </Link>
        </div>
        <div className="col centre pt-5">
          
          <p className="title"> Start/Resume Production</p>
        </div>
        <div className="col pt-5 user-details">
        {user && (
            <>
              <p className="username">User Name: {user.UserID}</p>
              {user.Branch && user.Branch.length > 0 && (
                <p className="branch">Branch: {user.Branch[0].BranchName}</p>
              )}
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>

      <hr />

        {/* Form Content */} 
        <Production />

       

        </section>
      </div>
    </>
  )
}

export default Startproduction