import { useEffect, useState } from 'react'
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"

export default function ParticleBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    if (!init) {
      loadSlim(window.tsParticles).then(() => {
        window.tsParticles.load("tsparticles", {
          fullScreen: {
            enable: false,
            zIndex: 0
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
              center: {
                x: 50,
                y: 50,
                mode: "percent",
                radius: 0
              },
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.1,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        })
        setInit(true)
      })
    }
  }, [init])

  return (
    <div
      id="tsparticles"
      className="absolute inset-0 z-0"
      style={{ 
        height: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    />
  )
} 