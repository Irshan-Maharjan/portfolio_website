import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import robotModel from '../assets/free_droide_de_seguridad_k-2so_by_oscar_creativo.glb?url'

const Robot = (props) => {
    const group = useRef()
    const { scene, animations } = useGLTF(robotModel)
    const { actions, names } = useAnimations(animations, group)
    const [hasEntered, setHasEntered] = useState(false)
    const [targetScale, setTargetScale] = useState(1.0)
    const [targetPosition, setTargetPosition] = useState({ x: -0.5, y: 0 })

    useEffect(() => {
        // Calculate responsive scale and position based on screen width
        const calculateScaleAndPosition = () => {
            const width = window.innerWidth
            if (width < 640) {
                // Mobile: smaller, more to the right
                setTargetScale(0.7)
                setTargetPosition({ x: 0.4, y: 0.8 }) // Shift further up and right on mobile
            } else if (width < 1024) {
                // Tablet: medium, slightly right
                setTargetScale(0.9)
                setTargetPosition({ x: 0, y: 0 })
            } else if (width < 1440) {
                // Small desktop
                setTargetScale(1.1)
                setTargetPosition({ x: -0.3, y: 0 })
            } else {
                // Large desktop: bigger, adjust vertical to prevent clipping
                setTargetScale(1.3)
                setTargetPosition({ x: -0.5, y: -0.2 }) // Shift down slightly
            }
        }

        calculateScaleAndPosition()
        window.addEventListener('resize', calculateScaleAndPosition)
        return () => window.removeEventListener('resize', calculateScaleAndPosition)
    }, [])

    useEffect(() => {
        // Initial setup: Position and small (far away)
        if (group.current) {
            group.current.position.x = targetPosition.x
            group.current.position.y = targetPosition.y
            group.current.rotation.y = 0 // Face straight towards viewer
            group.current.scale.set(0.3, 0.3, 0.3) // Start small
        }

        // Play Idle animation from the start
        const idleAnim = actions['Idle'] || actions[names[0]] // Fallback to first anim
        if (idleAnim) {
            idleAnim.reset().fadeIn(0.5).play()
        }

        // Animate scale up (coming from backwards) to responsive target scale
        gsap.to(group.current.scale, {
            x: targetScale,
            y: targetScale,
            z: targetScale,
            duration: 2.5,
            ease: "power2.out",
            onComplete: () => {
                setHasEntered(true)
            }
        })

        return () => {
            actions && Object.values(actions).forEach(action => action?.stop())
        }
    }, [actions, names, targetScale, targetPosition])

    useFrame((state) => {
        if (!group.current || !hasEntered) return

        // Subtle head/body rotation tracking mouse
        const x = (state.mouse.x * Math.PI) / 10
        const y = (state.mouse.y * Math.PI) / 10

        // Lerp rotation for smoothness (centered, facing forward)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x, 0.1)
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y, 0.1)
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={scene} scale={1.0} position={[0, -1.6, 0]} />
        </group>
    )
}

const RobotViewer = () => {
    return (
        <div className="w-full h-[50vh] lg:h-full min-h-[400px] relative z-20">
            <Canvas
                shadows
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ preserveDrawingBuffer: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    castShadow
                />
                <Environment preset="city" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Robot />
                </Float>
            </Canvas>
        </div>
    )
}

// Preload the model
useGLTF.preload(robotModel)

export default RobotViewer
