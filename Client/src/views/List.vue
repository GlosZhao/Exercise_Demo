<template>
  <div class="pinterestClass">
    <article-card
      v-for="item in articleList"
      :articleOBJ="item"
      :width="cardWidth"
      :key="item._id"
    />
  </div>
</template>

<script>
import articleCard from "components/article/articleCard";
import { getAllArticle } from "network/api";
export default {
  name: "List",
  data() {
    return {
      articleList: [
        // {
        //   title:
        //     "CSS 是开放网络的核心语言之一，由 W3C 规范 实现跨浏览器的标准化。CSS节省了大量的工作。",
        //   facePath: "http://lorempixel.com/700/500/",
        //   description:
        //     "三杯吐然诺，五岳倒为轻。眼花耳热后，意气素霓生。救赵挥金槌，邯郸先震惊。千秋二壮士，烜赫大梁城。",
        // },
        // {
        //   title:
        //     "CSS 是开放网络的核心语言之一，由 W3C 规范 实现跨浏览器的标准化。CSS节省了大量的工作。",
        //   facePath: "http://lorempixel.com/720/540/",
        //   description:
        //     "三杯吐然诺，五岳倒为轻。眼花耳热后，意气素霓生。救赵挥金槌，邯郸先震惊。千秋二壮士，烜赫大梁城。",
        // },
        // {
        //   title:
        //     "CSS 是开放网络的核心语言之一，由 W3C 规范 实现跨浏览器的标准化。CSS节省了大量的工作。",
        //   facePath: "http://lorempixel.com/320/540/",
        //   description:
        //     "你风趣幽默的好玩性格，让你长期保持年轻活力。尽管你为人随和，但是自信不足，总是担心生活中那些莫须有的事儿。你的组织能力较差，甚至不知道该如何着手处理凌乱的房间。你高傲，但你仍需要耐下性子去学习”该如何更爱自己“。向外界表达你的需求，花时间去发现自己的优点。记住，你身边总有贵人，能够帮到你。但你必须开口——告诉他们你希望得到帮助。让别人走进你的世界，也意味着生活能变得更简单。 ",
        // },
        // {
        //   title:
        //     "CSS 是开放网络的核心语言之一，由 W3C 规范 实现跨浏览器的标准化。CSS节省了大量的工作。",
        //   facePath: "http://lorempixel.com/720/480/",
        //   description:
        //     "你风趣幽默的好玩性格，让你长期保持年轻活力。尽管你为人随和，但是自信不足，总是担心生活中那些莫须有的事儿。你的组织能力较差，甚至不知道该如何着手处理凌乱的房间。你高傲，但你仍需要耐下性子去学习”该如何更爱自己“。向外界表达你的需求，花时间去发现自己的优点。记住，你身边总有贵人，能够帮到你。但你必须开口——告诉他们你希望得到帮助。让别人走进你的世界，也意味着生活能变得更简单。。",
        // },
        // {
        //   title:
        //     "瀑布流提供了一种错落有致的美观布局，被各种注重交互品味的素材网站（如：花瓣、unsplash）广泛应用。",
        //   facePath: "http://lorempixel.com/340/480/",
        //   description:
        //     "三杯吐然诺，五岳倒为轻。眼花耳热后，意气素霓生。救赵挥金槌，邯郸先震惊。千秋二壮士，烜赫大梁城。",
        // },
        // {
        //   title:
        //     "Netcat 号称 TCP/IP 的瑞士军刀并非浪得虚名，以体积小（可执行 200KB）功能灵活而著称",
        //   facePath: "http://lorempixel.com/680/480/",
        //   description:
        //     "三杯吐然诺，五岳倒为轻。眼花耳热后，意气素霓生。救赵挥金槌，邯郸先震惊。千秋二壮士，烜赫大梁城。",
        // },
        // {
        //   title:
        //     "CSS 是开放网络的核心语言之一，由 W3C 规范 实现跨浏览器的标准化。CSS节省了大量的工作。",
        //   facePath: "http://lorempixel.com/320/600/",
        //   description:
        //     "你风趣幽默的好玩性格，让你长期保持年轻活力。尽管你为人随和，但是自信不足，总是担心生活中那些莫须有的事儿。你的组织能力较差，甚至不知道该如何着手处理凌乱的房间。你高傲，但你仍需要耐下性子去学习”该如何更爱自己“。向外界表达你的需求，花时间去发现自己的优点。记住，你身边总有贵人，能够帮到你。但你必须开口——告诉他们你希望得到帮助。让别人走进你的世界，也意味着生活能变得更简单。 ",
        // },
        // {
        //   title:
        //     "CSS 是开放网络的核心语言之一，由 W3C 规范 实现跨浏览器的标准化。CSS节省了大量的工作。",
        //   facePath: "http://lorempixel.com/600/480/",
        //   description:
        //     "你风趣幽默的好玩性格，让你长期保持年轻活力。尽管你为人随和，但是自信不足，总是担心生活中那些莫须有的事儿。你的组织能力较差，甚至不知道该如何着手处理凌乱的房间。你高傲，但你仍需要耐下性子去学习”该如何更爱自己“。向外界表达你的需求，花时间去发现自己的优点。记住，你身边总有贵人，能够帮到你。但你必须开口——告诉他们你希望得到帮助。让别人走进你的世界，也意味着生活能变得更简单。。",
        // },
        // {
        //   title:
        //     "瀑布流提供了一种错落有致的美观布局，被各种注重交互品味的素材网站（如：花瓣、unsplash）广泛应用。",
        //   facePath: "http://lorempixel.com/340/480/",
        //   description:
        //     "三杯吐然诺，五岳倒为轻。眼花耳热后，意气素霓生。救赵挥金槌，邯郸先震惊。千秋二壮士，烜赫大梁城。",
        // },
        // {
        //   title:
        //     "Netcat 号称 TCP/IP 的瑞士军刀并非浪得虚名，以体积小（可执行 200KB）功能灵活而著称",
        //   facePath: "http://lorempixel.com/300/500/",
        //   description:
        //     "三杯吐然诺，五岳倒为轻。眼花耳热后，意气素霓生。救赵挥金槌，邯郸先震惊。千秋二壮士，烜赫大梁城。",
        // },
      ],
      cardWidth: "300px",
    };
  },
  computed: {},
  components: {
    articleCard,
  },
  mounted() {
    getAllArticle()
      .then((res) => {
        console.log(res);
        res.forEach((e) => {
          this.articleList.push({
            title: e.author,
            facePath: e.faceImg[0].url,
            description: e.description,
          });
        });
        console.log(this.articleList);
      })
      .catch((err) => {});
  },
};
</script>

<style>
.pinterestClass {
  /* padding: 20px; */
  margin: 20px;
  /* 默认列数 */
  columns: 4;
  /* 列间距 */
  column-gap: 20px;
}
.pinterestClass::after {
  background-color: aqua;
  width: 100%;
  height: 30px;
}

@media screen and (min-width: 1024px) and (max-width: 1439.98px) {
  .pinterestClass {
    /* width: 96vw; */
    columns: 4;
    column-gap: 20px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023.98px) {
  .pinterestClass {
    /* width: 96vw; */
    columns: 3;
    column-gap: 20px;
  }
}
</style>