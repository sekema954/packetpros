import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import { logout, changePassword } from '../firebase/services/auth'
import PacketProsVideos from '../components/packetpros_videos'

type HighLevelCourse = {
  id: string
  title?: string
  name?: string
  description?: string | null
  posterImage?: string | null
  image?: string | null
  thumbnail?: string | null
  [key: string]: unknown
}

type CourseCard = {
  id: string
  title: string
  description: string
  image: string
  level: 'Beginner' | 'Advanced' | 'Other'
  courseKey: 'beginner' | 'advanced' | null
}

type StoreProduct = {
  id: string
  name: string
  description?: string | null
  image?: string | null
  price?: number | { amount?: number; currency?: string } | null
  prices?: Array<{ amount?: number; currency?: string }>
  currency?: string
  canPurchase?: boolean
  paymentLinkAvailable?: boolean
}

const API_BASE = '/api/courses'
const ENROLLMENTS_API = '/api/my-enrollments'
const CREATE_CHECKOUT_API = '/api/highlevel/create-checkout-session'
const STORE_API = '/api/shop/products'
const STORE_CHECKOUT_API = '/api/shop/create-checkout-session'
const STORE_PURCHASES_API = '/api/shop/my-purchases'

// sessionStorage key used to remember that the user just left for a shop
// checkout, so we can poll for the purchase when they come back.
const SHOP_PENDING_KEY = 'shopCheckoutPending'
const COURSE_PENDING_KEY = 'courseCheckoutPending'
const SHOP_POLL_INTERVAL_MS = 5000
const SHOP_POLL_MAX_TRIES = 8 // ~40 seconds

const formatProductPrice = (product: StoreProduct) => {
  const raw = product.price ?? product.prices?.[0]?.amount
  const amount = typeof raw === 'object' && raw !== null ? raw.amount : raw
  if (amount === undefined || amount === null) {
    return 'See checkout for price'
  }
  const numeric = Number(amount)
  if (!Number.isFinite(numeric)) return 'See checkout for price'
  const currency = (typeof raw === 'object' && raw !== null ? raw.currency : undefined)
    || product.currency || product.prices?.[0]?.currency || 'USD'
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(numeric)
  } catch {
    return `${numeric.toFixed(2)} ${currency}`
  }
}

// These are the GoHighLevel payment/checkout product IDs, not membership
// course IDs. They must match the IDs validated by the backend webhook.
const CHECKOUT_BEGINNER_PRODUCT_ID = '6acb9be8c0e70c7fefb73dc2'
const CHECKOUT_ADVANCED_PRODUCT_ID = '6acd43bcc0e70c7fefb741cb'

//const LOCATION_ID = 'CEmPERpihL9Qy3FoDjad'

const BEGINNER_PRODUCT_ID =
  'a3dc430d-234d-47e7-ba3d-781c8cae6560'

const APPLICATION_URL =
  'https://api.leadconnectorhq.com/widget/form/eeFl3bbUna9r48PmceIG'

const ADVANCED_PRODUCT_ID =
  '95697c98-ace9-4c2e-a14e-45d1547061df'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85'

// IMPORTANT: This must be the student-facing membership portal URL.
// Never use a /view=manager URL here. Leave blank until configured.
const STUDENT_PORTAL_URL = 'https://packetpros.app.clientclub.net/'

// Optional per-course GHL links (for example a direct link to each course in
// the membership portal). Any course left blank falls back to
// STUDENT_PORTAL_URL above. The "Study now" button opens this URL.
const COURSE_PORTAL_URLS: Record<'beginner' | 'advanced', string> = {
  beginner: '',
  advanced: '',
}

const getCoursePortalUrl = (courseKey: 'beginner' | 'advanced' | null) =>
  (courseKey && COURSE_PORTAL_URLS[courseKey]) || STUDENT_PORTAL_URL

const Icon = ({
  name,
  size = 20,
}: {
  name: string
  size?: number
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'home':
      return <svg {...common}><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></svg>
    case 'book':
      return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" /><path d="M4 5.5v16" /><path d="M8 7h8" /><path d="M8 11h8" /></svg>
    case 'play':
      return <svg {...common} fill="currentColor" stroke="none"><path d="M8 5.2v13.6c0 .8.9 1.3 1.6.9l10.2-6.8c.6-.4.6-1.3 0-1.7L9.6 4.3C8.9 3.9 8 4.4 8 5.2Z" /></svg>
    case 'chart':
      return <svg {...common}><path d="M4 19V5" /><path d="M4 19h16" /><path d="m7 15 4-4 3 2 5-7" /></svg>
    case 'user':
      return <svg {...common}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" /></svg>
    case 'settings':
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1A1.7 1.7 0 0 0 8.4 15a1.7 1.7 0 0 0-1.6-1H6v-2.4h.8a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.4v.7a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.8V14h-.8a1.7 1.7 0 0 0-1.6 1Z" /></svg>
    case 'bell':
      return <svg {...common}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></svg>
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></svg>
    case 'clock':
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></svg>
    case 'check':
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>
    case 'lock':
      return <svg {...common}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
    case 'menu':
      return <svg {...common}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>
    case 'arrow':
      return <svg {...common}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
    case 'trophy':
      return <svg {...common}><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H4v1a4 4 0 0 0 4 4" /><path d="M16 6h4v1a4 4 0 0 1-4 4" /><path d="M12 13v4" /><path d="M8 21h8" /><path d="M9 17h6" /></svg>
    default:
      return null
  }
}

