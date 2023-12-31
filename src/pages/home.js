import React from 'react'
import Head from 'next/head'
import Header from '@/Components/Header'
import Searchform from '@/Components/Searchform'
import "../styles/Home.module.css"

const Home = () => {
  return (
   <>

<Head>
        <title>MSSPL HOME PAGE</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content h-100">

        {/* Header Component */}
        <section>
          <Header />

        {/* Button  Content */} 

        <div class="d-flex justify-content-center">
           
           <button class="mt-5 mb-4 btn btn-home" type="submit">Search Stock</button>

         
       </div>
      <div class="d-flex justify-content-center">
          
           <button class=" mt-4 mb-4 btn btn-home" type="submit">Production</button>

      
       </div>

      <div class="d-flex justify-content-center">
          

           <button class=" mt-4 mb-4 btn btn-home" type="submit">View Stock</button>

          
       </div>
      <div class="d-flex justify-content-center">
          

           <button class=" mt-4 mb-5 btn btn-home" type="submit">Reports</button>
        
       </div>

        </section>
      </div>
   
   </>
  )
}

export default Home