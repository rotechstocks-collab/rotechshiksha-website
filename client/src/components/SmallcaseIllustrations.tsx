import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  size?: number;
}

export function HeroInvestorScene({ className = "", size = 400 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.85}
      viewBox="0 0 400 340"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDF6F0" />
          <stop offset="100%" stopColor="#FFEEE4" />
        </linearGradient>
        <linearGradient id="hillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8D5C4" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#44A08D" />
        </linearGradient>
      </defs>

      <rect width="400" height="340" fill="url(#skyGradient)" />

      <ellipse cx="200" cy="320" rx="200" ry="60" fill="url(#hillGradient)" />
      <ellipse cx="350" cy="290" rx="80" ry="40" fill="#D4C4B0" />
      <ellipse cx="50" cy="300" rx="70" ry="35" fill="#E0D0C0" />

      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="280" y="160" width="50" height="100" rx="4" fill="#4ECDC4" />
        <rect x="285" y="170" width="12" height="12" rx="2" fill="#FFFFFF" opacity="0.8" />
        <rect x="303" y="170" width="12" height="12" rx="2" fill="#FFFFFF" opacity="0.8" />
        <rect x="285" y="190" width="12" height="12" rx="2" fill="#FFFFFF" opacity="0.8" />
        <rect x="303" y="190" width="12" height="12" rx="2" fill="#FFFFFF" opacity="0.8" />
        <rect x="285" y="210" width="12" height="12" rx="2" fill="#FFFFFF" opacity="0.8" />
        <rect x="303" y="210" width="12" height="12" rx="2" fill="#FFFFFF" opacity="0.8" />
        <rect x="285" y="230" width="12" height="12" rx="2" fill="#FFFFFF" opacity="0.8" />
        <rect x="303" y="230" width="12" height="12" rx="2" fill="#FFFFFF" opacity="0.8" />
      </motion.g>

      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <rect x="340" y="180" width="35" height="80" rx="4" fill="#9B8CD7" />
        <rect x="345" y="188" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="360" y="188" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="345" y="205" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="360" y="205" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="345" y="222" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="360" y="222" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.7" />
      </motion.g>

      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <rect x="230" y="190" width="40" height="70" rx="4" fill="#FF7B7B" />
        <rect x="235" y="198" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.8" />
        <rect x="250" y="198" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.8" />
        <rect x="235" y="215" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.8" />
        <rect x="250" y="215" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.8" />
        <rect x="235" y="232" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.8" />
        <rect x="250" y="232" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.8" />
      </motion.g>

      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <rect x="25" y="200" width="45" height="60" rx="4" fill="#FFD93D" />
        <rect x="30" y="208" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.9" />
        <rect x="45" y="208" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.9" />
        <rect x="30" y="225" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.9" />
        <rect x="45" y="225" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.9" />
        <rect x="30" y="242" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.9" />
        <rect x="45" y="242" width="10" height="10" rx="1" fill="#FFFFFF" opacity="0.9" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="320" cy="290" rx="25" ry="8" fill="rgba(0,0,0,0.1)" />
          
          <rect x="305" y="235" width="30" height="40" rx="6" fill="#4A90E2" />
          <rect x="305" y="225" width="30" height="15" rx="3" fill="#FFFFFF" />
          
          <circle cx="320" cy="210" r="18" fill="#F5D0C5" />
          <ellipse cx="313" cy="208" rx="2" ry="2.5" fill="#2D3748" />
          <ellipse cx="327" cy="208" rx="2" ry="2.5" fill="#2D3748" />
          <path d="M315 216 Q320 220 325 216" stroke="#2D3748" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M302 198 Q312 185 320 190 Q328 185 338 198" fill="#2D3748" />
          
          <rect x="295" y="240" width="12" height="25" rx="4" fill="#F5D0C5" />
          <rect x="323" y="240" width="12" height="25" rx="4" fill="#F5D0C5" />
          
          <motion.g
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: "350px 250px" }}
          >
            <rect x="335" y="235" width="25" height="35" rx="4" fill="#FFFFFF" />
            <rect x="339" y="242" width="17" height="2" rx="1" fill="#4ECDC4" />
            <rect x="339" y="248" width="12" height="2" rx="1" fill="#E2E8F0" />
            <rect x="339" y="254" width="15" height="2" rx="1" fill="#E2E8F0" />
            <path d="M342 262 L348 268 L356 258" stroke="#4ECDC4" strokeWidth="2" fill="none" strokeLinecap="round" />
          </motion.g>
          
          <rect x="305" y="275" width="12" height="18" rx="3" fill="#2D3748" />
          <rect x="323" y="275" width="12" height="18" rx="3" fill="#2D3748" />
        </motion.g>
      </motion.g>

      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <ellipse cx="120" cy="295" rx="22" ry="7" fill="rgba(0,0,0,0.1)" />
          
          <rect x="106" y="240" width="28" height="38" rx="6" fill="#FF7B7B" />
          
          <circle cx="120" cy="218" r="16" fill="#E8B4A0" />
          <ellipse cx="114" cy="216" rx="2" ry="2.5" fill="#2D3748" />
          <ellipse cx="126" cy="216" rx="2" ry="2.5" fill="#2D3748" />
          <path d="M115 224 Q120 227 125 224" stroke="#2D3748" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <ellipse cx="120" cy="200" rx="18" ry="8" fill="#1A1A2E" />
          <rect x="105" y="192" width="30" height="12" fill="#1A1A2E" />
          
          <rect x="98" y="248" width="10" height="22" rx="3" fill="#E8B4A0" />
          <rect x="132" y="248" width="10" height="22" rx="3" fill="#E8B4A0" />
          
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <rect x="80" y="245" width="22" height="30" rx="3" fill="#FFFFFF" />
            <rect x="84" y="250" width="14" height="2" rx="1" fill="#9B8CD7" />
            <rect x="84" y="255" width="10" height="2" rx="1" fill="#E2E8F0" />
            <rect x="84" y="260" width="12" height="2" rx="1" fill="#E2E8F0" />
            <rect x="84" y="265" width="8" height="2" rx="1" fill="#E2E8F0" />
          </motion.g>
          
          <rect x="108" y="278" width="10" height="16" rx="3" fill="#4A3728" />
          <rect x="122" y="278" width="10" height="16" rx="3" fill="#4A3728" />
        </motion.g>
      </motion.g>

      <motion.g
        animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="180" cy="60" r="35" fill="#FFFFFF" opacity="0.6" />
        <circle cx="195" cy="55" r="25" fill="#FFFFFF" opacity="0.7" />
        <circle cx="165" cy="65" r="20" fill="#FFFFFF" opacity="0.5" />
      </motion.g>

      <motion.g
        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="60" cy="100" r="20" fill="#FFFFFF" opacity="0.5" />
        <circle cx="75" cy="95" r="15" fill="#FFFFFF" opacity="0.6" />
      </motion.g>

      <motion.g
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle cx="350" cy="80" r="5" fill="#FFD93D" />
      </motion.g>
      <motion.g
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        <circle cx="50" cy="150" r="4" fill="#4ECDC4" />
      </motion.g>
      <motion.g
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <circle cx="380" cy="130" r="3" fill="#FF7B7B" />
      </motion.g>

      <motion.path
        d="M160 280 Q175 240 200 250 Q225 260 240 220"
        stroke="#4ECDC4"
        strokeWidth="3"
        strokeDasharray="5,5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </motion.svg>
  );
}

