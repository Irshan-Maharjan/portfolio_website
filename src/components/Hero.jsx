import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, Suspense } from 'react'
import RobotViewer from './RobotViewer'

const Hero = () => {
    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects')
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="h-auto relative overflow-hidden bg-[#0a0a0a] flex flex-col">
            {/* BACKGROUND CONTAINER - Tagline & Name */}
            <div className="absolute top-[25%] md:top-[18%] lg:top-[15%] left-0 right-0 z-0 flex flex-col items-start justify-start pointer-events-none select-none overflow-hidden pl-[1.5vw]">
                {/* Tagline moved here */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="text-[0.875rem] md:text-[1rem] uppercase tracking-[0.2em] text-gray-500 font-medium mb-0 ml-2"
                >
                    Building what matters
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-[clamp(3rem,13vw,13vw)] font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#ced4da] via-[#ced4da] to-[#0a0a0a] leading-none tracking-tighter"
                >
                    IRSHAN
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="text-[clamp(3rem,13vw,13vw)] font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#ced4da] via-[#ced4da] to-[#0a0a0a] leading-none tracking-tighter"
                >
                    MAHARJAN
                </motion.div>
            </div>

            {/* TOP STATUS BAR */}
            <div className="relative z-10 w-full md:w-[70%] ml-0 md:ml-[2.5%] pt-6 md:pt-10 pb-4 px-6 md:px-0 flex justify-between items-start text-gray-400 text-xs md:text-sm font-light tracking-wide">
                <div className="flex flex-col md:hidden gap-0">
                    <span className="text-gray-400 text-[10px]">Building at</span>
                    <span className="text-white font-medium">Silicore Technology</span>
                </div>
                <div className="hidden md:flex flex-col">
                    <span className="text-white font-medium mb-1">Nepal Based</span>
                    <span>Working globally</span>
                </div>
                <div className="hidden md:flex flex-col text-center">
                    <span className="text-white font-medium mb-1">Building at</span>
                    <span>Silicore Technology</span>
                </div>
                {/* Hidden on mobile, as GetInTouch button takes precedence */}
                <div className="hidden md:flex flex-col text-right md:text-right">
                    <span className="text-white font-medium mb-1">Open to Opportunities</span>
                    <span className="hidden md:inline">Let's collaborate</span>
                </div>
            </div >

            {/* MAIN HERO CONTENT */}
            < div className="flex-grow flex items-center justify-center relative z-10 w-full max-w-[95%] mx-auto pb-4 md:pb-8" >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-stretch w-full min-h-[60vh] md:min-h-[75vh]">

                    {/* LEFT COLUMN */}
                    <div className="flex flex-col items-start text-left h-full justify-end py-4 order-2 lg:order-1">

                        {/* BOTTOM GROUP: Content below name */}
                        <div className="pb-4 -ml-1">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
                                className="text-[1rem] md:text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#f5f5f5] mb-2"
                            >
                                Silicore Technology
                            </motion.h2>

                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                                className="text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] font-medium text-white/60 mb-4 md:mb-6"
                            >
                                Computer Engineer
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
                                className="text-[0.875rem] md:text-[1rem] text-white/80 max-w-xl leading-[1.6] lg:leading-[1.7]"
                            >
                                From neural networks to pixel-perfect designs—building systems that are smart, scalable, and stunning.
                            </motion.p>

                            {/* MOBILE SCROLL INDICATOR - Below text */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2, duration: 1 }}
                                className="flex md:hidden items-center gap-3 mt-8"
                            >
                                <span className="text-[10px] uppercase tracking-widest text-[#f5f5f5]/60">
                                    Scroll to view my work
                                </span>
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-[#f5f5f5]/60 text-lg"
                                >
                                    ↓
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Robot */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="relative lg:static w-full flex items-center justify-center lg:justify-end lg:p-8 z-0 order-1 lg:order-2 h-[40vh] md:h-auto"
                    >
                        <div className="w-[280px] md:w-[400px] lg:w-full max-w-[28rem] aspect-square relative">
                            {/* Optional subtle glow behind robot */}
                            <div className="absolute inset-0 bg-[#06b6d4] opacity-[0.03] blur-[80px] rounded-full pointer-events-none"></div>

                            <Suspense fallback={<div className="text-white/20 flex items-center justify-center h-full">Loading...</div>}>
                                <RobotViewer />
                            </Suspense>
                        </div>
                    </motion.div>

                </div>
            </div >

            {/* SCROLL INDICATOR - Bottom Right Fixed */}
            < motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest text-[#f5f5f5]/60 writing-vertical-rl">
                    Scroll to view my work
                </span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[#f5f5f5]/60 text-xl"
                >
                    ↓
                </motion.div>
            </motion.div >
        </section >
    )
}

export default Hero
