import { GameScenario } from "../game-scenarios";

const scenario: GameScenario = {
  id: "government-subsidy",
  situation: "Chính phủ cấp trợ cấp 500k/tấn lúa",
  context:
    "Nhà nước muốn ủng hộ nông dân, quyết định trợ cấp 500,000 VNĐ cho mỗi tấn lúa được sản xuất.",
  options: [
    {
      text: "Nông dân Việt sẽ sản xuất nhiều hơn",
      law: "supply_demand",
    },
    {
      text: "Lúa Việt sẽ có giá trị cao hơn",
      law: "value",
    },
    {
      text: "Lúa Thái sẽ cạnh tranh tốt hơn",
      law: "competition",
    },
  ],
  correctAnswerIndex: 0,
  explanation:
    "Trợ cấp khiến nông dân muốn sản xuất nhiều hơn → cung tăng. Đây là ảnh hưởng tới cung cầu.",
};

export default scenario;
