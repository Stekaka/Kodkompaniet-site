// 🎓 ProcessSection.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
	{
		title: "Strategi",
		desc: "Vi analyserar ditt varumärke och målgrupp för att skapa en träffsäker digital strategi.",
		icon: (
			<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
				<circle cx="18" cy="18" r="16" stroke="#22c55e" strokeWidth="3" fill="#101e13"/>
				<path d="M12 24l12-12" stroke="#a3e635" strokeWidth="2.5" strokeLinecap="round"/>
			</svg>
		),
	},
	{
		title: "Design",
		desc: "Vi skapar en unik, modern design som bygger förtroende och sticker ut.",
		icon: (
			<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
				<rect x="7" y="7" width="22" height="22" rx="6" stroke="#a3e635" strokeWidth="3" fill="#101e13"/>
				<circle cx="18" cy="18" r="6" stroke="#22c55e" strokeWidth="2"/>
			</svg>
		),
	},
	{
		title: "Utveckling",
		desc: "Vi bygger snabbt, säkert och sömlöst – alltid med senaste tekniken.",
		icon: (
			<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
				<rect x="6" y="12" width="24" height="12" rx="4" stroke="#22c55e" strokeWidth="3" fill="#101e13"/>
				<path d="M14 18h8" stroke="#a3e635" strokeWidth="2.5" strokeLinecap="round"/>
			</svg>
		),
	},
	{
		title: "Lansering",
		desc: "Vi publicerar, optimerar och följer upp – så att du kan fokusera på din verksamhet.",
		icon: (
			<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
				<path d="M18 30V18" stroke="#a3e635" strokeWidth="2.5" strokeLinecap="round"/>
				<path d="M18 18L10 23V13l8-6 8 6v10l-8-5z" stroke="#22c55e" strokeWidth="3" fill="#101e13"/>
			</svg>
		),
	},
]

function RocketSVG() {
	return (
		<svg width="72" height="72" viewBox="0 0 72 72" fill="none">
			{/* Kropp */}
			<ellipse
				cx="36"
				cy="38"
				rx="12"
				ry="25"
				fill="#22c55e"
				stroke="#a3e635"
				strokeWidth="3"
			/>
			{/* Fönster */}
			<ellipse
				cx="36"
				cy="26"
				rx="5"
				ry="5"
				fill="#fff"
				stroke="#a3e635"
				strokeWidth="2"
			/>
			{/* Vänster fena (större och tydligare) */}
			<polygon
				points="20,62 30,48 36,60"
				fill="#a3e635"
				stroke="#22c55e"
				strokeWidth="2"
			/>
			{/* Höger fena (större och tydligare) */}
			<polygon
				points="52,62 42,48 36,60"
				fill="#a3e635"
				stroke="#22c55e"
				strokeWidth="2"
			/>
			{/* Flamma (större och tydligare) */}
			<polygon
				points="30,70 36,60 42,70"
				fill="#facc15"
				stroke="#eab308"
				strokeWidth="1.5"
			/>
		</svg>
	)
}

export default function ProcessSection() {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [progress, setProgress] = useState(0)

	// Sticky scroll: wrapper är lång, sticky container är 100vh
	useEffect(() => {
		const handleScroll = () => {
			if (!wrapperRef.current) return
			const rect = wrapperRef.current.getBoundingClientRect()
			const windowHeight = window.innerHeight
			const totalScroll = rect.height - windowHeight
			const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll)
			setProgress(scrolled / (totalScroll || 1))
		}
		window.addEventListener('scroll', handleScroll)
		window.addEventListener('resize', handleScroll)
		handleScroll()
		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleScroll)
		}
	}, [])

	// Raketen rör sig från botten till toppen (5% till 95%)
	const rocketTop = `calc(${95 - progress * 90}% - 24px)`

	// Rubrik fade in/out: syns mellan 5% och 98% scroll av sektionen
	const titleOpacity =
		progress < 0.05
			? 0
			: progress > 0.98
			? 0
			: 1

	const isMobile = typeof window !== "undefined" && window.innerWidth < 600

	return (
		<section
			ref={wrapperRef}
			style={{ height: '350vh', position: 'relative', overscrollBehavior: 'contain' }}
			className="bg-gradient-to-b from-[#0a0a1a] via-[#18181b] to-black"
		>
			{/* Rubrik i vänstra hörnet, alltid överst, fade in/out och lite längre in */}
			<motion.h2
				initial={false}
				animate={{
					opacity: titleOpacity,
					y: titleOpacity ? 0 : 20,
				}}
				transition={{ duration: 0.5, type: "tween" }}
				className="fixed z-30 text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-lime-300 to-green-200 drop-shadow-[0_0_16px_#22c55e] pointer-events-none select-none"
				style={{
					left: 'clamp(1rem, 5vw, 3rem)',
					top: 'clamp(1.5rem, 8vw, 4.5rem)',
					letterSpacing: '0.01em',
				}}
			>
				Vår process
			</motion.h2>
			<div
				className="process-section"
				style={{
					position: 'sticky',
					top: 0,
					width: '100vw',
					overflowX: 'hidden',
					zIndex: 10,
				}}
			>
				<div
					style={{
						position: 'sticky',
						top: 0,
						height: '100vh',
						width: '100vw',
						zIndex: 1,
						overflow: 'hidden',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div className="relative w-full h-full flex justify-center items-center">
						{/* Vertikalt streck */}
						<div className="absolute left-1/2 top-[8%] h-[84%] w-1 -translate-x-1/2 bg-gradient-to-b from-green-400 via-lime-300 to-green-900 rounded-full z-0" />
						{/* Raket */}
						<motion.div
							className="absolute left-1/2 -translate-x-1/2 z-10"
							style={{ top: rocketTop }}
							transition={{ type: "spring", stiffness: 60, damping: 18 }}
						>
							<RocketSVG />
						</motion.div>
						{/* Steg */}
						<div className="w-full max-w-4xl mx-auto relative z-10 h-full">
							{steps.map((step, i) => {
								const stepPos = isMobile
								  ? 18 + ((i + 0.5) * (64 / steps.length)) // flytta upp på mobil
								  : 95 - ((i + 0.5) * (84 / steps.length))
								const stepTrigger = (i + 1) / steps.length
								const visible = progress > stepTrigger - 0.1
								const side = i % 2 === 0 ? 'left' : 'right'
								return (
									<motion.div
										key={step.title}
										initial={false}
										animate={visible
											? { opacity: 1, y: 0, x: 0 }
											: { opacity: 0, y: 60, x: side === 'left' ? -40 : 40 }
										}
										transition={{ duration: 0.6, type: "spring" }}
										className={`absolute w-1/2 flex items-center gap-4 ${side === 'left'
											? 'left-0 justify-end text-right pr-8'
											: 'right-0 justify-start text-left pl-8'
										}`}
										style={{
											top: `calc(${stepPos}% - 32px)`,
											pointerEvents: 'none',
										}}
									>
										{side === 'left' && (
											<span className="flex-shrink-0 drop-shadow-[0_0_8px_#22c55e]">{step.icon}</span>
										)}
										<div>
											<h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-lime-300 to-green-100 drop-shadow-[0_0_8px_#22c55e]">
												{step.title}
											</h3>
											<p className="text-green-100 text-base md:text-lg">{step.desc}</p>
										</div>
										{side === 'right' && (
											<span className="flex-shrink-0 drop-shadow-[0_0_8px_#22c55e]">{step.icon}</span>
										)}
									</motion.div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
			{/* Fade till nästa sektion */}
			<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
		</section>
	)
}