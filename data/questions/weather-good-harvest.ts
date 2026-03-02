import { GameScenario } from "../game-scenarios";

const scenario: GameScenario = {
  id: "weather-good-harvest",
  situation: "Một năm được mùa, hơn 50 triệu tấn lúa được thu hoạch",
  context:
    "Thời tiết thuận lợi, hết hạn, hết bệnh → nông dân thu được lúa rất nhiều. Kho lúa tràn ngập.",
  options: [
    {
      text: "Giá lúa sẽ tăng cao",
      law: "value",
    },
    {
      text: "Giá lúa sẽ rẻ bởi cung quá nhiều",
      law: "supply_demand",
    },
    {
      text: "Giá lúa sẽ phụ thuộc vào Thái Lan",
      law: "competition",
    },
  ],
  correctAnswerIndex: 1,
  explanation:
    "Khi cung tăng (lúa dôi) nhưng nhu cầu không đổi → giá giảm. Đây là quy luật cung cầu.",
};

export default scenario;
