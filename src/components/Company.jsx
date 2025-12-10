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

    const autoGlowRef = useRef(null)

    useEffect(() => {
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            // Parallax effect for title (Global)
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

            // Glowing line animation (Global)
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

            // DESKTOP: Automatic glow animation (Time-based, original)
            mm.add("(min-width: 768px)", () => {
                if (autoGlowRef.current) {
                    gsap.fromTo(autoGlowRef.current,
                        {
                            attr: { cx: -150 }, // Start further back
                            opacity: 0
                        },
                        {
                            attr: { cx: 1350 }, // Move past the end
                            opacity: 1,
                            duration: 3,
                            ease: "power1.inOut",
                            repeat: -1, // Loop on desktop? Original code didn't loop infinitely but used onComplete? 
                            // Original code had scrollTrigger toggleActions "play none none reset", so it plays once per view cycle.
                            // Let's stick to original behavior: One pass when scrolled in.
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 75%",
                                toggleActions: "play none none reset" // Reset lets it play again when re-entering
                            },
                            onStart: () => {
                                gsap.to(autoGlowRef.current, { opacity: 1, duration: 0.5 })
                            },
                            onComplete: () => {
                                gsap.to(autoGlowRef.current, { opacity: 0, duration: 0.5 })
                            }
                        }
                    )
                }
            });

            // MOBILE: Interactive Scroll Glow (Scrub-based)
            mm.add("(max-width: 767px)", () => {
                if (autoGlowRef.current) {
                    // Reset position/opacity AND increase radius for mobile execution
                    // Reverts automatically when matchMedia context is cleared (desktop)
                    gsap.set(autoGlowRef.current, {
                        opacity: 1,
                        attr: { cx: -150, r: 200 } // Increased radius (from 120) to cover more space
                    })

                    gsap.to(autoGlowRef.current, {
                        attr: { cx: 1350 }, // Sweep across text
                        ease: "none", // Linear scrub
                        repeat: 4, // Repeat 4 more times (5 total passes during scroll)
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom", // Start when section enters
                            end: "bottom top", // End when section leaves
                            scrub: 1 // Smooth scrubbing
                        }
                    })
                }
            });

        }, sectionRef)

        return () => {
            ctx.revert();
            mm.revert();
        }
    }, [])

    // Cleanup old trails every frame
    useEffect(() => {
        const updateTrails = () => {
            if (!glowContainerRef.current) return

            const now = Date.now()

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

        // Check if mobile device (width < 768px)
        if (window.innerWidth < 768) return

        // Performance optimization: Distance check
        // Only create new trail if cursor moved enough distance (e.g., 10 units)
        // This significantly reduces DOM node creation
        if (trailsRef.current.length > 0) {
            const lastTrail = trailsRef.current[trailsRef.current.length - 1]
            const dist = Math.hypot(svgX - lastTrail.x, svgY - lastTrail.y)
            if (dist < 15) return // Skip if movement is too small
        }

        // Create a new glow circle at this position
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('cx', svgX)
        circle.setAttribute('cy', svgY)
        circle.setAttribute('r', '80')
        circle.setAttribute('fill', 'url(#glowGradient)')
        circle.style.filter = 'blur(20px)'
        circle.style.opacity = '1'
        // Add will-change to hint browser for optimization
        circle.style.willChange = 'opacity'

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
        <section ref={sectionRef} className="min-h-[80vh] flex flex-col justify-center py-10 md:py-20 px-2 md:px-6 bg-background relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-20" />
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent opacity-20" />
            </div>

            <div className="container mx-auto text-center relative z-10">
                <div ref={titleRef} className="mb-6 md:mb-12">
                    {/* Increased size on mobile (15vw), maintained desktop (11vw) */}
                    <h2 className="text-[15vw] md:text-[11vw] font-bold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10">
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
                                style={{ overflow: 'visible', '--tech-size': '180px' }}
                            >
                                <defs>
                                    {/* Define the text as a mask */}
                                    <mask id="textMask">
                                        <text
                                            x="50%"
                                            y="50%"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="font-black md:font-bold tracking-tighter md:text-[150px]"
                                            style={{
                                                fontSize: 'var(--tech-size)',
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
                                    className="font-black md:font-bold tracking-tighter md:text-[150px]"
                                    style={{
                                        fontSize: 'var(--tech-size)',
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
                                <g mask="url(#textMask)">
                                    {/* Automatic glow circle */}
                                    <circle
                                        ref={autoGlowRef}
                                        cx="-150"
                                        cy="100" // Center vertically (200/2)
                                        r="120" // Increased radius for more glow
                                        fill="url(#glowGradient)"
                                        style={{
                                            filter: 'blur(25px)', // Slightly more blur
                                            opacity: 0,
                                            willChange: 'transform, opacity' // Hint for GPU acceleration
                                        }}
                                    />

                                    {/* Hover trail container */}
                                    <g
                                        ref={glowContainerRef}
                                        style={{
                                            opacity: isHovering ? 1 : 0,
                                            transition: isHovering ? 'opacity 0.1s ease-in' : 'opacity 0.2s ease-out'
                                        }}
                                    >
                                        {/* Trail circles are dynamically added here via DOM manipulation */}
                                    </g>
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
