'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import {  Edit, MoreHorizontal, Plus, Trash2 } from 'lucide-react'
import { DataTable } from './data-table'
import { ProductDialog } from './product-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CellContext, ColumnDef } from '@tanstack/react-table'
import { Dropdown } from 'react-day-picker'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Badge } from './ui/badge'


export interface Product{
    id:number
    title:string 
    price:number 
    category:string 
    brand?:string 
    stock: number 
    description?:string 
    thumbnail?:string 
    images?:string[]
    createdAt?:string 
    updatedAt?:string 
}

export function ProductTable () {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    // const [products, setProducts] = React.useState<Product[]>([])
    const [editingProduct, setEditingProduct] =useState<Product | null>(null)

    const queryClient = useQueryClient()

    const{data:products= [], isLoading} = useQuery({queryKey:["products"],
        queryFn: async()=>{
             const response = await fetch("/api/products")
             if(!response.ok){
                throw new Error("Error fetching products")
             }
             const data = await response.json()
             return data as Product[]
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async(id:number)=>{
            const response = await fetch(`/api/products/${id}`,{method:"DELETE",})
            if(!response.ok){
                throw new Error("Failed to delete product")
            }
            return response.json()
        },

        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["products"]})
            toast("Product deleted",{
                description:"product has been deleted successfully!",
            })
        },
        onError:(error:Error)=>{
            toast("Error"),{
                description: error.message || "failed to delete product",
            }
        }
    })

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey:"title",
            header: "Product Name",
        },

        
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                const price = Number.parseFloat(row.getValue("price"))

                const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                }).format(price)

                return formatted
            },
        },

        {
            accessorKey:"category",
            header: "Category",
            cell:({row})=><Badge variant="secondary" >
            {row.getValue("category")}</Badge>
        },

        {
            accessorKey:"brand",
            header: "Brand",
            cell:({row})=>{
                const brand = row.getValue("brand") as string
                return brand? <Badge variant ="outline">{brand}</Badge> : "-"
            }
        },

         {
            accessorKey:"stock",
            header: "Stock",
            cell:({row})=>{
                const stock = row.getValue("stock") as number
                return <Badge variant ={stock>10?"default": stock>0 ? "secondary": "destructive"}>{stock}</Badge>
            }
        },

         {
            accessorKey:"createdAt",
            header: "Created At",
            cell:({row}:CellContext<Product, unknown>) =>{

                const createdAt = row.getValue("createdAt") as string
                const formatted = new Intl.DateTimeFormat("en-US",{
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }).format(new Date(createdAt))
                return formatted
            }
        },

        {
            id: "actions",
            cell:({row})=>{
                const product = row.original
                return(
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} className='h-8 w-8 p-0'>
                                <MoreHorizontal className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem onClick={()=>{
                                setEditingProduct(product)
                                setIsDialogOpen(true)
                            }}>
                                <Edit className='mr-2 h-4 w-4'/>
                                Edit

                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={()=>
                                deleteMutation.mutate(product.id)}
                                className='text-destructive'
                                disabled={deleteMutation.isPending}
                                >
                                <Trash2 className='mr-2 h-4 w-4'/>
                                {deleteMutation.isPending ? "Deleting...":"Delete"}

                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }

        
    ]

    if(isLoading){
        return(
            <div className="flex items-center justify-center p-8">Loading products...</div>
        )
    }



  return (
    <div className='space-x-6'>
        <div className="flex justify-between items-center">
            <h1 className='text-2xl font-bold'>Products</h1>
            <Button onClick={()=> setIsDialogOpen(true)}>
              <Plus className='w-4 h-4 mr-4'/>  Add product
            </Button>
        </div>

        <DataTable
            columns = {columns}
            data = {products}
            searchKey = 'title'
            searchPlaceholder = "Search products..."
         />

         <ProductDialog 
         open = {isDialogOpen}
         onOpenChange = {(open)=>{setIsDialogOpen(open);
            if(!open){
                setEditingProduct(null);
            }
         }}
         product = {editingProduct}
         />


    </div>
  )
}

