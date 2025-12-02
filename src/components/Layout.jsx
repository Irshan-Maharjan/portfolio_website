import { useEffect, useLayoutEffect, useRef } from 'react'
import Lenis from 'lenis'
import Navbar from './Navbar'
import Footer from './Footer'
import ThreeBackground from './ThreeBackground'
import GetInTouchButton from './GetInTouchButton'

const Layout = ({ children }) => {
    const lenisRef = useRef(null)

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        }
    }, [])

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return (
        <div className="min-h-screen bg-background text-foreground relative">
            <ThreeBackground />
            <Navbar />
            <GetInTouchButton />
            <main className="relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
