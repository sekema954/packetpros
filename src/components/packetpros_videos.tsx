import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Level = 'Beginner' | 'Intermediate' | 'Advanced'

type Video = {
  id: string
  title: string
  description: string
  youtubeId: string
  category: string
  duration: string
  level: Level
  views: string
  date: string
  publishedAt: string
}

type YouTubeVideoItem = {
  id: string
  snippet: {
    title?: string
    description?: string
    publishedAt: string
  }
  contentDetails: { duration?: string }
  statistics?: { viewCount?: string }
}

const API_KEY = import.meta.env.VITE_API_KEY
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID

const CACHE_KEY = 'packetpros.videos.v1'
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes
const VIDEOS_PER_PAGE = 6

const categories = [
  'All Videos',
  'Networking Fundamentals',
  'Subnetting',
  'Switching',
  'Routing',
  'Hands-On Labs',
  'Troubleshooting',
  'Career',
]

const getCategory = (title: string, description: string): string => {
  const text = `${title} ${description}`.toLowerCase()

  if (text.includes('subnet') || text.includes('cidr') || text.includes('ip address')) {
    return 'Subnetting'
  }

  if (
    text.includes('vlan') ||
    text.includes('switch') ||
    text.includes('trunk') ||
    text.includes('stp')
  ) {
    return 'Switching'
  }

  if (
    text.includes('ospf') ||
    text.includes('bgp') ||
    text.includes('eigrp') ||
    text.includes('routing') ||
    text.includes('router')
  ) {
    return 'Routing'
  }

  if (
    text.includes('lab') ||
    text.includes('packet tracer') ||
    text.includes('gns3') ||
    text.includes('eve-ng') ||
    text.includes('configure')
  ) {
    return 'Hands-On Labs'
  }

  if (
    text.includes('troubleshoot') ||
    text.includes('troubleshooting') ||
    text.includes('debug')
  ) {
    return 'Troubleshooting'
  }

  if (
    text.includes('interview') ||
    text.includes('career') ||
    text.includes('job') ||
    text.includes('resume')
  ) {
    return 'Career'
  }

  return 'Networking Fundamentals'
}

const getLevel = (title: string, description: string): Level => {
  const text = `${title} ${description}`.toLowerCase()

  if (text.includes('advanced') || text.includes('bgp') || text.includes('ccnp')) {
    return 'Advanced'
  }

  if (
    text.includes('intermediate') ||
    text.includes('ospf') ||
    text.includes('vlan') ||
    text.includes('switch') ||
    text.includes('routing')
  ) {
    return 'Intermediate'
  }

  return 'Beginner'
}

const formatDuration = (duration: string): string => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)

  if (!match) return ''

  const hours = parseInt(match[1] || '0', 10)
  const minutes = parseInt(match[2] || '0', 10)
  const seconds = parseInt(match[3] || '0', 10)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const formatViews = (views: string): string => {
  const number = Number(views)

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1).replace('.0', '')}M`
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1).replace('.0', '')}K`
  }

  return number.toString()
}

async function fetchYouTube<T>(url: string): Promise<T> {
  const response = await fetch(url)
  const data = await response.json()

  if (!response.ok || data?.error) {
    throw new Error(
      data?.error?.message || `YouTube request failed (HTTP ${response.status}).`
    )
  }

  return data as T
}

const readCache = (): Video[] | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as { savedAt?: number; videos?: Video[] }

    if (
      !parsed.savedAt ||
      !Array.isArray(parsed.videos) ||
      Date.now() - parsed.savedAt > CACHE_TTL_MS
    ) {
      return null
    }

    return parsed.videos
  } catch {
    return null
  }
}

const writeCache = (videos: Video[]) => {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), videos })
    )
  } catch {
    /* ignore (private mode, quota) */
  }
}

