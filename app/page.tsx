import { Slider } from '@/components/Slider-hero/Slider'

//Замінити та видалити!
import dataSlider from '../public/data/slider_data.json'

export default function Page() {
	return (
		<>
			<Slider data={dataSlider} homePageMainSlider className={'min-h-[400px] h-[50dvh]'} />
		</>
	)
}