import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize2, Users, Radio } from "lucide-react";
import stockEducationVideo from "@assets/generated_videos/stock_market_charts_education_video.mp4";
import rotechLogo from "@assets/generated_images/rotech_shiksha_logo_icon.png";

export function LiveVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Badge 
            variant="outline" 
            className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30 mb-4"
          >
            <Radio className="w-3 h-3 mr-1 animate-pulse" />
            Live Learning Session
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Experience Live Stock Market Education
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our expert mentors teach real-time market analysis and trading strategies
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-xl overflow-hidden shadow-2xl bg-black/5 dark:bg-white/5"
        >
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              src={stockEducationVideo}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              data-testid="video-live-session"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-4 left-4 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">LIVE</span>
              </div>
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Users className="w-4 h-4 text-white" />
                <span className="text-white text-sm">2,847 watching</span>
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <div className="bg-black/60 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg border border-white/10">
                <div className="flex items-center gap-2">
                  <img 
                    src={rotechLogo} 
                    alt="Rotech Shiksha" 
                    className="w-10 h-10 rounded-lg object-contain"
                    data-testid="img-logo-watermark"
                  />
                  <div className="text-white">
                    <p className="text-sm font-bold tracking-wide">ROTECH SHIKSHA</p>
                    <p className="text-[10px] uppercase tracking-widest opacity-70">Stock Market Education</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 right-4 opacity-50 pointer-events-none hidden md:block">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1">
                <img 
                  src={rotechLogo} 
                  alt="Rotech Shiksha" 
                  className="w-6 h-6 rounded object-contain"
                />
                <span className="text-white text-xs font-semibold">Rotech Shiksha</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/10 hover:bg-white/20 text-white border-0"
                    onClick={handlePlayPause}
                    data-testid="button-play-pause"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/10 hover:bg-white/20 text-white border-0"
                    onClick={toggleMute}
                    data-testid="button-toggle-mute"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                </div>

                <div className="hidden md:flex items-center gap-4 text-white text-sm">
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">
                    <span className="opacity-70">Topic:</span>{" "}
                    <span className="font-medium">Understanding Candlestick Patterns</span>
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/10 hover:bg-white/20 text-white border-0"
                  onClick={handleFullscreen}
                  data-testid="button-fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="absolute bottom-16 left-4 right-4 md:hidden">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-sm">
                <span className="opacity-70">Topic:</span>{" "}
                <span className="font-medium">Understanding Candlestick Patterns</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600/10 to-blue-600/10 border-t border-border/50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium text-primary"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">10,000+</span> learners joined this week
                </p>
              </div>
              <Button variant="default" className="gap-2" data-testid="button-join-live">
                Join Free Classes
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-8"
        >
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
              <Play className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Daily Live Sessions</h3>
            <p className="text-sm text-muted-foreground">Free live classes every day on stock market basics</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Expert Mentors</h3>
            <p className="text-sm text-muted-foreground">Learn from experienced traders and analysts</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
              <Radio className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Real-time Analysis</h3>
            <p className="text-sm text-muted-foreground">Watch live market analysis during trading hours</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
