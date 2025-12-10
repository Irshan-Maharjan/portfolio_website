const Footer = () => {
    return (
        <footer id="footer" className="relative bg-black text-white py-6 px-4 overflow-hidden min-h-screen md:min-h-0 md:h-[85vh] flex flex-col justify-center">
            {/* Large Background Text - Fixed Position */}
            <div className="fixed inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden z-0" style={{ top: '50vh', transform: 'translateY(-50%)' }}>
                <h1
                    className="text-[20vw] font-[900] text-white tracking-tighter"
                    style={{ opacity: 0.5 }}
                >
                    Irshan
                </h1>
            </div>

            {/* Mobile: Minimal horizontal padding (px-2) to maximize box width */}
            <div className="container mx-auto relative z-10 max-w-[98vw] h-full px-1 md:px-0">
                <div className="grid grid-cols-12 gap-1 md:gap-4 h-full md:grid-rows-2">

                    {/* Row 1: Work & Lab (Large Boxes) */}
                    {/* Mobile: Full width (col-span-12), Tall height (25vh) */}
                    <a href="/projects" className="col-span-12 md:col-span-6 h-[25vh] md:h-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col justify-end transition-all duration-300 hover:backdrop-blur-xl hover:bg-white/10 hover:border-white/20 group">
                        <span className="text-xl md:text-2xl font-medium text-gray-400 group-hover:text-white transition-colors">Work</span>
                    </a>

                    <a href="/blog" className="col-span-12 md:col-span-6 h-[25vh] md:h-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col justify-end transition-all duration-300 hover:backdrop-blur-xl hover:bg-white/10 hover:border-white/20 group">
                        <span className="text-xl md:text-2xl font-medium text-gray-400 group-hover:text-white transition-colors">Lab</span>
                    </a>

                    {/* Row 2: Contact & Socials (Small Boxes) */}
                    {/* Mobile: Half width (col-span-6), Medium height (16vh) */}
                    <a href="mailto:irshanmaharjan8848@gmail.com" className="col-span-6 md:col-span-3 h-[16vh] md:h-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 flex flex-col justify-end transition-all duration-300 hover:backdrop-blur-xl hover:bg-white/10 hover:border-white/20 group">
                        <span className="text-lg md:text-xl font-medium text-gray-400 group-hover:text-white transition-colors">Contact</span>
                    </a>

                    <a href="https://github.com/irshanmaharjan" target="_blank" rel="noopener noreferrer" className="col-span-6 md:col-span-3 h-[16vh] md:h-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 flex flex-col justify-end transition-all duration-300 hover:backdrop-blur-xl hover:bg-white/10 hover:border-white/20 group">
                        <span className="text-lg md:text-xl font-medium text-gray-400 group-hover:text-white transition-colors">Github</span>
                    </a>

                    <a href="https://instagram.com/irshanmaharjan" target="_blank" rel="noopener noreferrer" className="col-span-6 md:col-span-3 h-[16vh] md:h-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 flex flex-col justify-end transition-all duration-300 hover:backdrop-blur-xl hover:bg-white/10 hover:border-white/20 group">
                        <span className="text-lg md:text-xl font-medium text-gray-400 group-hover:text-white transition-colors">Instagram</span>
                    </a>

                    <a href="https://linkedin.com/in/irshanmaharjan" target="_blank" rel="noopener noreferrer" className="col-span-6 md:col-span-3 h-[16vh] md:h-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 flex flex-col justify-end transition-all duration-300 hover:backdrop-blur-xl hover:bg-white/10 hover:border-white/20 group">
                        <span className="text-lg md:text-xl font-medium text-gray-400 group-hover:text-white transition-colors">LinkedIn</span>
                    </a>

                </div>

                <div className="mt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Irshan Maharjan. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
