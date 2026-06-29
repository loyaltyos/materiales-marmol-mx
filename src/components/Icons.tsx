import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12.04 2a9.84 9.84 0 0 0-8.45 14.88L2 22l5.25-1.55A9.96 9.96 0 0 0 12.04 22 9.9 9.9 0 0 0 22 12.06 9.98 9.98 0 0 0 12.04 2Zm5.78 14.06c-.25.7-1.47 1.34-2.03 1.42-.52.08-1.18.12-1.9-.1-.44-.14-1-.32-1.72-.63-3.03-1.3-5-4.35-5.15-4.55-.15-.2-1.23-1.63-1.23-3.1 0-1.46.77-2.18 1.04-2.48.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.51.25.6.84 2.05.91 2.2.08.14.13.31.03.51-.1.2-.15.32-.3.49-.14.17-.3.37-.43.5-.15.15-.3.3-.13.6.17.3.75 1.23 1.6 1.99 1.1.98 2.03 1.28 2.33 1.43.3.15.47.13.64-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.34.08.13.08.72-.17 1.42Z" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l1.8 10.2a2 2 0 0 0 2 1.7h7.9a2 2 0 0 0 1.9-1.4L21 7H6.1M9 20h.01M18 20h.01" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3.8 8 3l2 5-2.1 1.5a14.5 14.5 0 0 0 6.6 6.6L16 14l5 2-1 3.5c-.2.8-1 1.4-1.9 1.3C10.2 20 4 13.8 3.2 5.9c-.1-.9.5-1.8 1.3-2.1Z" />
    </svg>
  );
}
