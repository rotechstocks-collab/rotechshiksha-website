import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  RotateCcw,
  Award,
  Sparkles,
  PartyPopper,
  TrendingUp,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizData } from "@/content/quizzes/quiz-data";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface QuizHistoryData {
  attempts: Array<{
    id: string;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    attemptNumber: number;
    createdAt: string;
  }>;
  bestScore: number | null;
  lastAttempt: {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    createdAt: string;
  } | null;
  attemptCount: number;
}

interface LessonQuizProps {
  quizData: QuizData;
}

export default function LessonQuiz({ quizData }: LessonQuizProps) {
  const { levelId, questions, successMessage, retryMessage, nextLevelPath, nextLevelText } = quizData;
  const totalQuestions = questions.length;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  // Fetch quiz history
  const { data: quizHistory } = useQuery<QuizHistoryData>({
    queryKey: ['/api/quiz/history', levelId],
  });

  // Save quiz attempt mutation
  const saveAttemptMutation = useMutation({
    mutationFn: async (data: { levelId: number; score: number; correctAnswers: number; totalQuestions: number }) => {
      return apiRequest('POST', '/api/quiz/attempt', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/history', levelId] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
    }
  });

  // Mark level complete mutation
  const markCompleteMutation = useMutation({
    mutationFn: async (levelId: number) => {
      return apiRequest('POST', '/api/progress/complete', { levelId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
    }
  });

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const hasSelectedCurrent = selectedAnswers[currentQuestion] !== null;

  const correctCount = selectedAnswers.reduce((count: number, answer, index) => {
    return answer === questions[index].correctIndex ? count + 1 : count;
  }, 0);
  const score = Math.round((correctCount / totalQuestions) * 100);
  const isPerfectScore = score === 100;

  useEffect(() => {
    if (showCelebration) {
      const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4"];
      const pieces = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setConfettiPieces(pieces);
    }
  }, [showCelebration]);

  const handleOptionSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    
    // Save quiz attempt to backend
    saveAttemptMutation.mutate({
      levelId,
      score,
      correctAnswers: correctCount,
      totalQuestions
    });
    
    // Mark level complete if passing score (70%+)
    if (score >= 70) {
      markCompleteMutation.mutate(levelId);
    }
    
    if (isPerfectScore) {
      setShowCelebration(true);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers(Array(totalQuestions).fill(null));
    setCurrentQuestion(0);
    setIsSubmitted(false);
    setShowCelebration(false);
  };

  const allAnswered = selectedAnswers.every((a) => a !== null);

  if (showCelebration) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center overflow-hidden">
        {confettiPieces.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${piece.x}%`,
              backgroundColor: piece.color,
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{
              y: "100vh",
              opacity: [1, 1, 0],
              rotate: 360 * 3,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: piece.delay,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, delay: 0.3 }}
          className="relative z-10 text-center px-6 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <PartyPopper className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {successMessage.title}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xl text-white/90 mb-4"
          >
            {successMessage.rohitText}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8"
          >
            <p className="text-white italic">
              Priya muskurate hue kehti hai:
            </p>
            <p className="text-white font-semibold text-lg mt-2">
              "{successMessage.priyaQuote}"
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <Link href={nextLevelPath}>
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-white/90 font-semibold text-lg px-8 py-6"
                data-testid="button-next-level-celebration"
              >
                {nextLevelText}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-white/70 text-sm mt-6"
          >
            Score: {score}% ({correctCount}/{totalQuestions} correct)
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-lg">Quiz Time!</h3>
        </div>
        <Badge variant="secondary" className="text-sm">
          Q{currentQuestion + 1}/{totalQuestions}
        </Badge>
      </div>

      {/* Last Attempt Info */}
      {quizHistory?.lastAttempt && !isSubmitted && (
        <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-muted/50 text-sm">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Last attempt:</span>
            <span className="font-medium">{quizHistory.lastAttempt.score}%</span>
          </div>
          {quizHistory.bestScore !== null && quizHistory.bestScore > quizHistory.lastAttempt.score && (
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-muted-foreground">Best:</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">{quizHistory.bestScore}%</span>
            </div>
          )}
          {quizHistory.attemptCount > 1 && (
            <span className="text-muted-foreground">
              ({quizHistory.attemptCount} attempts)
            </span>
          )}
        </div>
      )}

      <div className="flex gap-1">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-colors ${
              isSubmitted
                ? selectedAnswers[index] === questions[index].correctIndex
                  ? "bg-emerald-500"
                  : "bg-red-400"
                : index === currentQuestion
                ? "bg-primary"
                : selectedAnswers[index] !== null
                ? "bg-primary/50"
                : "bg-muted"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-lg font-medium mb-6">{currentQ.question}</p>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion] === index;
                  const isCorrect = index === currentQ.correctIndex;
                  const showResult = isSubmitted;

                  let optionStyles = "border-2 ";
                  if (showResult) {
                    if (isCorrect) {
                      optionStyles += "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30";
                    } else if (isSelected && !isCorrect) {
                      optionStyles += "border-red-400 bg-red-50 dark:bg-red-950/30";
                    } else {
                      optionStyles += "border-muted opacity-60";
                    }
                  } else {
                    if (isSelected) {
                      optionStyles += "border-primary bg-primary/5";
                    } else {
                      optionStyles += "border-muted hover-elevate cursor-pointer";
                    }
                  }

                  return (
                    <div
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`p-4 rounded-lg flex items-center gap-3 transition-all ${optionStyles}`}
                      data-testid={`option-${currentQuestion}-${index}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                          showResult
                            ? isCorrect
                              ? "bg-emerald-500 text-white"
                              : isSelected
                              ? "bg-red-400 text-white"
                              : "bg-muted text-muted-foreground"
                            : isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {showResult ? (
                          isCorrect ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className={showResult && isCorrect ? "font-medium" : ""}>
                        {option}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          data-testid="button-previous-question"
        >
          Previous
        </Button>

        {isLastQuestion ? (
          isSubmitted ? (
            isPerfectScore ? null : (
              <Button onClick={handleRetry} data-testid="button-retry-quiz">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry Quiz
              </Button>
            )
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              data-testid="button-submit-quiz"
            >
              <Award className="w-4 h-4 mr-2" />
              Submit Quiz
            </Button>
          )
        ) : (
          <Button
            onClick={handleNext}
            disabled={!hasSelectedCurrent}
            data-testid="button-next-question"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>

      {isSubmitted && !isPerfectScore && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium mb-1">
                    Score: {score}% ({correctCount}/{totalQuestions} correct)
                  </p>
                  <p className="text-muted-foreground text-sm">{retryMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
