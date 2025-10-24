// src/components/CakeSections.tsx
import React from "react";
import { motion } from "framer-motion";

interface InputSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const InputSection: React.FC<InputSectionProps> = ({ title, icon, children }) => (
  <div className="mb-6">
    <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-3">
      {icon && <span className="mr-2 text-rose-400">{icon}</span>}
      {title}
    </h3>
    {children}
  </div>
);

interface OptionSectionProps {
  title: string;
  children: React.ReactNode;
}

export const OptionSection: React.FC<OptionSectionProps> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">{children}</div>
  </div>
);

interface OptionItem {
  name: string;
  icon?: React.ReactNode;
}

interface CheckboxOptionProps {
  item: OptionItem;
  category: string;
  selections: Record<string, string | string[]>;
  onSelect: (category: string, value: string) => void;
}

/**
 * CheckboxOption — cho phép chọn nhiều mục (ví dụ: phụ kiện)
 */
export const CheckboxOption: React.FC<CheckboxOptionProps> = ({
  item,
  category,
  selections,
  onSelect,
}) => {
  const selectedValues = Array.isArray(selections[category])
    ? (selections[category] as string[])
    : [];

  const isSelected = selectedValues.includes(item.name);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(category, item.name)}
      className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
        isSelected
          ? "border-rose-500 bg-rose-50 shadow-md"
          : "border-gray-200 hover:border-rose-300 bg-white"
      }`}
    >
      {item.icon && <div className="text-3xl mb-2 text-rose-400">{item.icon}</div>}
      <p
        className={`text-sm font-medium ${
          isSelected ? "text-rose-600" : "text-gray-700"
        }`}
      >
        {item.name}
      </p>
    </motion.div>
  );
};
