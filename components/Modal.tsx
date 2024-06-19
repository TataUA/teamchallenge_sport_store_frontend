// "use client";

// import React from "react";

// export interface ModalProps {
//   show: boolean;
//   children?: React.ReactNode;
//   onClose: () => void;
// }

// export default function Modal({ show, children, onClose }: ModalProps) {
//   return (
//     <>
//       {show && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen">
//             <div
//               className="fixed inset-0 bg-black bg-opacity-50"
//               onClick={onClose}
//             ></div>
//             <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
//               {children}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
