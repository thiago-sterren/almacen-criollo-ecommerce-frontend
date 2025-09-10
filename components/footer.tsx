import Link from "next/link"
import { Separator } from "./ui/separator"

const categories = [
    {
        id: 1,
        name: "Vino",
        link: "/category/vino"
    },
    {
        id: 2,
        name: "Whisky",
        link: "/category/whisky"
    },
    {
        id: 3,
        name: "Mate",
        link: "/category/mate"
    },
    {
        id: 4,
        name: "Cocina",
        link: "/category/cocina"
    },
    {
        id: 5,
        name: "Cervecería",
        link: "/category/cerveceria"
    },
    {
        id: 6,
        name: "Chocolatería",
        link: "/category/chocolateria"
    },
]

const dataFooter = [
    {
        id: 1,
        name: "Instagram",
        link: "https://www.instagram.com/almacencriollo_sunchales/"
    },
    {
        id: 2,
        name: "WhatsApp",
        link: "https://wa.me/5493493660838"
    },
    {
        id: 3,
        name: "Contacto del desarrollador de la página",
        link: "https://wa.me/5493493520698"
    },
    // {
    //     id: 4,
    //     name: "Sobre nosotros",
    //     link: "#"
    // },
    // {
    //     id: 5,
    //     name: "Política de privacidad",
    //     link: "#"
    // },
] 

const Footer = () => {
    return (
        <footer className="mt-4 select-none">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between px-5 sm:px-0">
                    <p className="whitespace-nowrap sm:px-5">
                        <span className="font-bold">
                            AlmacénCriollo
                        </span>
                        E-commerce
                    </p>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-500 dark:text-gray-400 pt-5 sm:pt-0 pl-0 md:pl-5">
                        {categories.map((data) => (
                            <li key={data.id}>
                                <Link href={data.link} className="hover:underline me-4 md:me-6 whitespace-nowrap">{data.name}</Link>
                            </li>
                        ))} 
                    </ul>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-500 dark:text-gray-400">
                        {dataFooter.map((data) => (
                            <li key={data.id}>
                                <Link href={data.link} target="_blank" className="hover:underline me-4 md:me-6 whitespace-nowrap">{data.name}</Link>
                            </li>
                        ))} 
                    </ul>
                </div>
                <Separator className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    &copy; 2025 <Link href="https://wa.me/5493493520698" target="_blank" className="hover:underline font-bold">SterrenDev</Link>. Todos los derechos reservados
                </span>
            </div>
        </footer>
    )
}

export default Footer