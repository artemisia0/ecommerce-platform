import '@/styles/CallToActionButton.css'


export default function CallToActionButton(
	{ className, ...props }:
	{ className: string; [key: string]: any; }
) {
	return (
		<button className={className + " CallToActionButton"} {...props}></button>
	)
}

