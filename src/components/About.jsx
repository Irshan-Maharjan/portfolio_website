import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from '../assets/irshan.png'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
    const containerRef = useRef(null)
    const textRef = useRef(null)

    // Split text into fixed lines with anchor words marked
    // Anchors: 4-5 words total, distributed (start, middle, end)
    // Types: 'expand' (normal) or 'contract' (starts wide, gets closer)
    // Re-split to 3-4 words per line for better responsiveness
    const lines = [
        { text: "Passionate about creating", anchors: [0], type: 'expand' },
        { text: "innovative digital solutions,", anchors: [], type: 'contract', reducedSpacing: true }, // Reduced spacing
        { text: "I blend creativity with", anchors: [2], type: 'expand' },
        { text: "technical expertise to", anchors: [], type: 'contract', reducedSpacing: true }, // Reduced spacing
        { text: "build seamless web", anchors: [2], type: 'expand' },
        { text: "experiences. With a", anchors: [], type: 'contract', reducedSpacing: true }, // Reduced spacing
        { text: "focus on modern", anchors: [], type: 'expand' },
        { text: "technologies, clean code,", anchors: [1], type: 'contract', reducedSpacing: true }, // Reduced spacing
        { text: "and user-centric design,", anchors: [], type: 'expand' },
        { text: "I help transform", anchors: [2], type: 'contract' },
        { text: "ideas into reality", anchors: [], type: 'expand' },
        { text: "for businesses and", anchors: [], type: 'contract' },
        { text: "individuals around the", anchors: [1], type: 'expand' },
        { text: "world.", anchors: [], type: 'contract' }
    ]

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(max-width: 767px)", () => {
            // Mobile Animation for Image Color Reveal
            // Sliding transition from top-left to bottom-right (using circle clip-path at 0 0)
            const imageContainer = containerRef.current.querySelector('.image-container')
            const colorOverlay = containerRef.current.querySelector('.color-overlay')

            if (imageContainer && colorOverlay) {
                gsap.to(colorOverlay, {
                    clipPath: 'circle(150% at 0 0)', // Expand circle from top-left to cover full image
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: imageContainer,
                        start: "top 60%", // Start when image is near center/fully visible
                        end: "bottom 40%",
                        scrub: 1, // Smooth scrub linked to scroll
                        toggleActions: "play reverse play reverse"
                    }
                })
            }
        });

        mm.add("(min-width: 768px)", () => {
            const wordElements = textRef.current.querySelectorAll('.word')

            // Pre-calculate random max spacing for each word to ensure consistency during scroll
            wordElements.forEach((word) => {
                if (!word.dataset.randomMax) {
                    // Random max spacing between 80px and 300px (Massive increase for dramatic effect)
                    // We use a deterministic random based on index to keep it consistent if re-rendered
                    const index = parseInt(word.dataset.globalIndex)
                    const isReduced = word.dataset.reduced === 'true'

                    // Drastically reduce max spacing for specific lines to prevent overflow
                    const baseMin = isReduced ? 20 : 80
                    const baseMax = isReduced ? 60 : 300
                    const range = baseMax - baseMin

                    const randomVal = Math.sin(index * 123.45) * 0.5 + 0.5 // 0 to 1
                    const maxSpacing = baseMin + (randomVal * range)
                    word.dataset.randomMax = maxSpacing
                }
            })

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1, // Increased scrub for smoother, fluid feel
                onUpdate: (self) => {
                    const progress = self.progress

                    wordElements.forEach((word) => {
                        const isAnchor = word.dataset.anchor === 'true'
                        const lineType = word.dataset.type
                        const isLastWord = word.dataset.isLast === 'true'
                        const isFirstWord = word.dataset.index === '0'

                        // Handle first word movement (marginLeft)
                        if (isFirstWord) {
                            const maxMarginLeft = 60 // Max movement for first word
                            let marginLeft
                            if (lineType === 'contract') {
                                marginLeft = 10 + ((1 - progress) * maxMarginLeft)
                            } else {
                                marginLeft = 10 + (progress * maxMarginLeft)
                            }
                            gsap.set(word, { marginLeft: `${marginLeft}px` })
                        }

                        if (isLastWord) {
                            gsap.set(word, { marginRight: '0px' })
                            return
                        }

                        if (isAnchor) {
                            // Anchor words have fixed minimal spacing
                            gsap.set(word, { marginRight: '15px' })
                        } else {
                            const maxRandomSpacing = parseFloat(word.dataset.randomMax)
                            const minSpacing = 15 // Minimum gap

                            let spacing

                            if (lineType === 'contract') {
                                // Start wide (random max), come closer to min
                                // Use a smoother curve (sine)
                                // Map to range: starts at max, goes to min, maybe back out slightly or stay
                                // Let's make it simple: Start Max -> End Min
                                const factor = 1 - progress
                                spacing = minSpacing + (factor * (maxRandomSpacing - minSpacing))
                            } else {
                                // Start small, expand to random max
                                // Start Min -> End Max
                                const factor = progress
                                spacing = minSpacing + (factor * (maxRandomSpacing - minSpacing))
                            }

                            // Hard cap to prevent layout breaking
                            // Cap at 30vw to allow massive expansion
                            const vwCap = window.innerWidth * 0.30
                            if (spacing > vwCap) spacing = vwCap

                            gsap.set(word, { marginRight: `${spacing}px` })
                        }
                    })
                }
            })
        });

        return () => mm.revert();
    }, [])

    return (
        <section ref={containerRef} className="min-h-screen bg-background text-white pt-20 pb-20 px-2 md:px-4 flex flex-col justify-center relative">
            <div className="w-full">
                <span className="text-sm md:text-base text-gray-400 uppercase tracking-widest mb-12 block text-center lg:text-left">Myself</span>

                <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                    {/* Image Section */}
                    <div className="lg:w-[35%] w-full relative lg:sticky lg:top-32 flex justify-center lg:order-2 order-1 mb-8 lg:mb-0">
                        {/* Reduced max-width on mobile (220px) */}
                        <div className="image-container aspect-[3/4] w-full max-w-[220px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px] rounded-2xl overflow-hidden relative group transition-all duration-500">

                            {/* Grayscale Base Image (Always visible as base) */}
                            <img
                                src={profileImg}
                                alt="Irshan Maharjan"
                                className="w-full h-full object-cover object-center grayscale"
                            />

                            {/* Color Image Overlay (Revealed on mobile scroll / Desktop Hover) */}
                            {/* On desktop: group-hover controls opacity. On mobile: GSAP controls clip-path */}
                            {/* We use Tailwind arbitrary values for the initial clip-path state:
                                Mobile: [clip-path:circle(0%_at_0_0)] (Hidden at top-left)
                                Desktop: md:[clip-path:none] (Fully visible geometry, hidden by opacity)
                             */}
                            <div
                                className="color-overlay absolute inset-0 w-full h-full lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 [clip-path:circle(0%_at_0_0)] md:[clip-path:none]"
                            >
                                <img
                                    src={profileImg}
                                    alt="Irshan Maharjan"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>

                    {/* Large Text Block */}
                    <div className="lg:w-[65%] lg:order-1 order-2 w-full">

                        {/* MOBILE VIEW: Single Paragraph for natural justification (Resolves "too much spacing" issue) */}
                        <div className="md:hidden font-bold tracking-tighter leading-[1.1] text-justify" style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)' }}>
                            {lines.map(line => line.text).join(" ")}
                        </div>

                        {/* DESKTOP VIEW: Split Lines for GSAP Animation (PRESERVED) */}
                        <div ref={textRef} className="hidden md:block font-bold tracking-tighter leading-[1.0] text-left" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 4rem)' }}>
                            {lines.map((line, lineIndex) => {
                                const words = line.text.split(" ")
                                return (
                                    <div key={lineIndex} className="flex flex-nowrap items-baseline justify-start" style={{ whiteSpace: 'nowrap', marginBottom: '0.2em', width: '100%', overflow: 'hidden', paddingBottom: '0.1em' }}>
                                        {words.map((word, wordIndex) => {
                                            const isAnchor = line.anchors.includes(wordIndex)
                                            const isLast = wordIndex === words.length - 1
                                            const globalIndex = lineIndex * 10 + wordIndex
                                            return (
                                                <span
                                                    key={`${lineIndex}-${wordIndex}`}
                                                    className="word inline-block"
                                                    data-anchor={isAnchor}
                                                    data-line={lineIndex}
                                                    data-index={wordIndex}
                                                    data-global-index={globalIndex}
                                                    data-type={line.type}
                                                    data-is-last={isLast}
                                                    data-reduced={line.reducedSpacing}
                                                    style={{ marginRight: isLast ? '0px' : '15px' }}
                                                >
                                                    {word}
                                                </span>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
