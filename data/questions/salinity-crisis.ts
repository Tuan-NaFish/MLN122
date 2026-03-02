import { GameScenario } from "../game-scenarios";

const scenario: GameScenario = {
  id: "salinity-crisis",
  situation: "Hạn hán kéo dài, hơn 1 triệu ha lúa bị mặn hóa",
  context:
    "Một năm nắng nóng bất thường làm hơn 1 triệu hecta lúa không thể trồng được do đất bị mặn. Kho lúa toàn quốc suy giảm đáng kể.",
  options: [
    {
      text: "Giảm bớt lao động, tiết kiệm chi phí",
      law: "value",
    },
    {
      text: "Tăng giá lúa để bù đắp thiệt hại",
      law: "supply_demand",
    },
    {
      text: "Nhập khẩu lúa từ Thái Lan",
      law: "competition",
    },
  ],
  correctAnswerIndex: 1,
  explanation:
    "Khi cung giảm (lúa thiếu), nhu cầu vẫn cao → giá tăng. Đây là quy luật cung cầu cơ bản.",
};

export default scenario;
