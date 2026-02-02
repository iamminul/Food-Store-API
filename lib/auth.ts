import { auth, currentUser } from "@clerk/nextjs/server"
import { permission } from "process"



export async function getCurrentUser(){
    const {userId} = await auth()
    const clerkUser = await currentUser()

    if(!userId || !clerkUser){
        return null
    }
    return {
        id: userId,
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
        role: clerkUser.publicMetadata?.role || "admin", //default to admin
        permission: clerkUser.publicMetadata?.permission || {}, //get permission from clerk
        clerkUser, //include full clerk user object for additional data
    }
}


export async function requireAuth(){
    const user = await getCurrentUser()
    if(!user){
        throw new Error("unauthorized")
    }
    return user

}