function getCourseTitle(course: HighLevelCourse): string {
  return course.title || course.name || 'Untitled Course'
}

function getCourseDescription(course: HighLevelCourse): string {
  return course.description || 'Explore this course in PacketPros Academy.'
}

function getCourseImage(course: HighLevelCourse): string {
  return course.posterImage || course.image || course.thumbnail || FALLBACK_IMAGE
}

// sessionStorage can throw (private mode, blocked storage), so wrap it.
const makePendingStore = (key: string) => ({
  get(): string | null {
    try {
      return sessionStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(value: string) {
    try {
      sessionStorage.setItem(key, value)
    } catch {
      /* ignore */
    }
  },
  clear() {
    try {
      sessionStorage.removeItem(key)
    } catch {
      /* ignore */
    }
  },
})

const pendingStore = makePendingStore(SHOP_PENDING_KEY)
const coursePendingStore = makePendingStore(COURSE_PENDING_KEY)

export const PacketPros = () => {
  const [activePage, setActivePage] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [profileName, setProfileName] = useState(
    auth.currentUser?.displayName || 'Student'
  )
  const [profileEmail, setProfileEmail] = useState(
    auth.currentUser?.email || ''
  )

  const [courses, setCourses] = useState<HighLevelCourse[]>([])
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [coursesError, setCoursesError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>([])
  const [storeLoading, setStoreLoading] = useState(false)
  const [storeError, setStoreError] = useState('')
  const [storeSearch, setStoreSearch] = useState('')
  const [storeCheckoutLoading, setStoreCheckoutLoading] = useState<string | null>(null)
  const [purchasedProductIds, setPurchasedProductIds] = useState<string[]>([])
  const [storePurchasesLoading, setStorePurchasesLoading] = useState(true)
  const [storePurchasesError, setStorePurchasesError] = useState('')

  const [enrolledCourseKeys, setEnrolledCourseKeys] = useState<string[]>([])
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(true)
  const [enrollmentsError, setEnrollmentsError] = useState('')
  const [checkoutLoading, setCheckoutLoading] = useState<'beginner' | 'advanced' | null>(null)
  const [accessMessage, setAccessMessage] = useState('')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [notifications, setNotifications] = useState(true)

  // Purchase ownership comes exclusively from the authenticated backend.
  // Backend contract: GET /api/shop/my-purchases ->
  // { purchases: [{ productId: string, status: "completed" }] }
  const loadStorePurchases = useCallback(async (user: typeof auth.currentUser) => {
    if (!user) {
      setPurchasedProductIds([])
      setStorePurchasesError('')
      setStorePurchasesLoading(false)
      return
    }

    setStorePurchasesLoading(true)
    setStorePurchasesError('')
    try {
      const token = await user.getIdToken()
      const response = await fetch(STORE_PURCHASES_API, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      })
      if (!response.ok) throw new Error(`Purchase status unavailable (HTTP ${response.status}).`)
      const data: unknown = await response.json()
      if (!data || typeof data !== 'object' ||
          !Array.isArray((data as { purchases?: unknown }).purchases)) {
        throw new Error('Unexpected purchase status response.')
      }
      // Never treat pending, failed, or unverified payments as purchases.
      const rows = (data as { purchases: Array<{ productId?: unknown; status?: unknown }> }).purchases
      const ids = rows
        .filter(row => row.status === 'completed' && typeof row.productId === 'string')
        .map(row => row.productId as string)
      setPurchasedProductIds(ids)

      // Stop polling once the product the user just paid for shows as owned.
      const pending = pendingStore.get()
      if (pending && ids.includes(pending)) {
        pendingStore.clear()
      }
    } catch (error) {
      setPurchasedProductIds([])
      setStorePurchasesError(error instanceof Error ? error.message : 'Unable to verify purchases.')
    } finally {
      setStorePurchasesLoading(false)
    }
  }, [])

  // Refresh purchases whenever the tab regains focus.
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === 'visible') void loadStorePurchases(auth.currentUser)
    }
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [loadStorePurchases])

  // After returning from a shop checkout, poll for the purchase. The
  // payment webhook is asynchronous and can land a few seconds after the
  // user comes back. Runs once on mount (loadStorePurchases is stable) and
  // intentionally does NOT depend on purchasedProductIds, which would
  // restart the interval on every fetch.
  useEffect(() => {
    if (!pendingStore.get()) return

    let tries = 0
    const id = window.setInterval(() => {
      // Stop when the purchase was detected (flag cleared) or after ~40s.
      if (!pendingStore.get() || tries >= SHOP_POLL_MAX_TRIES) {
        pendingStore.clear()
        window.clearInterval(id)
        return
      }
      tries += 1
      void loadStorePurchases(auth.currentUser)
    }, SHOP_POLL_INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [loadStorePurchases])

  const loadMyEnrollments = useCallback(async (user: typeof auth.currentUser) => {
    if (!user) {
      setEnrolledCourseKeys([])
      setEnrollmentsError('')
      setEnrollmentsLoading(false)
      return
    }

    setEnrollmentsLoading(true)
    setEnrollmentsError('')

    try {
      const token = await user.getIdToken()
      const response = await fetch(ENROLLMENTS_API, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? 'Your session could not be verified. Please sign in again.'
            : `Unable to verify course access (HTTP ${response.status}).`
        )
      }

      const data: unknown = await response.json()
      const enrollmentRows =
        data && typeof data === 'object' &&
        Array.isArray((data as { enrollments?: unknown }).enrollments)
          ? (data as { enrollments: Array<Record<string, unknown>> }).enrollments
          : []

      const activeKeys = enrollmentRows
        .filter((row) => row.status === 'active' || row.active === true)
        .map((row) => String(row.courseKey || row.courseId || row.id || ''))
        .map((value) => {
          const normalized = value.toLowerCase()
          if (normalized === 'beginner' || normalized === BEGINNER_PRODUCT_ID.toLowerCase()) return 'beginner'
          if (normalized === 'advanced' || normalized === ADVANCED_PRODUCT_ID.toLowerCase()) return 'advanced'
          return ''
        })
        .filter(Boolean)

      const keys: string[] = [...new Set(activeKeys)]
      setEnrolledCourseKeys(keys)

      // Stop polling once the course the user just paid for is active.
      const pendingCourse = coursePendingStore.get()
      if (pendingCourse && keys.includes(pendingCourse)) {
        coursePendingStore.clear()
      }
    } catch (error) {
      setEnrolledCourseKeys([])
      setEnrollmentsError(
        error instanceof Error ? error.message : 'Unable to verify course access.'
      )
    } finally {
      setEnrollmentsLoading(false)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setProfileName(user?.displayName || 'Student')
      setProfileEmail(user?.email || '')
      void loadMyEnrollments(user)
      void loadStorePurchases(user)
    })

    return unsubscribe
  }, [loadMyEnrollments, loadStorePurchases])

  // After returning from a course checkout, poll for the enrollment. The
  // payment webhook is asynchronous and can land a few seconds after the
  // user comes back. This effect sits after loadMyEnrollments so the
  // function is already defined, and it intentionally does NOT depend on
  // enrolledCourseKeys (that would restart the interval on every fetch).
  useEffect(() => {
    if (!coursePendingStore.get()) return

    let tries = 0
    const id = window.setInterval(() => {
      if (!coursePendingStore.get() || tries >= SHOP_POLL_MAX_TRIES) {
        coursePendingStore.clear()
        window.clearInterval(id)
        return
      }
      tries += 1
      void loadMyEnrollments(auth.currentUser)
    }, SHOP_POLL_INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [loadMyEnrollments])

  const loadCourses = useCallback(async () => {
    setCoursesLoading(true)
    setCoursesError('')

    try {
      const response = await fetch(API_BASE, {
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) {
        throw new Error(
          response.status === 502
            ? 'The server could not retrieve courses from HighLevel. Check the backend logs and API credentials.'
            : `Unable to load courses (HTTP ${response.status}).`
        )
      }

      const data: unknown = await response.json()

      if (
        !data ||
        typeof data !== 'object' ||
        !Array.isArray((data as { courses?: unknown }).courses)
      ) {
        throw new Error('The courses API returned an unexpected response.')
      }

      setCourses((data as { courses: HighLevelCourse[] }).courses)
    } catch (error) {
      setCoursesError(
        error instanceof Error ? error.message : 'Unable to load courses.'
      )
    } finally {
      setCoursesLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadCourses()
  }, [loadCourses])

  const loadStoreProducts = useCallback(async () => {
    setStoreLoading(true)
    setStoreError('')

    try {
      const response = await fetch(STORE_API, {
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) {
        throw new Error(`Unable to load shop products (HTTP ${response.status}).`)
      }

      const data: unknown = await response.json()
      if (!data || typeof data !== 'object' || !Array.isArray((data as { products?: unknown }).products)) {
        throw new Error('The shop API returned an unexpected response.')
      }

      setStoreProducts((data as { products: StoreProduct[] }).products)
    } catch (error) {
      setStoreError(error instanceof Error ? error.message : 'Unable to load shop products.')
    } finally {
      setStoreLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadStoreProducts()
  }, [loadStoreProducts])

  const purchaseStoreProduct = async (productId: string) => {
    setStoreError('')
    if (purchasedProductIds.includes(productId)) return
    if (storePurchasesLoading || storePurchasesError) {
      setStoreError('Purchase status must be verified before checkout. Refresh purchases and try again.')
      return
    }
    const user = auth.currentUser

    if (!user) {
      setStoreError('Please sign in before purchasing.')
      return
    }

    try {
      setStoreCheckoutLoading(productId)
      const token = await user.getIdToken()
      const response = await fetch(STORE_CHECKOUT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      })

      const data: { checkoutUrl?: string; error?: string; message?: string } = await response.json()
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || data.message || 'Unable to start checkout.')
      }

      // Checkout URLs are returned by the server, not trusted from product data.
      const checkoutUrl = new URL(data.checkoutUrl)
      if (checkoutUrl.protocol !== 'https:') {
        throw new Error('The server returned an invalid checkout URL.')
      }

      // Remember the purchase attempt so we poll for it on return.
      pendingStore.set(productId)
      window.location.assign(checkoutUrl.toString())
    } catch (error) {
      setStoreError(error instanceof Error ? error.message : 'Unable to start checkout.')
    } finally {
      setStoreCheckoutLoading(null)
    }
  }

  const courseCards = useMemo(() => {
    const byId = new Map<string, HighLevelCourse>()

    courses.forEach((course) => {
      if (course.id) byId.set(course.id, course)
    })

    // Always display the two known membership products. The links point
    // directly to the correct product in the HighLevel membership manager.
    const beginnerSource = byId.get(BEGINNER_PRODUCT_ID)
    const advancedSource = byId.get(ADVANCED_PRODUCT_ID)

    const knownCourses: CourseCard[] = [
      {
        id: BEGINNER_PRODUCT_ID,
        title: getCourseTitle(
          beginnerSource || {
            id: BEGINNER_PRODUCT_ID,
            title: 'Regular / Beginner Course',
          }
        ),
        description: getCourseDescription(
          beginnerSource || {
            id: BEGINNER_PRODUCT_ID,
            description: 'Start learning with the PacketPros beginner course.',
          }
        ),
        image: beginnerSource
          ? getCourseImage(beginnerSource)
          : FALLBACK_IMAGE,
        level: 'Beginner',
        courseKey: 'beginner',
      },
      {
        id: ADVANCED_PRODUCT_ID,
        title: getCourseTitle(
          advancedSource || {
            id: ADVANCED_PRODUCT_ID,
            title: 'Advanced Course',
          }
        ),
        description: getCourseDescription(
          advancedSource || {
            id: ADVANCED_PRODUCT_ID,
            description: 'Continue your learning with advanced course material.',
          }
        ),
        image: advancedSource
          ? getCourseImage(advancedSource)
          : FALLBACK_IMAGE,
        level: 'Advanced',
        courseKey: 'advanced',
      },
    ]

    // PacketPros currently sells exactly two course memberships.
    // Do not append unrelated HighLevel course records here.
    return knownCourses
  }, [courses])

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return courseCards.filter((course) => {
      return (
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.level.toLowerCase().includes(query)
      )
    })
  }, [courseCards, searchQuery])

  const handleChangePassword = async () => {
    setPasswordMessage('')
    setPasswordError('')

    if (!oldPassword) {
      setPasswordError('Please enter your current password.')
      return
    }

    if (newPassword.length < 6) {
      setPasswordError('Your new password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Your new passwords do not match.')
      return
    }

    try {
      setPasswordLoading(true)
      await changePassword(oldPassword, newPassword)

      setPasswordMessage('Your password has been successfully updated.')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      setPasswordError(
        error instanceof Error
          ? error.message
          : 'Unable to change your password.'
      )
    } finally {
      setPasswordLoading(false)
    }
  }

  const hasCourseAccess = (course: CourseCard) =>
    Boolean(course.courseKey && enrolledCourseKeys.includes(course.courseKey))

  const purchaseCourse = async (courseKey: 'beginner' | 'advanced') => {
    setAccessMessage('')
    const user = auth.currentUser

    if (!user) {
      setAccessMessage('Please sign in before purchasing a course.')
      return
    }

    const productId =
      courseKey === 'beginner'
        ? CHECKOUT_BEGINNER_PRODUCT_ID
        : CHECKOUT_ADVANCED_PRODUCT_ID

    try {
      setCheckoutLoading(courseKey)
      const token = await user.getIdToken()
      const response = await fetch(CREATE_CHECKOUT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      })

      const data: {
        checkoutUrl?: string
        alreadyEnrolled?: boolean
        error?: string
        message?: string
      } = await response.json()

      // The backend says this account already owns the course.
      if (data.alreadyEnrolled) {
        await loadMyEnrollments(user)
        setAccessMessage('You already have access to this course.')
        return
      }

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || data.message || 'Unable to start checkout.')
      }

      // Checkout URLs are returned by the server, not trusted from product data.
      const checkoutUrl = new URL(data.checkoutUrl)
      if (checkoutUrl.protocol !== 'https:') {
        throw new Error('The server returned an invalid checkout URL.')
      }

      // Remember the purchase attempt so we poll for it on return.
      coursePendingStore.set(courseKey)
      window.location.assign(checkoutUrl.toString())
    } catch (error) {
      setAccessMessage(
        error instanceof Error ? error.message : 'Unable to start checkout.'
      )
    } finally {
      setCheckoutLoading(null)
    }
  }

  const openCourse = (course: CourseCard) => {
    if (!hasCourseAccess(course)) {
      setAccessMessage('You need an active enrollment to open this course.')
      return
    }

    const portalUrl = getCoursePortalUrl(course.courseKey)

    if (!portalUrl) {
      setAccessMessage(
        'Your enrollment is verified, but the student portal URL has not been configured yet.'
      )
      return
    }

    window.open(portalUrl, '_blank', 'noopener,noreferrer')
  }

  const renderCourseAction = (course: CourseCard) => {
    if (enrollmentsLoading) {
      return (
        <span className="text-[10px] text-[#91869C]">Checking access...</span>
      )
    }

    if (enrollmentsError) {
      return (
        <span className="text-[10px] text-amber-300">
          Access check unavailable
        </span>
      )
    }

    if (hasCourseAccess(course)) {
      return (
        <button
          type="button"
          onClick={() => openCourse(course)}
          className="flex items-center gap-2 text-[10px] font-bold text-emerald-300 hover:text-white"
        >
          Study now <Icon name="arrow" size={13} />
        </button>
      )
    }

    if (course.courseKey) {
      return (
        <button
          type="button"
          disabled={checkoutLoading !== null}
          onClick={() => void purchaseCourse(course.courseKey as 'beginner' | 'advanced')}
          className="flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-[10px] font-bold text-white hover:bg-purple-500 disabled:opacity-50"
        >
          {checkoutLoading === course.courseKey ? 'Redirecting...' : 'Purchase course'}
          <Icon name="arrow" size={13} />
        </button>
      )
    }

    return <span className="text-[10px] text-[#91869C]">Access not configured</span>
  }

  const renderCourseGrid = () => {
    if (coursesLoading) {
      return (
        <div className="py-16 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-purple-400/20 border-t-purple-400" />
          <p className="mt-4 text-sm text-[#91869C]">
            Loading HighLevel courses...
          </p>
        </div>
      )
    }

    if (coursesError) {
      return (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <p className="text-sm text-red-300">{coursesError}</p>
          <p className="mt-2 text-xs leading-5 text-[#91869C]">
            Your Beginner and Advanced course links are configured in this
            dashboard, but course details and images require the courses API
            to respond successfully.
          </p>
          <button
            onClick={() => void loadCourses()}
            className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-xs font-bold hover:bg-purple-500"
          >
            Try again
          </button>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {courseCards.slice(0, 2).map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-white/[0.08] p-4"
              >
                <h3 className="font-bold">{course.title}</h3>
                <p className="mt-2 text-xs text-[#91869C]">
                  {course.level} membership
                </p>
                <div className="mt-4">{renderCourseAction(course)}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (filteredCourses.length === 0) {
      return (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-10 text-center">
          <Icon name="book" size={28} />
          <h3 className="mt-4 font-bold">No matching courses</h3>
          <p className="mt-2 text-xs text-[#91869C]">
            Try a different search term.
          </p>
        </div>
      )
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course, index) => (
          <article
            key={course.id}
            className="group overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.045] transition hover:-translate-y-1 hover:border-purple-500/30"
          >
            <div className="relative h-[165px] overflow-hidden">
              <img
                src={course.image}
                alt=""
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = FALLBACK_IMAGE
                }}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100718] via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-md bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-purple-200">
                {course.level === 'Other' ? 'HighLevel Course' : `${course.level} Membership`}
              </span>
              <div className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full bg-white text-purple-700 shadow-xl">
                <Icon name="play" size={15} />
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-sm font-bold text-white">
                {course.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-[11px] leading-5 text-[#91869C]">
                {course.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <span className="text-[10px] text-[#81778A]">
                  {course.level === 'Other' ? `Course ${index + 1}` : course.level}
                </span>
                {renderCourseAction(course)}
              </div>
            </div>
          </article>
        ))}
      </div>
    )
  }

  const renderShop = () => {
    const filteredProducts = storeProducts.filter((product) => {
      const query = storeSearch.trim().toLowerCase()
      return (
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.description || '').toLowerCase().includes(query)
      )
    })

    const plainText = (value?: string | null) =>
      (value || 'Digital resource from PacketPros Academy.')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim()

    return (
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[2px] text-purple-400">PacketPros Store</span>
        <h1 className="mt-2 text-[32px] font-black">Digital Shop</h1>
        <p className="mt-3 max-w-2xl text-xs leading-6 text-[#81778A]">
          Practical resources to support your networking career, interview preparation, and professional development.
        </p>
        <p className="mt-2 max-w-2xl text-[10px] leading-5 text-[#81778A]">
          Please check out with the same email as your PacketPros account ({profileEmail || 'your account email'}) so your purchase is linked automatically.
        </p>

        <div className="mt-7 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3">
          <Icon name="search" size={17} />
          <input
            value={storeSearch}
            onChange={(event) => setStoreSearch(event.target.value)}
            placeholder="Search digital products..."
            className="w-full bg-transparent text-xs outline-none placeholder:text-[#62586C]"
          />
          {storeSearch && (
            <button onClick={() => setStoreSearch('')} className="text-xs text-purple-300">Clear</button>
          )}
        </div>

        {storeError && (
          <div role="alert" className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-300">
            {storeError}
            <button onClick={() => void loadStoreProducts()} className="ml-3 font-bold text-white underline">Retry</button>
          </div>
        )}

        {storePurchasesError && (
          <div role="alert" className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-200">
            {storePurchasesError} <button type="button" className="ml-2 underline" onClick={() => void loadStorePurchases(auth.currentUser)}>Retry purchase check</button>
          </div>
        )}
        {storeLoading ? (
          <div className="py-16 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-purple-400/20 border-t-purple-400" />
            <p className="mt-4 text-sm text-[#91869C]">Loading digital products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="mt-7 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-10 text-center">
            <Icon name="book" size={28} />
            <h3 className="mt-4 font-bold">{storeProducts.length ? 'No matching products' : 'The shop is being prepared'}</h3>
            <p className="mt-2 text-xs text-[#91869C]">
              {storeProducts.length ? 'Try another search term.' : 'Digital products will appear here when the store API is connected.'}
            </p>
            {!storeProducts.length && (
              <button onClick={() => void loadStoreProducts()} className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-xs font-bold hover:bg-purple-500">Refresh shop</button>
            )}
          </div>
        ) : (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.045] transition hover:-translate-y-1 hover:border-purple-500/30">
                <div className="relative h-[190px] overflow-hidden bg-[#160D20]">
                  <img
                    src={product.image || FALLBACK_IMAGE}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = FALLBACK_IMAGE
                    }}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100718]/80 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-md bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-purple-200">Digital Product</span>
                </div>
                <div className="p-5">
                  <h2 className="text-sm font-bold text-white">{product.name}</h2>
                  <p className="mt-2 min-h-[60px] text-[11px] leading-5 text-[#91869C]">{plainText(product.description)}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <span className="text-sm font-black text-white">{formatProductPrice(product)}</span>
                    <button
                      type="button"
                      disabled={storeCheckoutLoading !== null || storePurchasesLoading || Boolean(storePurchasesError) || purchasedProductIds.includes(product.id) || (product.canPurchase ?? product.paymentLinkAvailable) === false}
                      onClick={() => void purchaseStoreProduct(product.id)}
                      className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-[10px] font-bold text-white hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {purchasedProductIds.includes(product.id) ? 'Purchased' : storePurchasesLoading ? 'Checking...' : storePurchasesError ? 'Unavailable' : storeCheckoutLoading === product.id ? 'Redirecting...' : (product.canPurchase ?? product.paymentLinkAvailable) === false ? 'Checkout unavailable' : 'Buy now'}
                      {purchasedProductIds.includes(product.id) ? <Icon name="check" size={13} /> : (product.canPurchase ?? product.paymentLinkAvailable) !== false && <Icon name="arrow" size={13} />}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderDashboard = () => (
    <>
      <section className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#10071C]">
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url('${FALLBACK_IMAGE}')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10071C] via-[#160A25]/95 to-[#35105B]/50" />
        <div className="relative z-10 p-7 sm:p-10 lg:p-12">
          <span className="inline-flex rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[2px] text-purple-300">PacketPros Academy</span>
          <h1 className="mt-5 text-[32px] font-black leading-tight tracking-[-2px] sm:text-[44px] lg:text-[52px]">
            Welcome back,<br />
            <span className="bg-gradient-to-r from-purple-200 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">{profileName}.</span>
          </h1>
          <p className="mt-5 max-w-[550px] text-sm leading-7 text-[#C8BCD5]">
            Continue building your network engineering skills with structured training and practical career resources.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={APPLICATION_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-xl bg-purple-600 px-6 py-3.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-purple-500">
              Apply Now <Icon name="arrow" size={16} />
            </a>
            <button type="button" onClick={() => setActivePage('My Courses')} className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-white/10">
              View memberships <Icon name="book" size={16} />
            </button>
            <button type="button" onClick={() => setActivePage('Shop')} className="inline-flex items-center gap-3 rounded-xl border border-purple-400/30 bg-purple-500/10 px-6 py-3.5 text-xs font-bold text-purple-200 transition hover:bg-purple-500/20">
              Visit Shop <Icon name="arrow" size={16} />
            </button>
            <button type="button" onClick={() => setActivePage('Videos')} className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-white/10">
              Watch Videos <Icon name="play" size={16} />
            </button>
            {STUDENT_PORTAL_URL && (
              <a href={STUDENT_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-xl border border-purple-400/30 bg-purple-500/10 px-6 py-3.5 text-xs font-bold text-purple-200 transition hover:bg-purple-500/20">
                <Icon name="user" size={16} /> Student Login
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: 'Memberships', value: '2', icon: 'book' },
          { label: 'Beginner access', value: enrolledCourseKeys.includes('beginner') ? 'Active' : 'Not active', icon: 'check' },
          { label: 'Advanced access', value: enrolledCourseKeys.includes('advanced') ? 'Active' : 'Not active', icon: 'chart' },
          { label: 'Achievements', value: '—', icon: 'trophy' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-5">
            <div className="flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-purple-500/10 text-purple-300"><Icon name={stat.icon} size={17} /></div>
              <span className="text-[10px] text-[#766B83]">Account</span>
            </div>
            <div className="mt-5 text-xl font-black">{stat.value}</div>
            <div className="mt-1 text-[10px] text-[#91869C]">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-purple-400">Your learning path</span>
            <h2 className="mt-2 text-[23px] font-black">Memberships</h2>
            <p className="mt-2 text-xs text-[#81778A]">Your two Academy memberships, each shown once.</p>
          </div>
          <button onClick={() => setActivePage('My Courses')} className="hidden items-center gap-2 text-[11px] font-bold text-purple-300 hover:text-white sm:flex">View memberships <Icon name="arrow" size={14} /></button>
        </div>
        {accessMessage && <p role="status" className="mb-4 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-xs text-amber-200">{accessMessage}</p>}
        {renderCourseGrid()}
      </section>
    </>
  )

  const renderCourses = () => (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-[2px] text-purple-400">
        Learning Library
      </span>
      <h1 className="mt-2 text-[32px] font-black">My Courses</h1>
      <p className="mt-3 text-xs text-[#81778A]">
        Manage your Beginner and Advanced Academy memberships in one place.
      </p>
      <p className="mt-2 text-[10px] leading-5 text-[#81778A]">
        Please check out with the same email as your PacketPros account ({profileEmail || 'your account email'}). Your course access is linked to that email, so do not change it at checkout.
      </p>

      <div className="mt-7 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3">
        <Icon name="search" size={17} />
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search courses..."
          className="w-full bg-transparent text-xs outline-none placeholder:text-[#62586C]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-purple-300"
          >
            Clear
          </button>
        )}
      </div>

      {accessMessage && <p role="status" className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-xs text-amber-200">{accessMessage}</p>}
      <div className="mt-7">{renderCourseGrid()}</div>
    </div>
  )

  const renderProfile = () => (
    <div className="max-w-[850px]">
      <span className="text-[10px] font-bold uppercase tracking-[2px] text-purple-400">
        Account
      </span>
      <h1 className="mt-2 text-[32px] font-black">My Profile</h1>

      <div className="mt-9 overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.045]">
        <div
          className="h-[150px] bg-cover bg-center"
          style={{ backgroundImage: `url('${FALLBACK_IMAGE}')` }}
        >
          <div className="h-full w-full bg-purple-950/70" />
        </div>
        <div className="px-7 pb-8">
          <div className="-mt-12 grid h-24 w-24 place-items-center rounded-[24px] border-4 border-[#100A16] bg-gradient-to-br from-purple-500 to-fuchsia-700 text-3xl font-black shadow-2xl">
            {profileName.charAt(0).toUpperCase()}
          </div>
          <div className="mt-5">
            <label className="text-[10px] uppercase tracking-wider text-[#81778A]">
              Full Name
            </label>
            <input
              value={profileName}
              onChange={(event) => setProfileName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-xs outline-none focus:border-purple-500"
            />
          </div>
          <div className="mt-5">
            <label className="text-[10px] uppercase tracking-wider text-[#81778A]">
              Email
            </label>
            <input
              value={profileEmail}
              readOnly
              className="mt-2 w-full cursor-not-allowed rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-xs text-[#81778A] outline-none"
            />
          </div>
          <p className="mt-4 text-[10px] leading-5 text-[#81778A]">
            Profile name editing is local until a Firebase profile update
            service is connected.
          </p>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="max-w-[850px]">
      <span className="text-[10px] font-bold uppercase tracking-[2px] text-purple-400">
        Account
      </span>
      <h1 className="mt-2 text-[32px] font-black">Settings</h1>

      <div className="mt-9 rounded-[22px] border border-white/[0.08] bg-white/[0.045] p-7">
        <div className="flex items-center gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-purple-500/10 text-purple-300">
            <Icon name="lock" size={19} />
          </div>
          <div>
            <h2 className="text-[15px] font-bold">Change Password</h2>
            <p className="mt-1 text-[10px] text-[#81778A]">
              Update your account password.
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Current password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            className="rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-[11px] outline-none focus:border-purple-500"
          />
          <input
            type="password"
            autoComplete="new-password"
            placeholder="New password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-[11px] outline-none focus:border-purple-500"
          />
        </div>

        <input
          type="password"
          autoComplete="new-password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="mt-4 w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-[11px] outline-none focus:border-purple-500"
        />

        {passwordError && (
          <p role="alert" className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-[10px] leading-5 text-red-300">
            {passwordError}
          </p>
        )}
        {passwordMessage && (
          <p role="status" className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-[10px] leading-5 text-emerald-300">
            {passwordMessage}
          </p>
        )}

        <button
          onClick={() => void handleChangePassword()}
          disabled={passwordLoading}
          className="mt-5 rounded-xl bg-purple-600 px-5 py-3 text-[11px] font-bold transition hover:bg-purple-500 disabled:opacity-50"
        >
          {passwordLoading ? 'Updating Password...' : 'Update Password'}
        </button>
      </div>

      <div className="mt-5 rounded-[22px] border border-white/[0.08] bg-white/[0.045] p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-purple-500/10 text-purple-300">
              <Icon name="bell" size={19} />
            </div>
            <div>
              <h2 className="text-[15px] font-bold">Email Notifications</h2>
              <p className="mt-1 text-[10px] text-[#81778A]">
                Receive updates about courses and Academy news.
              </p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={notifications}
            aria-label="Toggle email notifications"
            onClick={() => setNotifications((value) => !value)}
            className={`h-6 w-11 shrink-0 rounded-full p-1 transition ${notifications ? 'bg-purple-600' : 'bg-white/10'}`}
          >
            <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${notifications ? 'translate-x-5' : ''}`} />
          </button>
        </div>
        <p className="mt-3 text-[10px] text-[#81778A]">
          This setting is local to this session and is not saved to a server.
        </p>
      </div>
    </div>
  )

  const renderProgress = () => (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-[2px] text-purple-400">
        Your Library
      </span>
      <h1 className="mt-2 text-[32px] font-black">Learning Overview</h1>
      <p className="mt-3 text-xs text-[#81778A]">
        Your enrolled courses are shown below. Completed lessons and
        percentages will appear after lesson-progress tracking is integrated.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-6">
          <Icon name="book" size={22} />
          <div className="mt-4 text-3xl font-black">{enrolledCourseKeys.length}</div>
          <p className="mt-1 text-xs text-[#91869C]">Active course enrollments</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-6">
          <Icon name="trophy" size={22} />
          <div className="mt-4 text-3xl font-black">—</div>
          <p className="mt-1 text-xs text-[#91869C]">Achievements not yet connected</p>
        </div>
      </div>
      <div className="mt-8">{renderCourseGrid()}</div>
    </div>
  )

  const navigation = [
    { name: 'Dashboard', icon: 'home' },
    { name: 'My Courses', icon: 'book' },
    { name: 'Shop', icon: 'book' },
    { name: 'Videos', icon: 'play' },
    { name: 'Progress', icon: 'chart' },
    { name: 'Profile', icon: 'user' },
    { name: 'Settings', icon: 'settings' },
  ]

  return (
    <div className="min-h-screen bg-[#0A0610] text-white">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/[0.07] bg-[#0A0610]/95 px-5 backdrop-blur-xl lg:hidden">
        <button
          aria-label="Open navigation"
          onClick={() => setSidebarOpen(true)}
          className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05]"
        >
          <Icon name="menu" size={18} />
        </button>
        <div className="font-black tracking-[-.5px]">
          <span className="text-purple-400">Packet</span>Pros
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 text-[11px] font-black">
          {profileName.charAt(0).toUpperCase()}
        </div>
      </header>

      <aside className={`fixed left-0 top-0 z-[60] h-screen w-[250px] border-r border-white/[0.07] bg-[#0D0814] transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col">
          <div className="flex h-[78px] items-center border-b border-white/[0.06] px-7">
            <Link to="/" className="text-[19px] font-black tracking-[-.8px]">
              Packet<span className="text-purple-400">Pros</span>
            </Link>
          </div>

          <div className="px-5 py-6">
            <div className="rounded-2xl border border-purple-500/10 bg-gradient-to-br from-purple-600/20 to-fuchsia-600/5 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 text-xs font-black">
                  {profileName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xs font-bold">{profileName}</div>
                  <div className="mt-0.5 text-[9px] text-purple-300">Academy Student</div>
                </div>
              </div>
            </div>
          </div>

          <nav className="space-y-1 px-3">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActivePage(item.name)
                  setSidebarOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${activePage === item.name ? 'border border-purple-500/10 bg-purple-600/15 text-purple-300' : 'text-[#81778A] hover:bg-white/[0.04] hover:text-white'}`}
              >
                <Icon name={item.icon} size={17} />
                <span className="text-[11px] font-semibold">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto p-5">
            <div className="rounded-2xl border border-purple-500/10 bg-gradient-to-br from-purple-600/20 to-fuchsia-600/10 p-4">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-purple-500/20 text-purple-300">
                <Icon name="trophy" size={15} />
              </div>
              <div className="mt-3 text-[11px] font-bold">Keep going.</div>
              <p className="mt-1 text-[9px] leading-4 text-[#84798E]">
                You're building skills that can change your career.
              </p>
            </div>
            <button
              onClick={() => void logout()}
              className="mt-4 flex items-center gap-3 px-3 text-[10px] text-[#756B80] hover:text-white"
            >
              ← Logout
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
        />
      )}

      <main className="min-h-screen lg:ml-[250px]">
        <header className="sticky top-0 z-40 hidden h-[78px] items-center justify-between border-b border-white/[0.06] bg-[#0A0610]/80 px-8 backdrop-blur-xl lg:flex xl:px-10">
          <div className="relative w-[280px]">
            <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#81778A]">
              <Icon name="search" size={15} />
            </div>
            <input
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value)
                if (event.target.value) setActivePage('My Courses')
              }}
              placeholder="Search courses..."
              className="w-full bg-transparent py-2 pl-7 text-[11px] outline-none placeholder:text-[#5F5668]"
            />
          </div>

          <div className="flex items-center gap-5">
            <button
              aria-label="Refresh HighLevel courses"
              onClick={() => void loadCourses()}
              className="text-[#81778A] transition hover:text-white"
            >
              <Icon name="clock" size={17} />
            </button>
            <div className="h-5 w-px bg-white/[0.08]" />
            <button onClick={() => setActivePage('Profile')} className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 text-[10px] font-black">
                {profileName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold">{profileName}</div>
                <div className="text-[8px] text-[#766B82]">{profileEmail || 'Student'}</div>
              </div>
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1350px] px-5 py-7 sm:px-7 lg:px-10 lg:py-9">
          {activePage === 'Dashboard' && renderDashboard()}
          {activePage === 'My Courses' && renderCourses()}
          {activePage === 'Shop' && renderShop()}
          {activePage === 'Videos' && <PacketProsVideos />}
          {activePage === 'Profile' && renderProfile()}
          {activePage === 'Settings' && renderSettings()}
          {activePage === 'Progress' && renderProgress()}
        </div>
      </main>
    </div>
  )
}

export default PacketPros