import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const bottomBarRef = useRef(null)
    const [baseDimensions, setBaseDimensions] = useState({ width: 0, height: 0 })
    const location = useLocation()

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [location])

    // Measure the bottom bar dimensions
    useLayoutEffect(() => {
        const updateDimensions = () => {
            if (bottomBarRef.current) {
                const newWidth = bottomBarRef.current.offsetWidth
                const newHeight = bottomBarRef.current.offsetHeight

                // Only update if dimensions actually changed
                setBaseDimensions(prev => {
                    if (prev.width !== newWidth || prev.height !== newHeight) {
                        return { width: newWidth, height: newHeight }
                    }
                    return prev
                })
            }
        }

        updateDimensions()

        // Debounced resize handler for better performance
        let resizeTimeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(updateDimensions, 150)
        }

        window.addEventListener('resize', handleResize)

        // Small delay to ensure fonts/layout are settled
        const timer = setTimeout(updateDimensions, 100)

        return () => {
            window.removeEventListener('resize', handleResize)
            clearTimeout(timer)
            clearTimeout(resizeTimeout)
        }
    }, [])

    // Remeasure when menu closes to ensure correct dimensions
    useEffect(() => {
        if (!isOpen && bottomBarRef.current) {
            const timer = setTimeout(() => {
                if (bottomBarRef.current) {
                    setBaseDimensions({
                        width: bottomBarRef.current.offsetWidth,
                        height: bottomBarRef.current.offsetHeight
                    })
                }
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const menuItems = [
        { title: "Home", href: "/" },
        { title: "Work", href: "/projects" },
        { title: "Lab", href: "/blog" },
        { title: "Contact", href: "mailto:irshanmaharjan8848@gmail.com" }
    ]

    const scrollingText = "COMPUTER ENGINEER • AI/ML SPECIALIST • WEB DEVELOPER • FOUNDER OF SILICORE TECHNOLOGY • "

    const [isFooterVisible, setIsFooterVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting)
            },
            { threshold: 0.1 }
        )

        const footer = document.getElementById('footer')
        if (footer) {
            observer.observe(footer)
        }

        return () => {
            if (footer) {
                observer.unobserve(footer)
            }
        }
    }, [])

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: isFooterVisible ? 200 : 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="fixed inset-x-0 bottom-10 z-40 flex justify-center pointer-events-none"
        >
            <motion.nav
                ref={menuRef}
                initial={false}
                animate={isOpen ? "open" : "closed"}
                className="bg-[#f5f5f5]/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col-reverse origin-bottom pointer-events-auto"
                variants={{
                    open: {
                        width: "clamp(300px, 90vw, 600px)",
                        borderRadius: "24px",
                        height: "auto",
                        transition: {
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1]
                        }
                    },
                    closed: {
                        width: "auto",
                        borderRadius: "32px",
                        height: "auto",
                        transition: {
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1],
                            delay: 0.05
                        }
                    }
                }}
            >
                {/* Bottom Bar (Always Visible) */}
                <div
                    ref={bottomBarRef}
                    className="flex items-center gap-[clamp(1rem,2vw,2rem)] px-[clamp(1rem,2vw,2rem)] py-[clamp(0.5rem,1vw,1rem)] w-full justify-between"
                >
                    {/* Left: Profile & Info */}
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-[1vw] cursor-pointer">
                        <div className="w-[clamp(40px,5vw,60px)] h-[clamp(40px,5vw,60px)] rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 overflow-hidden relative flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center text-[clamp(0.75rem,1.2vw,1.125rem)] font-bold text-white">IM</div>
                        </div>
                        <div>
                            <div className="text-[clamp(0.875rem,1.5vw,1.25rem)] font-bold tracking-wide text-black whitespace-nowrap">
                                IRSHAN MAHARJAN
                            </div>
                            {/* Scrolling Text */}
                            <div className="w-[clamp(200px,30vw,400px)] overflow-hidden">
                                <motion.div
                                    animate={{ x: [0, -1000] }}
                                    transition={{
                                        duration: 35,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="flex whitespace-nowrap text-[clamp(0.625rem,0.8vw,0.75rem)] text-gray-600 uppercase tracking-wider"
                                >
                                    <span>{scrollingText}</span>
                                    <span>{scrollingText}</span>
                                </motion.div>
                            </div>
                        </div>
                    </a>

                    {/* Right: Hamburger Menu */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-3 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {isOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
                        </motion.div>
                    </button>
                </div>

                {/* Menu Items (Visible when Open) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            className="w-full px-8 pb-4"
                        >
                            <div className="space-y-2 pt-4 border-b border-black/5 mb-4">
                                {menuItems.map((item, index) => (
                                    item.href.startsWith('mailto:') ? (
                                        <a
                                            key={index}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block group"
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: index * 0.08,
                                                    duration: 0.3,
                                                    ease: [0.4, 0, 0.2, 1]
                                                }}
                                                whileHover={{ scale: 1.02, x: 10 }}
                                                className="text-4xl md:text-5xl font-bold tracking-tighter text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 relative"
                                            >
                                                {item.title}
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    whileHover={{ scaleX: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="h-1 bg-gradient-to-r from-cyan-600 to-purple-600 origin-left mt-2"
                                                />
                                            </motion.div>
                                        </a>
                                    ) : (
                                        <Link
                                            key={index}
                                            to={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block group"
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: index * 0.08,
                                                    duration: 0.3,
                                                    ease: [0.4, 0, 0.2, 1]
                                                }}
                                                whileHover={{ scale: 1.02, x: 10 }}
                                                className="text-4xl md:text-5xl font-bold tracking-tighter text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 relative"
                                            >
                                                {item.title}
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    whileHover={{ scaleX: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="h-1 bg-gradient-to-r from-cyan-600 to-purple-600 origin-left mt-2"
                                                />
                                            </motion.div>
                                        </Link>
                                    )
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </motion.div>
    )
}

export default Navbar
