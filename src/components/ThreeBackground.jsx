'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ParticleNetwork = () => {
    const count = 100 // Number of connecting particles
    const radius = 2 // Connection radius

    // Create particles with random positions and velocities
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20
            const y = (Math.random() - 0.5) * 20
            const z = (Math.random() - 0.5) * 10
            const vx = (Math.random() - 0.5) * 0.02
            const vy = (Math.random() - 0.5) * 0.02
            temp.push({ position: new THREE.Vector3(x, y, z), velocity: new THREE.Vector3(vx, vy, 0) })
        }
        return temp
    }, [])

    const linesGeometry = useRef(new THREE.BufferGeometry())
    const pointsGeometry = useRef(new THREE.BufferGeometry())
    const group = useRef()

    useFrame((state) => {
        const { mouse } = state

        // Update particle positions
        particles.forEach((particle) => {
            particle.position.add(particle.velocity)

            // Boundary check - bounce back
            if (particle.position.x > 10 || particle.position.x < -10) particle.velocity.x *= -1
            if (particle.position.y > 10 || particle.position.y < -10) particle.velocity.y *= -1

            // Mouse interaction (repulsion)
            const mousePos = new THREE.Vector3(mouse.x * 10, mouse.y * 10, 0)
            const dist = particle.position.distanceTo(mousePos)
            if (dist < 4) { // Increased radius
                const force = particle.position.clone().sub(mousePos).normalize().multiplyScalar(0.1) // Increased force
                particle.velocity.add(force).clampLength(0, 0.2)
            } else {
                // Return to normal speed
                particle.velocity.clampLength(0.01, 0.02)
            }
        })

        // Update lines
        const positions = []
        const linePositions = []

        particles.forEach((p1, i) => {
            positions.push(p1.position.x, p1.position.y, p1.position.z)

            // Connect to nearby particles
            for (let j = i + 1; j < count; j++) {
                const p2 = particles[j]
                const dist = p1.position.distanceTo(p2.position)

                if (dist < radius) {
                    linePositions.push(
                        p1.position.x, p1.position.y, p1.position.z,
                        p2.position.x, p2.position.y, p2.position.z
                    )
                }
            }
        })

        pointsGeometry.current.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        linesGeometry.current.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    })

    return (
        <group ref={group}>
            <points>
                <bufferGeometry ref={pointsGeometry} />
                <pointsMaterial size={0.05} color="#06b6d4" transparent opacity={0.8} sizeAttenuation />
            </points>
            <lineSegments>
                <bufferGeometry ref={linesGeometry} />
                <lineBasicMaterial color="#a855f7" transparent opacity={0.15} />
            </lineSegments>
        </group>
    )
}

const FloatingDust = () => {
    const count = 500
    const mesh = useRef()

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [])

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()

            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </instancedMesh>
    )
}

const ThreeBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none hidden md:block">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
                <ParticleNetwork />
                <FloatingDust />
            </Canvas>
        </div>
    )
}

export default ThreeBackground
