import { RiCloseFill, RiCouponLine } from "react-icons/ri";
import { useContext, useState } from "react";

import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import Tag from "../../../components/Tag";
import { CartContext } from "../../../contexts/CartContext";

const CouponCode = () => {
  const { discount, setDiscount } = useContext(CartContext);
  const [addCoupon, setAddCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const applyCoupon = async () => {
    if (!couponCode) {
      setErrorMessage("Please enter a valid code.");
      return;
    }

    setIsApplying(true);
    const response = await fetch("/api/coupons/apply", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coupon_code: couponCode }),
    });
    const result = await response.json();

    setIsApplying(false);

    if (result.error) {
      setErrorMessage(result.error);
      return;
    }

    setDiscount(result);
    setCouponCode("");
    setErrorMessage("");
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {discount && (
        <div className="flex justify-between">
          <Badge label={discount.coupon_code} variant="primary" size="lg" />
          <span className="font-semibold text-lg text-right text-neutral-900">
            -${discount.discount_amount}
          </span>
        </div>
      )}
      {addCoupon ? (
        <div className="flex flex-col items-start gap-2 py-1">
          <div className="flex w-full gap-2">
            <TextInput
              label="Coupon code"
              placeholder="Enter coupon code"
              value={couponCode}
              errorMessage={errorMessage}
              onChange={(value) => setCouponCode(value)}
            ></TextInput>
            <Button
              variant="secondary"
              label="Apply"
              className="mt-6.5 w-20 shrink-0"
              disabled={isApplying}
              onClick={applyCoupon}
            ></Button>
          </div>
          {discount && (
            <Tag
              label={discount.coupon_code}
              actionIcon={RiCloseFill}
              onAction={() => setDiscount(null)}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-end">
          <Button
            variant="link"
            size="lg"
            label="Add coupon code"
            startIcon={RiCouponLine}
            onClick={() => setAddCoupon(true)}
          />
        </div>
      )}
    </div>
  );
};

export default CouponCode;
