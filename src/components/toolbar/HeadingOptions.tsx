// import { Editor } from '@tiptap/react';
// import { useEffect, useRef, useState } from 'react';
// import { createPortal } from 'react-dom';

// import { headingOptions } from '../../constants';
// import { getSelectionHeadingLevel } from '../../utilities';
// import { EditorIcon } from '../icon/EditorIcon';
// import { ToolbarButtonItem } from './ToolbarButtonItem';

// type THeadingOptionsProps = {
//   editor: Editor;
// };

// export const HeadingOptions = ({ editor }: THeadingOptionsProps) => {
//   const headingsContainerRef = useRef<HTMLDivElement>(null);
//   const expandableContainerRef = useRef<HTMLDivElement>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [position, setPosition] = useState({ top: 0, left: 0 });
//   const [shouldUseContentWidth, setShouldUseContentWidth] = useState(false);

//   useEffect(() => {
//     if (isOpen && headingsContainerRef.current) {
//       const rect = headingsContainerRef.current.getBoundingClientRect();
//       const windowWidth = window.innerWidth;

//       if (rect.right + (Math.min(rect.left, 0) - 100) >= rect.width) {
//         setShouldUseContentWidth(false);
//         setPosition({
//           top: rect.bottom + window.scrollY,
//           left: rect.left + window.scrollX,
//         });

//         return;
//       }

//       // Check if there's enough space on the left
//       const hasEnoughSpaceOnLeft = rect.width <= windowWidth - 20; // 20px buffer

//       if (hasEnoughSpaceOnLeft) {
//         setPosition({
//           top: rect.bottom + window.scrollY,
//           left: (windowWidth - rect.width) / 2,
//         });
//         setShouldUseContentWidth(true);
//       } else {
//         // Position to the right if not enough space on left
//         setPosition({
//           top: rect.bottom + window.scrollY,
//           left: Math.max(windowWidth - rect.width - 20, 0) + window.scrollX, // Ensure it stays within viewport
//         });
//         setShouldUseContentWidth(true);
//       }
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isOpen &&
//         headingsContainerRef.current &&
//         !headingsContainerRef.current.contains(event.target as Node) &&
//         expandableContainerRef.current &&
//         !expandableContainerRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]);

//   const handleHeadingChange = (headingType: string | number) => {
//     if (!editor) return;

//     if (headingType === 'paragraph') {
//       editor.chain().focus().setParagraph().run();
//     } else if (typeof headingType === 'string' && headingType.startsWith('h')) {
//       const level = parseInt(headingType.substring(1), 10);
//       if (level >= 1 && level <= 6) {
//         editor
//           .chain()
//           .focus()
//           .setHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
//           .run();
//       }
//     }
//   };

//   const headingRenderer = (option: { label: string; value: string }) => {
//     const value = option.value;
//     let style = {};

//     switch (value) {
//       case 'h1':
//         style = { fontSize: '1.25rem', fontWeight: 'bold', lineHeight: '1.2' };
//         break;
//       case 'h2':
//         style = { fontSize: '1.2rem', fontWeight: 'bold', lineHeight: '1.2' };
//         break;
//       case 'h3':
//         style = { fontSize: '1.15rem', fontWeight: 'bold', lineHeight: '1.2' };
//         break;
//       case 'h4':
//         style = { fontSize: '1.1rem', fontWeight: 'bold', lineHeight: '1.2' };
//         break;
//       case 'h5':
//         style = { fontSize: '1.05rem', fontWeight: 'bold', lineHeight: '1.2' };
//         break;
//       case 'h6':
//         style = { fontSize: '1rem', fontWeight: 'bold', lineHeight: '1.2' };
//         break;
//       default:
//         style = { fontSize: '1rem', lineHeight: '1.2' };
//         break;
//     }

//     return <span style={style}>{option.label}</span>;
//   };

//   const currentHeadingLevel = getSelectionHeadingLevel(editor);

//   return (
//     <div className={`flex items-center relative h-16 min-w-fit bg-gray-100`}>
//       <div ref={headingsContainerRef} className={`flex flex-col items-center bg-gray-100 rounded-md p-2 ${isOpen ? 'rounded-b-none' : ''}`}>
//         <div className='flex items-center gap-2'>
//           {headingOptions?.slice(0, 4)?.map((option) => (
//             <ToolbarButtonItem
//               key={option.value}
//               tooltip={option.label}
//               onClick={() => handleHeadingChange(option.value)}
//               active={currentHeadingLevel === option.value}
//               className={`rounded-md h-12 w-fit ${currentHeadingLevel === option.value ? 'bg-primary-100' : 'bg-white'}`}
//             >
//               <div className='w-24 h-full flex flex-col items-center justify-between'>
//                 {headingRenderer(option)}
//                 <div className='text-[10px] text-gray-500 font-bold'>{option.value.toUpperCase()}</div>
//               </div>
//             </ToolbarButtonItem>
//           ))}

//           <div className='flex items-center justify-center' onClick={() => setIsOpen(!isOpen)}>
//             <EditorIcon name='arrow-down' className={`cursor-pointer ${isOpen ? 'rotate-180' : ''}`} />
//           </div>
//         </div>
//       </div>

//       {isOpen &&
//         createPortal(
//           <div
//             className='z-50 absolute bg-gray-100 p-2 rounded-b-md shadow-lg'
//             style={{
//               top: `${position.top}px`,
//               left: `${position.left}px`,
//               width: shouldUseContentWidth ? 'auto' : headingsContainerRef.current?.offsetWidth,
//             }}
//             ref={expandableContainerRef}
//           >
//             <div className='flex items-center gap-2 w-full'>
//               {headingOptions?.slice(4, 7)?.map((option) => (
//                 <ToolbarButtonItem
//                   key={option.value}
//                   tooltip={option.label}
//                   onClick={() => {
//                     handleHeadingChange(option.value);
//                     setIsOpen(false);
//                   }}
//                   active={currentHeadingLevel === option.value}
//                   className={`rounded-md h-12 w-fit ${currentHeadingLevel === option.value ? 'bg-primary-100' : 'bg-white'}`}
//                 >
//                   <div className='w-24 h-full flex flex-col items-center justify-between'>
//                     {headingRenderer(option)}
//                     <div className='text-[10px] text-gray-500 font-bold'>{option.value.toUpperCase()}</div>
//                   </div>
//                 </ToolbarButtonItem>
//               ))}
//             </div>
//           </div>,
//           document.body,
//         )}
//     </div>
//   );
// };
