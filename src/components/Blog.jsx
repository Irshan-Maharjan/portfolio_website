import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const location = useLocation()

    const categories = ['All', 'AI/ML', 'Web Development', 'Design', 'Business']

    const articlesData = [
        {
            id: 1,
            title: 'The Future of AI in Web Development',
            date: 'Nov 20, 2024',
            category: 'AI/ML',
            readTime: '6 min read',
            excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build and interact with websites, from automated design to intelligent user experiences.',
            featured: true,
            gradient: 'from-cyan-500 to-blue-600'
        },
        {
            id: 2,
            title: 'Building Smooth Animations with GSAP',
            date: 'Nov 15, 2024',
            category: 'Web Development',
            readTime: '8 min read',
            excerpt: 'A comprehensive guide to creating buttery-smooth scroll animations and interactive elements using GSAP and ScrollTrigger.',
            gradient: 'from-purple-500 to-pink-600'
        },
        {
            id: 3,
            title: 'Machine Learning for Personalization',
            date: 'Nov 10, 2024',
            category: 'AI/ML',
            readTime: '10 min read',
            excerpt: 'How to implement ML algorithms to create personalized user experiences that adapt to individual preferences and behaviors.',
            gradient: 'from-green-500 to-teal-600'
        },
        {
            id: 4,
            title: "Next.js 14: What's New and Why It Matters",
            date: 'Nov 5, 2024',
            category: 'Web Development',
            readTime: '7 min read',
            excerpt: 'Diving into the latest features of Next.js 14, including improved performance, new APIs, and enhanced developer experience.',
            gradient: 'from-orange-500 to-red-600'
        },
        {
            id: 5,
            title: 'Three.js Basics: Adding 3D to Your Website',
            date: 'Oct 28, 2024',
            category: 'Web Development',
            readTime: '12 min read',
            excerpt: 'Step-by-step guide to integrating 3D graphics into your web projects using Three.js and React Three Fiber.',
            gradient: 'from-indigo-500 to-purple-600'
        },
        {
            id: 6,
            title: 'Ethical Considerations in AI Development',
            date: 'Oct 20, 2024',
            category: 'AI/ML',
            readTime: '9 min read',
            excerpt: 'Discussing the importance of ethical AI practices, bias prevention, and responsible development in modern ML applications.',
            gradient: 'from-pink-500 to-rose-600'
        }
    ]

    const filteredArticles = selectedCategory === 'All'
        ? articlesData
        : articlesData.filter(article => article.category === selectedCategory)

    // Reset scroll position on route change
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    // GSAP Animations with Context
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Ensure elements are visible initially if JS fails or delays
            gsap.set(titleRef.current, { opacity: 0, y: 50 })
            const cards = sectionRef.current?.querySelectorAll('.article-card')
            if (cards) {
                gsap.set(cards, { opacity: 0, x: -50 })
            }

            // Animate header
            gsap.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2
            })

            // Animate article cards
            if (cards) {
                cards.forEach((card, index) => {
                    gsap.to(card, {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        delay: index * 0.12 + 0.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%', // Adjusted trigger point
                            toggleActions: 'play none none reverse'
                        }
                    })
                })
            }

            // Refresh ScrollTrigger after a short delay to ensure layout is settled
            setTimeout(() => {
                ScrollTrigger.refresh()
            }, 500)

        }, sectionRef) // Scope to sectionRef

        return () => ctx.revert() // Cleanup
    }, [filteredArticles, location]) // Re-run on category change or route change

    const getCategoryColor = (category) => {
        const colors = {
            'AI/ML': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
            'Web Development': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            'Design': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
            'Business': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
        }
        return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }

    return (
        <section
            id="blog"
            ref={sectionRef}
            className="relative min-h-screen bg-black text-white py-32 px-6"
        >
            {/* Header */}
            <div ref={titleRef} className="container mx-auto mb-16 opacity-0">
                <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 text-[#f5f5f5]"
                >
                    THOUGHTS & INSIGHTS
                </motion.h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    Exploring AI, web development, and technology trends
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

            {/* Articles List */}
            <div className="container mx-auto max-w-5xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {filteredArticles.map((article, index) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                index={index}
                                getCategoryColor={getCategoryColor}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

const ArticleCard = ({ article, index, getCategoryColor }) => {
    const [isHovered, setIsHovered] = useState(false)
    const imageRef = useRef(null)

    return (
        <motion.article
            className={`article-card group relative overflow-hidden rounded-2xl bg-white/3 backdrop-blur-sm border border-white/8 transition-all duration-400 ${article.featured ? 'md:h-96' : 'md:h-80'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{
                scale: 1.01,
                borderColor: 'rgba(6, 182, 212, 0.3)',
                boxShadow: '0 10px 40px rgba(6, 182, 212, 0.2)'
            }}
        >
            <div className={`flex flex-col ${article.featured ? 'md:flex-row' : 'md:flex-row'} h-full`}>
                {/* Image Section */}
                <div className={`relative overflow-hidden ${article.featured ? 'md:w-1/2' : 'md:w-2/5'} h-64 md:h-full`}>
                    <motion.div
                        ref={imageRef}
                        className={`absolute inset-0 bg-gradient-to-br ${article.gradient}`}
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

                    {article.featured && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500 text-black text-xs font-bold rounded-full">
                            FEATURED
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className={`flex flex-col justify-between p-6 md:p-8 ${article.featured ? 'md:w-1/2' : 'md:w-3/5'}`}>
                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-400">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(article.category)}`}>
                            {article.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className={`${article.featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-bold tracking-tight text-[#f5f5f5] mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300`}>
                        {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-base leading-relaxed mb-6 line-clamp-2">
                        {article.excerpt}
                    </p>

                    {/* Read More Link */}
                    <Link
                        to="#"
                        className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                    >
                        <span className="relative">
                            Read More
                            <motion.span
                                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400 to-purple-500"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: isHovered ? 1 : 0 }}
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
                    </Link>
                </div>
            </div>
        </motion.article>
    )
}

export default Blog
