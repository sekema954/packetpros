# PacketPros Academy

**Become job-ready for a Network Engineer career.**

PacketPros Academy is an education platform for people trying to break into networking as a career — whether that's a first IT job, a move up from help desk, or a career change into tech. Instead of piecing together scattered YouTube tutorials, PacketPros gives students one structured path: learn the fundamentals, build real hands-on skills, and come out the other side actually able to get hired.

This repo contains the site's front-end pages — the public marketing site, the student-facing product pages, and the internal admin view.

---

## What this site is for

Most people trying to learn networking hit the same wall: there's no shortage of content, but no clear order to it. You watch a video on subnetting, then a video on VLANs, then get lost trying to figure out what to learn next — and none of it tells you how to actually turn that knowledge into a job.

PacketPros solves that by being a **single guided program** instead of a content library. Everything on the site points toward one outcome: getting a student from "interested in networking" to "hired as a Network Engineer."

## Who it's for

- People studying for or holding a CCNA who want practical, real-world skills to go with it
- Career changers moving into IT/networking from another field
- Help desk / IT support staff trying to move up into a networking role
- Anyone who's tried "free YouTube content" and found it too scattered to actually follow

It is **not** built for working senior network engineers, or for people who just want a certificate with no hands-on component.

## The program

PacketPros is organized around five phases, taken in order:

1. **Foundation** — core networking concepts (OSI model, IP addressing, subnetting) taught to actually stick, not just memorize for a test.
2. **Engineering Skills** — hands-on labs in Packet Tracer: routing, switching, VLANs.
3. **Think Like an Engineer** — moving from "I followed the steps" to real troubleshooting instinct, using enterprise-style scenarios.
4. **Become Employable** — resume rebuild, portfolio projects, and mock interviews.
5. **Launch Your Career** — job search strategy and ongoing support until the student actually lands the role.

Each phase builds on the last. The goal isn't a certificate — it's a job.

## What's included in the program

- Structured course modules for every phase
- Guided Packet Tracer labs
- Resume templates built specifically for entry-level networking roles
- Interview preparation and mock interviews
- Enterprise-style troubleshooting scenarios
- Weekly live office hours
- A private student community

## Site structure

| Page | Purpose |
|---|---|
| **Home** | The front door — explains who PacketPros is for, what it does, and gets visitors into the program or the free training. |
| **Academy / Program page** | The full sales page — program details, the five phases, what's included, FAQs, and pricing. |
| **Login / Sign up** | Where existing and new students get into their account. |
| **Enroll** | Checkout — plan selection and payment. |
| **Admin dashboard** | Internal-only view for tracking students, enrollments, revenue, and program activity. Not part of the public site. |

## The bigger picture

The site is intentionally simple on purpose. It's built around one goal — get visitors into PacketPros Academy — rather than trying to sell multiple things (consulting, coaching, mentorship, etc.) at once. Every extra offer on a homepage is one more decision a visitor has to make before they commit to anything, and that hurts conversion. Additional services like coaching or consulting are meant to live *inside* the student ecosystem as upsells, not compete for attention on the public site.

The intended visitor journey looks like this:

```
Discovery (Google / YouTube)
        ↓
   Website visit
        ↓
  Free resource (PDF / guide)
        ↓
     Email list
        ↓
  Enroll in PacketPros
        ↓
  Private community (Discord)
        ↓
      Job offer
```

## Brand

PacketPros is built to feel like an education company — not a freelancer's portfolio or a generic "consulting" site. The visual identity leans on a network-topology motif (nodes and connections) as a nod to the subject matter, paired with a straightforward, structured layout that mirrors the program itself: clear steps, in order, with nothing extra in the way.

---

*This README describes the site and its purpose. For setup or technical details, see the relevant page files in this repo.*

<h1 align="center">PacketPros Academy</h1>

<p align="center">
  <b>Learn network engineering by doing it.</b><br>
  Courses, practical resources, free videos and a community, all under one account.
