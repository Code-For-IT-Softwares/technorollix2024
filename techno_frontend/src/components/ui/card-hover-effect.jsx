"use client"
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const HoverEffect = ({
  items,
  className,
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 ${className}`}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardImage src={item.image}/>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>Email:{item.email}</CardDescription>
            <CardDescription>Role:{item.role}</CardDescription>
            <CardDescription>Phone no.:{item.phoneNumber}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}) => {
  return (
    <div
      className={`rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 ${className}`}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}) => {
  return (
    <h4 className={`text-zinc-100 font-bold tracking-wide mt-4 ${className}`}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}) => {
  return (
    <p
      className={`mt-1 text-zinc-400 tracking-wide leading-relaxed text-sm ${className}`}
    >
      {children}
    </p>
  );
};

export const CardImage = ({
  src,
  className,
  children,
}) => {
  return (
    <div>
      <img
      className={`mt-1 text-zinc-400 tracking-wide leading-relaxed text-sm ${className}`}
      src = {src}
    >
      {children}
    </img>
    </div>
  );
};