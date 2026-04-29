import type { Item, DiscountInfo } from '../types/item';

const SPECIAL_CATEGORIES = ['Transformaciones', 'Villanos'];
const DISCOUNT_PERCENT = 10;
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export function getDiscount(item: Item): DiscountInfo {
  const dateStr = item.created_at || item.date;
  const isOld = dateStr
    ? Date.now() - new Date(dateStr).getTime() > ONE_YEAR_MS
    : false;
  const isSpecialCategory = SPECIAL_CATEGORIES.includes(item.category || '');
  const hasDiscount = isOld || isSpecialCategory;

  const originalPrice = item.price;
  const finalPrice = hasDiscount
    ? Math.round(originalPrice * (1 - DISCOUNT_PERCENT / 100) * 100) / 100
    : originalPrice;

  return {
    hasDiscount,
    discountPercent: hasDiscount ? DISCOUNT_PERCENT : 0,
    originalPrice,
    finalPrice,
    reason: isOld
      ? 'Antiguedad > 1 ano'
      : isSpecialCategory
        ? 'Categoria especial'
        : null,
  };
}
