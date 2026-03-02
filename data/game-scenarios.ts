export interface GameScenario {
  id: string;
  situation: string;
  context: string;
  options: {
    text: string;
    law: "supply_demand" | "value" | "competition";
  }[];
  correctAnswerIndex: number;
  explanation: string;
}

// Import all questions from individual files for easy editing
import { allQuestions } from "./questions";

export const gameScenarios: GameScenario[] = allQuestions;

export function shuffleScenarios(scenarios: GameScenario[]): GameScenario[] {
  const shuffled = [...scenarios];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
