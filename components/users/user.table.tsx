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
import { ArrowUpDown, ChevronDown, Eye, MoreHorizontal, Pencil, Plus, Save, Trash } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "@/hooks/use-translation"
import axios from "axios"
import { getUsers, deleteUser, updateUser } from "@/app/api/services/user.service"
import { Skeleton } from "@/components/ui/skeleton"
import { UserTableSkeleton } from "../common/skeleton/table.skeleton"

// Definición de los datos
type User = {
  id: string
  name: string
  email: string
  username: string
  phone?: string
  rol: string
  status: boolean
}


export function UserTable() {
  const { t } = useTranslation()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pageSize, setPageSize] = useState(5)
  const { toast } = useToast()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    rol: "",
    status: true,
  })

  // Cargar usuarios
  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.data)
    } catch (error) {
      toast({
        title: t('server.error'),
        description: t('users.error_loading'),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Cargar usuarios al montar el componente
  React.useEffect(() => {
    fetchUsers()
  }, [])

  // Manejar la edición de usuario
  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      username: user.username,
      phone: user.phone || "",
      rol: user.rol,
      status: user.status,
    })
    setShowEditDialog(true)
  }

  // Manejar la eliminación de usuario
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId)
      toast({
        title: t('users.user_deleted'),
        description: t('users.user_deleted_message'),
      })
      fetchUsers()
    } catch (error) {
      toast({
        title: t('server.error'),
        description: t('users.error_deleting'),
        variant: "destructive",
      })
    }
  }

  // Manejar la adición de usuario
  const handleAddUser = async () => {
    try {
      await axios.post("/api/users", formData)
      toast({
        title: t('users.user_added'),
        description: t('users.user_added_message'),
      })
      setShowAddDialog(false)
      setFormData({
        name: "",
        email: "",
        username: "",
        phone: "",
        rol: "",
        status: true,
      })
      fetchUsers()
    } catch (error) {
      toast({
        title: t('server.error'),
        description: t('users.error_adding'),
        variant: "destructive",
      })
    }
  }

  // Manejar la actualización de usuario
  const handleUpdateUser = async () => {
    if (!selectedUser) return
    try {
      await updateUser(selectedUser.id, formData)
      toast({
        title: t('users.user_updated'),
        description: t('users.user_updated_message'),
      })
      setShowEditDialog(false)
      fetchUsers()
    } catch (error) {
      toast({
        title: t('server.error'),
        description: t('users.error_updating'),
        variant: "destructive",
      })
    }
  }

  // Definición de las columnas
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            {t('users.name')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: t('users.email'),
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "username",
      header: t('users.username'),
      cell: ({ row }) => <div>{row.getValue("username")}</div>,
    },
    {
      accessorKey: "phone",
      header: t('users.phone'),
      cell: ({ row }) => <div>{row.getValue("phone") || "-"}</div>,
    },
    {
      accessorKey: "rol",
      header: t('users.role'),
      cell: ({ row }) => <div>{row.getValue("rol")}</div>,
    },
    {
      accessorKey: "status",
      header: t('users.status'),
      cell: ({ row }) => {
        const status = row.getValue("status") as boolean
        return (
          <div className="flex justify-center">
            <div
              className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
            `}
            >
              {status ? t('users.active') : t('users.inactive')}
            </div>
          </div>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">{t('users.open_menu')}</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('users.actions')}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                  {t('users.copy_id')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  {t('users.view_details')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEditUser(user)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  {t('users.edit_user')}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  {t('users.delete_user')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  // Actualizar el tamaño de página cuando cambie
  React.useEffect(() => {
    table.setPageSize(Number(pageSize))
  }, [pageSize, table])

  return (
    <div className="w-full space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{t('users.title')}</CardTitle>
              <CardDescription>{t('users.description')}</CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              {t('users.add_user')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex w-full md:w-auto items-center gap-2">
                <Input
                  placeholder={t('users.filter_by_name')}
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
                  {t('users.clear')}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto h-9">
                      {t('users.columns')} <ChevronDown className="ml-2 h-4 w-4" />
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
                            {t(`users.${column.id}`) || column.id}
                          </DropdownMenuItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {loading ? (
              <UserTableSkeleton />
            ) : (
              <>
                <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                  <div className="overflow-x-auto">
                    <div className="min-w-[300px]">
                      <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                          {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map((header) => {
                                return (
                                  <TableHead 
                                    key={header.id} 
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                                  >
                                    {header.isPlaceholder
                                      ? null
                                      : flexRender(header.column.columnDef.header, header.getContext())}
                                  </TableHead>
                                )
                              })}
                            </TableRow>
                          ))}
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05] text-gray-400">
                          {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                              <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                  <TableCell 
                                    key={cell.id} 
                                    className="px-5 py-4 sm:px-6 text-start whitespace-nowrap"
                                  >
                                    <div className="flex items-center gap-3">
                                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={columns.length} className="h-24 text-center">
                                {t('users.no_results')}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
                      {t('users.showing_page')} {table.getState().pagination.pageIndex + 1} {t('users.of')} {table.getPageCount()}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{t('users.rows_per_page')}:</span>
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
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      {t('users.previous')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      {t('users.next')}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Diálogo para añadir usuario */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('users.add_user')}</DialogTitle>
            <DialogDescription>
              {t('users.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t('users.name')}
              </Label>
              <Input 
                id="name" 
                className="col-span-3" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                {t('users.email')}
              </Label>
              <Input 
                id="email" 
                type="email" 
                className="col-span-3"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                {t('users.username')}
              </Label>
              <Input 
                id="username" 
                className="col-span-3"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                {t('users.phone')}
              </Label>
              <Input 
                id="phone" 
                className="col-span-3"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rol" className="text-right">
                {t('users.role')}
              </Label>
              <Select 
                value={formData.rol}
                onValueChange={(value) => setFormData({ ...formData, rol: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t('users.select_role')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">{t('users.admin')}</SelectItem>
                  <SelectItem value="USER">{t('users.user')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                {t('users.status')}
              </Label>
              <div className="col-span-3">
                <Switch 
                  id="status" 
                  checked={formData.status}
                  onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>

              {t('cancel')}
            </Button>
            <Button onClick={handleAddUser} className="flex items-center gap-2">
                <Save />
              {t('add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar usuario */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('users.edit_user')}</DialogTitle>
            <DialogDescription>
              {t('users.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                {t('users.name')}
              </Label>
              <Input 
                id="edit-name" 
                className="col-span-3"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                {t('users.email')}
              </Label>
              <Input 
                id="edit-email" 
                type="email" 
                className="col-span-3"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-username" className="text-right">
                {t('users.username')}
              </Label>
              <Input 
                id="edit-username" 
                className="col-span-3"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-phone" className="text-right">
                {t('users.phone')}
              </Label>
              <Input 
                id="edit-phone" 
                className="col-span-3"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-rol" className="text-right">
                {t('users.role')}
              </Label>
              <Select 
                value={formData.rol}
                onValueChange={(value) => setFormData({ ...formData, rol: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t('users.select_role')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">{t('users.admin')}</SelectItem>
                  <SelectItem value="USER">{t('users.user')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                {t('users.status')}
              </Label>
              <div className="col-span-3">
                <Switch 
                  id="edit-status" 
                  checked={formData.status}
                  onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleUpdateUser} className="flex items-center gap-2">
              <Save />
              {t('save_changes')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 