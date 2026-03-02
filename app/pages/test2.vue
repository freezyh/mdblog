<!-- eslint-disable antfu/top-level-function -->
<script setup lang="ts">
import { ref } from "vue";

// 导入SVG图标（按路径字母顺序）
import musicIcon from "~/assets/CodeBubbyAssets/17_4/1.svg";
import favorite1 from "~/assets/CodeBubbyAssets/17_4/2.svg";
import favorite2 from "~/assets/CodeBubbyAssets/17_4/3.svg";
import favorite3 from "~/assets/CodeBubbyAssets/17_4/4.svg";
import favorite4 from "~/assets/CodeBubbyAssets/17_4/5.svg";
import favorite5 from "~/assets/CodeBubbyAssets/17_4/6.svg";
import favorite6 from "~/assets/CodeBubbyAssets/17_4/7.svg";
import favorite7 from "~/assets/CodeBubbyAssets/17_4/8.svg";
import favorite8 from "~/assets/CodeBubbyAssets/17_4/9.svg";
import favorite9 from "~/assets/CodeBubbyAssets/17_4/10.svg";
import favorite10 from "~/assets/CodeBubbyAssets/17_4/11.svg";
import cover10 from "~/assets/CodeBubbyAssets/17_4/12.svg";
import cover5 from "~/assets/CodeBubbyAssets/17_4/13.svg";
import cover2 from "~/assets/CodeBubbyAssets/17_4/14.svg";
import cover9 from "~/assets/CodeBubbyAssets/17_4/15.svg";
import cover1 from "~/assets/CodeBubbyAssets/17_4/16.svg";
import cover3 from "~/assets/CodeBubbyAssets/17_4/17.svg";
import cover6 from "~/assets/CodeBubbyAssets/17_4/18.svg";
import cover7 from "~/assets/CodeBubbyAssets/17_4/19.svg";
import cover8 from "~/assets/CodeBubbyAssets/17_4/20.svg";
import cover4 from "~/assets/CodeBubbyAssets/17_4/21.svg";

// 标签
const tabs = ["全部歌曲", "我的最爱", "最近播放"];
const activeTab = ref(0);

// 当前播放歌曲
const currentSong = ref<number | null>(null);

// 歌曲数据
const songs = ref([
  {
    title: "月光下的思念",
    artist: "陈小春",
    album: "经典情歌集",
    duration: "4:05",
    cover: cover1,
    favoriteIcon: favorite1,
    isFavorite: false,
  },
  {
    title: "夜空中最亮的星",
    artist: "逃跑计划",
    album: "世界",
    duration: "4:28",
    cover: cover2,
    favoriteIcon: favorite2,
    isFavorite: false,
  },
  {
    title: "演员",
    artist: "薛之谦",
    album: "绅士",
    duration: "4:19",
    cover: cover3,
    favoriteIcon: favorite3,
    isFavorite: false,
  },
  {
    title: "说散就散",
    artist: "JC陈咏桐",
    album: "前任3主题曲",
    duration: "3:44",
    cover: cover4,
    favoriteIcon: favorite4,
    isFavorite: false,
  },
  {
    title: "告白气球",
    artist: "周杰伦",
    album: "周杰伦的床边故事",
    duration: "3:25",
    cover: cover5,
    favoriteIcon: favorite5,
    isFavorite: false,
  },
  {
    title: "不为谁而作的歌",
    artist: "林俊杰",
    album: "新地球",
    duration: "4:45",
    cover: cover6,
    favoriteIcon: favorite6,
    isFavorite: false,
  },
  {
    title: "稻香",
    artist: "周杰伦",
    album: "魔杰座",
    duration: "3:43",
    cover: cover7,
    favoriteIcon: favorite7,
    isFavorite: false,
  },
  {
    title: "体面",
    artist: "于文文",
    album: "前任3主题曲",
    duration: "4:11",
    cover: cover8,
    favoriteIcon: favorite8,
    isFavorite: false,
  },
  {
    title: "光年之外",
    artist: "G.E.M.邓紫棋",
    album: "太空人",
    duration: "3:59",
    cover: cover9,
    favoriteIcon: favorite9,
    isFavorite: false,
  },
  {
    title: "大鱼",
    artist: "周深",
    album: "大鱼海棠主题曲",
    duration: "4:27",
    cover: cover10,
    favoriteIcon: favorite10,
    isFavorite: false,
  },
]);

// 播放歌曲
const playSong = (index: number) => {
  currentSong.value = index;
};
</script>

