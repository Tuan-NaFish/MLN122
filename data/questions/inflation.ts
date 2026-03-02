import { GameScenario } from "../game-scenarios";

const scenario: GameScenario = {
  id: "inflation",
  situation: "Lạm phát tăng 10%, tất cả giá tăng lên gồm cả giá lúa",
  context:
    "Kinh tế có lạm phát cao, tiền giảm giá trị. Nông dân phải tăng giá lúa để theo kịp chi phí sản xuất tăng.",
  options: [
    {
      text: "Giá lúa tăng do cung giảm",
      law: "supply_demand",
    },
    {
      text: "Giá lúa tăng do lạm phát, không phải do quy luật kinh tế",
      law: "competition",
    },
    {
      text: "Giá lúa tăng do giá trị lao động tăng",
      law: "value",
    },
  ],
  correctAnswerIndex: 2,
  explanation:
    "Lạm phát làm lao động có giá trị cao hơn (tiền giảm giá trị) → lúa chứa lao động có giá cao hơn. Quy luật giá trị.",
};

export default scenario;
