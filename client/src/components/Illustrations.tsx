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
      {/* Shadow */}
      <ellipse cx="100" cy="188" rx="35" ry="8" fill="currentColor" opacity="0.08" />
      
      {/* Legs */}
      <path d="M85 148 L82 185 L92 185 L94 148" fill="#1F2937" />
      <path d="M106 148 L108 185 L118 185 L116 148" fill="#374151" />
      
      {/* Shoes */}
      <ellipse cx="87" cy="187" rx="7" ry="3" fill="#111827" />
      <ellipse cx="113" cy="187" rx="7" ry="3" fill="#111827" />
      
      {/* Body - Professional suit */}
      <path d="M72 92 L68 152 L132 152 L128 92 Q100 87 72 92" fill="#059669" />
      <path d="M76 94 L72 148 L128 148 L124 94 Q100 90 76 94" fill="#10B981" />
      
      {/* Tie */}
      <path d="M97 94 L100 120 L103 94" fill="#F59E0B" />
      <path d="M98 94 L100 115 L102 94" fill="#FBBF24" />
      
      {/* Collar/shirt */}
      <path d="M92 92 L100 100 L108 92" fill="#F8FAFC" />
      
      {/* Neck */}
      <rect x="94" y="78" width="12" height="15" rx="2" fill="#D4A574" />
      
      {/* Head */}
      <ellipse cx="100" cy="55" rx="28" ry="30" fill="#D4A574" />
      
      {/* Hair - Professional short hair */}
      <path d="M72 45 Q72 22 100 20 Q128 22 128 45 L128 38 Q125 28 100 26 Q75 28 72 38 Z" fill="#1A1A2E" />
      <path d="M74 42 Q74 30 100 28 Q126 30 126 42 L126 35 Q122 25 100 24 Q78 25 74 35 Z" fill="#2D2D44" />
      
      {/* Ears */}
      <ellipse cx="72" cy="55" rx="4" ry="6" fill="#C9A66B" />
      <ellipse cx="128" cy="55" rx="4" ry="6" fill="#C9A66B" />
      
      {/* Face features - Minimal */}
      <ellipse cx="90" cy="52" rx="2.5" ry="3" fill="#4A3728" />
      <ellipse cx="110" cy="52" rx="2.5" ry="3" fill="#4A3728" />
      
      {/* Eyebrows */}
      <path d="M85 46 Q90 44 95 46" stroke="#3D2914" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M105 46 Q110 44 115 46" stroke="#3D2914" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Smile */}
      <path d="M94 68 Q100 72 106 68" stroke="#8B6914" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Nose */}
      <path d="M100 58 L100 62" stroke="#C9A66B" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Arms */}
      <path d="M68 98 L52 135 L58 138 L72 105" fill="#D4A574" />
      <path d="M132 98 L148 135 L142 138 L128 105" fill="#D4A574" />
      
      {/* Phone/tablet with chart */}
      <motion.g
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "145px 130px" }}
      >
        <rect x="135" y="115" width="28" height="40" rx="3" fill="#1E293B" />
        <rect x="137" y="118" width="24" height="32" rx="2" fill="#0F172A" />
        <path d="M140 138 L146 132 L152 140 L158 125" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="140" y="142" width="10" height="2" rx="1" fill="#64748B" />
        <rect x="140" y="146" width="14" height="2" rx="1" fill="#64748B" />
      </motion.g>
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
      {/* Shadow */}
      <ellipse cx="100" cy="188" rx="35" ry="8" fill="currentColor" opacity="0.08" />
      
      {/* Legs - Dark formal pants */}
      <path d="M85 145 L80 185 L92 185 L95 145" fill="#2D3748" />
      <path d="M105 145 L108 185 L120 185 L115 145" fill="#374151" />
      
      {/* Shoes */}
      <ellipse cx="86" cy="187" rx="8" ry="4" fill="#1A202C" />
      <ellipse cx="114" cy="187" rx="8" ry="4" fill="#1A202C" />
      
      {/* Body - Casual blazer over shirt */}
      <path d="M70 90 L65 150 L135 150 L130 90 Q100 85 70 90" fill="#3B82F6" />
      <path d="M75 92 L70 145 L130 145 L125 92 Q100 88 75 92" fill="#60A5FA" />
      
      {/* Inner shirt / collar */}
      <path d="M92 90 L100 110 L108 90" fill="#F8FAFC" />
      <path d="M95 92 L100 105 L105 92" fill="#E2E8F0" />
      
      {/* Neck */}
      <rect x="94" y="78" width="12" height="14" rx="2" fill="#D4A574" />
      
      {/* Head - Warm skin tone */}
      <ellipse cx="100" cy="55" rx="28" ry="30" fill="#D4A574" />
      
      {/* Hair - Modern styled dark hair */}
      <path d="M72 45 Q72 25 100 22 Q128 25 128 45 L128 40 Q125 30 100 28 Q75 30 72 40 Z" fill="#1A1A2E" />
      <path d="M72 45 L72 50 Q72 35 85 33 L100 32 L115 33 Q128 35 128 50 L128 45 Q128 38 100 35 Q72 38 72 45" fill="#2D2D44" />
      
      {/* Ears */}
      <ellipse cx="72" cy="55" rx="4" ry="6" fill="#C9A66B" />
      <ellipse cx="128" cy="55" rx="4" ry="6" fill="#C9A66B" />
      
      {/* Face features - Minimal and clean */}
      <ellipse cx="90" cy="52" rx="2.5" ry="3" fill="#4A3728" />
      <ellipse cx="110" cy="52" rx="2.5" ry="3" fill="#4A3728" />
      
      {/* Eyebrows */}
      <path d="M85 46 Q90 44 95 46" stroke="#3D2914" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M105 46 Q110 44 115 46" stroke="#3D2914" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Subtle smile */}
      <path d="M94 68 Q100 72 106 68" stroke="#8B6914" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Nose hint */}
      <path d="M100 58 L100 62" stroke="#C9A66B" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Arms */}
      <path d="M65 95 L50 130 L55 132 L68 100" fill="#D4A574" />
      <path d="M135 95 L150 130 L145 132 L132 100" fill="#D4A574" />
      
      {/* Laptop/Device in hand */}
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="40" y="120" width="32" height="22" rx="2" fill="#1E293B" />
        <rect x="42" y="122" width="28" height="16" rx="1" fill="#60A5FA" />
        <rect x="44" y="124" width="10" height="2" rx="1" fill="#93C5FD" />
        <rect x="44" y="128" width="8" height="2" rx="1" fill="#93C5FD" />
        <rect x="44" y="132" width="12" height="2" rx="1" fill="#93C5FD" />
      </motion.g>
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
      {/* Shadow */}
      <ellipse cx="90" cy="172" rx="30" ry="6" fill="currentColor" opacity="0.08" />
      
      {/* Legs - Professional pants */}
      <path d="M78 135 L75 168 L85 168 L87 135" fill="#374151" />
      <path d="M93 135 L95 168 L105 168 L103 135" fill="#4B5563" />
      
      {/* Shoes - Heels */}
      <ellipse cx="80" cy="170" rx="6" ry="3" fill="#1F2937" />
      <ellipse cx="100" cy="170" rx="6" ry="3" fill="#1F2937" />
      
      {/* Body - Professional kurta/blazer */}
      <path d="M65 82 L60 140 L120 140 L115 82 Q90 78 65 82" fill="#7C3AED" />
      <path d="M68 84 L64 136 L116 136 L112 84 Q90 80 68 84" fill="#8B5CF6" />
      
      {/* Dupatta/Scarf accent */}
      <path d="M85 84 L80 120 L82 120 L88 84" fill="#F59E0B" opacity="0.9" />
      <path d="M95 84 L100 120 L98 120 L92 84" fill="#F59E0B" opacity="0.9" />
      
      {/* Neck */}
      <rect x="84" y="70" width="12" height="14" rx="2" fill="#D4A574" />
      
      {/* Earrings */}
      <circle cx="66" cy="52" r="3" fill="#F59E0B" />
      <circle cx="114" cy="52" r="3" fill="#F59E0B" />
      
      {/* Head - Warm skin tone */}
      <ellipse cx="90" cy="48" rx="25" ry="27" fill="#D4A574" />
      
      {/* Hair - Long dark hair styled professionally */}
      <path d="M65 42 Q65 20 90 18 Q115 20 115 42 L118 65 Q118 75 110 80 L90 82 L70 80 Q62 75 62 65 Z" fill="#1A1A2E" />
      <path d="M68 45 Q68 28 90 25 Q112 28 112 45 L112 55 Q110 48 90 46 Q70 48 68 55 Z" fill="#2D2D44" />
      
      {/* Face area (clear) */}
      <ellipse cx="90" cy="50" rx="22" ry="23" fill="#D4A574" />
      
      {/* Side hair framing face */}
      <path d="M65 42 Q62 55 65 70 L68 70 Q66 55 68 45 Z" fill="#1A1A2E" />
      <path d="M115 42 Q118 55 115 70 L112 70 Q114 55 112 45 Z" fill="#1A1A2E" />
      
      {/* Bindi */}
      <circle cx="90" cy="38" r="2" fill="#DC2626" />
      
      {/* Eyes - Clean minimal */}
      <ellipse cx="82" cy="48" rx="2.5" ry="3" fill="#4A3728" />
      <ellipse cx="98" cy="48" rx="2.5" ry="3" fill="#4A3728" />
      
      {/* Eyebrows */}
      <path d="M77 42 Q82 40 87 42" stroke="#3D2914" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M93 42 Q98 40 103 42" stroke="#3D2914" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Confident smile */}
      <path d="M85 62 Q90 66 95 62" stroke="#8B6914" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Nose hint */}
      <path d="M90 52 L90 56" stroke="#C9A66B" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Arms */}
      <path d="M60 88 L48 118 L52 120 L62 92" fill="#D4A574" />
      <path d="M120 88 L132 118 L128 120 L118 92" fill="#D4A574" />
      
      {/* Chart/Document in hand - representing expertise */}
      <motion.g
        animate={{ rotate: [0, 3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "140px 115px" }}
      >
        <rect x="125" y="105" width="28" height="36" rx="2" fill="#F8FAFC" />
        <rect x="128" y="108" width="22" height="4" rx="1" fill="#7C3AED" />
        <path d="M130 118 L135 125 L140 120 L145 128 L150 115" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="128" y="132" width="12" height="2" rx="1" fill="#CBD5E1" />
        <rect x="128" y="136" width="16" height="2" rx="1" fill="#CBD5E1" />
      </motion.g>
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