<template>
  <div class="music-player-container">
    <!-- 标签切换 -->
    <div class="tabs-container">
      <div class="tabs-wrapper">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-item"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          <template v-if="index === 0">
            <img :src="musicIcon" alt="音乐图标" class="tab-icon">
          </template>
          <span>{{ tab }}</span>
        </div>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <div class="songs-list">
      <!-- 表头 -->
      <div class="list-header">
        <div class="header-number">
          #
        </div>
        <div class="header-title">
          标题
        </div>
        <div class="header-album">
          专辑
        </div>
        <div class="header-actions" />
        <div class="header-duration">
          时长
        </div>
      </div>

      <!-- 歌曲项 -->
      <div
        v-for="(song, index) in songs"
        :key="index"
        class="song-item"
        :class="{ playing: currentSong === index }"
        @click="playSong(index)"
      >
        <div class="song-number">
          <span>{{ index + 1 }}</span>
        </div>
        <div class="song-info">
          <img :src="song.cover" :alt="song.title" class="song-cover">
          <div class="song-details">
            <div class="song-title">
              {{ song.title }}
            </div>
            <div class="song-artist">
              {{ song.artist }}
            </div>
          </div>
        </div>
        <div class="song-album">
          {{ song.album }}
        </div>
        <div class="song-actions">
          <button class="action-btn" :class="{ active: song.isFavorite }" @click.stop>
            <img :src="song.favoriteIcon" alt="收藏">
          </button>
        </div>
        <div class="song-duration">
          {{ song.duration }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.music-player-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #faf5ff 0%, white 50%, #eff6ff 100%);
  padding: 104px 216px 60px;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

/* 标签容器 */
.tabs-container {
  margin-bottom: 40px;
}

.tabs-wrapper {
  display: inline-flex;
  background: #ececf0;
  border-radius: 14px;
  padding: 3.5px;
}

.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 14.8px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 85.6px;
  height: 29px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  white-space: nowrap;
}

.tab-item:hover {
  color: #374151;
}

.tab-item.active {
  background: white;
  color: #0a0a0a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tab-icon {
  width: 17px;
  height: 17px;
  margin-right: 7px;
}

/* 歌曲列表 */
.songs-list {
  background: white;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  box-shadow:
    0 1px 2px -1px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 表头 */
.list-header {
  display: grid;
  grid-template-columns: 56px 1fr 1fr 56px 72px;
  gap: 16px;
  padding: 12px 16px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  align-items: center;
}

.header-number {
  font-size: 12px;
  font-weight: 500;
  color: #6a7282;
}

.header-title {
  font-size: 12px;
  font-weight: 500;
  color: #6a7282;
}

.header-album {
  font-size: 12px;
  font-weight: 500;
  color: #6a7282;
}

.header-duration {
  font-size: 12px;
  font-weight: 500;
  color: #6a7282;
  text-align: left;
}

/* 歌曲项 */
.song-item {
  display: grid;
  grid-template-columns: 56px 1fr 1fr 56px 72px;
  gap: 16px;
  padding: 12px 16px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.song-item:hover {
  background-color: #f9fafb;
}

.song-item.playing {
  background-color: #f3f4f6;
}

/* 序号 */
.song-number {
  font-size: 14px;
  font-weight: 400;
  color: #6a7282;
}

/* 歌曲信息 */
.song-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.song-cover {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}

.song-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.song-title {
  font-size: 14px;
  font-weight: 500;
  color: #0a0a0a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-artist {
  font-size: 12px;
  font-weight: 400;
  color: #6a7282;
}

/* 专辑 */
.song-album {
  font-size: 14px;
  font-weight: 400;
  color: #4a5565;
}

/* 操作按钮 */
.song-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: #f3f4f6;
}

.action-btn img {
  width: 16px;
  height: 16px;
}

.action-btn.active img {
  filter: brightness(0.7);
}

/* 时长 */
.song-duration {
  font-size: 14px;
  font-weight: 400;
  color: #6a7282;
  text-align: left;
}

/* 响应式设计 */
@media (max-width: 1400px) {
  .music-player-container {
    padding: 80px 100px 40px;
  }
}

@media (max-width: 1024px) {
  .music-player-container {
    padding: 60px 40px 40px;
  }

  .list-header,
  .song-item {
    grid-template-columns: 40px 1fr 80px;
  }

  .header-album,
  .song-album {
    display: none;
  }
}

@media (max-width: 768px) {
  .music-player-container {
    padding: 40px 20px 40px;
  }

  .tabs-wrapper {
    width: 100%;
  }

  .tab-item {
    flex: 1;
  }

  .list-header,
  .song-item {
    grid-template-columns: 30px 1fr 60px;
    gap: 8px;
    padding: 10px 12px;
  }

  .header-number,
  .song-number {
    font-size: 12px;
  }

  .song-title {
    font-size: 13px;
  }

  .song-artist {
    font-size: 11px;
  }

  .song-duration {
    font-size: 12px;
  }

  .song-cover {
    width: 36px;
    height: 36px;
  }

  .song-actions {
    display: none;
  }
}
</style>
