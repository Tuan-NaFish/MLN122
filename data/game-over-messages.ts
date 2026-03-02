export const winMessages = [
  "Đỉnh chóp! Pha xử lý keo lỳ tái châu. Lụm lúa chốt đơn!",
  "Out trình thị trường! 10 điểm không có nhưng cho vị CEO trẻ.",
  "Flex nhẹ cái doanh thu ngàn tỷ. Bán gạo thế này mấy chốc mà lái Maybach về làng!",
  "Check var uy tín! Kiến thức đã được tiếp thu, xuất thẳng container này sang châu Âu nào!",
  "Mãi đỉnh! Shark thấy pha này Shark cũng phải quẹt thẻ đầu tư vội.",
  "Hệ tư tưởng Mác - Lênin đã độ bạn! Tiếp tục phát huy!",
];

export const loseMessages = [
  "Xu cà na! Pha chốt đơn hơi xà lơ, công ty chuẩn bị đăng xuất khỏi thị trường.",
  "Cảm lạnh thực sự! Kinh doanh kiểu này thì xách xô đi phụ hồ sớm nha.",
  "Sượng trân! Đọc sai quy luật rồi kìa, báo thủ thương trường là đây chứ đâu.",
  "Overthinking hả? Hết giờ rồi! Khách hủy đơn, chuẩn bị ra chuồng gà chơi nha.",
  "Thôi xong, pha xử lý cồng kềnh. Gạo mốc hết rồi, cất poster khóc đi em.",
  "Trầm cảm ngang! Thương lái bán buôn kiểu gì mà lỗ sặc máu thế này!",
];

export function getRandomMessage(isWin: boolean): string {
  const messages = isWin ? winMessages : loseMessages;
  return messages[Math.floor(Math.random() * messages.length)];
}
