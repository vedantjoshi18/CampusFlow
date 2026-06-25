"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

type DropdownMenuContentProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "center" | "end"
  alignOffset?: number
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}

type DropdownMenuItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  inset?: boolean
  checked?: boolean
  variant?: "default" | "destructive"
}

function DropdownMenu({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="dropdown-menu" {...props}>{children}</div>
}

function DropdownMenuPortal({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="dropdown-menu-portal" {...props}>{children}</div>
}

function DropdownMenuTrigger({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button data-slot="dropdown-menu-trigger" type="button" {...props}>{children}</button>
}

function DropdownMenuContent({
  className,
  ...props
}: DropdownMenuContentProps) {
  return (
    <div
      data-slot="dropdown-menu-content"
      className={cn("z-50 min-w-32 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none", className)}
      {...props}
    />
  )
}

function DropdownMenuGroup({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="dropdown-menu-group" {...props}>{children}</div>
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean
}) {
  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({ className, inset, variant = "default", ...props }: DropdownMenuItemProps) {
  return (
    <button
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      type="button"
      className={cn(
        "group/dropdown-menu-item relative flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  inset?: boolean
}) {
  return (
    <button
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      type="button"
      className={cn(
        "flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </button>
  )
}

function DropdownMenuCheckboxItem({ className, children, checked, inset, ...props }: DropdownMenuItemProps) {
  return (
    <button
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      type="button"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        {checked ? <CheckIcon /> : null}
      </span>
      {children}
    </button>
  )
}

function DropdownMenuRadioGroup({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="dropdown-menu-radio-group" {...props}>{children}</div>
}

function DropdownMenuRadioItem({ className, children, checked, inset, ...props }: DropdownMenuItemProps) {
  return (
    <button
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      type="button"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        {checked ? <CheckIcon /> : null}
      </span>
      {children}
    </button>
  )
}

function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="dropdown-menu-sub" {...props}>{children}</div>
}

function DropdownMenuSubContent({ className, ...props }: DropdownMenuContentProps) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
