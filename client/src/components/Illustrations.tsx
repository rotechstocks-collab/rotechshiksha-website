import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  size?: number;
}

export function InvestorCharacter({ className = "", size = 200 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <circle cx="100" cy="180" rx="60" ry="15" fill="#E8F5E9" />
      <rect x="75" y="95" width="50" height="70" rx="8" fill="#4CAF50" />
      <rect x="78" y="98" width="44" height="64" rx="6" fill="#66BB6A" />
      <circle cx="100" cy="55" r="35" fill="#FFCC80" />
      <circle cx="100" cy="55" r="32" fill="#FFE0B2" />
      <ellipse cx="88" cy="52" rx="4" ry="5" fill="#5D4037" />
      <ellipse cx="112" cy="52" rx="4" ry="5" fill="#5D4037" />
      <path d="M92 68 Q100 75 108 68" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M65 35 Q80 15 100 20 Q120 15 135 35" stroke="#5D4037" strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="55" y="110" width="20" height="45" rx="8" fill="#FFE0B2" />
      <rect x="125" y="110" width="20" height="45" rx="8" fill="#FFE0B2" />
      <motion.g
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "140px 130px" }}
      >
        <rect x="130" y="105" width="35" height="50" rx="4" fill="#2196F3" />
        <rect x="135" y="115" width="25" height="20" rx="2" fill="#BBDEFB" />
        <path d="M138 125 L145 135 L155 120" stroke="#4CAF50" strokeWidth="2" fill="none" />
      </motion.g>
      <rect x="80" y="165" width="18" height="25" rx="4" fill="#5D4037" />
      <rect x="102" y="165" width="18" height="25" rx="4" fill="#5D4037" />
    </motion.svg>
  );
}

export function LearnerCharacter({ className = "", size = 200 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <circle cx="100" cy="180" rx="55" ry="12" fill="#E3F2FD" />
      <rect x="70" y="90" width="60" height="75" rx="10" fill="#1976D2" />
      <rect x="74" y="94" width="52" height="67" rx="8" fill="#42A5F5" />
      <circle cx="100" cy="50" r="35" fill="#FFCC80" />
      <circle cx="100" cy="50" r="32" fill="#FFE0B2" />
      <ellipse cx="88" cy="47" rx="4" ry="5" fill="#5D4037" />
      <ellipse cx="112" cy="47" rx="4" ry="5" fill="#5D4037" />
      <path d="M95 62 Q100 67 105 62" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="25" rx="35" ry="12" fill="#5D4037" />
      <rect x="85" y="13" width="30" height="20" fill="#5D4037" />
      <rect x="50" y="105" width="20" height="50" rx="8" fill="#FFE0B2" />
      <rect x="130" y="105" width="20" height="50" rx="8" fill="#FFE0B2" />
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <rect x="35" y="100" width="45" height="60" rx="4" fill="#FFF9C4" />
        <rect x="40" y="108" width="35" height="3" rx="1" fill="#BDBDBD" />
        <rect x="40" y="116" width="30" height="3" rx="1" fill="#BDBDBD" />
        <rect x="40" y="124" width="32" height="3" rx="1" fill="#BDBDBD" />
        <rect x="40" y="132" width="28" height="3" rx="1" fill="#BDBDBD" />
      </motion.g>
      <rect x="80" y="165" width="18" height="22" rx="4" fill="#424242" />
      <rect x="102" y="165" width="18" height="22" rx="4" fill="#424242" />
    </motion.svg>
  );
}

export function GrowthChart({ className = "", size = 180 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 180 144"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <rect x="10" y="10" width="160" height="120" rx="12" fill="#F5F5F5" />
      <rect x="15" y="15" width="150" height="110" rx="8" fill="white" />
      <line x1="30" y1="110" x2="150" y2="110" stroke="#E0E0E0" strokeWidth="2" />
      <line x1="30" y1="110" x2="30" y2="30" stroke="#E0E0E0" strokeWidth="2" />
      <motion.path
        d="M35 95 L55 80 L75 85 L95 55 L115 60 L135 35 L145 40"
        stroke="#4CAF50"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.circle
        cx="145"
        cy="40"
        r="6"
        fill="#4CAF50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, duration: 0.3 }}
      />
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
      >
        <rect x="130" y="20" width="30" height="15" rx="3" fill="#4CAF50" />
        <text x="145" y="31" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">+42%</text>
      </motion.g>
    </motion.svg>
  );
}

export function CalculatorIllustration({ className = "", size = 160 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      className={className}
      initial={{ opacity: 0, rotate: -5 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.5 }}
    >
      <rect x="30" y="20" width="100" height="120" rx="12" fill="#7E57C2" />
      <rect x="35" y="25" width="90" height="110" rx="10" fill="#9575CD" />
      <rect x="42" y="32" width="76" height="28" rx="4" fill="#1A237E" />
      <text x="80" y="52" textAnchor="middle" fill="#4CAF50" fontSize="18" fontWeight="bold">₹1,24,500</text>
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <motion.rect
            key={`${row}-${col}`}
            x={45 + col * 20}
            y={70 + row * 22}
            width="16"
            height="16"
            rx="4"
            fill={col === 3 ? "#FF7043" : "#E8EAF6"}
            whileHover={{ scale: 1.1 }}
          />
        ))
      )}
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="130" cy="35" r="18" fill="#FFC107" />
        <text x="130" y="40" textAnchor="middle" fill="#5D4037" fontSize="16" fontWeight="bold">₹</text>
      </motion.g>
    </motion.svg>
  );
}

