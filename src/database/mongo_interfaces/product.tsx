// Schema para media
export interface mediaInterface {
    id: String,
    type: String,
    onImageHover: String,
}

// Schema para el badge de descuento
export interface discountBadgeInterface {
    label: String,
    styles: {
        backgroundColor: String,
        textColor: String,
    }
}

// Schema para precios
export interface priceInterface {
    label: String,
    icons: String,
    symbol: String,
    type: string,
    crossed: Boolean,
    price: [String], // Puede contener un solo precio o varios
}

// Schema para la disponibilidad
export interface availabilityInterface {
    homeDeliveryShipping: String,
    pickUpFromStoreShipping: String,
    internationalShipping: String,
    primeShipping: String,
}

// Schema para las variantes
export interface variantInterface {
    type: String,
    options: [String], // Para opciones como colores o tallas
}

export interface multipurposeBadgesInterface {
    position: Number,
    label: String,
    styles: { backgroundColor: String, textColor: String }
}

//
export interface meatStickersInterface {
    label: String,
    type: String,
    styles: { backgroundColor: String, textColor: String }
}

//
export interface badgesInterface {
    position: Number,
    label: String,
    styles: {backgroundColor: String, textColor: String}
}

// El schema principal para el producto
export interface productInterface {
    productId: String,
    createdAt: Date,
    skuId: String,
    topSpecifications: [String], // Lista de especificaciones
    merchantCategoryId: String,
    displayName: String,
    productType: String,
    viewTemplate: String,
    url: String,
    brand: String,
    media: mediaInterface, // Relación con el schema de media
    mediaUrls: [String], // Lista de URLs de medios
    discountBadge: discountBadgeInterface, // Relación con el schema de discountBadge
    badges: [badgesInterface | String], // Lista de badges
    multipurposeBadges: [multipurposeBadgesInterface | String], // Lista de badges multiusos
    meatStickers: [meatStickersInterface | String], // Lista de stickers de carne
    prices: [priceInterface], // Lista de precios
    totalReviews: String,
    rating: String,
    availability: availabilityInterface, // Relación con el schema de disponibilidad
    variants: [variantInterface], // Relación con el schema de variantes
    sellerId: String,
    sellerName: String,
    offeringId: String,
    isSponsored: Boolean,
    GSCCategoryId: String,
}
