import { GameScenario } from "../game-scenarios";

const scenario: GameScenario = {
  id: "thai-competition",
  situation: "Thái Lan xuất khẩu lúa giá rẻ, áp lực lên nông dân Việt",
  context:
    "Nước Thái bán lúa với giá $200/tấn, Việt Nam phải bán $220/tấn. Nông dân Việt đang mất khách hàng.",
  options: [
    {
      text: "Phải giảm giá để cạnh tranh",
      law: "competition",
    },
    {
      text: "Nên tăng giá vì lúa Việt tốt hơn",
      law: "value",
    },
    {
      text: "Nên nhập lúa Thái để bán lại",
      law: "supply_demand",
    },
  ],
  correctAnswerIndex: 0,
  explanation:
    "Khi có đối thủ cạnh tranh giá rẻ, bạn phải giảm giá để giữ khách. Đây là quy luật cạnh tranh.",
};

export default scenario;
