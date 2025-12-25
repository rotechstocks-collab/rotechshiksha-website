import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  size?: number;
}

export function InvestorWithChart({ className = "", size = 280 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 280 280"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <circle cx="140" cy="260" rx="80" ry="15" fill="#E8F4FD" />
      
      <rect x="30" y="60" width="120" height="90" rx="12" fill="#E8F4FD" />
      <rect x="35" y="65" width="110" height="80" rx="10" fill="white" />
      <motion.path
        d="M50 120 L70 100 L90 110 L110 80 L130 90"
        stroke="#3DB589"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      <motion.circle
        cx="130"
        cy="90"
        r="6"
        fill="#3DB589"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.8 }}
      />
      <rect x="50" y="125" width="30" height="8" rx="2" fill="#B8D9F8" />
      <rect x="50" y="135" width="20" height="4" rx="1" fill="#E8F4FD" />
      
      <rect x="150" y="100" width="100" height="120" rx="10" fill="#4A90D9" />
      <rect x="155" y="105" width="90" height="110" rx="8" fill="#5BA3E8" />
      
      <circle cx="200" cy="60" r="35" fill="#FFE0C2" />
      <circle cx="200" cy="60" r="32" fill="#FFECD2" />
      <ellipse cx="190" cy="57" rx="3" ry="4" fill="#2F363F" />
      <ellipse cx="210" cy="57" rx="3" ry="4" fill="#2F363F" />
      <path d="M193 70 Q200 76 207 70" stroke="#2F363F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="200" cy="35" rx="25" ry="12" fill="#2F363F" />
      <rect x="185" y="25" width="30" height="15" fill="#2F363F" />
      
      <rect x="140" y="115" width="18" height="45" rx="6" fill="#FFECD2" />
      <rect x="242" y="115" width="18" height="45" rx="6" fill="#FFECD2" />
      
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="240" y="100" width="40" height="55" rx="4" fill="#FFF8E1" />
        <rect x="246" y="110" width="28" height="3" rx="1" fill="#FFE082" />
        <rect x="246" y="118" width="22" height="3" rx="1" fill="#FFE082" />
        <rect x="246" y="126" width="26" height="3" rx="1" fill="#FFE082" />
        <circle cx="260" cy="142" r="8" fill="#3DB589" />
        <text x="260" y="145" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Rs</text>
      </motion.g>
      
      <rect x="170" y="220" width="20" height="35" rx="5" fill="#2F363F" />
      <rect x="210" y="220" width="20" height="35" rx="5" fill="#2F363F" />
      
      <motion.circle
        cx="60"
        cy="40"
        r="8"
        fill="#FFE082"
        animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="260"
        cy="30"
        r="6"
        fill="#9ED8C0"
        animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </motion.svg>
  );
}

export function LearningPerson({ className = "", size = 260 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 260 260"
      fill="none"
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <circle cx="130" cy="245" rx="70" ry="12" fill="#E6F7F0" />
      
      <circle cx="130" cy="55" r="38" fill="#FFE0C2" />
      <circle cx="130" cy="55" r="35" fill="#FFECD2" />
      <ellipse cx="118" cy="52" rx="4" ry="5" fill="#2F363F" />
      <ellipse cx="142" cy="52" rx="4" ry="5" fill="#2F363F" />
      <path d="M122 68 Q130 74 138 68" stroke="#2F363F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="130" cy="28" rx="32" ry="14" fill="#4A90D9" />
      <rect x="108" y="15" width="44" height="18" fill="#4A90D9" />
      
      <rect x="100" y="100" width="60" height="80" rx="10" fill="#3DB589" />
      <rect x="105" y="105" width="50" height="70" rx="8" fill="#4ACA9A" />
      
      <rect x="70" y="115" width="22" height="55" rx="8" fill="#FFECD2" />
      <rect x="168" y="115" width="22" height="55" rx="8" fill="#FFECD2" />
      
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: "55px 150px" }}
      >
        <rect x="30" y="120" width="50" height="65" rx="5" fill="#FFF8E1" />
        <rect x="36" y="130" width="38" height="4" rx="1" fill="#D4B8F8" />
        <rect x="36" y="140" width="30" height="4" rx="1" fill="#B8D9F8" />
        <rect x="36" y="150" width="35" height="4" rx="1" fill="#D4B8F8" />
        <rect x="36" y="160" width="28" height="4" rx="1" fill="#B8D9F8" />
      </motion.g>
      
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      >
        <rect x="185" y="110" width="55" height="45" rx="6" fill="#E8F4FD" />
        <rect x="192" y="118" width="40" height="4" rx="1" fill="#4A90D9" />
        <rect x="192" y="128" width="32" height="4" rx="1" fill="#B8D9F8" />
        <rect x="192" y="138" width="36" height="4" rx="1" fill="#4A90D9" />
      </motion.g>
      
      <rect x="108" y="180" width="20" height="55" rx="6" fill="#2F363F" />
      <rect x="132" y="180" width="20" height="55" rx="6" fill="#2F363F" />
      
      <motion.circle
        cx="220"
        cy="50"
        r="10"
        fill="#FFE082"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="45"
        cy="90"
        r="7"
        fill="#D4B8F8"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.svg>
  );
}

