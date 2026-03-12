<template>
  <picture>
    <source
      v-if="shouldUseWebp"
      :srcset="webpSrc"
      type="image/webp"
    >
    <img
      ref="imgRef"
      :src="currentSrc"
      :alt="alt"
      :class="imageClass"
      :style="imageStyle"
      :loading="loading"
      :decoding="decoding"
      :fetchpriority="effectiveFetchPriority"
      @error="handleError"
      @load="handleLoad"
    >
  </picture>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';

interface Props {
  /** 图片源地址 */
  src: string;
  /** 图片替代文本 */
  alt?: string;
  /** CSS 类名 */
  class?: string;
  /** 内联样式 */
  style?: string | Record<string, any>;
  /** 备用图片地址（当主图片加载失败时使用） */
  fallback?: string;
  /** 默认占位图 */
  placeholder?: string;
  /** 加载策略 */
  loading?: 'eager' | 'lazy';
  /** 解码策略 */
  decoding?: 'async' | 'sync' | 'auto';
  /** 拉取优先级 */
  fetchpriority?: 'high' | 'low' | 'auto';
  /** 是否自动尝试同路径 webp */
  useWebp?: boolean;
}

const defaultPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+PC9zdmc+';

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  fallback: undefined,
  placeholder: defaultPlaceholder,
  loading: 'lazy',
  decoding: 'async',
  fetchpriority: 'auto',
  useWebp: true,
});

const currentSrc = ref<string>(props.src);
const hasError = ref<boolean>(false);
const isLoading = ref<boolean>(true);
const imgRef = ref<HTMLImageElement | null>(null);

// 计算图片类名
const imageClass = computed(() => {
  const baseClass = props.class || '';
  const stateClass = isLoading.value ? 'opacity-0' : 'opacity-100';
  return `${baseClass} ${stateClass} transition-opacity duration-300`.trim();
});

// 计算图片样式
const imageStyle = computed(() => {
  if (typeof props.style === 'string') {
    return props.style;
  }
  return props.style || {};
});

const webpSrc = computed(() => {
  const src = props.src || '';
  if (!src || src.startsWith('data:')) return '';

  const queryIndex = src.indexOf('?');
  const hashIndex = src.indexOf('#');
  const cutIndex = Math.min(
    queryIndex === -1 ? src.length : queryIndex,
    hashIndex === -1 ? src.length : hashIndex,
  );
  const base = src.slice(0, cutIndex);
  const suffix = src.slice(cutIndex);

  // 跳过头像等未提供 WebP 版本的图片，避免产生大量 404 日志
  if (base.includes('/avatar')) return '';

  if (!/\.(png|jpe?g)$/i.test(base)) return '';
  return base.replace(/\.(png|jpe?g)$/i, '.webp') + suffix;
});

const shouldUseWebp = computed(() => props.useWebp && !hasError.value && !!webpSrc.value);
const effectiveFetchPriority = computed(() => {
  if (props.fetchpriority !== 'auto') return props.fetchpriority;
  return props.loading === 'eager' ? 'high' : 'auto';
});

/**
 * 处理图片加载错误
 */
const handleError = () => {
  if (!hasError.value) {
    hasError.value = true;
    currentSrc.value = props.fallback ?? props.placeholder;
  } else {
    currentSrc.value = props.placeholder;
  }
  isLoading.value = false;
};

/**
 * 处理图片加载成功
 */
const handleLoad = () => {
  isLoading.value = false;
  hasError.value = false;
};

/**
 * 处理首屏刷新场景：图片可能在 hydration 前已完成加载，导致 load 事件丢失
 */
const syncLoadedState = () => {
  const el = imgRef.value;
  if (!el) return;
  if (el.complete && el.naturalWidth > 0) {
    isLoading.value = false;
    hasError.value = false;
  }
};

// 监听 src 变化，重置状态
watch(
  () => props.src,
  (newSrc) => {
    currentSrc.value = newSrc;
    hasError.value = false;
    isLoading.value = true;
  },
  { immediate: true }
);

onMounted(() => {
  nextTick(() => {
    syncLoadedState();
  });
});
</script>

<style scoped>
img {
  display: block;
  max-width: 100%;
}
</style>
