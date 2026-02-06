import { CheckCircle, XCircle, ShoppingCart } from "lucide-react";

type ToastMessageProps = {
  title: string;
  description?: string;
  type?: "success" | "error" | "cart";
};

export default function ToastMessage({
  title,
  description,
  type = "success",
}: ToastMessageProps) {
  const iconMap = {
    success: <CheckCircle className="text-green-600" size={22} />,
    error: <XCircle className="text-red-600" size={22} />,
    cart: <ShoppingCart className="text-pink-600" size={22} />,
  };

  const bgMap = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    cart: "bg-pink-50 border-pink-200",
  };

  return (
    <div
      className={`
        flex gap-3 items-start
        px-4 py-3
        rounded-xl border
        shadow-md
        ${bgMap[type]}
      `}
    >
      {iconMap[type]}

      <div>
        <p className="font-semibold text-gray-800 text-sm">
          {title}
        </p>

        {description && (
          <p className="text-xs text-gray-600 mt-0.5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