</p>

<hr>

<h2>What is PacketPros?</h2>

<p>
  PacketPros is a learning platform for people breaking into network engineering.
  Students sign in once and get their courses, purchases, videos and account
  settings in a single dashboard.
</p>

<h3>What it offers</h3>

<table>
  <thead>
    <tr>
      <th align="left" width="220">Feature</th>
      <th align="left">What you get</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Academy courses</b></td>
      <td>Beginner and Advanced network engineering courses. Buy once and the course unlocks on your account.</td>
    </tr>
    <tr>
      <td><b>Digital shop</b></td>
      <td>Resume Template, Command Vault, NE Interview Guide, Subnet Cheat Sheet and NE Roadmap.</td>
    </tr>
    <tr>
      <td><b>Free video library</b></td>
      <td>Lessons on subnetting, routing, switching, labs and troubleshooting, pulled live from the PacketPros YouTube channel.</td>
    </tr>
    <tr>
      <td><b>Community</b></td>
      <td>A Discord server for students and working IT professionals.</td>
    </tr>
    <tr>
      <td><b>Student dashboard</b></td>
      <td>Course access, purchases, videos and account settings in one signed-in place.</td>
    </tr>
  </tbody>
</table>

<hr>

<h2>Built with</h2>

<p>
  The stack is organised like a network: each layer talks to the one next to it,
  and the server checks every request before anything reaches the data.
</p>

<table>
  <thead>
    <tr>
      <th align="left" width="200">Layer</th>
      <th align="left">Tools</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Interface</b><br><sub>What the student sees</sub></td>
      <td>
        <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
        <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
        <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
        <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
        <img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
      </td>
    </tr>
    <tr>
      <td><b>Server</b><br><sub>Checks every request</sub></td>
      <td>
        <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
        <img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
        <img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
        <img alt="Nodemailer" src="https://img.shields.io/badge/Nodemailer-22B573?style=for-the-badge">
      </td>
    </tr>
    <tr>
      <td><b>Data and identity</b><br><sub>Who owns what</sub></td>
      <td>
        <img alt="Firebase Authentication" src="https://img.shields.io/badge/Firebase_Auth-DD2C00?style=for-the-badge&logo=firebase&logoColor=white">
        <img alt="Cloud Firestore" src="https://img.shields.io/badge/Cloud_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
        <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
      </td>
    </tr>
    <tr>
      <td><b>Outside services</b><br><sub>Payments, content, mail</sub></td>
      <td>
        <img alt="GoHighLevel" src="https://img.shields.io/badge/GoHighLevel-FF6A00?style=for-the-badge">
        <img alt="YouTube Data API" src="https://img.shields.io/badge/YouTube_Data_API-FF0000?style=for-the-badge&logo=youtube&logoColor=white">
        <img alt="Gmail SMTP" src="https://img.shields.io/badge/Gmail_SMTP-EA4335?style=for-the-badge&logo=gmail&logoColor=white">
      </td>
    </tr>
    <tr>
      <td><b>Development</b><br><sub>Local testing</sub></td>
      <td>
        <img alt="ngrok" src="https://img.shields.io/badge/ngrok-1F1E37?style=for-the-badge&logo=ngrok&logoColor=white">
      </td>
    </tr>
  </tbody>
</table>

<h3>How a purchase unlocks a course</h3>

<ol>
  <li>The student clicks <b>Purchase course</b> and the server creates a checkout with their account email prefilled.</li>
  <li>The student pays on the GoHighLevel payment link.</li>
  <li>GoHighLevel sends a webhook to the server.</li>
  <li>The server checks the payment with GoHighLevel: status, amount, source and refunds.</li>
  <li>The server saves the enrollment in Firestore.</li>
  <li>The dashboard button changes to <b>Study now</b>.</li>
</ol>

<hr>

<p align="center">
  <sub>PacketPros Academy</sub>
</p>