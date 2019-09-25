<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height" class="canvas"></canvas>
  </div>
</template>
<script>
import Url from 'url-parse';
export default {
  name: 'Poster',
  props: {
    config: {
      type: Object,
      value: {}
    }
  },
  watch: {
    config: {
      handler: 'handleDraw',
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      width: 100,
      height: 100,
      imageList: [],
      canvas: null,
      ctx: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.canvas = this.$refs.canvas; // 指定canvas
      this.ctx = this.canvas.getContext('2d'); //设置2D渲染区域
    });
  },
  methods: {
    // 开始绘图
    handleDraw(newVal, oldVal) {
      if (newVal.views && newVal !== oldVal) {
        const { width, height, views } = this.config;
        this.width = width;
        this.height = height;
        const inter = setInterval(() => {
          if (this.ctx) {
            clearInterval(inter);
            // 重新绘图
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.save();
            this.getImages(views);
          }
        }, 100);
      }
    },
    // 是否跨域
    isCrossOrigin(url) {
      let isCrossOrigin = false;
      if (/^http/.test(url)) {
        let parsedUrl = new Url(url);
        if (parsedUrl.origin !== window.location.origin) {
          isCrossOrigin = true;
        }
      }
      return isCrossOrigin;
    },
    // 加载图片
    loadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        if (this.isCrossOrigin(url)) {
          img.crossOrigin = 'anonymous';
        }
        img.onload = () => resolve(img);
        img.onerror = () => reject(`下载图片失败 ${url}`);
        img.src = url;
      });
    },
    // 加载图片
    getImages(views) {
      const imageList = [];
      for (let i = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          imageList.push(this.loadImage(views[i].url));
        }
      }
      Promise.all(imageList)
        .then(res => {
          this.imageList = res;
          this.startPainting();
        })
        .catch(err => {
          this.$emit('fail', err);
        });
    },
    startPainting() {
      const { views } = this.config;
      for (let i = 0, imageIndex = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          this.drawImage({
            ...views[i],
            img: this.imageList[imageIndex]
          });
          imageIndex++;
        } else if (views[i].type === 'text') {
          this.drawText(views[i]);
        } else if (views[i].type === 'rect') {
          this.drawRect(views[i]);
        }
      }
      let imageBase64 = this.canvas.toDataURL('image/png');
      this.$emit('success', imageBase64);
    },
    // 根据 radius 进行裁减
    _doClip(left, top, width, height, radius) {
      this.ctx.beginPath();
      // 左上角
      this.ctx.arc(left + radius, top + radius, radius, Math.PI, Math.PI * 1.5);
      // border-top
      this.ctx.moveTo(left + radius, top);
      this.ctx.lineTo(left + width - radius, top);
      this.ctx.lineTo(left + width, top + radius);
      this.ctx.arc(
        left + width - radius,
        top + radius,
        radius,
        Math.PI * 1.5,
        Math.PI * 2
      );
      // border-right
      this.ctx.lineTo(left + width, top + height - radius);
      this.ctx.lineTo(left + width - radius, top + height);
      this.ctx.arc(
        left + width - radius,
        top + height - radius,
        radius,
        0,
        Math.PI * 0.5
      );
      // border-bottom
      this.ctx.lineTo(left + radius, top + height);
      this.ctx.lineTo(left, top + height - radius);
      this.ctx.arc(
        left + radius,
        top + height - radius,
        radius,
        Math.PI * 0.5,
        Math.PI
      );
      // border-left
      this.ctx.lineTo(left, top + radius);
      this.ctx.lineTo(left + radius, top);
      this.ctx.fill();
      this.ctx.closePath();
    },
    // 处理旋转
    _doRoate(left, top, height, width, deg) {
      this.ctx.translate(left + width / 2, top + height / 2);
      this.ctx.rotate((deg * Math.PI) / 180);
    },
    // 图片
    drawImage(params) {
      this.ctx.save();
      const {
        img,
        top = 0,
        left = 0,
        width = 0,
        height = 0,
        radius = 0,
        deg = 0
      } = params;
      if (radius) {
        this._doClip(left, top, width, height, radius);
        this.ctx.clip();
        this.ctx.drawImage(img, left, top, width, height);
      } else if (deg !== 0) {
        this._doRoate(left, top, height, width, deg);
        this.ctx.drawImage(img, -width / 2, -height / 2, width, height);
      } else {
        this.ctx.drawImage(img, left, top, width, height);
      }
      this.ctx.restore();
    },
    // 字
    drawText(params) {
      this.ctx.save();
      const {
        MaxLineNumber = 2,
        breakWord = false,
        color = 'black',
        content = '',
        fontSize = 16,
        top = 0,
        left = 0,
        lineHeight = 20,
        textAlign = 'left',
        width,
        bolder = false,
        textDecoration = 'none',
        shadowBlur = 0,
        shadowColor = '',
        shadowOffsetX = 0,
        shadowOffsetY = 0
      } = params;
      this.ctx.beginPath();
      this.ctx.textBaseline = 'top';
      this.ctx.textAlign = textAlign;
      this.ctx.fillStyle = color;
      this.ctx.shadowBlur = shadowBlur;
      this.ctx.shadowColor = shadowColor;
      this.ctx.shadowOffsetX = shadowOffsetX;
      this.ctx.shadowOffsetY = shadowOffsetY;
      this.ctx.font = `${bolder ? 'bold' : ''} ${fontSize}px Arial`;
      if (!breakWord) {
        this.ctx.fillText(content, left, top);
        this.drawTextLine(left, top, textDecoration, color, fontSize, content);
      } else {
        let fillText = '';
        let fillTop = top;
        let lineNum = 1;
        for (let i = 0; i < content.length; i++) {
          fillText += [content[i]];
          if (this.ctx.measureText(fillText).width > width) {
            if (lineNum === MaxLineNumber && i !== content.length) {
              fillText = fillText.substring(0, fillText.length - 1) + '...';
              this.ctx.fillText(fillText, left, fillTop);
              this.drawTextLine(
                left,
                fillTop,
                textDecoration,
                color,
                fontSize,
                fillText
              );
              fillText = '';
              break;
            }
            this.ctx.fillText(fillText, left, fillTop);
            this.drawTextLine(
              left,
              fillTop,
              textDecoration,
              color,
              fontSize,
              fillText
            );
            fillText = '';
            fillTop += lineHeight;
            lineNum++;
          }
        }
        this.ctx.fillText(fillText, left, fillTop);
        this.drawTextLine(
          left,
          fillTop,
          textDecoration,
          color,
          fontSize,
          fillText
        );
      }
      this.ctx.restore();
    },
    // 直线
    drawTextLine(left, top, textDecoration, color, fontSize, content) {
      if (textDecoration === 'underline') {
        this.drawRect({
          background: color,
          top: top + fontSize * 1.2,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        });
      } else if (textDecoration === 'line-through') {
        this.drawRect({
          background: color,
          top: top + fontSize * 0.6,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        });
      }
    },
    // 矩形
    drawRect(params) {
      this.ctx.save();
      const {
        background = 'white',
        top = 0,
        left = 0,
        width = 0,
        height = 0,
        radius = 0,
        shadowBlur = 0,
        shadowColor = '',
        shadowOffsetX = 0,
        shadowOffsetY = 0,
        deg = 0
      } = params;
      this.ctx.fillStyle = background;
      this.ctx.shadowBlur = shadowBlur;
      this.ctx.shadowColor = shadowColor;
      this.ctx.shadowOffsetX = shadowOffsetX;
      this.ctx.shadowOffsetY = shadowOffsetY;
      if (radius) {
        this._doClip(left, top, width, height, radius);
      } else {
        if (deg !== 0) {
          this._doRoate(left, top, height, width, deg);
          this.ctx.fillRect(-width / 2, -height / 2, width, height);
        } else {
          this.ctx.fillRect(left, top, width, height);
        }
      }
      this.ctx.restore();
    }
  }
};
</script>
<style  scoped>
.canvas {
  display: none;
}
</style>
