"use client"

import { useGetOrderByToken } from "@/api/useGetOrderByToken"
import { useParams } from "next/navigation"
import { ShippingCost } from "@/lib/shippingCost"
import { formatPrice } from "@/lib/formatPrice"
import Link from "next/link"

export default function Page() {
    const { orderToken } = useParams()
    const { result, loading, error } = useGetOrderByToken(orderToken ?? "")

    if (loading) {
        return (
            <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
                <p className="text-center text-lg text-gray-500">
                    Cargando tu orden...
                </p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24 text-center">
                <p className="text-lg text-red-500">
                    Error: {error}
                </p>
                <p>
                    Si recibís este error, agradeceríamos mucho que nos lo hagas saber, para poder arreglarlo :).
                </p>
            </div>
        )
    }

    if (!result) {
        return (
            <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
                <p className="text-center text-lg text-gray-500">
                    No se encontró la orden en la base de datos.
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="p-8 max-w-2xl mx-auto">
                {result.orderStatus === "paid" && (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">
                            Tu pago fue confirmado, ¡gracias {result.firstName}!
                        </h1>
                        {result.paymentMethod === "mercado_pago" && (
                            result.deliveryMethod === "shipping" ? (
                                <p>
                                    Estaremos contactándote para coordinar la entrega del pedido. Recordá enviarnos tu comprobante de pago vía WhatsApp o Instagram, si aún no lo hiciste.
                                </p>
                            ) : (
                                <p>
                                    Ya podés pasar a retirar tu pedido en nuestro local, en J. B. Justo 361. Recordá enviarnos tu comprobante de pago vía WhatsApp o Instagram, si aún no lo hiciste.
                                </p>
                            )
                        )}
                    </div>
                )}
                {result.orderStatus === "cancelled" && (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">
                            Tu orden fue cancelada
                        </h1>
                        {result.paymentMethod === "mercado_pago" && (
                            <p>
                                Lo sentimos, Mercado Pago canceló tu pago. Podés reintentar tu compra, o contactarte con nosotros ante cualquier problema o queja.
                            </p>
                        )}
                    </div>
                )}
                {result.orderStatus === "pending" && (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">
                            Tu pago está pendiente
                        </h1>
                        {result.paymentMethod === "cash" ? (
                            <p>
                                {result.deliveryMethod === "pickup" ? 
                                "A realizarse en efectivo cuando retires el pedido por nuestro local en J. B. Justo 361." : 
                                "A realizarse en efectivo cuando hagamos la entrega del pedido en tu domicilio. Estaremos contactándote para coordinar la misma."}
                            </p>
                        ) : (
                            <p>
                                Estamos esperando que Mercado Pago nos haga llegar la confirmación de tu pago, ¡te notificaremos cuando tengamos novedades! Mientras tanto, te solicitamos que nos envíes tu comprobante de pago vía WhatsApp o Instagram.
                                Aclaración: si no recibimos la confirmación dentro de las 48hs posteriores a la creación de la orden, cancelaremos la misma.
                            </p>
                        )}
                    </div>
                )}

                <div className="mt-6 bg-gray-100 p-4 rounded-xl dark:text-black">
                    <h2 className="font-semibold">Resumen del pedido:</h2>
                    <ul className="mt-2 space-y-1">
                        {result.products?.map((item) => (
                            <li key={item.id}>
                                {item.productName} (x{item.quantity}): {formatPrice(item.unitPrice * item.quantity)}
                            </li>
                        )) || <li>No hay productos</li>}
                    </ul>
                    {result.paymentMethod === "cash" && (
                        <p className="mt-2">Descuento por pago en efectivo: {formatPrice(result.products.reduce((total, item) => total + item.unitPrice * item.quantity, 0) * 0.1)}</p>
                    )}
                    {result.deliveryMethod === "shipping" && (
                        <p className="mt-2">Costo de envío: {formatPrice(ShippingCost())} (A entregar en: {result.address})</p>
                    )}
                    <p className="mt-2 font-bold">Total: {formatPrice(result.totalPrice || 0)}</p>
                </div>
                <p className="mt-7 text-center">Podés guardar este link para seguir el estado de tu orden: 
                    <Link href={`/order/${result.orderToken}`} className="border-b-2 text-sky-500 border-sky-500 hover:text-sky-600 hover:border-sky-600 transition-colors"> {`/order/${result.orderToken}`}</Link>
                </p>
            </div>
        </>
    )
}