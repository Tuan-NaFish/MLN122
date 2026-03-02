import { GameScenario } from "../game-scenarios";

const scenario: GameScenario = {
  id: "eu-regulations",
  situation: "EU yêu cầu giảm hóa chất độc hại trong lúa",
  context:
    "Liên Minh Châu Âu tăng chuẩn chất lượng, buộc nông dân sử dụng phân bón hữu cơ thay vì hóa học. Chí phí sản xuất tăng nhưng chất lượng lúa tốt hơn.",
  options: [
    {
      text: "Lúa an toàn hơn → giá cao hơn",
      law: "value",
    },
    {
      text: "Cạnh tranh giá với Thái Lan",
      law: "competition",
    },
    {
      text: "Cung lúa tăng nên giá sẽ rẻ hơn",
      law: "supply_demand",
    },
  ],
  correctAnswerIndex: 0,
  explanation:
    "Lúa chất lượng cao hơn chứa lao động tốt hơn → giá trị cao hơn → giá cao hơn. Đây là quy luật giá trị.",
};

export default scenario;
