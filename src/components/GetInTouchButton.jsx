import { motion } from 'framer-motion'

const GetInTouchButton = () => {
    return (
        <motion.div
            className="fixed top-4 right-4 md:top-8 md:right-8 lg:top-10 lg:right-10 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
        >
            <motion.div
                className="relative flex items-center justify-center group"
                initial="initial"
                whileHover="hover"
            >
                {/* Rolling Circle - Hidden on mobile/tablet */}
                <motion.div
                    className="absolute right-0 w-[45px] h-[45px] md:w-[55px] md:h-[55px] lg:w-[60px] lg:h-[60px] bg-[#f5f5f5] rounded-full hidden lg:flex items-center justify-center text-lg md:text-xl lg:text-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                    style={{
                        willChange: 'transform'
                    }}
                    variants={{
                        initial: { x: 0, rotate: 0 },
                        hover: {
                            x: 'calc(-100% - 120px)',
                            rotate: -360
                        }
                    }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                >
                    🤙
                </motion.div>

                {/* Main Button */}
                <motion.a
                    href="mailto:irshanmaharjan8848@gmail.com"
                    className="relative z-10 flex items-center justify-center px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-[#f5f5f5] text-black rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] h-[45px] md:h-[55px] lg:h-[60px]"
                    variants={{
                        initial: { scale: 1 },
                        hover: { scale: 1.05 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="relative overflow-hidden h-5 md:h-6 lg:h-7 flex flex-col items-center">
                        <span className="font-bold text-sm md:text-base lg:text-lg group-hover:-translate-y-full transition-transform duration-300 ease-in-out">
                            Get in Touch
                        </span>
                        <span className="absolute top-full font-bold text-sm md:text-base lg:text-lg group-hover:-translate-y-full transition-transform duration-300 ease-in-out">
                            Get in Touch
                        </span>
                    </div>
                </motion.a>
            </motion.div>
        </motion.div>
    )
}

export default GetInTouchButton
