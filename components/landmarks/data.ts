export interface Landmark {
  id: number;
  title: string;
  location: string;
  area: string;
  description: string;
  guideName: string;
  image: string;
}

export const landmarks: Landmark[] = [
  {
    id: 1,
    title: "سوق الثلاثاء",
    location: "أبها، حديقة السودة",
    area: "أبها",
    description: "تسلق جبل سودة مع منسلق الجبال المحلي",
    guideName: "فيصل",
    image:
      "https://images.pexels.com/photos/4606805/pexels-photo-4606805.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 2,
    title: "قرية رجال ألمع التراثية",
    location: "رجال ألمع، عسير",
    area: "رجال ألمع",
    description: "تجربة فريدة بين البيوت الحجرية والأسواق الشعبية.",
    guideName: "محمد",
    image:
      "https://images.pexels.com/photos/4606806/pexels-photo-4606806.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 3,
    title: "جبل السودة",
    location: "السودة، أبها",
    area: "السودة",
    description: "إطلالات ساحرة على قمم الجبال والسهول المحيطة.",
    guideName: "سلمان",
    image:
      "https://images.pexels.com/photos/4606804/pexels-photo-4606804.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 4,
    title: "القرية المعلقة",
    location: "تنومة، عسير",
    area: "تنومة",
    description: "قرية جبلية مطلة على مناظر طبيعية خلابة.",
    guideName: "نواف",
    image:
      "https://images.pexels.com/photos/4606803/pexels-photo-4606803.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 5,
    title: "منتزه السحاب",
    location: "خميس مشيط، عسير",
    area: "خميس مشيط",
    description: "تجربة مميزة بين الغيوم مع إطلالات بانورامية.",
    guideName: "أحمد",
    image:
      "https://images.pexels.com/photos/4606802/pexels-photo-4606802.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];


