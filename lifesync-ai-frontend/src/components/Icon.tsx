import type { SVGProps } from "react";

/** Path data (24×24, stroke icons). Entries starting with "o" are circles: "o cx cy r". */
const ICONS: Record<string, string[]> = {
  home: ["M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"],
  clock: ["o 12 12 9", "M12 7v5l3 2"],
  sparkle: ["M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z", "M19 16v4 M17 18h4"],
  inbox: ["M4 13l2-8h12l2 8v6H4z", "M4 13h5l1 2h4l1-2h5"],
  graph: ["o 12 5 2", "o 5 18 2", "o 19 18 2", "M12 7v4 M12 11l-6 5 M12 11l6 5"],
  refresh: ["M20 11a8 8 0 0 0-14-4L4 9 M4 4v5h5", "M4 13a8 8 0 0 0 14 4l2-2 M20 20v-5h-5"],
  link: ["M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1", "M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"],
  wallet: ["M3 7a2 2 0 0 1 2-2h13v4", "M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z", "M16 14h2"],
  repeat: ["M17 2l4 4-4 4", "M3 11V9a3 3 0 0 1 3-3h15", "M7 22l-4-4 4-4", "M21 13v2a3 3 0 0 1-3 3H3"],
  folder: ["M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"],
  bell: ["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10 21a2 2 0 0 0 4 0"],
  chart: ["M4 20V10 M10 20V4 M16 20v-8 M22 20H2"],
  settings: ["o 12 12 3", "M12 2v3 M12 19v3 M4.2 4.2l2.1 2.1 M17.7 17.7l2.1 2.1 M2 12h3 M19 12h3 M4.2 19.8l2.1-2.1 M17.7 6.3l2.1-2.1"],
  logout: ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5 M21 12H9"],
  search: ["o 11 11 7", "M20 20l-3.5-3.5"],
  plus: ["M12 5v14 M5 12h14"],
  bolt: ["M13 2 4 14h7l-1 8 9-12h-7z"],
  mail: ["M3 6h18v12H3z", "M3 7l9 6 9-6"],
  calendar: ["M4 6h16v14H4z", "M4 10h16 M8 3v4 M16 3v4"],
  trend: ["M3 17l6-6 4 4 8-8", "M15 7h6v6"],
  route: ["M3 11l18-8-8 18-2-8z"],
  review: ["M3 5h18v12H8l-5 4z"],
  shield: ["M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z", "M9 12l2 2 4-4"],
  brain: ["M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V4a3 3 0 0 0-3 0z", "M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 1"],
  lock: ["M6 11h12v10H6z", "M8 11V7a4 4 0 0 1 8 0v4"],
  alert: ["M12 3l10 18H2z", "M12 10v5 M12 18v.5"],
  arrow: ["M5 12h14 M13 6l6 6-6 6"],
  external: ["M14 4h6v6 M20 4l-9 9", "M18 14v6H4V6h6"],
  doc: ["M6 3h9l4 4v14H6z", "M14 3v5h5 M9 13h7 M9 17h7"],
  snooze: ["o 12 13 8", "M12 9v4l2 2 M4 4l3-2 M20 4l-3-2"],
  delegate: ["M15 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "o 8.5 7 4", "M19 8v6 M22 11h-6"],
  medical: ["M4 4h16v16H4z", "M12 8v8 M8 12h8"],
  menu: ["M4 6h16 M4 12h16 M4 18h16"],
  close: ["M6 6l12 12 M18 6L6 18"],
  chartSearch: ["M4 20V10 M10 20V4 M16 20v-6", "o 18 15 3", "M20.5 17.5 22 19"],
  neural: ["o 12 12 2", "M12 4v6 M12 14v6 M4 12h6 M14 12h6", "o 12 3 1", "o 12 21 1", "o 3 12 1", "o 21 12 1"],
  check: ["M5 12l5 5L20 7"],
  cloud: ["M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"],
  passport: ["M6 3h12v18H6z", "o 12 11 3", "M9 17h6"],
};

export type IconName = keyof typeof ICONS | (string & {});

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 16, strokeWidth = 1.75, ...rest }: IconProps) {
  const parts = ICONS[name] ?? [];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {parts.map((p, i) => {
        if (p.startsWith("o ")) {
          const [, cx, cy, r] = p.split(" ");
          return <circle key={i} cx={cx} cy={cy} r={r} />;
        }
        return <path key={i} d={p} />;
      })}
    </svg>
  );
}
