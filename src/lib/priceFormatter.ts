const priceFormatter = new Intl.NumberFormat('en-US', {
	style: 'decimal',
	maximumFractionDigits: 2,
	minimumFractionDigits: 2,
})

export default priceFormatter

