import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; // For animations
import { FaCaretDown } from 'react-icons/fa'; // Inverse triangle icon

const CollapsibleSection = ({ title, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false); // Collapsed state
    const contentRef = useRef(null); // Reference to the collapsible content

    // Toggle collapse while preventing scroll reset
    const toggleCollapse = (e) => {
        e.preventDefault(); // Prevent default behavior that may trigger scroll
        e.stopPropagation(); // Prevent any bubbling that could affect scrolling
        setIsCollapsed(!isCollapsed);
    };

    // Calculate height based on content's actual height
    const [contentHeight, setContentHeight] = useState(0);
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isCollapsed]); // Recalculate on collapse toggle

    return (
        <div className="mb-6">
            {/* Title with a toggle button (inverse triangle) */}
            <div className="flex justify-between items-center mb-2 mx-3">
                <h2 className="text-lg font-semibold">{title}</h2>
                <motion.button
                    onClick={toggleCollapse}
                    className="focus:outline-none"
                    animate={{ rotate: isCollapsed ? 0 : 180 }} // Rotate the icon when expanded
                    transition={{ duration: 0.2 }}
                >
                    <FaCaretDown className="text-xl" />
                </motion.button>
            </div>

            {/* Collapsible content with smooth height transition */}
            <motion.div
                initial={false} // Disable initial animation
                animate={{
                    height: isCollapsed ? 0 : contentHeight,
                    opacity: isCollapsed ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                ref={contentRef} // Attach ref to the content div
            >
                <div className="p-2">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default CollapsibleSection;
