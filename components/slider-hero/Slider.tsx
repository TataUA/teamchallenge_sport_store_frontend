'use client'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SliderButtons } from './SliderButtons'

interface Slide {
	id: number
	title: string
	subtitle: string
	image: string
}

interface SliderProps {
	data: Slide[]
}

export function Slider({ data }: SliderProps) {
	return (
		<section className='w-full'>
			<div className=' h-144'>
				<ul className='h-full w-full'>
					<Swiper
						className='h-full'
						pagination={{
							type: 'bullets',
							clickable: true,
							renderBullet: (index, className) => {
								const bulletElement = document.createElement('span')

								document.documentElement.style.setProperty(
									'--swiper-theme-color',
									'#000'
								)

								document.documentElement.style.setProperty(
									'--swiper-pagination-bullet-inactive-color',
									'#ffffff'
								)

								document.documentElement.style.setProperty(
									'--swiper-pagination-bullet-inactive-opacity',
									'1'
								)

								bulletElement.className = `${className}`

								return bulletElement.outerHTML
							},
						}}
						autoplay={true}
						loop={true}
						modules={[Autoplay, Navigation, Pagination]}
					>
						{data.map(({ id, image, title, subtitle }) => (
							<SwiperSlide key={id}>
								<div
									className='h-full w-full absolute left-0 top-0'
									style={{
										background: `url(${image}) center center / cover scroll no-repeat`,
									}}
								></div>
								<div className='h-full w-full absolute left-0 top-0 bg-black opacity-20'></div>
								<div className='relative z-10 h-full  flex items-center justify-left'>
									<div className='w-3/6 ml-10'>
										{title && (
											<p className='mb-8 font-normal text-xl  text-white'>
												{title}
											</p>
										)}
										<p className='text-4xl font-semibold text-white'>
											{subtitle}
										</p>
									</div>
								</div>
							</SwiperSlide>
						))}
						<SliderButtons />
					</Swiper>
				</ul>
			</div>
		</section>
	)
}
