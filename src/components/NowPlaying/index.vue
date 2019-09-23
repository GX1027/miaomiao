<!-- nowplaying -->
<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading" />
    <Scroller
      v-else
      :handleToScroll="handleToScroll"
      :handleToTouchEnd="handleToTouchEnd"
    >
      <ul>
        <div :class="pullDown">
          <li v-if="pullDownMsg">{{ pullDownMsg }}</li>
          <li v-else>
            <img src="@/assets/loading.gif" alt="loading" />正在刷新中。。。
          </li>
        </div>
        <li v-for="movie in movieList" :key="movie.id">
          <div class="pic_show" @tap="handleToDetail(movie.id)">
            <img :src="movie.img | setWH('128.180')" />
          </div>
          <div class="info_list" @tap="handleToDetail(movie.id)">
            <h2>
              {{ movie.nm }}
              <img v-if="movie.version" src="@/assets/maxs.png" />
            </h2>
            <p>
              观众评分
              <span class="grade">{{ movie.sc }}</span>
            </p>
            <p>主演:{{ movie.star }}</p>
            <p>{{ movie.showInfo }}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: "NowPlaying",
  components: {},
  data() {
    return {
      movieList: [],
      pullDownMsg: "",
      pullDown: { show: false },
      isLoading: true,
      prevCityId: -1
    }
  },
  activated() {
    const cityId = this.$store.state.city.id
    if (this.prevCityId === cityId) {
      return
    }
    this.axios.get("/api/movieOnInfoList?cityId=" + cityId).then(res => {
      let msg = res.data.msg
      if (msg === "ok") {
        this.movieList = res.data.data.movieList
        this.isLoading = false
        this.prevCityId = cityId
        // this.$nextTick(() => {
        //   const scroll = new BScroll(this.$refs.movie_body, {
        //     tap: true,
        //     probeType: 1
        //   });
        //   scroll.on("scroll", pos => {
        //     console.log("scroll");
        //     if (pos.y > 30) {
        //       this.pullDown.show=true
        //     }
        //   }),
        //     scroll.on("touchEnd", pos => {
        //       if (pos.y > 30) {
        //         this.axios.get("/api/movieOnInfoList?cityId=11").then(res => {
        //           let msg = res.data.msg;
        //           if (msg === "ok") {
        //             this.pullDown.show=true
        //             this.pullDownMsg = "更新数据成功";
        //             setTimeout(() => {
        //                this.movieList = res.data.data.movieList;
        //                this.pullDownMsg=''
        //                this.pullDown.show=false
        //             }, 1000);

        //           }
        //         });
        //       }

        //     });
        // });
      }
    })
  },
  methods: {
    handleToDetail(movieId) {
      this.$router.push("/movie/detail/1/" + movieId)
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDown.show = true
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios.get("/api/movieOnInfoList?cityId=11").then(res => {
          let msg = res.data.msg
          if (msg === "ok") {
            this.pullDown.show = true
            this.pullDownMsg = "更新数据成功"
            setTimeout(() => {
              this.movieList = res.data.data.movieList
              this.pullDownMsg = ""
              this.pullDown.show = false
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}

.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}

.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}

.movie_body ul > div {
  display: none;
}
.movie_body ul > div li {
  display: block;
  text-align: center;
}
.movie_body ul > div.show {
  display: block;
}
.movie_body .show img {
  display: inline-block;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}

.movie_body .pic_show img {
  width: 100%;
}

.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}

.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}

.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}

.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>
