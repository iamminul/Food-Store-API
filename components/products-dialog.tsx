import { useEffect, useState } from "react"
import { Product } from "./ProductTable"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Dialog,DialogHeader, DialogTitle ,DialogContent } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { toast } from "sonner"





interface ProductDialogProps{
    open: boolean
    onOpenChange: (open: boolean)=>void
    product?: Product | null
}

export function ProductDialog({open,onOpenChange,product}:ProductDialogProps){
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        stock: "",
        brand: "",
        description: "",
    })

    const queryClient = useQueryClient()

    useEffect(()=>{
        if(product){
            setFormData({
                title: product.title,
                price: product.price.toString(),
                stock: product.stock.toString(),
                brand: product.brand || "",
                description: product.description || ""
            })
        }else{
            setFormData({
                title: "",
                price: "",
                stock: "",
                brand: "",
                description: "",
            })
        }
        
    },[product])



    const mutation = useMutation({
        mutationFn: async(data:any)=>{
            const url = product? `/api/products/${product.id}`: "/api/products"
            console.log("[v0 Submitting product data:", data)
            const response = await fetch(url,{
                method: product ? "PUT":"POST",
                headers: {"Content type":"application-json"},
                body: JSON.stringify({
                    ...data,
                    category: "groceries",
                    price: Number.parseFloat(data.price),
                    stock: Number.parseFloat(data.stock),
                })
            })
            if(!response.ok){
                const errorData = await response.json()
                throw new Error (errorData.error || "Failed to save product")
            }
            return response.json()
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["products"]})
            // console.log("[v0] Product operation successfully")
            toast(product?"Prouduct updated":"Product created",{
                description:`Product has been successfully ${product?"updated":"created"}.`,
            })
            onOpenChange(false)
        },
        onError:(error)=>{
            console.log("[v0] Product operation failed:",error)
            toast("Error",{
                description:error.message || "Failed to save product"
            })
        }
    })


    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault()
        mutation.mutate(formData)
    }
    return(
        <Dialog  open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{product?"Edit Product":"Add new product"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Product Name</Label>
                        <Input
                        id = "title"
                        value = {formData.title}
                        onChange={(e)=>setFormData({...formData,title:e.target.value})}
                        required
                        />
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="title">Price</Label>
                        <Input
                        id = "price"
                        type="number"
                        step="0.01"
                        value = {formData.title}
                        onChange={(e)=>setFormData({...formData,price:e.target.value})}
                        required
                        />
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                        id = "brand"
                        value = {formData.brand}
                        onChange={(e)=>setFormData({...formData,brand:e.target.value})}
                        required
                        />
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                        id = "stock"
                        type="number"
                        value = {formData.stock}
                        onChange={(e)=>setFormData({...formData,stock:e.target.value})}
                        required
                        />
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                        id = "description"
                        value = {formData.description}
                        onChange={(e)=>setFormData({...formData,description:e.target.value})}
                        rows={3}
                        required
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant={"outline"} onClick={()=>onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending?"Saving...": product?"Update":"Create"}

                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}