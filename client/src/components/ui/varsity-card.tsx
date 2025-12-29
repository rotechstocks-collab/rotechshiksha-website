import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface VarsityCardProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  badge?: string | number;
  badgeColor?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  illustration?: ReactNode;
  footer?: ReactNode;
  variant?: "default" | "feature" | "module" | "stat";
}

export function VarsityCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
  badge,
  badgeColor = "bg-primary text-white",
  children,
  className,
  onClick,
  href,
  illustration,
  footer,
  variant = "default",
}: VarsityCardProps) {
  const baseClasses = cn(
    "bg-white dark:bg-card rounded-xl border border-border/50",
    "transition-all duration-200 ease-out",
    "hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5",
    onClick || href ? "cursor-pointer" : "",
    className
  );

  const content = (
    <>
      {variant === "module" && badge !== undefined && (
        <div className={cn("absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold", badgeColor)}>
          {badge}
        </div>
      )}
      
      {variant === "feature" && Icon && (
        <div className="flex flex-col items-center text-center">
          <div className={cn("w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4", iconColor)}>
            <Icon className="w-7 h-7" />
          </div>
          {title && <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>}
        </div>
      )}
      
      {variant === "stat" && (
        <div className="text-center">
          {Icon && (
            <div className={cn("w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3", iconColor)}>
              <Icon className="w-6 h-6" />
            </div>
          )}
          {title && <p className="text-3xl font-bold text-foreground mb-1">{title}</p>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      
      {(variant === "default" || variant === "module") && (
        <>
          <div className="flex items-start gap-4">
            {Icon && variant === "default" && (
              <div className={cn("w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", iconColor)}>
                <Icon className="w-6 h-6" />
              </div>
            )}
            {illustration && <div className="shrink-0">{illustration}</div>}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {description}
                </p>
              )}
            </div>
          </div>
          {children}
        </>
      )}
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-border/50">
          {footer}
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(baseClasses, "block p-6 relative no-underline")}>
        {content}
      </a>
    );
  }

  return (
    <div
      className={cn(baseClasses, "p-6 relative")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {content}
    </div>
  );
}

interface VarsityModuleCardProps {
  number: number;
  title: string;
  description: string;
  topics?: string[];
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
  className?: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export function VarsityModuleCard({
  number,
  title,
  description,
  topics,
  icon: Icon,
  href,
  onClick,
  className,
  level,
}: VarsityModuleCardProps) {
  const levelColors = {
    Beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Intermediate: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Advanced: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Expert: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };

  const content = (
    <div className="relative">
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-md">
        {number}
      </div>
      
      <div className="pt-4">
        {Icon && (
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        
        {level && (
          <span className={cn("inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3", levelColors[level])}>
            {level}
          </span>
        )}
        
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
        
        {topics && topics.length > 0 && (
          <ul className="space-y-2">
            {topics.slice(0, 4).map((topic, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="line-clamp-1">{topic}</span>
              </li>
            ))}
            {topics.length > 4 && (
              <li className="text-xs text-primary font-medium">
                +{topics.length - 4} more topics
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );

  const baseClasses = cn(
    "bg-white dark:bg-card rounded-xl border border-border/50 p-6",
    "transition-all duration-200 ease-out",
    "hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1",
    "cursor-pointer",
    className
  );

  if (href) {
    return (
      <a href={href} className={cn(baseClasses, "block no-underline")}>
        {content}
      </a>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick} role="button" tabIndex={0}>
      {content}
    </div>
  );
}

interface VarsitySectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

export function VarsitySection({
  title,
  subtitle,
  children,
  className,
  centered = false,
}: VarsitySectionProps) {
  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className={cn("mb-12", centered && "text-center")}>
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

interface VarsityHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  illustration?: ReactNode;
  className?: string;
}

export function VarsityHero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  illustration,
  className,
}: VarsityHeroProps) {
  return (
    <section className={cn("pt-10 md:pt-14 pb-8 md:pb-10 bg-gradient-to-b from-background to-muted/20", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {subtitle && (
              <p className="text-primary font-medium mb-4">{subtitle}</p>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                {description}
              </p>
            )}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap gap-4">
                {primaryAction}
                {secondaryAction}
              </div>
            )}
          </div>
          {illustration && (
            <div className="flex justify-center lg:justify-end">
              {illustration}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
