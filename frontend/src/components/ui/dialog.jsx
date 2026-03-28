
import * as React from "react"
import { XIcon } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/* Root */
function Dialog(props) {
  return <DialogPrimitive.Root {...props} />
}

/* Trigger */
function DialogTrigger(props) {
  return <DialogPrimitive.Trigger {...props} />
}

/* Portal */
function DialogPortal(props) {
  return <DialogPrimitive.Portal {...props} />
}

/* Close */
function DialogClose(props) {
  return <DialogPrimitive.Close {...props} />
}

/* Overlay (dark background) */
function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

/* Content (the modal box) */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.Content
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-full max-w-lg",
          "translate-x-[-50%] translate-y-[-50%]",
          "rounded-xl border border-gray-200",
          "bg-white p-6 shadow-2xl",
          "duration-200 outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}

        {showCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition">
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/* Header */
function DialogHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col gap-2 text-left", className)}
      {...props}
    />
  )
}

/* Footer */
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}

      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

/* Title */
function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

/* Description (removes warning) */
function DialogDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

