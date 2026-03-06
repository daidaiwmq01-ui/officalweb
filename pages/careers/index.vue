<template>
  <div class="min-h-screen bg-white font-['Noto_Sans_SC']">
    <!-- 🚀 Hero Section: The Visionary Call -->
    <section class="relative h-[500px] overflow-hidden bg-gradient-to-b from-[#0B2747] to-[#111827]">
      <div class="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="/image/about/hero.webp"
          alt="加入车拖车团队 - 创造数字化物流未来"
        loading="eager"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="absolute inset-0 z-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px]" />

      <div class="container mx-auto max-w-[1200px] px-4 lg:px-0 relative z-10 text-center h-full flex flex-col justify-center">
        <!-- Breadcrumb - Top Left Fixed -->
        <div class="absolute top-6 left-4 lg:left-0 z-20">
          <BreadcrumbNav :items="breadcrumbItems" variant="light" />
        </div>

        <h1
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          class="text-2xl sm:text-3xl md:text-[48px] font-bold text-white mb-6 leading-[1.6] mt-16"
        >
          加入我们，连接汽车物流的下一个时代
        </h1>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          class="text-[18px] text-white/70 max-w-[800px] mx-auto mb-10 leading-relaxed"
        >
          车拖车正致力于构建一个更透明、更高效的数字化物流生态系统。我们寻找对技术充满热忱、勇于挑战行业痛点的创新者。
        </p>

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="max-w-[600px] mx-auto relative group"
        >
          <div class="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search class="w-5 h-5 text-gray-400 group-focus-within:text-[#006EFF] transition-colors" />
          </div>
          <Input
            v-model="searchQuery"
            placeholder="搜索职位关键词 (如：Java, 产品经理)..."
            class="w-full h-14 pl-14 pr-32 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white focus:text-[#0B2747] transition-all"
          />
          <Button class="absolute right-2 top-2 h-10 px-6 bg-[#FF6B00] hover:bg-[#E56000] text-white rounded-xl border-none font-bold">
            搜索职位
          </Button>
        </div>
      </div>
    </section>

    <!-- 🏢 Section A: Employee Value Proposition (EVP) -->
    <section class="py-24 bg-white">
      <div class="container mx-auto max-w-[1200px] px-4">
        <div class="text-center mb-16">
          <h2 class="text-[32px] font-bold text-[#0B2747] mb-4">
            在车拖车工作是怎样的体验？
          </h2>
          <div class="w-16 h-1 bg-[#FF6B00] mx-auto rounded-full" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(item, idx) in evpItems"
            :key="idx"
            class="p-10 rounded-[32px] border border-gray-100 hover:shadow-xl transition-all group"
            :class="item.bgClass"
          >
            <div :class="['w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all', item.iconBgClass]">
              <component :is="item.icon" class="w-8 h-8" :class="item.iconClass" />
            </div>
            <h3 class="text-[22px] font-bold text-[#0B2747] mb-4">
              {{ item.title }}
            </h3>
            <p class="text-gray-500 leading-relaxed">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 🎓 Section B: Campus Recruitment -->
    <section class="py-24 bg-[#F0F7FF]">
      <div class="container mx-auto max-w-[1200px] px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visible="{ opacity: 1, x: 0 }"
            :visibleOnce="true"
          >
            <h2 class="text-2xl sm:text-[36px] font-bold text-[#0B2747] mb-6">
              校招专项：‘智运生’计划
            </h2>
            <div class="space-y-6 text-gray-600 leading-relaxed text-[16px]">
              <p>
                ‘智运生’计划是车拖车面向全球优秀高校毕业生的核心人才培养战略。我们旨在通过两年的"导师制"轮岗轮训，培养出既懂业务逻辑、又懂前沿技术的复合型物流科技领军人才。
              </p>
              <p>
                在这里，你不是旁观者，而是规则的制定者。你将参与到支撑年
                GMV 43
                亿规模的系统开发中，与行业共同定义数字化托运的标准。
              </p>
            </div>

            <div class="flex flex-wrap gap-3 mt-10">
              <span
                v-for="tag in ['实习生招聘', '应届生', '交通物流', '信息安全']"
                :key="tag"
                class="px-4 py-2 bg-white rounded-full text-[14px] font-medium text-[#006EFF] border border-blue-100 shadow-sm"
              >
                {{ tag }}
              </span>
            </div>

            <Button class="mt-12 h-14 px-10 border-[#006EFF] text-[#006EFF] hover:bg-[#006EFF] hover:text-white rounded-2xl font-bold transition-all">
              查看校招岗位
            </Button>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :visible="{ opacity: 1, scale: 1 }"
            :visibleOnce="true"
            class="relative rounded-[40px] overflow-hidden shadow-2xl"
          >
            <ImageWithFallback
              src="/image/partner-recruit/hero.webp"
              alt="车拖车研发团队工作现场"
              class="w-full h-[500px] object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B2747]/60 to-transparent" />
            <div class="absolute bottom-10 left-10">
              <div class="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                <div class="text-white text-[14px] font-medium">
                  2026 届‘智运生’秋招正式开启
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 💼 Section C: Open Positions -->
    <section class="py-24 bg-white" id="positions">
      <div class="container mx-auto max-w-[1200px] px-4">
        <div class="text-center mb-16">
          <h2 class="text-[32px] font-bold text-[#0B2747] mb-4">
            热招岗位
          </h2>
          <div class="w-16 h-1 bg-[#FF6B00] mx-auto rounded-full" />
        </div>

        <div class="w-full">
          <div v-if="tabs && tabs.length > 0" class="flex flex-wrap justify-center gap-4 bg-transparent mb-12">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              :class="[
                'px-8 py-3 rounded-xl border transition-all shadow-sm',
                activeTab === tab.value
                  ? 'bg-[#006EFF] text-white border-transparent'
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'
              ]"
              @click="activeTab = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="space-y-6">
            <!-- Loading 状态 -->
            <div v-if="loading" class="space-y-6">
              <div v-for="i in 3" :key="i" class="p-8 rounded-[32px] bg-gray-50 animate-pulse">
                <div class="h-6 bg-gray-200 rounded w-2/3 mb-4" />
                <div class="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div class="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
            
            <!-- 职位列表 -->
            <template v-else>
              <div
                v-for="(job, idx) in filteredJobs"
                :key="job.id"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: Math.min(idx * 50, 500) } }"
                class="flex flex-col md:flex-row items-center justify-between p-8 rounded-[32px] bg-white border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 hover:border-blue-100 transition-all group relative cursor-pointer"
                role="button"
                tabindex="0"
                @click="openJobDetail(job)"
                @keydown.enter.prevent="openJobDetail(job)"
              >
              <div class="flex-1 mb-6 md:mb-0">
                <div class="flex items-center gap-4 mb-4">
                  <h3 class="text-[20px] font-bold text-[#0B2747] group-hover:text-[#006EFF] transition-colors">
                    {{ job.title }}
                  </h3>
                  <span class="px-3 py-1 bg-blue-50 text-[#006EFF] text-[12px] font-bold rounded-lg">
                    {{ job.salary }}
                  </span>
                </div>
                <div class="flex flex-wrap gap-4 text-[14px] text-gray-400">
                  <span class="flex items-center gap-1.5">
                    <Briefcase class="w-4 h-4" />
                    {{ job.dept }} / {{ job.type }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <MapPin class="w-4 h-4" />
                    {{ job.location }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <Clock class="w-4 h-4" />
                    {{ job.date }}
                  </span>
                </div>
                <p class="mt-4 text-[14px] text-gray-500 leading-relaxed max-w-[600px] line-clamp-1">
                  {{ job.desc }}
                </p>
              </div>
              <div class="flex items-center gap-4">
                <Button
                  class="h-12 px-8 bg-white border border-blue-100 text-[#006EFF] rounded-xl font-bold shadow-sm hover:bg-blue-50"
                  @click.stop="openJobDetail(job)"
                >
                  查看详情
                </Button>
                <Button
                  @click.stop="sendEmail('hr@chetuoche.com')"
                  class="h-12 px-8 bg-[#006EFF] hover:bg-[#0058CC] text-white rounded-xl border-none font-bold shadow-lg shadow-blue-500/20 cursor-pointer"
                >
                  投递简历
                </Button>
              </div>
              </div>
            </template>
            
            <!-- 空状态 -->
            <div v-if="!loading && filteredJobs.length === 0" class="py-20 text-center text-gray-400">
              暂时没有该类别的热招岗位，换个分类看看吧。
            </div>
          </div>
        </div>
      </div>
    </section>

    <Dialog v-model="isJobDialogOpen">
      <DialogContent v-if="selectedJob" class="sm:max-w-[720px] bg-white rounded-[32px] p-0 overflow-hidden">
        <div class="p-10">
          <div class="flex items-start justify-between gap-6">
            <div>
              <div class="text-[12px] text-[#006EFF] font-semibold bg-blue-50 inline-flex px-3 py-1 rounded-full mb-4">
                {{ selectedJob.type || '社招' }}
              </div>
              <DialogHeader class="space-y-2">
                <DialogTitle class="text-[26px] font-bold text-[#0B2747]">
                  {{ selectedJob.title || '职位详情' }}
                </DialogTitle>
                <DialogDescription class="text-gray-500 text-[14px]">
                  {{ selectedJob.dept || '所属部门' }} · {{ selectedJob.location || '工作地点待定' }} · {{ selectedJob.date || '' }}
                </DialogDescription>
              </DialogHeader>
            </div>
            <div class="text-right">
              <div class="text-[18px] font-bold text-[#FF6B00]">
                {{ selectedJob.salary || '薪资面议' }}
              </div>
              <Button
                class="mt-4 h-10 px-6 bg-[#006EFF] hover:bg-[#0058CC] text-white rounded-xl border-none font-bold"
                @click="sendEmail('hr@chetuoche.com')"
              >
                立即投递
              </Button>
            </div>
          </div>

          <div class="mt-8 space-y-6">
            <div v-if="selectedJob.desc" class="bg-[#F8F9FB] rounded-2xl p-6 text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">
              {{ selectedJob.desc }}
            </div>

            <div v-if="selectedJob.duty" class="">
              <h4 class="text-[16px] font-bold text-[#0B2747] mb-3">岗位职责</h4>
              <div class="text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">
                {{ selectedJob.duty }}
              </div>
            </div>

            <div v-if="selectedJob.requirement" class="">
              <h4 class="text-[16px] font-bold text-[#0B2747] mb-3">任职要求</h4>
              <div class="text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">
                {{ selectedJob.requirement }}
              </div>
            </div>

            <div v-if="selectedJob.benefits" class="">
              <h4 class="text-[16px] font-bold text-[#0B2747] mb-3">福利待遇</h4>
              <div class="text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">
                {{ selectedJob.benefits }}
              </div>
            </div>

            <div v-if="!selectedJob.duty && !selectedJob.requirement && selectedJob.detailHtml" class="">
              <h4 class="text-[16px] font-bold text-[#0B2747] mb-3">职位详情</h4>
              <div class="prose max-w-none prose-p:text-gray-600 prose-li:text-gray-600" v-html="selectedJob.detailHtml" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- ❓ Section D: FAQ -->
    <section class="py-24 bg-[#F8F9FB]">
      <div class="container mx-auto max-w-[900px] px-4">
        <div class="text-center mb-16">
          <h2 class="text-[32px] font-bold text-[#0B2747] mb-4">
            招聘常见问题
          </h2>
          <div class="w-16 h-1 bg-[#FF6B00] mx-auto rounded-full" />
        </div>

        <Accordion type="single" collapsible class="w-full space-y-4">
          <AccordionItem
            v-for="(faq, idx) in faqs"
            :key="idx"
            :value="`item-${idx + 1}`"
            class="bg-white border border-gray-100 rounded-[24px] px-8 overflow-hidden"
          >
            <AccordionTrigger :value="`item-${idx + 1}`" class="hover:no-underline py-6">
              <span class="text-[18px] font-bold text-[#0B2747] text-left">
                {{ faq.question }}
              </span>
            </AccordionTrigger>
            <AccordionContent :value="`item-${idx + 1}`" class="pb-8 text-gray-500 leading-relaxed">
              {{ faq.answer }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- 📄 Global Footer Summary -->
    <footer class="py-20 bg-[#0B2747] text-white border-t border-white/5">
      <div class="container mx-auto max-w-[1200px] px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div class="text-[24px] font-black mb-4">
            车拖车<span class="text-[#FF6B00]">.</span>
          </div>
          <p class="text-white/40 text-[14px]">
            让汽车物流更简单、更高效
          </p>
        </div>
        <div class="flex gap-8 text-[14px] text-white/60">
          <span
            class="hover:text-white cursor-pointer transition-colors"
            @click="navigateToAbout"
          >
            关于我们
          </span>
          <span
            class="hover:text-white cursor-pointer transition-colors"
            @click="navigateToContact"
          >
            联系我们
          </span>
          <span
            class="hover:text-white cursor-pointer transition-colors"
            @click="navigateToHome"
          >
            返回首页
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useBreadcrumbSchema, useFAQPageSchema } from '@/composables/useSchemaOrg'
import { usePageSeo } from '@/composables/useSeoMeta'

useBreadcrumbSchema(getBreadcrumbsForRoute('/careers'))

const breadcrumbItems = getBreadcrumbsForRoute('/careers')

usePageSeo({
  title: '加入车拖车 - 连接汽车物流的下一个时代',
  description: '车拖车正致力于构建一个更透明、更高效的数字化物流生态系统。我们寻找对技术充满热忱、勇于挑战行业痛点的创新者。查看热招岗位，投递简历。',
  keywords: '车拖车招聘, 物流科技招聘, 智运生计划, 校园招聘, 社会招聘, 技术岗位, 产品经理',
  ogImage: '/image/careers/og-careers.jpg',
  canonicalUrl: 'https://newweb.chetuoche.net/careers'
})

import { useRouter } from 'vue-router'
import {
  ChevronRight,
  Search,
  Rocket,
  Terminal,
  Gift,
  Briefcase,
  MapPin,
  Clock,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Accordion from '@/components/ui/Accordion.vue'
import AccordionItem from '@/components/ui/AccordionItem.vue'
import AccordionTrigger from '@/components/ui/AccordionTrigger.vue'
import AccordionContent from '@/components/ui/AccordionContent.vue'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import ImageWithFallback from '@/components/ImageWithFallback.vue'
import type { Job } from '@/types'

const router = useRouter()
const searchQuery = ref('')
const activeTab = ref('all')

interface JobRaw {
  [key: string]: unknown
}

interface PostTypeItem {
  postType?: string
  postTypeName?: string
  postTypeId?: number | string
  postList?: JobRaw[]
  _postTypeValue?: string
}

interface JobDetail extends Job {
  duty?: string
  requirement?: string
  benefits?: string
  detailHtml?: string
  raw: JobRaw
}

const pickString = (value: unknown, fallback = '') => {
  if (value === null || value === undefined) return fallback
  const text = String(value).trim()
  return text || fallback
}

const stripHtml = (value: string) => {
  if (!value) return ''
  return String(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const summarize = (value: string, limit = 90) => {
  if (!value) return ''
  const plain = stripHtml(value)
  if (plain.length <= limit) return plain
  return `${plain.slice(0, limit)}...`
}

const formatDateLabel = (value: unknown) => {
  const text = pickString(value)
  if (!text) return ''
  if (text.includes('发布')) return text
  const numeric = Number(text)
  if (!Number.isNaN(numeric) && numeric > 1000000000) {
    try {
      const date = new Date(numeric)
      if (!Number.isNaN(date.getTime())) {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      }
    } catch (error) {
      // silently ignore date format errors
    }
  }
  return text
}

const normalizeJobs = (rows: JobRaw[]): JobDetail[] => {
  // 防御性检查：确保 rows 是数组
  if (!Array.isArray(rows)) {
    
    return []
  }
  
  return rows.filter(row => row && typeof row === 'object').map((row, index) => {
    const title = pickString(row.postName || row.title || row.name, '职位名称待定')
    const dept = pickString(
      row.dept || row.department || row.departmentName || row.postDepartment || row.postTypeName || row._postTypeLabel,
      '用人部门待定'
    )
    const type = pickString(row.type || row.recruitType || row.jobType, '社招')
    const location = pickString(row.location || row.workSite || row.workPlace || row.workAddress || row.city, '工作地点待定')
    const detailHtml = pickString(row.postRequirement || row.requirementHtml || row.jobDetail)
    const desc = pickString(
      row.desc || row.description || row.postDesc || row.brief || row.summary,
      detailHtml ? summarize(detailHtml) : ''
    )
    const date = formatDateLabel(row.publishTime || row.createTime || row.updateTime)
    const salaryMin = pickString(row.salaryMin || row.minSalary)
    const salaryMax = pickString(row.salaryMax || row.maxSalary)
    const salaryUnit = pickString(row.salaryUnit || row.salaryUnitName)
    const salary =
      salaryMin && salaryMax
        ? `${salaryMin}-${salaryMax}${salaryUnit ? ` ${salaryUnit}` : ''}`
        : pickString(row.salary || row.payRange || row.compensation, '薪资面议')
    const id = pickString(row.id || row.postId || row.code, `JOB-${String(index + 1).padStart(3, '0')}`)
    const category = pickString(row._postTypeValue || row.category, 'all')

    return {
      id,
      title,
      category,
      dept,
      type,
      location,
      desc,
      date,
      salary,
      duty: pickString(row.duty || row.responsibility || row.postDuty || row.jobDuty),
      requirement: pickString(row.requirement || row.requirements || row.qualifications || row.jobRequire),
      benefits: pickString(row.benefits || row.welfare || row.benefit),
      detailHtml,
      raw: row,
    }
  })
}

// --- State ---
const loading = ref(true)
const allJobs = ref<JobDetail[]>([])
const tabs = ref<Array<{ label: string; value: string }>>([{ label: '全部', value: 'all' }])

// --- API Functions ---
const fetchJobs = async () => {
  loading.value = true
  
  try {
    const response = await $fetch('/api/home/getAllPost/notClassified')
    
    const res = response as Record<string, unknown>

    // notClassified 接口返回 data: [{ postType, postTypeId, postList: [...] }, ...]
    const dataArray = Array.isArray(res?.data) ? (res.data as PostTypeItem[]) : []

    const rows: JobRaw[] = []
    const parsedTabs: Array<{ label: string; value: string }> = [{ label: '全部', value: 'all' }]

    dataArray.forEach((typeItem, index) => {
      const label = pickString(typeItem.postType || typeItem.postTypeName, `类型${index + 1}`)
      const value = `type-${typeItem.postTypeId ?? index + 1}`
      typeItem._postTypeValue = value

      parsedTabs.push({ label, value })

      const posts = Array.isArray(typeItem.postList) ? typeItem.postList : []
      posts.forEach((post) => {
        rows.push({ ...post, _postTypeLabel: label, _postTypeValue: value })
      })
    })
    
    allJobs.value = normalizeJobs(rows)
    tabs.value = parsedTabs
    
  } catch (error) {
    
    allJobs.value = []
    tabs.value = [{ label: '全部', value: 'all' }]
  } finally {
    loading.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  fetchJobs()
})

const filteredJobs = computed(() => {
  if (loading.value || !allJobs.value) return []
  
  let jobs = activeTab.value === 'all' ? allJobs.value : allJobs.value.filter((j) => j && j.category === activeTab.value)
  
  if (searchQuery.value) {
    jobs = jobs.filter(
      (j) =>
        j && (
          (j.title && j.title.includes(searchQuery.value)) ||
          (j.desc && j.desc.includes(searchQuery.value)) ||
          (j.dept && j.dept.includes(searchQuery.value))
        )
    )
  }
  
  return jobs.filter(j => j !== null && j !== undefined)
})

const evpItems = [
  {
    icon: Rocket,
    title: '快速成长',
    desc: '置身于行业领先的数字化托运平台，你将直接接触最前沿的 AI 调度算法与物流科技，与行业顶尖大牛共事，实现职业生涯的指数级跃升。',
    bgClass: 'bg-[#F8F9FB]',
    iconBgClass: 'bg-blue-50 text-[#006EFF] group-hover:bg-[#006EFF] group-hover:text-white',
    iconClass: '',
  },
  {
    icon: Terminal,
    title: '技术纯粹',
    desc: '我们推崇工程师文化，深耕网络安全技术。你将参与打造金融级物流数据底座，维护通过国家三级等保认证的核心系统，用技术捍卫数据价值。',
    bgClass: 'bg-[#F0F4F8] border-blue-50',
    iconBgClass: 'bg-[#0B2747] text-white group-hover:bg-[#006EFF]',
    iconClass: '',
  },
  {
    icon: Gift,
    title: '竞争性回报',
    desc: '提供具有市场竞争力的薪酬体系，包含年终奖与期权/股权激励。享受完善的五险一金保障，让每一份付出都获得对等的回报。',
    bgClass: 'bg-[#FFF8F4] border-orange-50',
    iconBgClass: 'bg-orange-50 text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white',
    iconClass: '',
  },
]

const faqs = [
  {
    question: '车拖车的面试流程是怎样的？',
    answer:
      '通常包含 2-3 轮技术/专业面试 + 1 轮 HR 面试。面试官将重点考察候选人的行业认知深度与解决复杂问题的逻辑能力。如果是技术岗位，可能还包含代码测试或架构探讨环节。',
  },
  {
    question: '是否接受应届生实习？',
    answer:
      '是的。通过 ‘智运生’ 计划，我们长期开放实习岗位，特别欢迎交通物流与计算机相关专业的同学投递。实习表现优秀的同学有极高概率获得转正 Offer。',
  },
  {
    question: '入职后的培训体系是怎样的？',
    answer:
      '我们有完善的"车拖车学院"内训体系，涵盖行业知识普及、通用职业技能及专项技术工作坊。每一位入职新人都会配备一名"导师（Mentor）"，负责入职后的工作引导与成长反馈。',
  },
]

const navigateToHome = () => {
  router.push('/')
}

const navigateToAbout = () => {
  router.push('/about')
}

const navigateToContact = () => {
  router.push('/contact')
}

const sendEmail = (email: string) => {
  window.location.href = `mailto:${email}`
}

const getJobSchema = (job: Job) => {
  // 安全解析地点信息
  const locationParts = job.location ? String(job.location).split('/') : []
  const addressLocality = locationParts.length > 0 ? locationParts[0].trim() : '待定'
  
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title || '职位名称',
    description: job.desc || '职位描述',
    identifier: {
      '@type': 'PropertyValue',
      name: 'CheTuoChe',
      value: job.id || 'unknown',
    },
    hiringOrganization: { '@id': 'https://newweb.chetuoche.net/#organization' },
    employmentType: 'FULL_TIME',
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality,
        addressRegion: '山东',
        addressCountry: 'CN',
      },
    },
  }
  return schema
}

const allJobSchemas = computed(() => {
  // 只在有数据且不在加载中时生成 schema
  if (loading.value || !filteredJobs.value || filteredJobs.value.length === 0) {
    return []
  }
  return filteredJobs.value.map(job => getJobSchema(job))
})

const isJobDialogOpen = ref(false)
const selectedJob = ref<JobDetail | null>(null)

const openJobDetail = (job: JobDetail) => {
  selectedJob.value = job
  isJobDialogOpen.value = true
}

useFAQPageSchema(faqs.map(f => ({ question: f.question, answer: f.answer })))

useHead(() => ({
  script: allJobSchemas.value.length > 0 ? [
    {
      type: 'application/ld+json',
      children: JSON.stringify(allJobSchemas.value)
    }
  ] : []
}))
</script>
