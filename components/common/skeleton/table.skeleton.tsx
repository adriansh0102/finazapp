import { Skeleton } from "@/components/ui/skeleton";



export function UserTableSkeleton() {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="overflow-x-auto">
            <div className="min-w-[300px]">
              <div className="border-b border-gray-100 dark:border-white/[0.05]">
                <div className="grid grid-cols-7 gap-4 p-4">
                  <Skeleton className="h-6 w-[100px]" />
                  <Skeleton className="h-6 w-[120px]" />
                  <Skeleton className="h-6 w-[100px]" />
                  <Skeleton className="h-6 w-[100px]" />
                  <Skeleton className="h-6 w-[80px]" />
                  <Skeleton className="h-6 w-[80px]" />
                  <Skeleton className="h-6 w-[60px]" />
                </div>
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-b border-gray-100 dark:border-white/[0.05] p-4">
                  <div className="grid grid-cols-7 gap-4">
                    <Skeleton className="h-6 w-[120px]" />
                    <Skeleton className="h-6 w-[150px]" />
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-6 w-[80px]" />
                    <Skeleton className="h-6 w-[80px]" />
                    <Skeleton className="h-6 w-[60px]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Skeleton className="h-6 w-[200px]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-8 w-[70px]" />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <Skeleton className="h-8 w-[80px]" />
            <Skeleton className="h-8 w-[80px]" />
          </div>
        </div>
      </div>
    )
  }