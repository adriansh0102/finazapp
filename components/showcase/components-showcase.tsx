"use client"

import type React from "react"

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { DropdownMenuContent } from "@/components/ui/dropdown-menu"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { DropdownMenu } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import {
  AlertCircle,
  AlertTriangle,
  Check,
  ChevronDown,
  Info,
  Loader2,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function ComponentsShowcase() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [progress, setProgress] = useState(13)
  const [isLoading, setIsLoading] = useState(false)

  // Simular progreso
  const simulateProgress = () => {
    setProgress(13)
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          return 100
        }
        const newProgress = oldProgress + 3
        return Math.min(newProgress, 100)
      })
    }, 100)
    return () => clearInterval(timer)
  }

  // Simular carga
  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto py-10 space-y-10 animate-in fade-in-50 duration-500">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Biblioteca de Componentes</h1>
        <p className="text-muted-foreground">
          Explora todos los componentes disponibles en FinanzApp. Esta biblioteca te muestra cómo usar cada componente y
          sus variantes.
        </p>
      </div>

      <Tabs defaultValue="buttons" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
          <TabsTrigger value="buttons">Botones</TabsTrigger>
          <TabsTrigger value="cards">Tarjetas</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
          <TabsTrigger value="dialogs">Diálogos</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="selects">Selects</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="misc">Misceláneos</TabsTrigger>
        </TabsList>

        {/* Sección de Botones */}
        <TabsContent value="buttons" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Botones</CardTitle>
              <CardDescription>Diferentes estilos y variantes de botones para usar en la aplicación.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Variantes</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Tamaños</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="lg">Large</Button>
                  <Button>Default</Button>
                  <Button size="sm">Small</Button>
                  <Button size="icon" className="h-10 w-10">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Estados</h3>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={simulateLoading} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cargando...
                      </>
                    ) : (
                      "Clic para cargar"
                    )}
                  </Button>
                  <Button disabled>Deshabilitado</Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Con iconos</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo
                  </Button>
                  <Button variant="outline">
                    Eliminar
                    <Trash className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección de Tarjetas */}
        <TabsContent value="cards" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Tarjetas</CardTitle>
              <CardDescription>Contenedores para mostrar contenido y acciones relacionadas.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tarjeta de ejemplo</CardTitle>
                  <CardDescription>Descripción de la tarjeta</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Este es el contenido principal de la tarjeta.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost">Cancelar</Button>
                  <Button>Guardar</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="bg-primary/10 rounded-t-lg">
                  <CardTitle>Tarjeta con cabecera destacada</CardTitle>
                  <CardDescription>Con un estilo diferente</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p>Contenido con un diseño alternativo.</p>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button className="w-full">Acción principal</Button>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección de Alertas */}
        <TabsContent value="alerts" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Alertas</CardTitle>
              <CardDescription>Componentes para mostrar mensajes importantes al usuario.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alertas informativas</h3>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Información</AlertTitle>
                  <AlertDescription>Este es un mensaje informativo para el usuario.</AlertDescription>
                </Alert>
                <Alert variant="default">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Nota</AlertTitle>
                  <AlertDescription>Este es un mensaje de nota para el usuario.</AlertDescription>
                </Alert>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alertas de estado</h3>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Ha ocurrido un error al procesar tu solicitud.</AlertDescription>
                </Alert>
                <Alert className="border-green-500 text-green-500">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Éxito</AlertTitle>
                  <AlertDescription>La operación se ha completado correctamente.</AlertDescription>
                </Alert>
                <Alert className="border-yellow-500 text-yellow-500">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Advertencia</AlertTitle>
                  <AlertDescription>Hay algunos problemas que requieren tu atención.</AlertDescription>
                </Alert>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Toasts</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Éxito",
                        description: "La operación se ha completado correctamente.",
                      })
                    }}
                  >
                    Mostrar toast de éxito
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Ha ocurrido un error al procesar tu solicitud.",
                      })
                    }}
                  >
                    Mostrar toast de error
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección de Diálogos */}
        <TabsContent value="dialogs" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Diálogos y Modales</CardTitle>
              <CardDescription>Ventanas emergentes para interacciones importantes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Diálogo de confirmación</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Mostrar diálogo de confirmación</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Confirmar acción</DialogTitle>
                      <DialogDescription>
                        ¿Estás seguro de que deseas realizar esta acción? Esta acción no se puede deshacer.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
                      <Button variant="outline" type="button">
                        Cancelar
                      </Button>
                      <Button variant="destructive" type="button">
                        Confirmar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Diálogo con formulario</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Abrir formulario</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Editar perfil</DialogTitle>
                      <DialogDescription>
                        Realiza cambios en tu perfil aquí. Haz clic en guardar cuando hayas terminado.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Nombre
                        </Label>
                        <Input id="name" defaultValue="Juan Pérez" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Usuario
                        </Label>
                        <Input id="username" defaultValue="@juanperez" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">
                          Bio
                        </Label>
                        <Textarea id="bio" className="col-span-3" placeholder="Cuéntanos sobre ti" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Guardar cambios</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Popover</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Mostrar popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensiones</h4>
                        <p className="text-sm text-muted-foreground">Establece las dimensiones para el objeto.</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="width">Ancho</Label>
                          <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="height">Alto</Label>
                          <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección de Inputs */}
        <TabsContent value="inputs" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Campos de entrada</CardTitle>
              <CardDescription>Diferentes tipos de campos para recopilar información del usuario.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Texto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-input">Input estándar</Label>
                    <Input id="default-input" placeholder="Escribe aquí..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled-input">Input deshabilitado</Label>
                    <Input id="disabled-input" placeholder="No puedes editar" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="with-icon">Input con icono</Label>
                    <div className="relative">
                      <Input id="with-icon" placeholder="Buscar..." />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="with-button">Input con botón</Label>
                    <div className="flex space-x-2">
                      <Input id="with-button" placeholder="Correo electrónico" />
                      <Button>Suscribirse</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Área de texto</h3>
                <div className="space-y-2">
                  <Label htmlFor="textarea">Descripción</Label>
                  <Textarea
                    id="textarea"
                    placeholder="Escribe una descripción detallada..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Checkbox y Radio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Acepto los términos y condiciones</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="newsletter" defaultChecked />
                      <Label htmlFor="newsletter">Suscribirme al boletín</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="disabled" disabled />
                      <Label htmlFor="disabled" className="text-muted-foreground">
                        Opción deshabilitada
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Plan de suscripción</Label>
                    <RadioGroup defaultValue="monthly">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Mensual</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yearly" id="yearly" />
                        <Label htmlFor="yearly">Anual</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lifetime" id="lifetime" disabled />
                        <Label htmlFor="lifetime" className="text-muted-foreground">
                          De por vida (no disponible)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Switch</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Activar notificaciones</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Slider</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="slider">Volumen</Label>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Slider defaultValue={[75]} max={100} step={1} />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Selector de fecha</h3>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección de Selects */}
        <TabsContent value="selects" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Selectores</CardTitle>
              <CardDescription>Componentes para seleccionar opciones de una lista.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select básico</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Selecciona un framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="angular">Angular</SelectItem>
                        <SelectItem value="svelte">Svelte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled-select">Estado</Label>
                    <Select disabled>
                      <SelectTrigger id="disabled-select">
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select con muchas opciones</h3>
                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Selecciona un país" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      <SelectItem value="ar">Argentina</SelectItem>
                      <SelectItem value="bo">Bolivia</SelectItem>
                      <SelectItem value="br">Brasil</SelectItem>
                      <SelectItem value="cl">Chile</SelectItem>
                      <SelectItem value="co">Colombia</SelectItem>
                      <SelectItem value="cr">Costa Rica</SelectItem>
                      <SelectItem value="cu">Cuba</SelectItem>
                      <SelectItem value="do">República Dominicana</SelectItem>
                      <SelectItem value="ec">Ecuador</SelectItem>
                      <SelectItem value="sv">El Salvador</SelectItem>
                      <SelectItem value="gt">Guatemala</SelectItem>
                      <SelectItem value="hn">Honduras</SelectItem>
                      <SelectItem value="mx">México</SelectItem>
                      <SelectItem value="ni">Nicaragua</SelectItem>
                      <SelectItem value="pa">Panamá</SelectItem>
                      <SelectItem value="py">Paraguay</SelectItem>
                      <SelectItem value="pe">Perú</SelectItem>
                      <SelectItem value="pr">Puerto Rico</SelectItem>
                      <SelectItem value="es">España</SelectItem>
                      <SelectItem value="uy">Uruguay</SelectItem>
                      <SelectItem value="ve">Venezuela</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Combobox</h3>
                <div className="space-y-2">
                  <Label htmlFor="combobox">Buscar país</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-full justify-between">
                        Selecciona un país
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <div className="flex items-center border-b px-3 py-2">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <Input placeholder="Buscar país..." className="border-0 p-1 shadow-none focus-visible:ring-0" />
                      </div>
                      <div className="max-h-[200px] overflow-y-auto">
                        {[
                          "Argentina",
                          "Bolivia",
                          "Brasil",
                          "Chile",
                          "Colombia",
                          "Costa Rica",
                          "Cuba",
                          "Ecuador",
                          "El Salvador",
                          "España",
                          "Guatemala",
                          "Honduras",
                          "México",
                          "Nicaragua",
                          "Panamá",
                          "Paraguay",
                          "Perú",
                          "Puerto Rico",
                          "República Dominicana",
                          "Uruguay",
                          "Venezuela",
                        ].map((country) => (
                          <div key={country} className="flex cursor-pointer items-center py-2 px-3 hover:bg-accent">
                            {country}
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección de Feedback */}
        <TabsContent value="feedback" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Componentes de Feedback</CardTitle>
              <CardDescription>Elementos para mostrar el estado y progreso al usuario.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Progreso</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Progreso</Label>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                  <Button onClick={simulateProgress}>Simular progreso</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Skeleton</h3>
                <div className="space-y-2">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[300px]" />
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
                  <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Avatares</h3>
                <div className="flex flex-wrap gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección de Misceláneos */}
        <TabsContent value="misc" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Componentes Misceláneos</CardTitle>
              <CardDescription>Otros componentes útiles para la interfaz de usuario.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Acordeón</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>¿Qué es FinanzApp?</AccordionTrigger>
                    <AccordionContent>
                      FinanzApp es una aplicación para gestionar tus finanzas personales de manera sencilla y efectiva.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>¿Cómo puedo crear un presupuesto?</AccordionTrigger>
                    <AccordionContent>
                      Para crear un presupuesto, ve a la sección de Presupuestos y haz clic en el botón "Nuevo
                      Presupuesto". Luego, sigue las instrucciones para configurar tus categorías y límites de gasto.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>¿Es segura mi información financiera?</AccordionTrigger>
                    <AccordionContent>
                      Sí, tu información financiera está protegida con encriptación de extremo a extremo y nunca
                      compartimos tus datos con terceros sin tu consentimiento explícito.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Menú desplegable</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Abrir menú</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Configuración</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ayuda</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Cerrar sesión</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Menú contextual</h3>
                <div className="flex items-center justify-center border rounded-md p-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Más opciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <span className="ml-2 text-muted-foreground">Haz clic en los tres puntos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Toaster />
    </div>
  )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}
