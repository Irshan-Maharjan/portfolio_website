import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const location = useLocation()

    const categories = ['All', 'Web Development', 'AI/ML', 'UI/UX']

    const projectsData = [
        {
            id: 1,
            number: '01',
            title: 'AI-Powered Portfolio Builder',
            description: 'Automated portfolio generation system using machine learning to create personalized professional websites with intelligent content suggestions.',
            tech: ['React', 'Next.js', 'Python', 'TensorFlow', 'OpenAI'],
            category: 'AI/ML',
            gradient: 'from-cyan-500 to-blue-500',
            link: '#'
        },
        {
            id: 2,
            number: '02',
            title: 'Silicore Technology Platform',
            description: 'Corporate website with advanced 3D animations, interactive elements, and seamless user experiences for technology showcase.',
            tech: ['Next.js', 'Three.js', 'GSAP', 'React'],
            category: 'Web Development',
            gradient: 'from-purple-500 to-pink-500',
            link: '#'
        },
        {
            id: 3,
            number: '03',
            title: 'Real-time Sentiment Analyzer',
            description: 'NLP-based application for analyzing customer feedback and social media sentiment with real-time processing capabilities.',
            tech: ['Python', 'Flask', 'BERT', 'React', 'PostgreSQL'],
            category: 'AI/ML',
            gradient: 'from-green-500 to-teal-500',
            link: '#'
        },
        {
            id: 4,
            number: '04',
            title: 'Interactive Data Dashboard',
            description: 'Complex data visualization platform with custom charts, real-time updates, and interactive filtering for business intelligence.',
            tech: ['D3.js', 'React', 'Node.js', 'MongoDB'],
            category: 'Web Development',
            gradient: 'from-orange-500 to-red-500',
            link: '#'
        },
        {
            id: 5,
            number: '05',
            title: 'E-commerce Recommendation Engine',
            description: 'Machine learning system for personalized product recommendations based on user behavior and purchase history analysis.',
            tech: ['Python', 'Scikit-learn', 'React', 'AWS'],
            category: 'AI/ML',
            gradient: 'from-indigo-500 to-purple-500',
            link: '#'
        },
        {
            id: 6,
            number: '06',
            title: 'Collaborative Design Tool',
            description: 'Real-time collaborative platform for design teams with live editing, version control, and seamless team communication.',
            tech: ['Next.js', 'WebRTC', 'Socket.io', 'Fabric.js'],
            category: 'UI/UX',
            gradient: 'from-pink-500 to-rose-500',
            link: '#'
        }
    ]

    const filteredProjects = selectedCategory === 'All'
        ? projectsData
        : projectsData.filter(project => project.category === selectedCategory)

    // Reset scroll position on route change
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Animations temporarily disabled for debugging
            /*
            // Animate header
            if (titleRef.current) {
                gsap.fromTo(
                    titleRef.current,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
                )
            }

            // Animate project cards with stagger
            const cards = sectionRef.current?.querySelectorAll('.project-card')
            if (cards) {
                cards.forEach((card, index) => {
                    gsap.fromTo(
                        card,
                        { opacity: 0, y: 100 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            delay: index * 0.15 + 0.5,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 80%',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    )
                })
            }
            */
        }, sectionRef)

        return () => ctx.revert()
    }, [filteredProjects])

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative min-h-screen bg-black text-white py-32 px-6"
        >
            {/* Header */}
            <div ref={titleRef} className="container mx-auto mb-16">
                <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 text-[#f5f5f5]"
                >
                    SELECTED WORK
                </motion.h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    Showcasing innovative solutions in AI/ML and web development
                </p>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-4 mt-12">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                ? 'bg-[#f5f5f5] text-black shadow-[0_0_20px_rgba(245,245,245,0.3)]'
                                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="container mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef(null)
    const imageRef = useRef(null)

    return (
        <motion.div
            ref={cardRef}
            className="project-card group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 transition-all duration-400"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{
                scale: 1.02,
                y: -8,
                borderColor: 'rgba(6, 182, 212, 0.5)',
                boxShadow: '0 20px 60px rgba(6, 182, 212, 0.3)'
            }}
            style={{ minHeight: index % 3 === 0 ? '550px' : '500px' }}
        >
            {/* Image/Gradient Area */}
            <div className="relative h-64 overflow-hidden">
                <motion.div
                    ref={imageRef}
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

                {/* Project Number */}
                <div className="absolute top-6 left-6 text-7xl font-bold text-white/10">
                    {project.number}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f5f5f5] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                    {project.title}
                </h3>

                <p className="text-gray-400 text-base leading-relaxed">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1.5 text-xs font-medium bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 hover:bg-cyan-500/20 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* View Project Link */}
                <motion.a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors mt-6 group/link"
                    whileHover={{ x: 5 }}
                >
                    <span className="relative">
                        View Project
                        <motion.span
                            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400 to-purple-500"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{ transformOrigin: 'left' }}
                        />
                    </span>
                    <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                </motion.a>
            </div>
        </motion.div>
    )
}

export default Projects