export function BookLearning({ className = "", size = 150 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.9}
      viewBox="0 0 150 135"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <path d="M75 25 L25 40 L25 115 L75 100 L125 115 L125 40 Z" fill="#E8F5E9" />
      <path d="M75 25 L75 100" stroke="#4CAF50" strokeWidth="3" />
      <path d="M25 40 L75 25 L125 40" stroke="#2E7D32" strokeWidth="2" fill="none" />
      <rect x="35" y="50" width="30" height="3" rx="1" fill="#81C784" />
      <rect x="35" y="58" width="25" height="3" rx="1" fill="#A5D6A7" />
      <rect x="35" y="66" width="28" height="3" rx="1" fill="#81C784" />
      <rect x="85" y="50" width="30" height="3" rx="1" fill="#81C784" />
      <rect x="85" y="58" width="25" height="3" rx="1" fill="#A5D6A7" />
      <rect x="85" y="66" width="28" height="3" rx="1" fill="#81C784" />
      <motion.g
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: "120px 20px" }}
      >
        <circle cx="120" cy="20" r="15" fill="#FFF9C4" />
        <path d="M112 20 L120 12 L128 20 L120 28 Z" fill="#FFC107" />
      </motion.g>
    </motion.svg>
  );
}

export function PiggyBank({ className = "", size = 140 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.85}
      viewBox="0 0 140 119"
      fill="none"
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <ellipse cx="70" cy="70" rx="50" ry="40" fill="#F48FB1" />
      <ellipse cx="70" cy="70" rx="47" ry="37" fill="#F8BBD9" />
      <ellipse cx="110" cy="60" rx="12" ry="8" fill="#F48FB1" />
      <circle cx="95" cy="55" r="4" fill="#5D4037" />
      <rect x="55" y="35" width="30" height="8" rx="4" fill="#EC407A" />
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
      >
        <circle cx="70" cy="25" r="12" fill="#FFC107" />
        <text x="70" y="30" textAnchor="middle" fill="#5D4037" fontSize="12" fontWeight="bold">₹</text>
      </motion.g>
      <rect x="35" y="95" width="12" height="20" rx="4" fill="#EC407A" />
      <rect x="55" y="95" width="12" height="20" rx="4" fill="#EC407A" />
      <rect x="75" y="95" width="12" height="20" rx="4" fill="#EC407A" />
      <rect x="95" y="95" width="12" height="20" rx="4" fill="#EC407A" />
    </motion.svg>
  );
}

export function RocketGrowth({ className = "", size = 160 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M80 20 L100 80 L80 70 L60 80 Z" fill="#42A5F5" />
        <ellipse cx="80" cy="75" rx="20" ry="25" fill="#1976D2" />
        <circle cx="80" cy="65" r="10" fill="#BBDEFB" />
        <path d="M60 85 L50 100 L65 90 Z" fill="#1565C0" />
        <path d="M100 85 L110 100 L95 90 Z" fill="#1565C0" />
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.8, 1.2, 0.8] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ transformOrigin: "80px 105px" }}
        >
          <path d="M70 95 L80 120 L90 95" fill="#FF7043" />
          <path d="M74 95 L80 110 L86 95" fill="#FFAB91" />
        </motion.g>
      </motion.g>
      <motion.circle
        cx="40" cy="50"
        r="5"
        fill="#FFC107"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.circle
        cx="120" cy="40"
        r="4"
        fill="#4CAF50"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle
        cx="130" cy="90"
        r="6"
        fill="#9C27B0"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
      />
    </motion.svg>
  );
}

export function TargetGoal({ className = "", size = 140 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <circle cx="70" cy="70" r="55" fill="#FFEBEE" />
      <circle cx="70" cy="70" r="45" fill="#FFCDD2" />
      <circle cx="70" cy="70" r="35" fill="#EF9A9A" />
      <circle cx="70" cy="70" r="25" fill="#E57373" />
      <circle cx="70" cy="70" r="12" fill="#F44336" />
      <motion.g
        initial={{ x: -40, rotate: -45 }}
        animate={{ x: 0, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <rect x="65" y="25" width="10" height="50" fill="#FFC107" />
        <path d="M60 25 L70 10 L80 25 Z" fill="#FFD54F" />
        <rect x="68" y="75" width="4" height="25" fill="#8D6E63" />
        <path d="M60 95 L72 80 L72 100 Z" fill="#E57373" />
        <path d="M80 95 L68 80 L68 100 Z" fill="#EF9A9A" />
      </motion.g>
    </motion.svg>
  );
}

export function CoinStack({ className = "", size = 120 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.g
          key={i}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <ellipse cx="60" cy={95 - i * 12} rx="35" ry="10" fill="#FFC107" />
          <rect x="25" y={87 - i * 12} width="70" height="8" fill="#FFB300" />
          <ellipse cx="60" cy={87 - i * 12} rx="35" ry="10" fill="#FFD54F" />
          <text x="60" y={91 - i * 12} textAnchor="middle" fill="#5D4037" fontSize="10" fontWeight="bold">₹</text>
        </motion.g>
      ))}
    </motion.svg>
  );
}

