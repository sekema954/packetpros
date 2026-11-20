import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../pages/Home'

const WhyPacketPros: React.FC = () => {
  const navigate = useNavigate()

  const features = [
    {
      number: '01',
      title: 'Structured Roadmap',
      text: 'Stop jumping between random tutorials. Follow a clear learning path that takes you from networking fundamentals to job-ready skills.',
      icon: 'roadmap',
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    },
    {
      number: '02',
      title: 'Hands-On Labs',
      text: 'Build networks, configure devices, troubleshoot problems, and practice the same concepts you will encounter in real environments.',
      icon: 'lab',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
    },
    {
      number: '03',
      title: 'Career Focused',
      text: 'Go beyond technical knowledge with resume guidance, interview preparation, and practical career coaching.',
      icon: 'career',
      image:
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#F7F5FC] py-24">
      <div
        className="
          pointer-events-none
          absolute
          -left-[180px]
          -top-[180px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#7C3AED]/10
          blur-3xl
        "/>

      <div
        className="
          pointer-events-none
          absolute
          -bottom-[180px]
          -right-[180px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#8B5CF6]/10
          blur-3xl"/>

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="mx-auto max-w-[700px] text-center">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-[#DDD3F2]
              bg-white
              px-4
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[2px]
              text-[#7C3AED]
              shadow-sm">
            Why PacketPros
          </span>
          <h2
            className="
              mt-5
              text-[32px]
              font-extrabold
              leading-[1.1]
              tracking-[-1.2px]
              text-[#18122F]
              md:text-[42px]">
            More than a course.
            <span className="block text-[#7C3AED]">
              A path into networking.
            </span>
          </h2>
          <p
            className="
              mx-auto
              mt-5
              max-w-[610px]
              text-[14px]
              leading-7
              text-[#716A88]
              md:text-[15px]">
            Learn the skills, practice the technology, and build the
            confidence you need to start your networking career.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="
                group
                relative
                min-h-[440px]
                overflow-hidden
                rounded-[26px]
                border
                border-white/20
                shadow-[0_25px_60px_-30px_rgba(38,20,75,.45)]">
              <img
                src={item.image}
                alt=""
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-110"/>
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#100B24]
                  via-[#21133F]/75
                  to-[#32165E]/20"/>
              {/* =================================================
                  PURPLE HOVER OVERLAY
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  bg-[#7C3AED]/0
                  transition-all
                  duration-500
                  group-hover:bg-[#7C3AED]/15
                "
              />


              {/* =================================================
                  CARD NUMBER
              ================================================= */}

              <div
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/20
                  text-[10px]
                  font-bold
                  text-white
                  backdrop-blur-md
                "
              >
                {item.number}
              </div>


              {/* =================================================
                  CARD CONTENT
              ================================================= */}

              <div
                className="
                  relative
                  z-10
                  flex
                  h-full
                  flex-col
                  justify-end
                  p-7
                "
              >

                {/* ICON */}

                <div
                  className="
                    mb-6
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/20
                    bg-white/10
                    text-white
                    backdrop-blur-md
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:border-[#A78BFA]
                    group-hover:bg-[#7C3AED]
                    group-hover:shadow-[0_10px_25px_-8px_rgba(124,58,237,.8)]
                  "
                >
                  <Icon
                    type={item.icon}
                    size={22}
                  />
                </div>


                {/* TITLE */}

                <h3
                  className="
                    text-[22px]
                    font-bold
                    tracking-[-0.4px]
                    text-white
                  "
                >
                  {item.title}
                </h3>


                {/* DESCRIPTION */}

                <p
                  className="
                    mt-3
                    max-w-[340px]
                    text-[13px]
                    leading-6
                    text-white/70
                  "
                >
                  {item.text}
                </p>


                {/* LEARN MORE */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    text-[12px]
                    font-bold
                    text-[#C4B5FD]
                  "
                >

                  <a href='/signup'>
                    Explore this path
                  </a>

                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* =====================================================
            BOTTOM VALUE PROPOSITION
        ===================================================== */}

        <div
          className="
            mt-8
            flex
            flex-col
            items-center
            justify-between
            gap-5
            rounded-2xl
            border
            border-[#E2DCEE]
            bg-white
            px-6
            py-5
            shadow-[0_15px_40px_-30px_rgba(40,20,80,.35)]
            md:flex-row
            md:px-8
          "
        >

          {/* LEFT */}

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F0E7FF]
                text-[#7C3AED]
              "
            >
              <Icon
                type="career"
                size={17}
              />
            </div>

            <p
              className="
                text-[12.5px]
                font-medium
                text-[#554E72]
              "
            >
              Built for aspiring Network Engineers —
              not just certification seekers.
            </p>

          </div>


          {/* BUTTON */}

          <button
            type="button"
            onClick={() => navigate('/academy')}
            className="
              whitespace-nowrap
              rounded-lg
              bg-[#18122F]
              px-5
              py-2.5
              text-[12px]
              font-bold
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#7C3AED]
              hover:shadow-[0_10px_25px_-10px_rgba(124,58,237,.7)]
            "
          >
            Explore the Academy →
          </button>

        </div>

      </div>

    </section>
  )
}
export default WhyPacketPros