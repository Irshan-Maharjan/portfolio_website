import Hero from '../components/Hero'
import About from '../components/About'
import Company from '../components/Company'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
    const featuredProjects = [
        {
            id: 1,
            number: '01',
            title: 'AI-Powered Portfolio Builder',
            description: 'Automated portfolio generation system using machine learning.',
            tech: ['React', 'Python', 'TensorFlow'],
            gradient: 'from-cyan-500 to-blue-500'
        },
        {
            id: 2,
            number: '02',
            title: 'Silicore Technology Platform',
            description: 'Corporate website with advanced 3D animations.',
            tech: ['Next.js', 'Three.js', 'GSAP'],
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            id: 3,
            number: '03',
            title: 'Real-time Sentiment Analyzer',
            description: 'NLP-based application for analyzing customer feedback.',
            tech: ['Python', 'BERT', 'React'],
            gradient: 'from-green-500 to-teal-500'
        }
    ]

    return (
        <>
            <Hero />
            <About />
            <Company />

            {/* Featured Projects Preview */}
            <section className="relative min-h-screen bg-black text-white py-32 px-6">
                <div className="container mx-auto">
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-[#f5f5f5]">
                        SELECTED WORK
                    </h2>
                    <p className="text-xl text-gray-400 mb-16">
                        Featured projects showcasing my expertise
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {featuredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                whileHover={{ scale: 1.02, y: -8 }}
                                className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-cyan-500/50 transition-all duration-400"
                                style={{ minHeight: '400px' }}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                                    <div className="absolute top-6 left-6 text-6xl font-bold text-white/10">
                                        {project.number}
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <h3 className="text-2xl font-bold text-[#f5f5f5]">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/projects">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-[#f5f5f5] text-black rounded-full font-medium hover:shadow-[0_0_30px_rgba(245,245,245,0.3)] transition-all duration-300"
                            >
                                View All Projects →
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
