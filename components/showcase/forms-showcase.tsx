"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres." })
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, { message: "El nombre solo puede contener letras y espacios." }),
  email: z
    .string()
    .min(1, { message: "El correo electrónico es obligatorio." })
    .email({ message: "Por favor, introduce un correo electrónico válido." })
    .max(100, { message: "El correo electrónico no puede exceder los 100 caracteres." }),
  date: z.date({
    required_error: "Por favor selecciona una fecha.",
    invalid_type_error: "La fecha no es válida.",
  }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres." })
    .max(500, { message: "La descripción no puede exceder los 500 caracteres." }),
  price: z.coerce
    .number()
    .min(0, { message: "El precio debe ser mayor o igual a 0." })
    .max(999999.99, { message: "El precio no puede exceder 999,999.99." }),
  notifications: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

export function ValidatedForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      date: undefined,
      description: "",
      price: 0,
      notifications: false,
    },
  })

  function onSubmit(values: FormValues) {
    setIsLoading(true)
    try {
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Formulario enviado",
          description: "Tus datos han sido enviados correctamente.",
          variant: "default",
        })
        console.log(values)
        form.reset()
      }, 1500)
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Error",
        description: "Ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="Juan Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="tu@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? format(field.value, "PPP", { locale: es }) : "Selecciona una fecha"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    min="0"
                    placeholder="0.00" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe el producto o servicio..." 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notifications"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Notificaciones</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar"
          )}
        </Button>
      </form>
    </Form>
  )
}