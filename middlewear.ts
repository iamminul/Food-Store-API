import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


const isAdminRoute = createRouteMatcher(["/admin(.*)"])
const isApiAdminRoute = createRouteMatcher(["/api/products(.*)","/api/orders(.*)"])

export default clerkMiddleware(async(auth,req)=>{
  const {userId} = await auth()
  //protect admin route.jodi user id na thake, tahole send to sign-in page

  if(isAdminRoute(req)){
    if(!userId){
      return NextResponse.redirect(new URL('/sign-in',req.url))
    }
  }

  //protect api admin route
  if(isApiAdminRoute(req)){
    if(!userId){
      return NextResponse.json({ error:"unauthorized"},{status:401})
    }
  }
  // otherwise get request to local host
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}