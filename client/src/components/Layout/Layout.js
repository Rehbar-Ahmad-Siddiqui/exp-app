import React from 'react'
import Header from './Header'
import Footer from './Footer'

// Here {children} is passing as object destructing in function arguments
const Layout = ({children}) => {
  return (
    <>
       <Header/>
       <div className='content'>
        {/* Here child elements or children are HomePage content under h1 in <Layout></Layout> */}
          {children}
       </div>
       <Footer/>
    </>
  )
}

export default Layout