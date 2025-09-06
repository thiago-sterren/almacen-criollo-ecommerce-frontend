"use client"

import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/formatPrice"
import CheckoutItem from "./components/checkout-item"
import BackButton from "@/components/shared/back-button"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { TextField, SelectField } from "./components/form-fields"
import { toast } from "sonner"
import { useValidateCartItemsBeforeSubmit } from "@/api/useValidateCartItemsBeforeSubmit"
import LoadingOverlay from "@/components/shared/loading-overlay"
import { Button } from "@/components/ui/button"
import { ShippingCost } from "@/lib/shippingCost"
import CheckoutGuard from "./components/checkout-guard"

const deliveryOptions = ["Envío (sólo dentro de Sunchales)", "Retiro por local"] // pickup, shipping
const deliveryCost = ShippingCost()
const paymentOptions = ["Mercado Pago", "Efectivo (10% OFF)"] // mercado_pago, cash

export default function Page() {
    const { items, removeAll } = useCart()
    const [finalPrice, setFinalPrice] = useState(items.reduce((total, item) => total + item.price * item.quantity, 0))
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        deliveryMethod: "Envío (sólo dentro de Sunchales)",
        address: "",
        paymentMethod: "Mercado Pago",
        // campos no rellenables por el usuario pero presentes
        mercadoPagoId: "",
        products: "",
        orderStatus: "",
        orderToken: "",
        totalPrice: 0,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const orderToken = useRef<string>("")
    const router = useRouter()
    const { validate } = useValidateCartItemsBeforeSubmit()

    useEffect(() => {
        const storedProducts = localStorage.getItem("cart-storage")
        if (storedProducts) {
            setForm(prev => ({ ...prev, products: storedProducts }))
        }
    }, [])

    useEffect(() => {
        const token = crypto.randomUUID()
        orderToken.current = token
    }, [])

    useEffect(() => {
        const basePrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
        const pricePostCheckingPaymentMethod = form.paymentMethod === "Efectivo (10% OFF)" ? basePrice * 0.9 : basePrice
        const pricePostCheckingDeliveryMethod = form.deliveryMethod === "Envío (sólo dentro de Sunchales)"
            ? pricePostCheckingPaymentMethod + deliveryCost
            : pricePostCheckingPaymentMethod
        
        setFinalPrice(pricePostCheckingDeliveryMethod)
        setForm(prev => ({ ...prev, totalPrice: pricePostCheckingDeliveryMethod }))
    }, [form.paymentMethod, items, form.deliveryMethod])

    const handleChange = (name: string, value: string) => {
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(isSubmitting) return

        setIsSubmitting(true)

        try {
            //1. Validación de los campos
            const isDelivery = form.deliveryMethod === "Envío (sólo dentro de Sunchales)"
            if (!form.firstName || !form.lastName || !form.email || !form.phone || (isDelivery && !form.address)) {
                toast.error("Por favor completá todos los campos.")
                return
            }
            
            const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            if (!isValidEmail(form.email)) {
                toast.error("Email inválido")
                return
            }

            const isValidPhone = (phone: string) => /^[0-9\s\-]{8,}$/.test(phone)
            if (!isValidPhone(form.phone)) {
                toast.error("Teléfono inválido")
                return
            }

            const isValidAddress = (address: string): boolean => {
                const lenghtValidation = address.length >= 7 && address.length <= 50
                const containsStreetAndNumber = /[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+\s\d{1,5}/.test(address)

                return lenghtValidation && containsStreetAndNumber
            }

            const normalizedAddress = form.address
                    .trim()
                    .replace(/\s+/g, ' ')
                    .replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]/g, '')
                    .replace(/\b\w/g, c => c.toUpperCase())

            if (isDelivery && !isValidAddress(normalizedAddress)) {
                toast.error("Dirección inválida.")
                return
            }

            // 2. Validación de stock
            const invalidItems = await validate(items)
            if (invalidItems.length > 0) {
                invalidItems.forEach((item) => {
                    const message = {
                        stock: `No hay suficiente stock para ${item.name}.`,
                        price: `El precio de ${item.name} cambió.`,
                        inactive: `${item.name} ya no está disponible.`,
                        "not-found": `${item.name} no se encontró en el sistema.`,
                        error: `Error al validar ${item.name}.`,
                    }[item.reason]

                    toast.error(message)
                })

                router.push("/cart")
                return
            }

            // 3. Construir productos desde el carrito
            // primero filtro los productos válidos para incluirlos luego en el pedido
            const validItems = items.filter(item => {
                const invalid = invalidItems.find(i => i.slug === item.slug)
                return !invalid
            })

            // estos son los items que entran en el campo products del nuevo registro order
            const formattedProducts = validItems.map(item => ({
                id: item.id,
                slug: item.slug,
                productName: item.productName,
                quantity: item.quantity,
                unitPrice: item.price, // precio actual del producto en el momento en el que se realiza la orden
            }))

            if (formattedProducts.length === 0) {
                toast.error("No hay productos válidos para enviar.")
                return
            }

            // 4. Construir orden final
            const mapDeliveryMethod = (label: string) => {
                if (label === "Envío (sólo dentro de Sunchales)") return "shipping"
                if (label === "Retiro por local") return "pickup"
                return label // fallback
            }

            const mapPaymentMethod = (label: string) => {
                if (label === "Mercado Pago") return "mercado_pago"
                if (label === "Efectivo (10% OFF)") return "cash"
                return label // fallback
            }

            const addressValue = () => {
                if (form.deliveryMethod === "Envío (sólo dentro de Sunchales)") {
                    return normalizedAddress
                } else {
                    return "Retira en Almacén Criollo"
                }
            }
            const finalOrder = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                deliveryMethod: mapDeliveryMethod(form.deliveryMethod),
                address: addressValue(),
                paymentMethod: mapPaymentMethod(form.paymentMethod),
                products: formattedProducts,
                orderStatus: "pending",
                mercadoPagoId: "", // se completará luego si aplica
                orderToken: orderToken.current,
                totalPrice: finalPrice,
            }

            // 5. Enviar al backend
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: finalOrder }),
            })

            const json = await res.json()

            if (!res.ok) throw new Error(json?.error?.message || "Error al crear el pedido")
            
            // 6. Redirigir según método de pago
            if (finalOrder.paymentMethod === "cash") {
                if (!json.orderId) throw new Error("El servidor no devolvió un ID de orden válido.")
                toast.success(`${json.message}`)
                sessionStorage.removeItem("checkoutReady")
                router.push(`/order/${json.orderToken}`)
                removeAll()
                return
            }

            if (finalOrder.paymentMethod === "mercado_pago") {
                if (!json.id || !json.init_point || !json.sandbox_init_point) throw new Error("El servidor no devolvió datos válidos.")
                toast.success(json.message)
                sessionStorage.removeItem("checkoutReady")
                window.location.href = json.init_point // redirige al Checkout Pro
                removeAll()
                return
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message?.includes("duplicado") || error.message?.includes("ya existe")) {
                    toast.error("Este pedido ya fue enviado. No se puede duplicar.")
                } else {
                    toast.error(error.message || "Ocurrió un error al enviar el pedido.")
                }
            } else {
                toast.error("Error inesperado.")
            }
        } finally {
            setIsSubmitting(false)
        }
    }
    
    return (
        <CheckoutGuard>
            <BackButton destinationURL="/cart" clearSessionKey="checkoutReady" />
            <div className="max-w-6xl px-4 py-20 mx-auto sm:px-6 lg:px-8 border-3 mt-20 rounded-lg border-gray-300">
                <h1 className="mb-5 text-3xl font-bold text-center">Checkout</h1>
                <div className="grid sm:grid-cols-2 sm:gap-5 mt-10">
                    <div>
                        {items && items.length === 0 ? (
                            <p>No hay productos en el checkout</p>
                        ) : (
                            <>
                                <ul>
                                    {items.map((item) => (
                                        <CheckoutItem key={item.slug} product={item} />
                                    ))}
                                </ul>
                                <div className="max-w-xl sm:mt-0 pt-2">
                                    <div className="px-6 py-1 rounded-lg bg-slate-100 dark:text-black">
                                        {form.paymentMethod === "Efectivo (10% OFF)" && (
                                            <div className="flex justify-between gap-5 my-4">
                                                <p className="select-none">Descuento por pago en efectivo:</p>
                                                <p className="text-red-700 whitespace-nowrap flex items-center gap-1">
                                                    <span>-</span>
                                                    <span>
                                                        {formatPrice(
                                                            items.reduce((total, item) => total + item.price * item.quantity, 0) * 0.1
                                                        )}
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                        {form.deliveryMethod === "Envío (sólo dentro de Sunchales)" && (
                                            <div className="flex justify-between gap-5 my-4">
                                                <p className="select-none">Costo de envío:</p>
                                                <p className="whitespace-nowrap flex items-center gap-1">
                                                    <span>+</span>
                                                    <span>{formatPrice(deliveryCost)}</span>
                                                </p>
                                            </div>
                                        )}
                                        <div className="flex justify-between gap-5 my-4">
                                            <p className="select-none">Total:</p>
                                            <p>{formatPrice(finalPrice)}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6 p-4 max-w-xl mx-auto">
                            <TextField label="Nombre" name="firstName" value={form.firstName} onChange={handleChange} />
                            <TextField label="Apellido" name="lastName" value={form.lastName} onChange={handleChange} />
                            <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
                            <TextField label="Teléfono" name="phone" type="tel" value={form.phone} onChange={handleChange} />
                            <SelectField label="Método de entrega" name="deliveryMethod" options={deliveryOptions} value={form.deliveryMethod} onChange={handleChange} />
                            {form.deliveryMethod === "Envío (sólo dentro de Sunchales)" &&
                                (<TextField label="Dirección" name="address" value={form.address} onChange={handleChange} />)
                            }
                            <SelectField label="Método de pago" name="paymentMethod" options={paymentOptions} value={form.paymentMethod} onChange={handleChange} />
                            <Button 
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full cursor-pointer ${isSubmitting ? 'bg-gray-500' : 'bg-primary'}`}
                            >
                                {isSubmitting ? "Procesando..." : "Confirmar pedido"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            {isSubmitting && (
                <LoadingOverlay message="Procesando pedido..." />
            )}
        </CheckoutGuard>
    )
}