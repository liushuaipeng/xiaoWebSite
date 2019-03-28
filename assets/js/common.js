// 使用a标签添加锚点时浏览器滚动条动画
export const anchorPoint = function() {
  document.querySelectorAll('a[href^="#"]').forEach(item => {
    item.onclick = function(e) {
      e.preventDefault();
      let currentScrTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let targetScrTop = document.querySelector(this.getAttribute("href"))
        .offsetTop;
      let differTop = targetScrTop - currentScrTop;
      (function setDown() {
        if (differTop === 0) {
          return;
        }
        // 动画时长300ms，30ms一跳，共30跳
        let step = differTop / 30;

        if (
          (differTop > 0 && currentScrTop < targetScrTop) ||
          (differTop < 0 && currentScrTop > targetScrTop)
        ) {
          currentScrTop += step;
          document.body.scrollTop = currentScrTop;
          document.documentElement.scrollTop = currentScrTop;
          setTimeout(setDown, 10);
        } else {
          document.body.scrollTop = targetScrTop;
          document.documentElement.scrollTop = targetScrTop;
        }
      })();
    };
  });
};
