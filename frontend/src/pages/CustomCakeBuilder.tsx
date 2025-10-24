// SRC/frontend/src/components/CustomCakeBuilder.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowLeft, FiArrowRight, FiUpload, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import {
  GiCakeSlice,
  GiStairsCake,
  GiMilkCarton,
  GiFrenchFries,
} from "react-icons/gi";
import {
  FaShapes,
  FaCircle,
  FaSquareFull,
  FaHeart,
  FaRectangleList,
  FaFont,
} from "react-icons/fa6";
import FlavorFrosting from "./custom/FlavorFrosting"
import CakeBase from "./custom/CakeBase";
import CakeDecoration from './custom/CakeDecoration';
import CakeFinal from "./custom/CakeFinal";


// Dữ liệu giả cho các tùy chọn - Sẽ được thay thế bằng API call
const cakeTypes = [{ name: 'Bánh kem' }, { name: 'Bánh Mousse' }, { name: 'Entremet' }, { name: 'Bông lan trứng muối' }];
const cakeSizes = [{ name: 'Size S (4-6 người)' }, { name: 'Size M (8-10 người)' }, { name: 'Size L (12-15 người)' }, { name: 'Bánh 2 tầng' }];
const cakeShapes = [{ name: 'Tròn' }, { name: 'Vuông' }, { name: 'Trái tim' }, { name: 'Chữ nhật' }];
const baseFlavors = [{ name: 'Vani' }, { name: 'Sô-cô-la' }, { name: 'Red Velvet' }, { name: 'Trà xanh' }, { name: 'Chanh dây' }];
const frostingTypes = [{ name: 'Kem bơ Thụy Sĩ' }, { name: 'Kem tươi' }, { name: 'Kem Phô mai' }, { name: 'Fondant' }];
const fillings = [{ name: 'Mứt dâu' }, { name: 'Chocolate Ganache' }, { name: 'Caramel mặn' }, { name: 'Hạt óc chó' }];
const toppings = [{ name: 'Dâu tươi' }, { name: 'Macarons' }, { name: 'Oreo' }, { name: 'Chocolate vụn' }];
const accessories = [{ name: 'Nến số' }, { name: 'Set dao dĩa (5 người)' }, { name: 'Pháo bông' }];

interface CustomCakeBuilderProps {
  onClose: () => void;
}

// Sửa lỗi kiểu dữ liệu: Định nghĩa kiểu cho các lựa chọn
interface Selections {
  [key: string]: string | string[];
}

const CustomCakeBuilder: React.FC<CustomCakeBuilderProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<Selections>({});

  const handleSelect = (category: string, value: string) => {
    setSelections(prev => ({ ...prev, [category]: value }));
  };
  
  const handleMultiSelect = (category: string, value: string) => {
    setSelections(prev => {
      const existing = (prev[category] as string[] | undefined) || [];
      const newSelection = existing.includes(value)
          ? existing.filter((item: string) => item !== value)
          : [...existing, value];
      return { ...prev, [category]: newSelection };
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
            <CakeBase selections={selections} handleSelect={handleSelect} />
        );

      case 2:
        return <FlavorFrosting selections={selections} handleSelect={handleSelect}/>;

      case 3:
        return (
          <CakeDecoration
            selections={selections}
            handleSelect={handleSelect}
          />
        );

      case 4:
        return (
          <CakeFinal
            selections={selections}
            handleMultiSelect={handleMultiSelect}
          />
        );


      default: return null;
    }
  };
  
  const totalSteps = 4;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100vh", opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex-shrink-0 p-5 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Thiết Kế Bánh Của Riêng Bạn</h1>
          <motion.button whileHover={{scale: 1.1, rotate: 90}} onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <FiX className="h-6 w-6" />
          </motion.button>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow flex overflow-hidden">
          {/* Main Form Area */}
          <div className="w-2/3 p-8 overflow-y-auto">
             <AnimatePresence mode="wait">
                {renderStep()}
             </AnimatePresence>
          </div>
          
          {/* Summary Sidebar */}
          <div className="w-1/3 bg-rose-50 p-8 border-l flex flex-col">
            <h3 className="text-lg font-semibold text-rose-800 border-b-2 border-rose-200 pb-3 mb-4">Tóm Tắt Lựa Chọn</h3>
            <div className="flex-grow overflow-y-auto text-sm">
                {Object.entries(selections).map(([key, value]) => (
                    <div key={key} className="mb-3">
                        <p className="font-semibold capitalize text-gray-700">{key.replace('_', ' ')}:</p>
                        <p className="text-rose-700 pl-2">{Array.isArray(value) ? value.join(', ') : value}</p>
                    </div>
                ))}
            </div>
            <div className="flex-shrink-0 pt-4">
                <p className="text-xl font-bold text-right text-gray-800 mb-4">Tổng cộng: 1,234,000₫</p>
                <button disabled={step !== totalSteps} className="w-full bg-rose-500 text-white font-bold py-3 rounded-lg hover:bg-rose-600 transition-colors disabled:bg-gray-300">
                    {step === totalSteps ? 'Thêm vào giỏ hàng' : `Hoàn thành bước ${step}`}
                </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex-shrink-0 p-5 border-t flex justify-between items-center bg-gray-50">
            <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className="flex items-center gap-2 px-4 py-2 rounded-md bg-white border font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50">
                <FiArrowLeft /> Quay Lại
            </button>
            <div className="flex items-center gap-2">
                {Array.from({length: totalSteps}).map((_, i) => 
                    <div key={i} className={`w-3 h-3 rounded-full ${i + 1 <= step ? 'bg-rose-500' : 'bg-gray-300'}`}></div>
                )}
            </div>
            <button onClick={() => setStep(s => Math.min(totalSteps, s + 1))} disabled={step === totalSteps} className="flex items-center gap-2 px-4 py-2 rounded-md bg-rose-500 font-semibold text-white hover:bg-rose-600 disabled:bg-gray-400">
                Tiếp Theo <FiArrowRight />
            </button>
        </div>
      </motion.div>
    </motion.div>
  );
};


// ----- Sub-components for cleaner code -----

const OptionSection: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="mb-8">
    <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center gap-2">
        {icon}{title}
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {children}
    </div>
  </div>
);

const InputSection: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="mb-8">
    <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
        {icon}{title}
    </h3>
    {children}
  </div>
);


const OptionCard: React.FC<{ item: { name: string }, category: string, selections: Selections, onSelect: (cat: string, val: string) => void }> = ({ item, category, selections, onSelect }) => {
  const isSelected = selections[category] === item.name;
  return (
    <motion.div
      onClick={() => onSelect(category, item.name)}
      whileTap={{ scale: 0.95 }}
      className={`p-4 border-2 rounded-lg cursor-pointer text-center font-medium ${isSelected ? 'border-rose-500 bg-rose-50' : 'border-gray-200 bg-white hover:border-rose-300'}`}
    >
      {item.name}
    </motion.div>
  );
};


const CheckboxOption: React.FC<{ item: { name: string }, category: string, selections: Selections, onSelect: (cat: string, val: string) => void }> = ({ item, category, selections, onSelect }) => {
  const isSelected = (selections[category] as string[] | undefined)?.includes(item.name);
  return (
      <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${isSelected ? 'border-rose-500 bg-rose-50' : 'border-gray-200 bg-white hover:border-rose-300'}`}>
          <input 
              type="checkbox"
              checked={isSelected || false}
              onChange={() => onSelect(category, item.name)}
              className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
          />
          <span className="ml-3 text-sm font-medium text-gray-800">{item.name}</span>
      </label>
  );
};


export default CustomCakeBuilder;
