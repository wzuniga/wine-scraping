const mongoose = require("mongoose");

// Schema para media
const mediaDefinition = {
    id: String,
    type: String,
    onImageHover: String,
}

const mediaSchema = new mongoose.Schema(mediaDefinition);

// Schema para el badge de descuento
const discountBadgeDefinition = {
    label: String,
    styles: {
        backgroundColor: String,
        textColor: String,
    }
}

const discountBadgeSchema = new mongoose.Schema(discountBadgeDefinition);

// Schema para precios
const priceDefinition = {
    label: String,
    icons: String,
    symbol: String,
    type: String,
    crossed: Boolean,
    price: [String], // Puede contener un solo precio o varios
}

const priceSchema = new mongoose.Schema(priceDefinition);

// Schema para la disponibilidad
const availabilityDefinition = {
    homeDeliveryShipping: String,
    pickUpFromStoreShipping: String,
    internationalShipping: String,
    primeShipping: String,
}

const availabilitySchema = new mongoose.Schema(availabilityDefinition);

// Schema para las variantes
const variantDefinition = {
    type: String,
    options: [String], // Para opciones como colores o tallas
}
const variantSchema = new mongoose.Schema(variantDefinition);

const multipurposeBadgesDefinition = {
    position: Number,
    label: String,
    styles: new mongoose.Schema({backgroundColor: String, textColor: String})
}
const multipurposeBadgesSchema = new mongoose.Schema(multipurposeBadgesDefinition);

//
const meatStickersDefinition = {
    label: String,
    type: String,
    styles: new mongoose.Schema({backgroundColor: String, textColor: String})
}
const meatStickersSchema = new mongoose.Schema(meatStickersDefinition);

//
const badgesDefinition = {
    position: Number,
    label: String,
    styles: new mongoose.Schema({backgroundColor: String, textColor: String})
}
const badgesSchema = new mongoose.Schema(badgesDefinition);

// El schema principal para el producto
const productDefinition = {
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
    media: mediaSchema, // Relación con el schema de media
    mediaUrls: [String], // Lista de URLs de medios
    discountBadge: discountBadgeSchema, // Relación con el schema de discountBadge
    badges: [badgesSchema | String], // Lista de badges
    multipurposeBadges: [multipurposeBadgesSchema | String], // Lista de badges multiusos
    meatStickers: [meatStickersSchema | String], // Lista de stickers de carne
    prices: [priceSchema], // Lista de precios
    totalReviews: String,
    rating: String,
    availability: availabilitySchema, // Relación con el schema de disponibilidad
    variants: [variantSchema], // Relación con el schema de variantes
    sellerId: String,
    sellerName: String,
    offeringId: String,
    isSponsored: Boolean,
    GSCCategoryId: String,
}
const productSchema = new mongoose.Schema(productDefinition);

module.exports = productSchema;