export function InvestingCharacter({ className = "", size = 200 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="100" cy="185" rx="35" ry="10" fill="rgba(0,0,0,0.1)" />
        
        <rect x="80" y="115" width="40" height="55" rx="8" fill="#4A90E2" />
        <rect x="80" y="105" width="40" height="15" rx="4" fill="#FFFFFF" />
        
        <circle cx="100" cy="75" r="28" fill="#F5D0C5" />
        <ellipse cx="92" cy="72" rx="3" ry="3.5" fill="#2D3748" />
        <ellipse cx="108" cy="72" rx="3" ry="3.5" fill="#2D3748" />
        <path d="M94 82 Q100 87 106 82" stroke="#2D3748" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M72 60 Q85 42 100 48 Q115 42 128 60" fill="#2D3748" />
        
        <rect x="68" y="122" width="14" height="35" rx="5" fill="#F5D0C5" />
        <rect x="118" y="122" width="14" height="35" rx="5" fill="#F5D0C5" />
        
        <motion.g
          animate={{ rotate: [0, 8, 0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "145px 140px" }}
        >
          <circle cx="145" cy="130" r="20" fill="#FFD93D" />
          <text x="145" y="137" textAnchor="middle" fill="#5D4037" fontSize="16" fontWeight="bold">$</text>
        </motion.g>
        
        <rect x="82" y="170" width="14" height="20" rx="4" fill="#2D3748" />
        <rect x="104" y="170" width="14" height="20" rx="4" fill="#2D3748" />
      </motion.g>
    </motion.svg>
  );
}

export function GrowthArrowIllustration({ className = "", size = 180 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 180 126"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <rect x="10" y="10" width="160" height="106" rx="12" fill="#F0FDF9" />
      
      <motion.path
        d="M30 90 L50 75 L70 80 L90 55 L110 50 L130 35 L150 25"
        stroke="#4ECDC4"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.3 }}
      >
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <polygon points="150,15 160,30 145,30" fill="#4ECDC4" />
          <rect x="148" y="25" width="4" height="15" fill="#4ECDC4" />
        </motion.g>
      </motion.g>

      {[30, 50, 70, 90, 110, 130, 150].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={[90, 75, 80, 55, 50, 35, 25][i]}
          r="5"
          fill="#4A90E2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 * i, duration: 0.3 }}
        />
      ))}
    </motion.svg>
  );
}