export function GrowthGraph({ className = "", size = 200 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 200 150"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <rect x="10" y="10" width="180" height="130" rx="16" fill="#E8F4FD" />
      <rect x="18" y="18" width="164" height="114" rx="12" fill="white" />
      
      <line x1="35" y1="110" x2="170" y2="110" stroke="#E5E7EB" strokeWidth="2" />
      <line x1="35" y1="110" x2="35" y2="35" stroke="#E5E7EB" strokeWidth="2" />
      
      {[50, 80, 110, 140].map((x, i) => (
        <motion.rect
          key={i}
          x={x}
          y={110 - [35, 55, 45, 65][i]}
          width="18"
          height={[35, 55, 45, 65][i]}
          rx="4"
          fill={["#B8D9F8", "#9ED8C0", "#B8D9F8", "#3DB589"][i]}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
          style={{ transformOrigin: `${x + 9}px 110px` }}
        />
      ))}
      
      <motion.path
        d="M45 90 L75 65 L105 75 L135 50 L165 40"
        stroke="#4A90D9"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
      
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.7 }}
      >
        <circle cx="165" cy="40" r="8" fill="#3DB589" />
        <path d="M161 40 L164 43 L170 37" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  );
}

export function CalculatorCard({ className = "", size = 180 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <rect x="25" y="20" width="130" height="140" rx="16" fill="#4A90D9" />
      <rect x="32" y="27" width="116" height="126" rx="12" fill="#5BA3E8" />
      
      <rect x="42" y="37" width="96" height="35" rx="6" fill="#1A1A2E" />
      <text x="130" y="60" textAnchor="end" fill="#3DB589" fontSize="18" fontWeight="bold">Rs 1,24,500</text>
      
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <motion.rect
            key={`${row}-${col}`}
            x={45 + col * 26}
            y={82 + row * 28}
            width="20"
            height="20"
            rx="6"
            fill={col === 3 ? "#FFE082" : "white"}
            whileHover={{ scale: 1.05 }}
          />
        ))
      )}
      
      <motion.g
        animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <circle cx="155" cy="30" r="22" fill="#FFE082" />
        <text x="155" y="37" textAnchor="middle" fill="#2F363F" fontSize="18" fontWeight="bold">Rs</text>
      </motion.g>
    </motion.svg>
  );
}

export function CoinsGrowth({ className = "", size = 160 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.g
          key={i}
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.12 }}
        >
          <ellipse cx="80" cy={130 - i * 18} rx="45" ry="12" fill="#FFE082" />
          <rect x="35" y={120 - i * 18} width="90" height="10" fill="#FFD54F" />
          <ellipse cx="80" cy={120 - i * 18} rx="45" ry="12" fill="#FFF8E1" />
          <text x="80" y={124 - i * 18} textAnchor="middle" fill="#2F363F" fontSize="11" fontWeight="bold">Rs</text>
        </motion.g>
      ))}
      
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        <path d="M80 20 L95 45 L80 40 L65 45 Z" fill="#3DB589" />
        <ellipse cx="80" cy="42" rx="15" ry="18" fill="#4ACA9A" />
      </motion.g>
    </motion.svg>
  );
}

export function BookStack({ className = "", size = 150 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ellipse cx="75" cy="135" rx="55" ry="10" fill="#E8F4FD" />
      
      <motion.g
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: "75px 100px" }}
      >
        <rect x="30" y="80" width="90" height="18" rx="3" fill="#4A90D9" />
        <rect x="35" y="85" width="60" height="4" rx="1" fill="white" opacity="0.5" />
      </motion.g>
      
      <rect x="25" y="58" width="100" height="18" rx="3" fill="#3DB589" />
      <rect x="30" y="63" width="70" height="4" rx="1" fill="white" opacity="0.5" />
      
      <rect x="35" y="36" width="80" height="18" rx="3" fill="#D4B8F8" />
      <rect x="40" y="41" width="55" height="4" rx="1" fill="white" opacity="0.5" />
      
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="115" cy="30" r="15" fill="#FFE082" />
        <path d="M108 30 L115 23 L122 30 L115 37 Z" fill="#FFD54F" />
      </motion.g>
    </motion.svg>
  );
}

