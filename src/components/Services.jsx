import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { FaPython, FaReact, FaNodeJs, FaFigma } from 'react-icons/fa'
import { SiNextdotjs, SiTensorflow, SiLangchain, SiGreensock, SiThreedotjs, SiTailwindcss, SiVercel } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
    const containerRef = useRef(null)
    const textRef = useRef(null)
    const [activeTech, setActiveTech] = useState("r1-0") // Default to first item

    const services = [
        {
            id: "01",
            title: "Web Development",
            description: "Building scalable, high-performance web applications with modern frameworks and best practices.",
            tags: ["React", "Next.js", "Tailwind", "Node.js"],
            image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Web+Dev"
        },
        {
            id: "02",
            title: "AI & Machine Learning",
            description: "Developing intelligent solutions using NLP, computer vision, and predictive analytics to automate and enhance business processes.",
            tags: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
            image: "https://placehold.co/600x400/1a1a1a/ffffff?text=AI+ML"
        },
        {
            id: "03",
            title: "Technical Strategy",
            description: "Architecting robust digital solutions aligned with business goals and future scalability.",
            tags: ["System Design", "Cloud Architecture", "Scalability", "Security"],
            image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Strategy"
        },
        {
            id: "04",
            title: "Performance Optimization",
            description: "Enhancing website speed, accessibility, and SEO to ensure maximum reach and efficiency.",
            tags: ["SEO", "Core Web Vitals", "Accessibility", "Speed"],
            image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Performance"
        },
        {
            id: "05",
            title: "AI Marketing & Automation",
            description: "Leveraging AI to optimize marketing campaigns, automate workflows, and drive data-driven growth.",
            tags: ["Marketing Auto", "CRM", "Data Analytics", "Growth Hacking"],
            image: "https://placehold.co/600x400/1a1a1a/ffffff?text=AI+Marketing"
        }
    ]

    const techStackRow1 = [
        { name: "Python", icon: FaPython, link: "https://www.python.org/" },
        { name: "React", icon: FaReact, link: "https://react.dev/" },
        { name: "Next.js", icon: SiNextdotjs, link: "https://nextjs.org/" },
        { name: "TensorFlow", icon: SiTensorflow, link: "https://www.tensorflow.org/" },
    ]

    const techStackRow2 = [
        { name: "LangChain", icon: SiLangchain, link: "https://www.langchain.com/" },
        { name: "GSAP", icon: SiGreensock, link: "https://greensock.com/" },
        { name: "Three.js", icon: SiThreedotjs, link: "https://threejs.org/" },
        { name: "Tailwind", icon: SiTailwindcss, link: "https://tailwindcss.com/" },
        { name: "Node.js", icon: FaNodeJs, link: "https://nodejs.org/" },
        { name: "Vercel", icon: SiVercel, link: "https://vercel.com/" },
        { name: "Figma", icon: FaFigma, link: "https://www.figma.com/" },
    ]

    useEffect(() => {
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            // Animate "MODERN TECH STACK" vertical loop
            const tracks = textRef.current.querySelectorAll('.char-track')

            gsap.fromTo(tracks,
                {
                    yPercent: -50,
                },
                {
                    yPercent: 0,
                    ease: "none",
                    stagger: {
                        amount: 0.5,
                        from: "random"
                    },
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top bottom",
                        end: "center center",
                        scrub: 0.5,
                    }
                }
            )

            // MOBILE: Auto-scroll highlight effect (Walking through the grid)
            mm.add("(max-width: 767px)", () => {
                // Flatten IDs for sequential walkthrough
                // Row 1 (4 items) + Row 2 (7 items)
                const allIds = [
                    ...techStackRow1.map((_, i) => `r1-${i}`),
                    ...techStackRow2.map((_, i) => `r2-${i}`)
                ];

                // Create a proxy object to tween
                const proxy = { index: 0 };

                gsap.to(proxy, {
                    index: allIds.length - 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current.querySelector('.tech-stack-container'), // We need to add this class to the wrapper
                        start: "top center",
                        end: "bottom center",
                        scrub: true,
                        onUpdate: () => {
                            const params = Math.round(proxy.index);
                            setActiveTech(allIds[params]);
                        }
                    }
                });
            });

        }, containerRef)

        return () => {
            ctx.revert();
            mm.revert();
        }
    }, [])

    const renderChar = (char, index) => (
        <span key={index} className="relative overflow-hidden inline-block h-[1em] leading-none">
            <span className="char-track flex flex-col gap-2">
                {[...Array(2)].map((_, i) => (
                    <span key={i} className="char inline-block text-white">
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
        </span>
    )

    const renderTechItem = (tech, index, total, isRow1) => {
        const id = `${isRow1 ? 'r1' : 'r2'}-${index}`
        const isActive = activeTech === id

        // Border Logic:
        // Mobile (2-col):
        //  - border-b: All items
        //  - border-r: Odd items (1st, 3rd...) -> index % 2 === 0

        // Desktop (Row 1: 4-col, Row 2: 7-col):
        //  - Preserving original logic:
        //    Row 1: border-r on all except last (index !== total - 1). border-b-0.
        //    Row 2: border-r on all except last. border-b-0.

        // We construct class string carefully
        // Base: border-white/10 relative aspect-square ...
        // Mobile defaults: border-b odd:border-r even:border-r-0
        // Desktop overrides: md:border-b-0
        // Desktop Border R: md:border-r (if not last) / md:border-r-0 (if last)

        const isDesktopLast = index === total - 1;

        return (
            <a
                key={index}
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative aspect-square flex flex-col items-center justify-center group cursor-pointer border-white/10 
                    border-b md:border-b-0 
                    odd:border-r even:border-r-0 
                    ${!isDesktopLast ? 'md:border-r' : 'md:border-r-0'}`}
                onMouseEnter={() => setActiveTech(id)}
            >
                {/* Floating Background */}
                {isActive && (
                    <motion.div
                        layoutId="active-tech-box"
                        className="absolute inset-0 bg-[#f5f5f5]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}

                {/* Icon - Changes to black when active */}
                <div className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-black' : 'text-white'}`}>
                    <tech.icon className={`text-5xl ${isRow1 ? 'md:text-7xl' : 'md:text-5xl'}`} />
                </div>
            </a>
        )
    }

    return (
        <section ref={containerRef} className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
            <div className="container mx-auto px-0 md:px-4">
                {/* Services Box - White background, rounded corners */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="bg-white text-black rounded-[2.5rem] p-6 md:p-12 lg:p-16 mb-16 md:mb-32 mx-2 md:mx-6 lg:mx-8"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-8 block text-left"
                    >
                        Services
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight max-w-6xl mx-auto text-justify mb-12 md:mb-24"
                    >
                        Evolving with every brief and built for impact, my process spans full-stack development, AI integration, and technical strategy—aligning vision with execution to bring clarity and edge to every project.
                    </motion.h2>

                    {/* Services List */}
                    <div className="flex flex-col">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group flex flex-col lg:flex-row items-start lg:items-center py-8 md:py-16 border-t border-gray-200 transition-all duration-300 hover:bg-gray-50 px-4 -mx-4 rounded-3xl"
                            >
                                {/* Number */}
                                <span className="text-sm font-medium text-gray-400 mb-3 md:mb-6 lg:mb-0 lg:w-24 shrink-0">
                                    {service.id}
                                </span>

                                {/* Title */}
                                <h3 className="text-3xl md:text-5xl font-medium mb-3 md:mb-6 lg:mb-0 lg:w-1/3 shrink-0 group-hover:text-gray-600 transition-colors">
                                    {service.title}
                                </h3>

                                {/* Description & Tags */}
                                <div className="flex flex-col lg:w-1/3 pr-8 mb-6 md:mb-8 lg:mb-0">
                                    <p className="text-gray-500 leading-relaxed mb-6 max-w-md">
                                        {service.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {service.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full uppercase tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Image Holder */}
                                <div className="w-full lg:w-1/4 h-48 lg:h-40 rounded-2xl overflow-hidden bg-gray-100 relative group-hover:scale-105 transition-transform duration-500">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Tech Stack Section - Black background */}
                <div className="mt-32 px-4 tech-stack-container">

                    {/* Animated Title */}
                    <div ref={textRef} className="flex flex-col items-center justify-center mb-12 overflow-hidden">
                        <div className="flex overflow-hidden text-5xl md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter leading-none">
                            {"MODERN".split("").map((char, i) => renderChar(char, i))}
                        </div>
                        <div className="flex overflow-hidden text-5xl md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter leading-none">
                            {"TECH STACK".split("").map((char, i) => renderChar(char, i + 10))}
                        </div>
                    </div>

                    <span className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-12 block text-left">Professional At</span>

                    {/* Tech Grid Row 1 - 2 columns on mobile */}
                    <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10">
                        {techStackRow1.map((tech, index) => renderTechItem(tech, index, techStackRow1.length, true))}
                    </div>

                    {/* Tech Grid Row 2 - 2 columns on mobile */}
                    <div className="grid grid-cols-2 md:grid-cols-7">
                        {techStackRow2.map((tech, index) => renderTechItem(tech, index, techStackRow2.length, false))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
