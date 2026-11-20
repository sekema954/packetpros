import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type Video = {
  id: string
  title: string
  description: string
  youtubeId: string
  category: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  views: string
  date: string
}

const API_KEY = import.meta.env.VITE_API_KEY
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID

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

const videosPerPage = 6

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

const getLevel = (
  title: string,
  description: string
): 'Beginner' | 'Intermediate' | 'Advanced' => {
  const text = `${title} ${description}`.toLowerCase()

  if (
    text.includes('advanced') ||
    text.includes('bgp') ||
    text.includes('ccnp')
  ) {
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

  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')

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

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Videos')
  const [activeLevel, setActiveLevel] = useState('All Levels')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true)

        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
        )

        const channelData = await channelRes.json()

        if (!channelData.items || channelData.items.length === 0) {
          throw new Error('YouTube channel not found')
        }

        const playlistId =
          channelData.items[0].contentDetails.relatedPlaylists.uploads

        const playlistRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
        )

        const playlistData = await playlistRes.json()

        if (!playlistData.items) {
          throw new Error('No videos found')
        }

        const videoIds = playlistData.items
          .map((item: any) => item.contentDetails.videoId)
          .filter(Boolean)

        if (videoIds.length === 0) {
          setVideos([])
          return
        }

        const videoDetailsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&key=${API_KEY}`
        )

        const videoDetailsData = await videoDetailsRes.json()

        const formattedVideos: Video[] = videoDetailsData.items.map(
          (video: any) => {
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
              date: new Date(video.snippet.publishedAt).toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }
              ),
            }
          }
        )

        setVideos(formattedVideos)
      } catch (error) {
        console.error('Failed to fetch YouTube videos:', error)
        setVideos([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, activeCategory, activeLevel])

  const filteredVideos = useMemo(() => {
    const searchValue = search.trim().toLowerCase()

    return videos.filter((video) => {
      const titleMatches =
        searchValue === '' ||
        video.title.toLowerCase().includes(searchValue)

      const categoryMatches =
        activeCategory === 'All Videos' ||
        video.category === activeCategory

      const levelMatches =
        activeLevel === 'All Levels' ||
        video.level === activeLevel

      return titleMatches && categoryMatches && levelMatches
    })
  }, [videos, search, activeCategory, activeLevel])

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)

  const startIndex = (currentPage - 1) * videosPerPage

  const currentVideos = filteredVideos.slice(
    startIndex,
    startIndex + videosPerPage
  )

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 500,
      behavior: 'smooth',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08050D] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#7C3AED] border-t-transparent animate-spin" />
          <p className="mt-4 text-[11px] text-[#817589]">
            Loading videos...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#08050D] text-white">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2200&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-[#08050D]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160822]/80 via-[#09050E]/90 to-[#08050D]" />
        <div className="absolute -top-48 left-1/3 w-[650px] h-[650px] rounded-full bg-[#7C3AED]/20 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 pt-28 pb-20">
          <div className="flex items-center gap-2 text-[11px] text-[#8D8295]">
            <Link
              to="/packPros"
              className="hover:text-white transition"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#C084FC]">
              Video Library
            </span>
          </div>
          <div className="max-w-[800px] mt-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#7C3AED]/15 border border-[#A855F7]/30 text-[#C084FC] text-[10px] uppercase tracking-[2px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_12px_#A855F7]" />
              PacketPros Video Hub
            </div>
            <h1 className="mt-6 text-[42px] sm:text-[56px] lg:text-[68px] leading-[1] tracking-[-3px] font-black">
              Learn networking.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#9333EA]">
                One video at a time.
              </span>
            </h1>
            <p className="mt-6 max-w-[650px] text-[14px] sm:text-[16px] leading-7 text-[#B4A8BB]">
              Explore the PacketPros video library covering networking
              fundamentals, routing, switching, subnetting,
              troubleshooting, labs, and career preparation.
            </p>
          </div>
          <div className="relative max-w-[760px] mt-9">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#80748A]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search videos by title..."
              className="w-full h-[58px] rounded-2xl border border-white/15 bg-black/40 backdrop-blur-xl pl-14 pr-5 text-[13px] text-white placeholder:text-[#71677A] outline-none focus:border-[#A855F7]/60 focus:ring-4 focus:ring-[#7C3AED]/10 transition"
            />
          </div>
          <div className="flex flex-wrap gap-8 mt-8">
            <div>
              <div className="text-[20px] font-black">
                {videos.length}+
              </div>
              <div className="text-[9px] uppercase tracking-[1.5px] text-[#817589]">
                Videos
              </div>
            </div>
            <div>
              <div className="text-[20px] font-black">
                100%
              </div>
              <div className="text-[9px] uppercase tracking-[1.5px] text-[#817589]">
                Practical
              </div>
            </div>
            <div>
              <div className="text-[20px] font-black">
                Free
              </div>
              <div className="text-[9px] uppercase tracking-[1.5px] text-[#817589]">
                Content
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 px-4 py-2.5 rounded-xl text-[10px] font-bold transition-all ${
                    activeCategory === category
                      ? 'bg-[#7C3AED] text-white shadow-[0_10px_25px_-12px_rgba(124,58,237,.8)]'
                      : 'bg-white/[0.04] border border-white/10 text-[#95899D] hover:text-white hover:bg-white/[0.07]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <select
              value={activeLevel}
              onChange={(e) => setActiveLevel(e.target.value)}
              className="w-full lg:w-[160px] rounded-xl border border-white/10 bg-[#120C18] px-4 py-3 text-[11px] text-[#C7BDCB] outline-none"
            >
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className="flex items-center justify-between mt-10">
            <div>
              <h2 className="text-[22px] font-black">
                Video Library
              </h2>
              <p className="mt-1 text-[10px] text-[#71677A]">
                {filteredVideos.length} videos available
              </p>
            </div>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-[10px] text-[#A855F7] hover:text-[#C084FC]"
              >
                Clear search
              </button>
            )}
          </div>
          {currentVideos.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-7">
              {currentVideos.map((video) => (
                <article
                  key={video.id}
                  className="group overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035] hover:bg-white/[0.055] hover:border-[#A855F7]/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="relative block w-full aspect-video overflow-hidden text-left"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#7C3AED]/90 backdrop-blur-md flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,.5)] group-hover:scale-110 transition">
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M8 5.2v13.6c0 .8.9 1.3 1.6.9l10.2-6.8c.6-.4.6-1.3 0-1.7L9.6 4.3C8.9 3.9 8 4.4 8 5.2Z" />
                        </svg>
                      </div>
                    </div>
                    {video.duration && (
                      <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/80 text-[9px] font-bold">
                        {video.duration}
                      </span>
                    )}
                  </button>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[9px] uppercase tracking-[1.2px] font-bold text-[#A855F7]">
                        {video.category}
                      </span>
                      <span className="text-[9px] text-[#71677A]">
                        {video.level}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[15px] leading-5 font-extrabold text-[#EAE4EC] group-hover:text-[#C084FC] transition">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-[10.5px] leading-5 text-[#81778A] line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.07]">
                      <span className="text-[9px] text-[#71677A]">
                        {video.views} views
                      </span>
                      <span className="text-[9px] text-[#71677A]">
                        {video.date}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[24px] border border-white/10 bg-white/[0.025] py-20 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center text-[#A855F7]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
              </div>
              <h3 className="mt-5 text-[18px] font-black">
                No videos found
              </h3>
              <p className="mt-2 text-[11px] text-[#756B7D]">
                Try searching for another video title.
              </p>
              <button
                onClick={() => {
                  setSearch('')
                  setActiveCategory('All Videos')
                  setActiveLevel('All Levels')
                }}
                className="mt-5 px-5 py-2.5 rounded-xl bg-[#7C3AED] text-[10px] font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-[10px] font-bold text-[#95899D] hover:text-white hover:bg-white/[0.07] disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-xl text-[10px] font-bold transition ${
                      currentPage === page
                        ? 'bg-[#7C3AED] text-white shadow-[0_10px_25px_-12px_rgba(124,58,237,.8)]'
                        : 'border border-white/10 bg-white/[0.04] text-[#95899D] hover:text-white hover:bg-white/[0.07]'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  goToPage(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-[10px] font-bold text-[#95899D] hover:text-white hover:bg-white/[0.07] disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="relative overflow-hidden border-t border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-[#0B0612]/90" />
        <div className="relative z-10 max-w-[800px] mx-auto px-6 py-24 text-center">
          <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#C084FC]">
            Go Beyond Videos
          </span>
          <h2 className="mt-5 text-[38px] sm:text-[50px] leading-[1] tracking-[-2px] font-black">
            Want a structured path
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] to-[#9333EA]">
              to Network Engineering?
            </span>
          </h2>
          <p className="mt-5 max-w-[600px] mx-auto text-[13px] leading-7 text-[#A89CAB]">
            The PacketPros Academy takes you beyond individual
            videos with structured lessons, hands-on labs, and
            career preparation.
          </p>
          <a
            href="/academy"
            className="mt-8 inline-flex items-center justify-center px-7 py-4 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#6D28D9] text-[12px] font-bold shadow-[0_15px_45px_-12px_rgba(124,58,237,.8)] hover:-translate-y-1 transition-all"
          >
            Explore PacketPros Academy →
          </a>
        </div>
      </section>
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-5"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-[1050px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
              aria-label="Close video"
            >
              ×
            </button>
            <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,.8)]">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[10px] uppercase tracking-[1.5px] text-[#A855F7] font-bold">
                {selectedVideo.category}
              </div>
              <h2 className="mt-2 text-[20px] font-black">
                {selectedVideo.title}
              </h2>
              <p className="mt-2 text-[11px] leading-5 text-[#8E8494]">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Videos