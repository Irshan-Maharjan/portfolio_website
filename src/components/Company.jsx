import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Company = () => {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const lineRef = useRef(null)
    const technologyRef = useRef(null)
    const glowContainerRef = useRef(null)

    // Trail system: array of active glow positions with timestamps
    const trailsRef = useRef([])
    const rafIdRef = useRef(null)
    const cleanupIntervalRef = useRef(null)

    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect for title
            gsap.to(titleRef.current, {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            })

            // Glowing line animation
            gsap.fromTo(lineRef.current,
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "center 80%",
                        end: "center 20%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    // Cleanup old trails every frame
    useEffect(() => {
        const updateTrails = () => {
            if (!glowContainerRef.current) return

            const now = Date.now()
            const container = glowContainerRef.current

            // Remove trails older than 500ms
            trailsRef.current = trailsRef.current.filter(trail => {
                const age = now - trail.timestamp
                if (age > 500) {
                    // Remove the circle element
                    if (trail.element && trail.element.parentNode) {
                        trail.element.remove()
                    }
                    return false
                }

                // Update opacity based on age (fade out over 500ms)
                if (trail.element) {
                    const opacity = 1 - (age / 500)
                    trail.element.style.opacity = opacity
                }
                return true
            })

            rafIdRef.current = requestAnimationFrame(updateTrails)
        }

        if (isHovering) {
            rafIdRef.current = requestAnimationFrame(updateTrails)
        }

        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
        }
    }, [isHovering])

    const handleMouseMove = (e) => {
        if (!technologyRef.current || !glowContainerRef.current) return

        const rect = technologyRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Convert to SVG coordinates (viewBox is 1200x200)
        const svgX = (x / rect.width) * 1200
        const svgY = (y / rect.height) * 200

        // Create a new glow circle at this position
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('cx', svgX)
        circle.setAttribute('cy', svgY)
        circle.setAttribute('r', '80')
        circle.setAttribute('fill', 'url(#glowGradient)')
        circle.style.filter = 'blur(20px)'
        circle.style.opacity = '1'

        glowContainerRef.current.appendChild(circle)

        // Add to trails array
        trailsRef.current.push({
            element: circle,
            timestamp: Date.now(),
            x: svgX,
            y: svgY
        })
    }

    const handleMouseEnter = () => {
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        // Clear all trails after a delay
        setTimeout(() => {
            trailsRef.current.forEach(trail => {
                if (trail.element && trail.element.parentNode) {
                    trail.element.remove()
                }
            })
            trailsRef.current = []
        }, 500)
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
            if (cleanupIntervalRef.current) clearInterval(cleanupIntervalRef.current)
        }
    }, [])

    return (
        <section ref={sectionRef} className="min-h-[80vh] flex flex-col justify-center py-20 px-6 bg-background relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-20" />
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent opacity-20" />
            </div>

            <div className="container mx-auto text-center relative z-10">
                <div ref={titleRef} className="mb-12">
                    <h2 className="text-[11vw] font-bold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10">
                        SILICORE
                    </h2>
                    <div className="flex justify-center overflow-visible">
                        <div
                            ref={technologyRef}
                            className="relative inline-block cursor-default"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{ width: '100%', height: 'auto' }}
                        >
                            <svg
                                viewBox="0 0 1200 200"
                                className="w-full h-auto"
                                style={{ overflow: 'visible' }}
                            >
                                <defs>
                                    {/* Define the text as a mask */}
                                    <mask id="textMask">
                                        <text
                                            x="50%"
                                            y="50%"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="font-bold tracking-tighter"
                                            style={{
                                                fontSize: '150px',
                                                fill: 'white',
                                                fontFamily: 'inherit'
                                            }}
                                        >
                                            TECHNOLOGY
                                        </text>
                                    </mask>

                                    {/* Define the radial gradient for the glow */}
                                    <radialGradient id="glowGradient">
                                        <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="1" />
                                        <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0" />
                                    </radialGradient>
                                </defs>

                                {/* Base stroke text */}
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="font-bold tracking-tighter"
                                    style={{
                                        fontSize: '150px',
                                        fill: 'transparent',
                                        stroke: 'rgba(255, 255, 255, 0.3)',
                                        strokeWidth: '1px',
                                        opacity: 0.3,
                                        fontFamily: 'inherit'
                                    }}
                                >
                                    TECHNOLOGY
                                </text>

                                {/* Glow layer - masked to text shape with trail effect */}
                                <g
                                    ref={glowContainerRef}
                                    mask="url(#textMask)"
                                    style={{
                                        opacity: isHovering ? 1 : 0,
                                        transition: isHovering ? 'opacity 0.1s ease-in' : 'opacity 0.2s ease-out'
                                    }}
                                >
                                    {/* Trail circles are dynamically added here via DOM manipulation */}
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto space-y-8">
                    <p className="text-sm uppercase tracking-[0.3em] text-accent glow-text">
                        Building what matters
                    </p>

                    <div ref={lineRef} className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                    <p className="text-xl md:text-2xl font-light text-muted leading-relaxed">
                        Our upcoming venture focuses on creating premium portfolio websites for professionals seeking to elevate their online presence. We believe every talented individual deserves a digital space that truly represents their craft.
                    </p>

                    <div className="pt-8">
                        <button className="px-10 py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-cyan-400 transition-colors duration-300 rounded-full">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Company
