"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const MenuList = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {/* {<NavigationMenuItem>
          <NavigationMenuTrigger>Sobre nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      Almacén Criollo
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Información y contacto.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/shop" title="Tienda">
                Accede a toda tu información, tus pedidos y mucho más.
              </ListItem>
              <ListItem href="/offers" title="Ofertas">
                Sección dedicada a promociones y descuentos especiales.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>} */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
          <NavigationMenuContent className="absolute left-1/2 transform -translate-x-1/2">
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuList

const ListItem = ({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) => {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Vinos",
    href: "/category/vinos",
    description: "Todas nuestras variedades en tipos y marcas de vino.",
  },
  {
    title: "Whiskies",
    href: "/category/whiskies",
    description: "Para tu viejo, para hacer un presente, o para vos.",
  },
  {
    title: "Espumantes",
    href: "/category/espumantes",
    description: "Brindá en cada ocasión especial con nuestra selección de espumantes.",
  },
  {
    title: "Otras bebidas",
    href: "/category/otras-bebidas",
    description: "Para que pases los mejores momentos con tus mejores amigos.",
  },
  {
    title: "Mate",
    href: "/category/mate",
    description: "Mates, yerba, bolsos materos y todo lo que necesitás para disfrutar esta gran tradición.",
  },
  {
    title: "Chocolatería",
    href: "/category/chocolateria",
    description: "Siempre vas a quedar bien regalando algo de lo que encontrás en esta sección.",
  },
  {
    title: "Cocina",
    href: "/category/cocina",
    description: "Accesorios y utensilios de cocina para dar vida al chef que llevás por dentro.",
  },
  {
    title: "Delicatessen",
    href: "/category/delicatessen",
    description: "Gran variedad de embutidos, quesos, escabeches y mucho más para tus picadas.",
  },
]