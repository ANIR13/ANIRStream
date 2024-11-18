import React from 'react';
import { motion } from 'framer-motion';

interface ContentRowProps {
  title: string;
  items: {
    id: number;
    image: string;
    title: string;
  }[];
}

export default function ContentRow({ title, items }: ContentRowProps) {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-white mb-4 px-12">{title}</h2>
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto px-12 scrollbar-hide">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="flex-none w-64"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white text-lg font-medium text-center px-4">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}