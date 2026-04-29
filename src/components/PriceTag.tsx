import PropTypes from 'prop-types';
import type { DiscountInfo } from '../types/item';

interface PriceTagProps {
  discount: DiscountInfo;
  size?: 'sm' | 'lg';
}

export default function PriceTag({ discount, size = 'sm' }: PriceTagProps) {
  const priceClass = size === 'lg' ? 'text-lg' : 'text-sm';
  const oldClass = size === 'lg' ? 'text-sm' : 'text-xs';
  const badgeClass = size === 'lg' ? 'text-xs' : 'text-[10px]';

  if (!discount.hasDiscount) {
    return (
      <span className={`${priceClass} font-semibold dark:text-db-200 text-db-700`}>
        ${discount.originalPrice.toFixed(2)}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`${priceClass} font-semibold text-green-500`}>
        ${discount.finalPrice.toFixed(2)}
      </span>
      <span className={`${oldClass} line-through dark:text-db-500 text-db-400`}>
        ${discount.originalPrice.toFixed(2)}
      </span>
      <span className={`rounded-full bg-green-500/10 px-2 py-0.5 ${badgeClass} font-bold text-green-500`}>
        -{discount.discountPercent}%
      </span>
      {discount.reason && (
        <span className={`${badgeClass} dark:text-db-500 text-db-400`}>
          {discount.reason}
        </span>
      )}
    </div>
  );
}

PriceTag.propTypes = {
  discount: PropTypes.shape({
    hasDiscount: PropTypes.bool.isRequired,
    discountPercent: PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired,
    finalPrice: PropTypes.number.isRequired,
    reason: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOf(['sm', 'lg']),
};
