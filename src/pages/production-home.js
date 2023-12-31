import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/UserContext';
import Head from 'next/head'
//import Header from '@/Components/Header'
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';

function ProductionHome() {
  const { user, handleLogout } = useContext(UserContext);
  const router = useRouter();
  const logUserInteractionToNewRelic = (interactionType) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Api-Key", process.env.NEXT_PUBLIC_NEWRELIC_API_KEY);
  
    var logPayload = {
      timestamp: new Date().toISOString(),
      message: `User '${user.UserID}' clicked on '${interactionType}' screen`,
      logtype: "user-interaction",
      service: "login-service",
      hostname: "login.example.com",
    };
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(logPayload),
      redirect: 'follow'
    };
  
    fetch(process.env.NEXT_PUBLIC_NEWRELIC_LOG_ENDPOINT, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error('Error logging to New Relic:', error));
  };
  
  
  return (
    <>
    <Head>
        <title>MSSPL Production Home</title>
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
          
          <p className="title"> Home</p>
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

        {/* Button Content */} 

        <div className="d-flex justify-content-center">
           
        <Link href="/start-resume-production">
  <button
    className="mt-5 mb-4 btn btn-home"
    type="submit"
    onClick={() => logUserInteractionToNewRelic("start-resume-production")}
  >
    Start / Resume Production
  </button>
</Link>

         
       </div>
      <div className="d-flex justify-content-center">
          
        <Link href="/record-breakdown">
          <button 
          className=" mt-4 mb-4 btn btn-home" 
          type="submit"
          onClick={() => logUserInteractionToNewRelic("record-breakdown")}
          >Record Breakdown</button>
        </Link>
      
       </div>

      <div className="d-flex justify-content-center">
          
      <Link href="/end-production">

           <button 
           className=" mt-4 mb-4 btn btn-home" 
           type="submit"
           onClick={() => logUserInteractionToNewRelic("end-production")}
           > End Production</button>

          </Link>

       </div>
      <div className="d-flex justify-content-center">
          
      <Link href="/search-stock">

           <button 
           className=" mt-4 mb-5 btn btn-home" 
           type="submit"
           onClick={() => logUserInteractionToNewRelic("search-stock")}
           >Search Stock</button>
           
        </Link>

       </div>


        </section>
      </div>
    </>
  )
}

export default ProductionHome