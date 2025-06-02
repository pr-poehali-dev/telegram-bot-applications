import { LucideProps } from "lucide-react";
import { Send, CheckCircle, Loader2, CircleAlert } from "lucide-react";

const icons = {
  Send,
  CheckCircle,
  Loader2,
  CircleAlert,
};

interface IconProps extends LucideProps {
  name: keyof typeof icons;
  fallback?: keyof typeof icons;
}

const Icon = ({ name, fallback = "CircleAlert", ...props }: IconProps) => {
  const IconComponent = icons[name] || icons[fallback];
  return <IconComponent {...props} />;
};

export default Icon;
