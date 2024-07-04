interface ProductData {
	name: string;
	description: string;
	imageURLs: string[];
	sex?: string;
	priceInUSD: number;
	previewImage: string;
	extraPreviewImage?: string;
	categoryName: string;
	collectionName?: string;
}

export default ProductData

