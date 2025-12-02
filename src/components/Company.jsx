import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Company = () => {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const lineRef = useRef(null)

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

    return (
        <section ref={sectionRef} className="min-h-[80vh] flex flex-col justify-center py-20 px-6 bg-background relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-20" />
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent opacity-20" />
            </div>

            <div className="container mx-auto text-center relative z-10">
                <div ref={titleRef} className="mb-12">
                    <h2 className="text-[8vw] font-bold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10">
                        SILICORE
                    </h2>
                    <div className="flex justify-center overflow-hidden">
                        <h2 className="text-[8vw] font-bold tracking-tighter leading-none text-stroke-white opacity-30 whitespace-nowrap flex gap-2">
                            {"TECHNOLOGY".split("").map((char, i) => (
                                <span
                                    key={i}
                                    className="inline-block transition-all duration-300 hover:text-cyan-400 hover:opacity-100 hover:scale-110 hover:text-shadow-glow cursor-default"
                                >
                                    {char}
                                </span>
                            ))}
                        </h2>
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