export const PacketProsVideos = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Videos')
  const [activeLevel, setActiveLevel] = useState('All Levels')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const gridTopRef = useRef<HTMLDivElement | null>(null)

  const loadVideos = useCallback(async (force = false) => {
    setError('')

    if (!force) {
      const cached = readCache()

      if (cached) {
        setVideos(cached)
        setIsLoading(false)
        return
      }
    }

    setIsLoading(true)

    try {
      if (!API_KEY || !CHANNEL_ID) {
        throw new Error(
          'Video library is not configured. Set VITE_API_KEY and VITE_CHANNEL_ID.'
        )
      }

      const channelData = await fetchYouTube<{
        items?: Array<{
          contentDetails: { relatedPlaylists: { uploads: string } }
        }>
      }>(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
      )

      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('YouTube channel not found.')
      }

      const playlistId = channelData.items[0].contentDetails.relatedPlaylists.uploads

      const playlistData = await fetchYouTube<{
        items?: Array<{ contentDetails: { videoId?: string } }>
      }>(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
      )

      const videoIds = (playlistData.items || [])
        .map((item) => item.contentDetails.videoId)
        .filter((id): id is string => Boolean(id))

      if (videoIds.length === 0) {
        setVideos([])
        return
      }

      const detailsData = await fetchYouTube<{ items?: YouTubeVideoItem[] }>(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&key=${API_KEY}`
      )

      const formatted: Video[] = (detailsData.items || [])
        .map((video) => {
          const title = video.snippet.title || ''
          const description = video.snippet.description || ''

          return {
            id: video.id,
            title,
            description,
            youtubeId: video.id,
            category: getCategory(title, description),
            duration: formatDuration(video.contentDetails.duration || ''),
            level: getLevel(title, description),
            views: formatViews(video.statistics?.viewCount || '0'),
            date: new Date(video.snippet.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            publishedAt: video.snippet.publishedAt,
          }
        })
        // Newest first, regardless of the order YouTube returns them in.
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )

      setVideos(formatted)
      writeCache(formatted)
    } catch (loadError) {
      console.error('Failed to fetch YouTube videos:', loadError)
      setVideos([])
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Unable to load videos right now.'
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadVideos()
  }, [loadVideos])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, activeCategory, activeLevel])

  // Close the player with Escape.
  useEffect(() => {
    if (!selectedVideo) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedVideo(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedVideo])

  const filteredVideos = useMemo(() => {
    const searchValue = search.trim().toLowerCase()

    return videos.filter((video) => {
      const titleMatches =
        searchValue === '' || video.title.toLowerCase().includes(searchValue)

      const categoryMatches =
        activeCategory === 'All Videos' || video.category === activeCategory

      const levelMatches =
        activeLevel === 'All Levels' || video.level === activeLevel

      return titleMatches && categoryMatches && levelMatches
    })
  }, [videos, search, activeCategory, activeLevel])

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE)

  const currentVideos = filteredVideos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  )

  const goToPage = (page: number) => {
    setCurrentPage(page)
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-[2px] text-purple-400">
        PacketPros Video Hub
      </span>
      <h1 className="mt-2 text-[32px] font-black">Video Library</h1>
      <p className="mt-3 max-w-2xl text-xs leading-6 text-[#81778A]">
        Free lessons covering networking fundamentals, routing, switching,
        subnetting, troubleshooting, labs, and career preparation.
      </p>

      <div className="mt-7 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3">
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search videos by title..."
          className="w-full bg-transparent text-xs outline-none placeholder:text-[#62586C]"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-xs text-purple-300">
            Clear
          </button>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-[10px] font-bold transition ${
                activeCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'border border-white/10 bg-white/[0.04] text-[#95899D] hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <select
          value={activeLevel}
          onChange={(event) => setActiveLevel(event.target.value)}
          aria-label="Filter by level"
          className="w-full rounded-xl border border-white/10 bg-[#120C18] px-4 py-3 text-[11px] text-[#C7BDCB] outline-none lg:w-[160px]"
        >
          <option>All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <div ref={gridTopRef} className="mt-6 scroll-mt-24">
        {!isLoading && !error && (
          <p className="text-[10px] text-[#71677A]">
            {filteredVideos.length} video{filteredVideos.length === 1 ? '' : 's'} available
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="py-16 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-purple-400/20 border-t-purple-400" />
          <p className="mt-4 text-sm text-[#91869C]">Loading videos...</p>
        </div>
      ) : error ? (
        <div
          role="alert"
          className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/5 p-6"
        >
          <p className="text-sm text-red-300">{error}</p>
          <button
            type="button"
            onClick={() => void loadVideos(true)}
            className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-xs font-bold hover:bg-purple-500"
          >
            Try again
          </button>
        </div>
      ) : currentVideos.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {currentVideos.map((video) => (
            <article
              key={video.id}
              className="group overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.045] transition hover:-translate-y-1 hover:border-purple-500/30"
            >
              <button
                type="button"
                onClick={() => setSelectedVideo(video)}
                aria-label={`Play ${video.title}`}
                className="relative block aspect-video w-full overflow-hidden text-left"
              >
                <img
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600/90 shadow-xl transition group-hover:scale-110">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5.2v13.6c0 .8.9 1.3 1.6.9l10.2-6.8c.6-.4.6-1.3 0-1.7L9.6 4.3C8.9 3.9 8 4.4 8 5.2Z" />
                    </svg>
                  </div>
                </div>
                {video.duration && (
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-[9px] font-bold">
                    {video.duration}
                  </span>
                )}
              </button>

              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[9px] font-bold uppercase tracking-[1.2px] text-purple-400">
                    {video.category}
                  </span>
                  <span className="text-[9px] text-[#71677A]">{video.level}</span>
                </div>
                <h2 className="mt-3 line-clamp-2 text-sm font-bold leading-5 text-white transition group-hover:text-purple-300">
                  {video.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-[#91869C]">
                  {video.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <span className="text-[10px] text-[#81778A]">{video.views} views</span>
                  <span className="text-[10px] text-[#81778A]">{video.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-10 text-center">
          <h3 className="font-bold">
            {videos.length ? 'No videos found' : 'No videos yet'}
          </h3>
          <p className="mt-2 text-xs text-[#91869C]">
            {videos.length
              ? 'Try another title or reset the filters.'
              : 'Videos will appear here once the channel has uploads.'}
          </p>
          {videos.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setActiveCategory('All Videos')
                setActiveLevel('All Levels')
              }}
              className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-xs font-bold hover:bg-purple-500"
            >
              Reset filters
            </button>
          )}
        </div>
      )}

      {totalPages > 1 && !isLoading && !error && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[10px] font-bold text-[#95899D] transition hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`h-10 w-10 rounded-xl text-[10px] font-bold transition ${
                currentPage === page
                  ? 'bg-purple-600 text-white'
                  : 'border border-white/10 bg-white/[0.04] text-[#95899D] hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[10px] font-bold text-[#95899D] transition hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}

      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedVideo.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5 backdrop-blur-md"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-[1050px]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
              className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
            >
              ×
            </button>

            <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black shadow-2xl">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-purple-400">
                {selectedVideo.category}
              </div>
              <h2 className="mt-2 text-xl font-black">{selectedVideo.title}</h2>
              <p className="mt-2 line-clamp-3 text-[11px] leading-5 text-[#8E8494]">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PacketProsVideos