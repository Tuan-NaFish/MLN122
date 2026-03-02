import { GameScenario } from "../game-scenarios";

const scenario: GameScenario = {
  id: "climate-change",
  situation: "Đề cao giá trị sản phẩm bền vững trong nền kinh tế toàn cầu",
  context:
    "Thế giới coi trọng sản phẩm thân thiện với môi trường. Lúa Việt được chứng nhận bền vững, lúa xấu sẽ bị từ chối.",
  options: [
    {
      text: "Lúa bền vững sẽ đắt hơn vì nó tốt hơn",
      law: "value",
    },
    {
      text: "Lúa bền vững sẽ rẻ hơn vì cung tăng",
      law: "supply_demand",
    },
    {
      text: "Lúa bền vững sẽ cạnh tranh được với Thái",
      law: "competition",
    },
  ],
  correctAnswerIndex: 0,
  explanation:
    "Sản phẩm bền vững tốt hơn, chứa lao động có trách nhiệm → giá trị cao hơn → giá cao hơn. Quy luật giá trị.",
};

export default scenario;
