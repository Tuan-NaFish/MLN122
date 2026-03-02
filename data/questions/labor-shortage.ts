import { GameScenario } from "../game-scenarios";

const scenario: GameScenario = {
  id: "labor-shortage",
  situation: "Vùng nông thôn thiếu lao động, người làm nông đi thành phố",
  context:
    "Lao động nông nghiệp ngày càng thiếu vì người trẻ chuyển sang làm công nhân, nhân viên văn phòng. Sản lượng lúa giảm, nhưng lao động có thể tăng giá.",
  options: [
    {
      text: "Cung lúa giảm, giá tăng",
      law: "supply_demand",
    },
    {
      text: "Giá trị lao động tăng nên lúa có giá cao hơn",
      law: "value",
    },
    {
      text: "Phải nhập lao động nước ngoài",
      law: "competition",
    },
  ],
  correctAnswerIndex: 0,
  explanation:
    "Thiếu lao động → sản lượng giảm → cung lúa giảm → giá tăng. Đây là quy luật cung cầu.",
};

export default scenario;
