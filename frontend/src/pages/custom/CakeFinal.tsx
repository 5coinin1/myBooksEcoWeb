// src/components/custom/CakeFinal.tsx
import React from "react";
import { motion } from "framer-motion";
import { FiMessageSquare, FiUpload, FiCalendar } from "react-icons/fi";
import { OptionSection, InputSection, CheckboxOption } from "./CakeSections";

interface CakeFinalProps {
  selections: Record<string, string | string[]>;
  handleMultiSelect: (category: string, value: string) => void;
}

const accessories = [
  { name: "Nến số" },
  { name: "Set dao dĩa (5 người)" },
  { name: "Pháo bông" },
];

const CakeFinal: React.FC<CakeFinalProps> = ({ selections, handleMultiSelect }) => {
  return (
    <motion.div
      key={4}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <h2 className="text-xl font-bold text-gray-800">
        🎀 Bước 4: Hoàn thiện chiếc bánh của bạn
      </h2>

      {/* Lời nhắn */}
      <InputSection title="Lời nhắn trên bánh" icon={<FiMessageSquare />}>
        <input
          type="text"
          placeholder="VD: Chúc mừng sinh nhật Mẹ!"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none"
        />
      </InputSection>

      {/* Ảnh mẫu */}
      <InputSection title="Tải lên ảnh mẫu" icon={<FiUpload />}>
        <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition">
          <FiUpload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Kéo và thả hoặc nhấp để tải lên ảnh mẫu
          </p>
        </div>
      </InputSection>

      {/* Yêu cầu */}
      <InputSection title="Yêu cầu đặc biệt">
        <textarea
          placeholder="VD: Làm ít ngọt giúp mình nhé!"
          rows={3}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none"
        ></textarea>
      </InputSection>

      {/* Phụ kiện */}
      <OptionSection title="Phụ kiện đi kèm">
        {accessories.map((item) => (
          <CheckboxOption
            key={item.name}
            item={item}
            category="accessories"
            selections={selections}
            onSelect={handleMultiSelect}
          />
        ))}
      </OptionSection>

      {/* Ngày giờ nhận */}
      <InputSection title="Ngày & Giờ nhận bánh" icon={<FiCalendar />}>
        <input
          type="datetime-local"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none"
        />
      </InputSection>
    </motion.div>
  );
};

export default CakeFinal;