export function TargetSuccess({ className = "", size = 160 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <circle cx="80" cy="80" r="60" fill="#E8F4FD" />
      <circle cx="80" cy="80" r="48" fill="#B8D9F8" />
      <circle cx="80" cy="80" r="36" fill="#4A90D9" />
      <circle cx="80" cy="80" r="24" fill="#3DB589" />
      <circle cx="80" cy="80" r="12" fill="white" />
      
      <motion.g
        initial={{ x: -50, rotate: -30 }}
        animate={{ x: 0, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <rect x="75" y="35" width="10" height="55" rx="2" fill="#FFE082" />
        <path d="M70 35 L80 20 L90 35 Z" fill="#FFD54F" />
        <rect x="78" y="90" width="4" height="25" rx="1" fill="#8D6E63" />
        <path d="M70 108 L82 95 L82 115 Z" fill="#D4B8F8" />
        <path d="M90 108 L78 95 L78 115 Z" fill="#F3E8FF" />
      </motion.g>
      
      <motion.circle
        cx="130"
        cy="30"
        r="8"
        fill="#FFE082"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.svg>
  );
}

export function IPORocket({ className = "", size = 180 }: IllustrationProps) {
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
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M90 30 L115 100 L90 90 L65 100 Z" fill="#4A90D9" />
        <ellipse cx="90" cy="95" rx="25" ry="30" fill="#5BA3E8" />
        <circle cx="90" cy="85" r="14" fill="#E8F4FD" />
        <path d="M90 80 L95 88 L85 88 Z" fill="#3DB589" />
        
        <path d="M65 105 L50 125 L70 112 Z" fill="#4A90D9" />
        <path d="M115 105 L130 125 L110 112 Z" fill="#4A90D9" />
        
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.8, 1.3, 0.8] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ transformOrigin: "90px 130px" }}
        >
          <path d="M78 120 L90 155 L102 120" fill="#FFE082" />
          <path d="M82 120 L90 145 L98 120" fill="#FFF8E1" />
        </motion.g>
      </motion.g>
      
      <motion.circle
        cx="40"
        cy="60"
        r="6"
        fill="#9ED8C0"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="145"
        cy="50"
        r="8"
        fill="#D4B8F8"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle
        cx="150"
        cy="120"
        r="5"
        fill="#FFE082"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
      />
    </motion.svg>
  );
}

export function FinanceTeam({ className = "", size = 300 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 300 240"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ellipse cx="150" cy="225" rx="120" ry="12" fill="#E8F4FD" />
      
      <circle cx="80" cy="75" r="30" fill="#FFE0C2" />
      <circle cx="80" cy="75" r="27" fill="#FFECD2" />
      <ellipse cx="72" cy="72" rx="3" ry="4" fill="#2F363F" />
      <ellipse cx="88" cy="72" rx="3" ry="4" fill="#2F363F" />
      <path d="M74 84 Q80 89 86 84" stroke="#2F363F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="52" rx="25" ry="10" fill="#D4B8F8" />
      
      <rect x="58" y="110" width="44" height="55" rx="8" fill="#D4B8F8" />
      <rect x="48" y="125" width="15" height="35" rx="5" fill="#FFECD2" />
      <rect x="97" y="125" width="15" height="35" rx="5" fill="#FFECD2" />
      <rect x="62" y="165" width="14" height="45" rx="4" fill="#2F363F" />
      <rect x="84" y="165" width="14" height="45" rx="4" fill="#2F363F" />
      
      <circle cx="150" cy="60" r="35" fill="#FFE0C2" />
      <circle cx="150" cy="60" r="32" fill="#FFECD2" />
      <ellipse cx="140" cy="57" rx="4" ry="5" fill="#2F363F" />
      <ellipse cx="160" cy="57" rx="4" ry="5" fill="#2F363F" />
      <path d="M143 72 Q150 78 157 72" stroke="#2F363F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="150" cy="35" rx="28" ry="12" fill="#2F363F" />
      
      <rect x="123" y="100" width="54" height="65" rx="10" fill="#4A90D9" />
      <rect x="108" y="120" width="18" height="40" rx="6" fill="#FFECD2" />
      <rect x="174" y="120" width="18" height="40" rx="6" fill="#FFECD2" />
      <rect x="130" y="165" width="16" height="50" rx="5" fill="#2F363F" />
      <rect x="154" y="165" width="16" height="50" rx="5" fill="#2F363F" />
      
      <circle cx="220" cy="80" r="28" fill="#FFE0C2" />
      <circle cx="220" cy="80" r="25" fill="#FFECD2" />
      <ellipse cx="212" cy="77" rx="3" ry="4" fill="#2F363F" />
      <ellipse cx="228" cy="77" rx="3" ry="4" fill="#2F363F" />
      <path d="M214 89 Q220 94 226 89" stroke="#2F363F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="220" cy="58" rx="22" ry="10" fill="#3DB589" />
      
      <rect x="200" y="115" width="40" height="50" rx="8" fill="#3DB589" />
      <rect x="190" y="130" width="14" height="30" rx="5" fill="#FFECD2" />
      <rect x="236" y="130" width="14" height="30" rx="5" fill="#FFECD2" />
      <rect x="204" y="165" width="13" height="42" rx="4" fill="#2F363F" />
      <rect x="223" y="165" width="13" height="42" rx="4" fill="#2F363F" />
      
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="135" y="30" width="30" height="25" rx="4" fill="#FFE082" />
        <text x="150" y="47" textAnchor="middle" fill="#2F363F" fontSize="12" fontWeight="bold">Rs</text>
      </motion.g>
    </motion.svg>
  );
}
