import React from "react";
import { PostCard } from "./PostCard";
import { Post } from "../types/Post.type";
import { User } from "../../../models/User";

interface UserPostProps {
  currentUser: User;
}
const fetechedPost: Array<Post> = [
  {
    id: "1",
    body: {
      text: "طبیعت گردی ...",
      media: "https://picsum.photos/id/1018/516/307",
    },
    likes: ["2", "12", "16", "5", "8", "65", "23"],
    user: {
      userId: "56",
      isCompany:false,
      isActive: true,
      name: "Karim",
      description: "ui/ux",
      img: "https://picsum.photos/id/1/40",
    },
  },
  {
    id: "2",
    body: {
      text:
        "در آخرین کارگاه «با هم یاد بگیریم»، از سجاد احمدی روایت کار با ابزاری شگفت‌انگیز و پر از امکانات ویژه رو شنیدیم که به قول سجاد می‌تونیم با استفاده از اون بی‌نیاز از متخصصان داده، در کسب‌و‌کارمون داده‌ها رو تحلیل کنیم، گزارش‌های مو‌به‌مو بگیریم و با دقتی مثال‌زدنی مقایسه‌های جزیی انجام بدیم." +
        "«تبلو» یا همان تابلو؛ ابزاریه که به دیجیتال مارکترها کمک می‌کنه معیارها و سنجه‌های کمپین‌هاشون رو به راحتی آنالیز کنند، به کمک دیتای پاکیزه تصمیم‌های صحیح بگیرن و دغدغه‌ی data-driven بودن رو برطرف می‌کنه. تبلو زیر مجموعه‌ی دیتاساینس قرار می‌گیره و در گروه ابزارهای Self BI دسته‌بندی می‌شه. این ابزار چالش‌های گزارش‌گیری با اکسل رو نداره و کاربران خودش رو از کدنویسی‌های پیچیده بی‌نیاز می‌کنه." +
        "در این کارگاه دو ساعته، سجاد رهنماکالجی‌ها رو با این ابزار کارآمد آشنا کرد، ورژن‌ها و امکانات تبلو رو نشون داد و یک نمونه‌ی پیاده‌سازی شده برای شرکت‌کننده‌ها رو مرور کرد." +
        "کار با تبلو سر راسته، پیچیدگی ابزارهای آماری رو نداره، ورود دیتا به اون به راحتی درگ و دراپ کردن اتفاق می‌افته و می‌تونه دستیاری هوشمند در زمینه‌ی دیتا آنالیز برای دیجیتال مارکترها باشه.",

      media: "https://picsum.photos/516/307",
    },
    likes: [
      "1",
      "12",
      "16",
      "5",
      "8",
      "65",
      "23",
      "85",
      "89",
      "11",
      "55",
      "24",
    ],
    user: {
      userId: "14",
      isCompany:false,
      isActive: true,
      name: "Yasin",
      description: "Developer",
    },
  },
];

export const UserPost = ({ currentUser }: UserPostProps) => {
  // const { loading, error, data } = useQuery<Array<Post>>(GET_POSTS);

  // const posts = React.useMemo(
  //     () => !loading && data && data.map((a) => <UserPost post={a} />),
  //     [loading, data]
  // );
  const post = fetechedPost;
  const posts = React.useMemo(
    () =>
      post.map((a, index) => (
        <PostCard key={index.toString()} post={a} currentUser={currentUser} />
      )),
    [currentUser, post]
  );

  return <div>{posts}</div>;
};
