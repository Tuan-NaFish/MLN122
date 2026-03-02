import { GameScenario } from "../game-scenarios";

const scenario: GameScenario = {
  id: "organic-premium",
  situation: "Lúa hữu cơ được bán với giá gấp 3 lần lúa thường",
  context:
    "Lúa trồng không dùng hóa chất độc hại, sử dụng phương pháp truyền thống. Thị trường Nhật Bản, Mỹ sẵn sàng trả giá cao.",
  options: [
    {
      text: "Vì cung ít nên giá cao",
      law: "supply_demand",
    },
    {
      text: "Vì lúa tốt hơn nên có giá trị cao hơn",
      law: "value",
    },
    {
      text: "Vì phải cạnh tranh với Thái Lan",
      law: "competition",
    },
  ],
  correctAnswerIndex: 1,
  explanation:
    "Lúa hữu cơ chất lượng tốt hơn, chứa lao động chất lượng cao hơn → giá trị cao hơn → giá cao hơn. Quy luật giá trị.",
};

export default scenario;