export function PortfolioCard({ className = "", size = 160 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 160 176"
      fill="none"
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="20" y="20" width="120" height="140" rx="16" fill="#FFFFFF" />
        <rect x="20" y="20" width="120" height="140" rx="16" stroke="#E2E8F0" strokeWidth="2" />
        
        <rect x="35" y="35" width="50" height="50" rx="10" fill="#4ECDC4" opacity="0.2" />
        <motion.path
          d="M50 70 L60 55 L70 60 L75 50"
          stroke="#4ECDC4"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        <rect x="95" y="40" width="35" height="8" rx="4" fill="#E2E8F0" />
        <rect x="95" y="55" width="25" height="6" rx="3" fill="#4ECDC4" />
        
        <rect x="35" y="100" width="90" height="8" rx="4" fill="#E2E8F0" />
        <rect x="35" y="115" width="70" height="6" rx="3" fill="#E2E8F0" />
        <rect x="35" y="130" width="55" height="6" rx="3" fill="#E2E8F0" />

        <motion.g
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <circle cx="110" y="125" r="15" fill="#FFD93D" opacity="0.3" />
          <text x="110" y="130" textAnchor="middle" fill="#FFB800" fontSize="14" fontWeight="bold">+12%</text>
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}

export function PhoneWithChart({ className = "", size = 180 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 180 216"
      fill="none"
      className={className}
      initial={{ opacity: 0, rotate: -5 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="40" y="10" width="100" height="190" rx="20" fill="#1A1A2E" />
        <rect x="45" y="20" width="90" height="170" rx="15" fill="#FFFFFF" />
        
        <rect x="75" y="25" width="30" height="6" rx="3" fill="#E2E8F0" />
        
        <rect x="55" y="45" width="70" height="40" rx="8" fill="#F0FDF9" />
        <motion.path
          d="M60 75 L75 65 L90 70 L105 50 L120 55"
          stroke="#4ECDC4"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
        
        <rect x="55" y="95" width="70" height="12" rx="6" fill="#4A90E2" />
        <text x="90" y="104" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="600">View Portfolio</text>
        
        <rect x="55" y="115" width="70" height="30" rx="6" fill="#F7F8FA" />
        <circle cx="70" cy="130" r="8" fill="#FFD93D" opacity="0.3" />
        <text x="70" y="133" textAnchor="middle" fill="#FFB800" fontSize="8">$</text>
        <rect x="85" y="125" width="35" height="4" rx="2" fill="#E2E8F0" />
        <rect x="85" y="132" width="25" height="3" rx="1.5" fill="#4ECDC4" />
        
        <rect x="55" y="150" width="70" height="30" rx="6" fill="#F7F8FA" />
        <circle cx="70" cy="165" r="8" fill="#9B8CD7" opacity="0.3" />
        <text x="70" y="168" textAnchor="middle" fill="#7C3AED" fontSize="8">%</text>
        <rect x="85" y="160" width="35" height="4" rx="2" fill="#E2E8F0" />
        <rect x="85" y="167" width="20" height="3" rx="1.5" fill="#FF7B7B" />
      </motion.g>

      <motion.g
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="155" cy="50" r="6" fill="#4ECDC4" />
      </motion.g>
      <motion.g
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <circle cx="25" cy="80" r="4" fill="#FF7B7B" />
      </motion.g>
    </motion.svg>
  );
}

export function StockBasket({ className = "", size = 160 }: IllustrationProps) {
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
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M30 90 L50 140 L110 140 L130 90" fill="#E8B4A0" />
        <path d="M25 85 L135 85 L130 95 L30 95 Z" fill="#D4A088" />
        <path d="M50 85 L55 55 Q80 45 105 55 L110 85" stroke="#D4A088" strokeWidth="4" fill="none" />
        
        <motion.g
          animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        >
          <rect x="55" y="60" width="20" height="28" rx="4" fill="#4A90E2" />
          <motion.path
            d="M60 80 L65 72 L70 76"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>
        
        <motion.g
          animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
        >
          <rect x="70" y="50" width="20" height="28" rx="4" fill="#4ECDC4" />
          <motion.path
            d="M75 70 L80 62 L85 66"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>
        
        <motion.g
          animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
        >
          <rect x="85" y="55" width="20" height="28" rx="4" fill="#FF7B7B" />
          <motion.path
            d="M90 75 L95 67 L100 71"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>
      </motion.g>

      <text x="80" y="155" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="500">Stock Basket</text>
    </motion.svg>
  );
}

export function WaveBackground({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 320"
      fill="none"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,165.3C672,171,768,213,864,218.7C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        fill="#F0FDF9"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,240C672,256,768,256,864,240C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        fill="#E0FBF7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </svg>
  );
}

export function FloatingCoins({ className = "", size = 100 }: IllustrationProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      {[
        { cx: 25, cy: 30, delay: 0 },
        { cx: 50, cy: 50, delay: 0.3 },
        { cx: 75, cy: 25, delay: 0.6 },
        { cx: 40, cy: 75, delay: 0.9 },
        { cx: 70, cy: 70, delay: 1.2 },
      ].map((coin, i) => (
        <motion.g
          key={i}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 2 + i * 0.2,
            repeat: Infinity,
            delay: coin.delay,
            ease: "easeInOut",
          }}
        >
          <circle cx={coin.cx} cy={coin.cy} r={10 - i} fill="#FFD93D" />
          <text
            x={coin.cx}
            y={coin.cy + 3}
            textAnchor="middle"
            fill="#B8860B"
            fontSize={8 - i}
            fontWeight="bold"
          >
            $
          </text>
        </motion.g>
      ))}
    </motion.svg>
  );
}

export function DecorativeBlobs() {
  return (
    <>
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-coral-400/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, delay: 4 }}
      />
    </>
  );
}
