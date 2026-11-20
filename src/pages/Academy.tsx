import { Link } from 'react-router-dom'
const phases = [
{
    number: '01',
    title: 'Build Your Foundation',
    subtitle: 'Networking Fundamentals',
    description:
    'Build a strong understanding of networking concepts before moving into advanced technologies. Learn how networks communicate and why they are designed the way they are.',
    items: [
    'OSI & TCP/IP Models',
    'IPv4 & IPv6',
    'Subnetting',
    'Ethernet & Switching',
    'Routing Fundamentals',
    'Network Protocols',
    ],
},
{
    number: '02',
    title: 'Master Network Engineering',
    subtitle: 'Core Technical Skills',
    description:
    'Move beyond theory and learn the technologies network engineers work with every day. Develop the skills needed to configure and manage real networks.',
    items: [
    'VLANs & Trunking',
    'STP',
    'Routing Protocols',
    'OSPF',
    'DHCP & DNS',
    'NAT & ACLs',
    ],
},
{
    number: '03',
    title: 'Think Like an Engineer',
    subtitle: 'Troubleshooting & Labs',
    description:
    'Develop the ability to diagnose problems instead of simply memorizing commands. Work through realistic networking scenarios and troubleshoot issues step-by-step.',
    items: [
    'Packet Tracer Labs',
    'Network Troubleshooting',
    'CLI Configuration',
    'Packet Analysis',
    'Failure Scenarios',
    'Real-World Simulations',
    ],
},
{
    number: '04',
    title: 'Prepare for the Career',
    subtitle: 'Career Readiness',
    description:
    'Turn your technical knowledge into a career strategy. Learn how to present yourself as a network engineer and prepare for technical interviews.',
    items: [
    'Technical Resume',
    'LinkedIn Optimization',
    'Job Search Strategy',
    'Technical Interviews',
    'Behavioral Interviews',
    'Networking Your Way In',
    ],
},
{
    number: '05',
    title: 'Launch Your Career',
    subtitle: 'From Student to Candidate',
    description:
    'Put everything together and confidently pursue Network Engineer opportunities with the knowledge, projects, and career preparation to compete.',
    items: [
    'Portfolio Projects',
    'Interview Practice',
    'Application Strategy',
    'Job Positioning',
    'Career Coaching',
    'Community Support',
    ],
},
]
const included = [
{
    icon: '◈',
    title: 'Structured Curriculum',
    text: 'Follow a clear roadmap instead of jumping between random networking tutorials.',
},
{
    icon: '⌘',
    title: 'Hands-On Labs',
    text: 'Practice networking concepts through configuration, troubleshooting, and simulation.',
},
{
    icon: '▣',
    title: 'Real-World Scenarios',
    text: 'Learn how networking concepts apply to actual enterprise environments.',
},
{
    icon: '◎',
    title: 'Interview Preparation',
    text: 'Prepare for the technical and behavioral questions you will encounter during interviews.',
},
{
    icon: '↗',
    title: 'Career Guidance',
    text: 'Get practical guidance on resumes, applications, positioning, and career development.',
},
{
    icon: '♧',
    title: 'Student Community',
    text: 'Learn alongside other aspiring IT professionals and build your professional network.',
},
]
const faqs = [
{
    question: 'Is PacketPros Academy beginner friendly?',
    answer:
    'Yes. The program is designed to take you from networking fundamentals through practical network engineering skills. You do not need to already be a Network Engineer to get started.',
},
{
    question: 'Do I need networking experience?',
    answer:
    'No. The curriculum starts with the fundamentals and progressively builds toward more advanced networking concepts and real-world troubleshooting.',
},
{
    question: 'Will I get hands-on practice?',
    answer:
    'Yes. Hands-on learning is a major part of PacketPros Academy. You will work through networking labs, configurations, troubleshooting scenarios, and practical exercises.',
},
{
    question: 'Is this a certification course?',
    answer:
    'PacketPros Academy focuses on developing practical Network Engineering skills and career readiness. It can complement certification preparation, but the program itself is focused on becoming job-ready.',
},
{
    question: 'How long do I have access to the program?',
    answer:
    'Your enrollment provides access to the PacketPros learning experience. You can progress through the curriculum at your own pace.',
},
{
    question: 'Will PacketPros help me get a job?',
    answer:
    'PacketPros is designed to improve your technical skills, career positioning, resume, interview preparation, and job-search strategy. While no program can guarantee employment, the goal is to make you a stronger candidate.',
},
]
export const Academy = () => {
return (
    <div className="bg-[#09060D] text-white overflow-hidden">
    <section className="relative min-h-[760px] flex items-center overflow-hidden">
        <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=90')",
        }}/>
        <div className="absolute inset-0 bg-[#07040B]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09040F] via-[#10071A]/85 to-[#09040F]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09060D] via-transparent to-[#09060D]/40" />
        <div className="absolute -top-40 left-[15%] w-[650px] h-[650px] rounded-full bg-[#7C3AED]/20 blur-[170px]" />
        <div className="absolute bottom-[-250px] right-[5%] w-[600px] h-[600px] rounded-full bg-[#A855F7]/15 blur-[160px]" />
        <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',}}/>
        <div className="relative z-10 w-full max-w-[1250px] mx-auto px-6 lg:px-10 pt-28 pb-28">
        <div className="max-w-[900px]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-xl text-[#D8B4FE] text-[11px] font-bold tracking-[1.7px] uppercase shadow-[0_10px_40px_rgba(0,0,0,.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC] shadow-[0_0_14px_#C084FC]" />
            PacketPros Academy
            </div>
            <h1 className="mt-7 text-[46px] sm:text-[62px] lg:text-[78px] leading-[.96] tracking-[-4px] font-black">
            Stop learning
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D8B4FE] to-[#9333EA]">
                networking randomly.
            </span>
            </h1>
            <p className="mt-8 max-w-[700px] text-[16px] sm:text-[18px] leading-8 text-[#C8BDD4]">
            Follow a structured path from networking fundamentals to
            hands-on engineering skills and career preparation — all
            in one place.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
            <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#6D28D9] text-white text-[14px] font-bold shadow-[0_18px_45px_-12px_rgba(124,58,237,.9)] hover:-translate-y-1 hover:shadow-[0_25px_55px_-12px_rgba(124,58,237,1)] transition-all">
                Start Your Journey →
            </Link>
            <a
                href="#phases"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/20 bg-white/[0.07] backdrop-blur-xl text-white text-[14px] font-semibold hover:bg-white/[0.12] hover:border-white/30 transition-all">
                Explore the Program
            </a>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-10 text-[11px] text-[#B7A9C4]">
            <span>✓ Beginner Friendly</span>
            <span>✓ Hands-On Labs</span>
            <span>✓ Career Focused</span>
            <span>✓ Learn at Your Own Pace</span>
            </div>
        </div>
        {/* hero bottom stats */}
        <div className="mt-20 grid sm:grid-cols-3 max-w-[850px] rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden">
            <div className="px-6 py-5 border-b sm:border-b-0 sm:border-r border-white/10">
            <div className="text-[24px] font-black text-white">05</div>
            <div className="mt-1 text-[10px] uppercase tracking-[1.5px] text-[#9F92AB]">
                Career Phases
            </div>
            </div>
            <div className="px-6 py-5 border-b sm:border-b-0 sm:border-r border-white/10">
            <div className="text-[24px] font-black text-white">100%</div>
            <div className="mt-1 text-[10px] uppercase tracking-[1.5px] text-[#9F92AB]">
                Practical Focus
            </div>
            </div>
            <div className="px-6 py-5">
            <div className="text-[24px] font-black text-white">1</div>
            <div className="mt-1 text-[10px] uppercase tracking-[1.5px] text-[#9F92AB]">
                Clear Roadmap
            </div>
            </div>
        </div>
        </div>
    </section>
    <section className="relative py-24 sm:py-28 overflow-hidden bg-[#F6F3F9] text-[#181526]">
        <div
        className="absolute right-0 top-0 w-[45%] h-full bg-cover bg-center opacity-[0.12]"
        style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80')",
        }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#F6F3F9] via-[#F6F3F9]/95 to-[#F6F3F9]/65" />
        <div className="relative z-10 max-w-[1150px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-14 items-center">
            <div>
            <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                Is PacketPros For You?
            </span>
            <h2 className="mt-4 text-[38px] sm:text-[48px] leading-[1.04] tracking-[-2px] font-black">
                Built for people who want to
                <span className="text-[#7C3AED]"> break into networking.</span>
            </h2>
            <p className="mt-6 text-[14px] leading-7 text-[#6B6475] max-w-[480px]">
                You don't need to know everything before you start.
                You need the right roadmap, the right practice, and the
                right guidance.
            </p>
            <div className="mt-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EDE3FA] flex items-center justify-center text-[#7C3AED] font-bold">
                →
                </div>
                <span className="text-[11px] font-semibold text-[#635B6D]">
                Start where you are. Build from there.
                </span>
            </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
            {[
                {
                title: 'Networking Beginners',
                text: "You want to learn networking but don't know where to start.",
                },
                {
                title: 'IT Professionals',
                text: 'You already work in IT and want to move into networking.',
                },
                {
                title: 'Career Changers',
                text: 'You want a structured path into a technical career.',
                },
                {
                title: 'Certification Students',
                text: 'You want practical experience alongside your studies.',
                },
            ].map((item) => (
                <div
                key={item.title}
                className="group p-6 rounded-[22px] bg-white/90 backdrop-blur-sm border border-[#E3DCEA] shadow-[0_20px_50px_-35px_rgba(45,20,75,.4)] hover:-translate-y-1 hover:border-[#CDBCE8] transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#F0E9FC] text-[#7C3AED] grid place-items-center font-bold group-hover:bg-[#7C3AED] group-hover:text-white transition-all">
                    ✓
                </div>
                <h3 className="mt-5 text-[15px] font-bold">
                    {item.title}
                </h3>
                <p className="mt-2 text-[11px] leading-5 text-[#777080]">
                    {item.text}
                </p>
                </div>
            ))}
            </div>
        </div>
        </div>
    </section>

    {/*phase section */}
    <section
        id="phases"
        className="relative py-24 sm:py-32 overflow-hidden">
        <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.25]"
        style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=85')",
        }}/>
        <div className="absolute inset-0 bg-[#08050D]/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08050D] via-[#12091B]/90 to-[#08050D]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7C3AED]/15 blur-[150px] rounded-full" />
        <div className="relative z-10 max-w-[1150px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-[720px] mx-auto">
            <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#C084FC]">
            The PacketPros Roadmap
            </span>
            <h2 className="mt-4 text-[38px] sm:text-[52px] leading-[1.02] tracking-[-2.5px] font-black">
            Five phases.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D8B4FE] to-[#9333EA]">
                One career direction.
            </span>
            </h2>
            <p className="mt-6 text-[14px] leading-7 text-[#AFA5B7]">
            Every phase builds on the one before it, taking you from
            networking fundamentals to becoming a confident technical
            candidate.
            </p>
        </div>
        <div className="relative mt-16">
            {/* vertical roadmap line */}
            <div className="absolute hidden lg:block left-[49px] top-8 bottom-8 w-px bg-gradient-to-b from-[#7C3AED]/20 via-[#A855F7]/50 to-[#7C3AED]/10" />
            <div className="space-y-5">
            {phases.map((phase) => (
                <div
                key={phase.number}
                className="group relative rounded-[25px] border border-white/10 bg-white/[0.045] backdrop-blur-xl p-7 sm:p-9 hover:bg-white/[0.07] hover:border-[#A855F7]/35 transition-all duration-300">
                <div className="grid lg:grid-cols-[100px_1fr_1fr] gap-7 lg:gap-10 items-start">
                    <div className="relative">
                    <div className="w-[70px] h-[70px] rounded-2xl bg-gradient-to-br from-[#26103B] to-[#12091D] border border-[#8B5CF6]/30 flex items-center justify-center">
                        <span className="text-[26px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#E9D5FF] to-[#9333EA]">
                        {phase.number}
                        </span>
                    </div>
                    </div>
                    <div>
                    <span className="text-[10px] uppercase tracking-[1.8px] font-bold text-[#C084FC]">
                        {phase.subtitle}
                    </span>
                    <h3 className="mt-2 text-[24px] font-extrabold">
                        {phase.title}
                    </h3>
                    <p className="mt-4 text-[12px] leading-6 text-[#AFA5B7] max-w-[500px]">
                        {phase.description}
                    </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {phase.items.map((item) => (
                        <div
                        key={item}
                        className="flex items-center gap-2 text-[11px] text-[#D5CEDC]">
                        <span className="w-5 h-5 shrink-0 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#C084FC] grid place-items-center text-[9px]">
                            ✓
                        </span>
                        {item}
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    </section>
    {/**whats included */}
    <section className="relative py-24 sm:py-28 bg-[#F6F3F9] text-[#181526] overflow-hidden">
        <div
        className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-cover bg-center opacity-[0.08]"
        style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80')",
        }}/>
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-[#C084FC]/10 blur-[130px]" />
        <div className="relative z-10 max-w-[1150px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-[720px] mx-auto">

            <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
            What's Included
            </span>
            <h2 className="mt-4 text-[38px] sm:text-[50px] tracking-[-2px] leading-[1.05] font-black">
            Everything you need to
            <span className="text-[#7C3AED]"> move forward.</span>
            </h2>
            <p className="mt-5 text-[14px] leading-7 text-[#6B6475]">
            PacketPros combines technical education, hands-on practice,
            and career preparation into one learning experience.
            </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {included.map((item) => (
            <div
                key={item.title}
                className="group relative overflow-hidden rounded-[23px] bg-white/90 backdrop-blur-sm border border-[#E3DCEA] p-7 shadow-[0_20px_60px_-45px_rgba(45,20,75,.4)] hover:-translate-y-1 hover:border-[#C5AFE2] hover:shadow-[0_25px_60px_-35px_rgba(76,38,110,.35)] transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#7C3AED]/5 blur-2xl group-hover:bg-[#7C3AED]/10 transition-all" />
                <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-[#F0E9FC] border border-[#E1D5F3] grid place-items-center text-[#7C3AED] font-bold group-hover:bg-[#7C3AED] group-hover:text-white transition-all">
                    {item.icon}
                </div>
                <h3 className="mt-5 text-[15px] font-bold">
                    {item.title}
                </h3>
                <p className="mt-2 text-[11px] leading-6 text-[#777080]">
                    {item.text}
                </p>
                </div>
            </div>
            ))}
        </div>
        </div>
    </section>
    

    {/**FQA */}
    <section className="relative py-24 sm:py-28 bg-[#FBFAFD] text-[#181526] overflow-hidden">
        <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.045]"
        style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=80')",
        }}/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#C084FC]/10 blur-[130px]" />
        <div className="relative z-10 max-w-[900px] mx-auto px-6">
        <div className="text-center">
            <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
            Frequently Asked Questions
            </span>
            <h2 className="mt-4 text-[38px] sm:text-[48px] tracking-[-2px] font-black">
            Questions?
            <span className="text-[#7C3AED]"> We've got answers.</span>
            </h2>
        </div>
        <div className="mt-12 space-y-3">
            {faqs.map((faq) => (
            <details
                key={faq.question}
                className="group rounded-2xl border border-[#E4DEE9] bg-white/85 backdrop-blur-sm overflow-hidden shadow-[0_10px_35px_-30px_rgba(45,20,75,.4)]">
                <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-5 text-[13px] font-bold">
                <span>
                    {faq.question}
                </span>
                <span className="w-7 h-7 shrink-0 rounded-full bg-[#F0E9FC] text-[#7C3AED] grid place-items-center group-open:rotate-45 transition-transform">
                    +
                </span>
                </summary>
                <div className="px-6 pb-6 text-[12px] leading-6 text-[#716A78] max-w-[760px]">
                {faq.answer}
                </div>
            </details>
            ))}
        </div>
        </div>
    </section>

    {/**pricing */}
    <section
        id="pricing"
        className="relative py-24 sm:py-32 overflow-hidden">
        <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=90')",
        }}/>

        <div className="absolute inset-0 bg-[#08040D]/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08040D] via-[#160A20]/90 to-[#08040D]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#7C3AED]/20 blur-[160px]" />
        <div className="relative z-10 max-w-[1050px] mx-auto px-6 lg:px-10">
        <div className="text-center">
            <span className="inline-flex px-3 py-1.5 rounded-full bg-[#7C3AED]/15 border border-[#A855F7]/30 text-[10px] uppercase tracking-[2px] font-bold text-[#C084FC]">
            Enrollment
            </span>
            <h2 className="mt-5 text-[38px] sm:text-[52px] tracking-[-2px] font-black">
            Invest in your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D8B4FE] to-[#9333EA]">
                career, not just a course.
            </span>
            </h2>
            <p className="mt-5 text-[14px] leading-7 text-[#AFA5B7] max-w-[620px] mx-auto">
            Get the roadmap, practical experience, and career support
            you need to pursue your Network Engineer career.
            </p>
        </div>
        <div className="relative max-w-[900px] mx-auto mt-14">
            <div className="absolute -inset-7 rounded-[38px] bg-[#7C3AED]/20 blur-3xl" />
            <div className="relative rounded-[30px] overflow-hidden bg-white text-[#181526] border border-white/20 shadow-[0_40px_120px_-45px_rgba(0,0,0,.9)]">
            <div className="h-1.5 bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#C084FC]" />
            <div className="p-8 sm:p-12">
                <div className="grid md:grid-cols-[1fr_310px] gap-12 items-center">
                <div>
                    <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                    PacketPros Academy
                    </span>
                    <h3 className="mt-3 text-[28px] sm:text-[34px] tracking-[-1.5px] font-black">
                    Network Engineer Career Program
                    </h3>
                    <p className="mt-5 text-[13px] leading-7 text-[#6F6877] max-w-[520px]">
                    A complete learning path built to take you from
                    networking fundamentals to practical engineering
                    skills and career readiness.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3 mt-7">
                    {[
                        'Structured curriculum',
                        'Hands-on networking labs',
                        'Career preparation',
                        'Interview preparation',
                        'Resume guidance',
                        'Student community',
                    ].map((item) => (
                        <div
                        key={item}
                        className="flex items-center gap-2 text-[11px] font-semibold text-[#5F586B]">
                        <span className="w-5 h-5 rounded-full bg-[#F0E9FC] text-[#7C3AED] grid place-items-center text-[9px]">
                            ✓
                        </span>
                        {item}
                        </div>
                    ))}
                    </div>
                </div>
                <div className="relative rounded-[24px] bg-gradient-to-br from-[#F7F3FB] to-[#EEE7F8] border border-[#DED4E9] p-7 shadow-[0_20px_50px_-35px_rgba(45,20,75,.5)]">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#A855F7]/10 blur-2xl" />
                    <div className="relative">
                    <span className="inline-flex px-3 py-1.5 rounded-full bg-white border border-[#E2D8EA] text-[9px] uppercase tracking-[1.8px] font-bold text-[#7C3AED]">
                        Full Program Access
                    </span>
                    {/** *
                    <div className="mt-6">
                        <span className="text-[48px] leading-none font-black tracking-[-2px]">
                        $XX
                        </span>
                        **
                        <span className="ml-2 text-[11px] text-[#81798A]">
                        one-time
                        </span>
                    </div>
                    **/}
                    <p className="mt-4 text-[10.5px] leading-5 text-[#746C7D]">
                        One enrollment. Full access to the PacketPros
                        learning experience.
                    </p>
                    <Link
                        to="/signup"
                        className="mt-6 w-full flex items-center justify-center py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white text-[13px] font-bold shadow-[0_15px_30px_-15px_rgba(124,58,237,.7)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,.85)] transition-all">
                        Enroll Now →
                    </Link>
                    <div className="flex justify-center mt-4 text-[9px] text-[#81798A]">
                        Start learning at your own pace
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>

    {/** *
    <section className="relative overflow-hidden py-28 sm:py-32 bg-[#10071A]">
        <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2200&q=85')",
        }}/>

        <div className="absolute inset-0 bg-gradient-to-b from-[#10071A]/90 via-[#180A25]/90 to-[#10071A]" />
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#7C3AED]/20 blur-[170px]" />
        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#C084FC]">
            Your Next Step
        </span>
        <h2 className="mt-5 text-[40px] sm:text-[58px] leading-[.98] tracking-[-3px] font-black">
            Your Network Engineer
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D8B4FE] to-[#9333EA]">
            career starts here.
            </span>
        </h2>
        <p className="mt-7 text-[14px] sm:text-[16px] leading-7 text-[#BDB1C9] max-w-[600px] mx-auto">
            Stop wondering what to learn next. Follow the roadmap,
            build the skills, and start preparing for the career you want.
        </p>
        <Link
            to="/signup"
            className="mt-10 inline-flex items-center justify-center px-9 py-4 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#6D28D9] text-white text-[14px] font-bold shadow-[0_20px_50px_-12px_rgba(124,58,237,.9)] hover:-translate-y-1 transition-all">
            Enroll in PacketPros →
        </Link>
        <p className="mt-5 text-[10px] text-[#82758F]">
            Build skills. Gain confidence. Pursue your career.
        </p>
        </div>
    </section>
    **/}
    </div>
)
}