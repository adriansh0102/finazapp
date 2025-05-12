"use client"

import React from "react"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Definición de los datos
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  name: string
  date: string
  paymentMethod: string
}

// Datos de ejemplo
const data: Payment[] = [
  {
    id: "INV001",
    amount: 125.99,
    status: "pending",
    email: "juan.perez@example.com",
    name: "Juan Pérez",
    date: "2023-05-04",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV002",
    amount: 59.99,
    status: "success",
    email: "maria.garcia@example.com",
    name: "María García",
    date: "2023-05-03",
    paymentMethod: "PayPal",
  },
  {
    id: "INV003",
    amount: 299.99,
    status: "processing",
    email: "carlos.rodriguez@example.com",
    name: "Carlos Rodríguez",
    date: "2023-05-02",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV004",
    amount: 99.99,
    status: "success",
    email: "ana.martinez@example.com",
    name: "Ana Martínez",
    date: "2023-05-01",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV005",
    amount: 49.99,
    status: "failed",
    email: "pedro.sanchez@example.com",
    name: "Pedro Sánchez",
    date: "2023-04-30",
    paymentMethod: "PayPal",
  },
  {
    id: "INV006",
    amount: 149.99,
    status: "success",
    email: "laura.lopez@example.com",
    name: "Laura López",
    date: "2023-04-29",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV007",
    amount: 79.99,
    status: "pending",
    email: "javier.fernandez@example.com",
    name: "Javier Fernández",
    date: "2023-04-28",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV008",
    amount: 199.99,
    status: "processing",
    email: "carmen.ruiz@example.com",
    name: "Carmen Ruiz",
    date: "2023-04-27",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV009",
    amount: 29.99,
    status: "success",
    email: "miguel.torres@example.com",
    name: "Miguel Torres",
    date: "2023-04-26",
    paymentMethod: "PayPal",
  },
  {
    id: "INV010",
    amount: 349.99,
    status: "pending",
    email: "sofia.navarro@example.com",
    name: "Sofía Navarro",
    date: "2023-04-25",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV011",
    amount: 89.99,
    status: "success",
    email: "david.moreno@example.com",
    name: "David Moreno",
    date: "2023-04-24",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV012",
    amount: 159.99,
    status: "failed",
    email: "lucia.jimenez@example.com",
    name: "Lucía Jiménez",
    date: "2023-04-23",
    paymentMethod: "PayPal",
  },
  {
    id: "INV013",
    amount: 119.99,
    status: "processing",
    email: "alberto.diaz@example.com",
    name: "Alberto Díaz",
    date: "2023-04-22",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV014",
    amount: 69.99,
    status: "success",
    email: "cristina.gutierrez@example.com",
    name: "Cristina Gutiérrez",
    date: "2023-04-21",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV015",
    amount: 249.99,
    status: "pending",
    email: "roberto.santos@example.com",
    name: "Roberto Santos",
    date: "2023-04-20",
    paymentMethod: "Credit Card",
  },
]

// Definición de las columnas
export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex justify-center">
          <div
            className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${status === "success" ? "bg-green-100 text-green-800" : ""}
            ${status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
            ${status === "processing" ? "bg-blue-100 text-blue-800" : ""}
            ${status === "failed" ? "bg-red-100 text-red-800" : ""}
          `}
          >
            {status === "success" && "Completado"}
            {status === "pending" && "Pendiente"}
            {status === "processing" && "Procesando"}
            {status === "failed" && "Fallido"}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return <div>{date.toLocaleDateString("es-ES")}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copiar ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pageSize, setPageSize] = useState(5)
  const { toast } = useToast()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Actualizar el tamaño de página cuando cambie
  React.useEffect(() => {
    table.setPageSize(Number(pageSize))
  }, [pageSize, table])

  return (
    <div className="container mx-auto py-10 space-y-8 animate-in fade-in-50 duration-500">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Tabla de Datos</h1>
        <p className="text-muted-foreground">Ejemplo de tabla con paginación, ordenamiento, filtrado y acciones.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pagos</CardTitle>
          <CardDescription>Gestiona todos los pagos de tu plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex w-full md:w-auto items-center gap-2">
                <Input
                  placeholder="Filtrar por nombre..."
                  value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                  className="max-w-sm"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    table.getColumn("name")?.setFilterValue("")
                  }}
                >
                  Limpiar
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={Object.keys(rowSelection).length === 0}
                  className="h-9"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Eliminar seleccionados
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto h-9">
                      Columnas <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuItem
                            key={column.id}
                            className="capitalize"
                            onClick={() => column.toggleVisibility(!column.getIsVisible())}
                          >
                            <Checkbox
                              checked={column.getIsVisible()}
                              className="mr-2"
                              onClick={(e) => e.stopPropagation()}
                              onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            />
                            {column.id === "name"
                              ? "Nombre"
                              : column.id === "email"
                                ? "Email"
                                : column.id === "amount"
                                  ? "Monto"
                                  : column.id === "status"
                                    ? "Estado"
                                    : column.id === "date"
                                      ? "Fecha"
                                      : column.id}
                          </DropdownMenuItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No se encontraron resultados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  Mostrando página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">Filas por página</p>
                  <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder={pageSize} />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 15, 20].map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Anterior
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar los elementos seleccionados? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false)
                toast({
                  title: "Elementos eliminados",
                  description: `Se han eliminado ${Object.keys(rowSelection).length} elementos correctamente.`,
                })
                setRowSelection({})
              }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
