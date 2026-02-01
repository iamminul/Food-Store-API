import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const sampleProducts = [
    {
        title: "Organic Banana",
        description: "Fresh organic banana, perfect for smoothie",
        price: 2.99,
        category: "groceries",
        brand: "Organic valley",
        stock: 150,
        thumbnai:"/organic-banana.png",
        images:["/organic-bnana.png"],
    },
     {
        title: "Organic Banana",
        description: "Fresh organic banana, perfect for smoothie",
        price: 2.99,
        category: "groceries",
        brand: "Organic valley",
        stock: 150,
        thumbnai:"/organic-banana.png",
        images:["/organic-bnana.png"],
    },
     {
        title: "Organic Banana",
        description: "Fresh organic banana, perfect for smoothie",
        price: 2.99,
        category: "groceries",
        brand: "Organic valley",
        stock: 150,
        thumbnai:"/organic-banana.png",
        images:["/organic-bnana.png"],
    },
     {
        title: "Organic Banana",
        description: "Fresh organic banana, perfect for smoothie",
        price: 2.99,
        category: "groceries",
        brand: "Organic valley",
        stock: 150,
        thumbnai:"/organic-banana.png",
        images:["/organic-bnana.png"],
    },
     {
        title: "Organic Banana",
        description: "Fresh organic banana, perfect for smoothie",
        price: 2.99,
        category: "groceries",
        brand: "Organic valley",
        stock: 150,
        thumbnai:"/organic-banana.png",
        images:["/organic-bnana.png"],
    },
     {
        title: "Organic Banana",
        description: "Fresh organic banana, perfect for smoothie",
        price: 2.99,
        category: "groceries",
        brand: "Organic valley",
        stock: 150,
        thumbnai:"/organic-banana.png",
        images:["/organic-bnana.png"],
    },
     {
        title: "Organic Banana",
        description: "Fresh organic banana, perfect for smoothie",
        price: 2.99,
        category: "groceries",
        brand: "Organic valley",
        stock: 150,
        thumbnai:"/organic-banana.png",
        images:["/organic-bnana.png"],
    },
     {
        title: "Organic Banana",
        description: "Fresh organic banana, perfect for smoothie",
        price: 2.99,
        category: "groceries",
        brand: "Organic valley",
        stock: 150,
        thumbnai:"/organic-banana.png",
        images:["/organic-bnana.png"],
    },
     {
        title: "Organic Banana",
        description: "Fresh organic banana, perfect for smoothie",
        price: 2.99,
        category: "groceries",
        brand: "Organic valley",
        stock: 150,
        thumbnai:"/organic-banana.png",
        images:["/organic-bnana.png"],
    },
     
]

const sampleOrders = [
    {
        userId: 1,
        status: "DELIVERED" as const,
        total: 23.47,
        orderItems:[
            {productId:1,quantity:2,price:2.99},
            {productId:1,quantity:2,price:2.99},
            {productId:1,quantity:2,price:2.99},
        ],
    },
     {
        userId: 2,
        status: "DELIVERED" as const,
        total: 23.47,
        orderItems:[
            {productId:1,quantity:2,price:2.99},
            {productId:1,quantity:2,price:2.99},
            {productId:1,quantity:2,price:2.99},
        ],
    },
     {
        userId: 3,
        status: "DELIVERED" as const,
        total: 23.47,
        orderItems:[
            {productId:1,quantity:2,price:2.99},
            {productId:1,quantity:2,price:2.99},
            {productId:1,quantity:2,price:2.99},
        ],
    },
     {
        userId: 4,
        status: "DELIVERED" as const,
        total: 23.47,
        orderItems:[
            {productId:1,quantity:2,price:2.99},
            {productId:1,quantity:2,price:2.99},
            {productId:1,quantity:2,price:2.99},
        ],
    },
     {
        userId: 5,
        status: "DELIVERED" as const,
        total: 23.47,
        orderItems:[
            {productId:1,quantity:2,price:2.99},
            {productId:1,quantity:2,price:2.99},
            {productId:1,quantity:2,price:2.99},
        ],
    },
    
]

async function main(){
    console.log("Starting Database Seed...")

    //Clear existing data
    console.log("Clearing existing data...")
    await prisma.orderItems.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.user.deleteMany()

    //Create sample users(these would be normally created by user)
    console.log("Create sample users...")
    const users = await Promise.all([
        prisma.user.create({
            data:{
                clerkId:"user-sample1",
                email:"john@exmaple.com",
                firsName:"John",
                lastName:"Doe",
                role:"USER"
            },
        }),
        prisma.user.create({
            data:{
                clerkId:"user-sample2",
                email:"john@exmaple.com",
                firsName:"John",
                lastName:"Doe",
                role:"USER"
            },
        }),
        prisma.user.create({
            data:{
                clerkId:"user-sample3",
                email:"john@exmaple.com",
                firsName:"John",
                lastName:"Doe",
                role:"USER"
            },
        }),
        prisma.user.create({
            data:{
                clerkId:"user-sample4",
                email:"john@exmaple.com",
                firsName:"John",
                lastName:"Doe",
                role:"USER"
            },
        }),
        prisma.user.create({
            data:{
                clerkId:"user-sample5",
                email:"john@exmaple.com",
                firsName:"John",
                lastName:"Doe",
                role:"USER"
            },
        }),
    ])

    //Create Products
    console.log("Creating products...")
    const products = await Promise.all(
        sampleProducts.map((product)=>
            prisma.product.create({
                data:product,
            }),
        ),
    )

    //Create orders with order items
    console.log("Creating orders...")
    for(const orderData of sampleOrders){
        const {orderItems,...order} = orderData

        const createOrder = await prisma.order.create({
            data:{
                userId: Number(order.userId),
                status: order.status,
                total: order.total,
            }
        })

        //Create order items
        await Promise.all(
            orderItems.map((items)=>
                prisma.orderItem.create({
                    data:{
                        orderId:createOrder.id,
                        productId:items.productId,
                        quantity:items.quantity,
                        price:items.price,
                    }
                })
            )
        )
    }

    console.log("Database seeded successfully")
    console.log(`Created: `)
    console.log(` -${users.length} users`)
    console.log(` -${products.length} products`)
    console.log(` -${sampleOrders.length} orders`)

    const totalOrderItems = sampleOrders.reduce((sum, order)=>{

        console.log(` -${totalOrderItems} order items`)
    })
    

}

main()
.catch((e)=>{
    console.log("Error sending to database:", e)
    process.exit(1)
})
.finally(async()=>{
    await prisma.$disconnect()
})




