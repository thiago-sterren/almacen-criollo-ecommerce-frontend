import { Skeleton } from "@/components/ui/skeleton"

const SkeletonProduct = () => {
    return (
        <div className="grid sm:grid-cols-2 sm:py-16 sm:pr-40 sm:pl-180 pl-5">
            <Skeleton className="h-[200px] w-[350px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}

export default SkeletonProduct