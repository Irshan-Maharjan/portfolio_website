import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from '../assets/irshan.png'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
    const containerRef = useRef(null)
    const textRef = useRef(null)

    const text = "Passionate about creating innovative digital solutions, I blend creativity with technical expertise to build seamless web experiences. With a focus on modern technologies, clean code, and user-centric design, I help transform ideas into reality for businesses and individuals around the world."
    const words = text.split(" ")

    useEffect(() => {
        const ctx = gsap.context(() => {
            const wordElements = textRef.current.querySelectorAll('.word')

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress

                    wordElements.forEach((word, i) => {
                        // Create a smooth wave effect
                        // i * 0.1 controls the frequency (how tight the wave is across words)
                        // progress * 8 controls the speed/phase shift as you scroll
                        const angle = (i * 0.15) + (progress * Math.PI * 4)

                        // Sine wave returns -1 to 1
                        const wave = Math.sin(angle)

                        // Map to spacing range: 10px to 60px
                        // (wave + 1) / 2 converts -1..1 to 0..1
                        const normalizedWave = (wave + 1) / 2
                        const spacing = 10 + (normalizedWave * 50)

                        gsap.set(word, { marginRight: `${spacing}px` })
                    })
                }
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="min-h-screen bg-background text-white pt-20 pb-20 px-4 flex flex-col justify-center relative">
            <div className="w-full">
                <span className="text-sm md:text-base text-gray-400 uppercase tracking-widest mb-12 block">Myself</span>

                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Large Text Block */}
                    <div className="lg:w-[65%]">
                        <p ref={textRef} className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-tight flex flex-wrap">
                            {words.map((word, i) => (
                                <span key={i} className="word inline-block" style={{ marginRight: '10px' }}>
                                    {word}
                                </span>
                            ))}
                        </p>
                    </div>

                    {/* Image Section - Sticky */}
                    <div className="lg:w-[35%] w-full sticky top-32 flex justify-center">
                        <div className="aspect-[3/4] w-full max-w-sm rounded-2xl overflow-hidden relative group grayscale hover:grayscale-0 transition-all duration-500">
                            <img
                                src={profileImg}
                                alt="Irshan Maharjan"
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