export function ChartAnalysis({ className = "", size = 160 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 160 120"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <rect x="10" y="10" width="140" height="100" rx="8" fill="#E3F2FD" />
      <rect x="15" y="15" width="130" height="90" rx="6" fill="white" />
      {[30, 50, 70, 90, 110].map((x, i) => (
        <motion.g key={i}>
          <rect
            x={x}
            y={85 - [40, 55, 35, 65, 50][i]}
            width="12"
            height={[40, 55, 35, 65, 50][i]}
            rx="2"
            fill={i % 2 === 0 ? "#4CAF50" : "#2196F3"}
          />
        </motion.g>
      ))}
      <motion.path
        d="M30 70 L50 45 L70 55 L90 30 L110 40 L130 25"
        stroke="#FF5722"
        strokeWidth="2"
        strokeDasharray="4 2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
    </motion.svg>
  );
}

export function MentorCharacter({ className = "", size = 180 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <circle cx="90" cy="165" rx="50" ry="12" fill="#E8F5E9" />
      <rect x="65" y="85" width="50" height="65" rx="8" fill="#1565C0" />
      <rect x="68" y="88" width="44" height="59" rx="6" fill="#1976D2" />
      <path d="M75 88 L90 75 L105 88" fill="#FFC107" stroke="#FFC107" strokeWidth="2" />
      <circle cx="90" cy="50" r="32" fill="#FFCC80" />
      <circle cx="90" cy="50" r="29" fill="#FFE0B2" />
      <ellipse cx="80" cy="47" rx="3" ry="4" fill="#5D4037" />
      <ellipse cx="100" cy="47" rx="3" ry="4" fill="#5D4037" />
      <rect x="72" cy="42" width="36" height="2" rx="1" fill="#5D4037" />
      <path d="M85 60 Q90 65 95 60" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="90" cy="25" rx="30" ry="10" fill="#424242" />
      <rect x="75" y="15" width="30" height="15" fill="#424242" />
      <rect x="50" y="100" width="18" height="40" rx="6" fill="#FFE0B2" />
      <rect x="112" y="100" width="18" height="40" rx="6" fill="#FFE0B2" />
      <motion.g
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "135px 110px" }}
      >
        <rect x="120" y="95" width="30" height="40" rx="3" fill="#4CAF50" />
        <rect x="125" y="102" width="20" height="3" rx="1" fill="white" />
        <rect x="125" y="110" width="15" height="3" rx="1" fill="white" />
        <rect x="125" y="118" width="18" height="3" rx="1" fill="white" />
      </motion.g>
      <rect x="72" y="150" width="16" height="22" rx="4" fill="#5D4037" />
      <rect x="92" y="150" width="16" height="22" rx="4" fill="#5D4037" />
    </motion.svg>
  );
}

export function EmptyState({ className = "", size = 200, message = "" }: IllustrationProps & { message?: string }) {
  return (
    <motion.div
      className={`flex flex-col items-center gap-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <svg width={size} height={size * 0.7} viewBox="0 0 200 140" fill="none">
        <rect x="40" y="20" width="120" height="90" rx="8" fill="#F5F5F5" />
        <rect x="50" y="35" width="100" height="60" rx="4" fill="white" stroke="#E0E0E0" strokeWidth="2" />
        <circle cx="100" cy="65" r="20" fill="#E8F5E9" />
        <path d="M92 65 L98 71 L110 59" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <circle cx="160" cy="30" r="15" fill="#FFF9C4" />
          <text x="160" y="35" textAnchor="middle" fill="#FFC107" fontSize="14">?</text>
        </motion.g>
      </svg>
      {message && <p className="text-muted-foreground text-center">{message}</p>}
    </motion.div>
  );
}

export function DecorationDots({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="60" height="60" viewBox="0 0 60 60" fill="none">
      <circle cx="10" cy="10" r="4" fill="#4CAF50" opacity="0.3" />
      <circle cx="30" cy="10" r="4" fill="#2196F3" opacity="0.3" />
      <circle cx="50" cy="10" r="4" fill="#9C27B0" opacity="0.3" />
      <circle cx="10" cy="30" r="4" fill="#FF9800" opacity="0.3" />
      <circle cx="30" cy="30" r="4" fill="#4CAF50" opacity="0.3" />
      <circle cx="50" cy="30" r="4" fill="#2196F3" opacity="0.3" />
      <circle cx="10" cy="50" r="4" fill="#9C27B0" opacity="0.3" />
      <circle cx="30" cy="50" r="4" fill="#FF9800" opacity="0.3" />
      <circle cx="50" cy="50" r="4" fill="#4CAF50" opacity="0.3" />
    </svg>
  );
}
