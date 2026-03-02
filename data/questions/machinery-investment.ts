import { GameScenario } from "../game-scenarios";

const scenario: GameScenario = {
  id: "machinery-investment",
  situation: "Nông dân đầu tư máy móc để tăng năng suất",
  context:
    "Một số nông dân mua máy cầm tay, máy tưới nhỏ giọt. Hao phí lao động giảm, 1 người làm việc của 3 người. Sản lượng tăng nhưng số người làm việc giảm.",
  options: [
    {
      text: "Lúa giá rẻ hơn vì sản lượng tăng",
      law: "supply_demand",
    },
    {
      text: "Lúa giá cao hơn vì chất lượng tốt",
      law: "value",
    },
    {
      text: "Nông dân nhỏ sẽ cạnh tranh khó với nông dân lớn",
      law: "competition",
    },
  ],
  correctAnswerIndex: 0,
  explanation:
    "Khi cung tăng (sản lượng nhiều hơn) nhưng nhu cầu không đổi → giá giảm. Đây là quy luật cung cầu.",
};

export default scenario;
