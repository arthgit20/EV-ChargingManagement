import { useEffect, useState } from "react";

function App() {
  const [page, setPage] = useState("home");

  const [battery, setBattery] = useState(20);
  const [target, setTarget] = useState(80);
  const [chargingType, setChargingType] = useState("Fast DC");
  const [liveBattery, setLiveBattery] = useState(56);
  const [chargingComplete, setChargingComplete] = useState(false);

  useEffect(() => {
    if (page !== "live") return;

    const timer = setInterval(() => {
      setLiveBattery((current) => {
        if (current >= Number(target)) {
          clearInterval(timer);
          setChargingComplete(true);
          return current;
        }

        return current + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [page, target]);

  /* =========================
     LANDING PAGE
  ========================= */

  if (page === "home") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        <nav className="flex items-center justify-between border-b border-white/10 px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-xl">
              ⚡
            </div>

            <div>
              <h1 className="font-bold">EV CHARGE AI</h1>
              <p className="text-xs text-slate-400">
                Smart Charging Management
              </p>
            </div>
          </div>

          <button
            onClick={() => setPage("vehicle")}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            Get Started
          </button>

          <button
  onClick={() => setPage("dashboard")}
  className="rounded-lg border border-emerald-400/30 px-4 py-2 text-sm text-emerald-400 hover:bg-emerald-400/10"
>
  Dashboard
</button>
        </nav>

        <main className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6 py-12">
          <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">

            <div>
              <div className="mb-5 inline-flex rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-400">
                ⚡ AI Powered EV Charging
              </div>

              <h2 className="text-5xl font-bold leading-tight">
                Smart Charging.
                <br />
                <span className="text-emerald-400">
                  Smarter Future.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                Find the best EV charging station using AI-powered
                recommendations based on availability, queue, distance
                and station load.
              </p>

              <button
                onClick={() => setPage("vehicle")}
                className="mt-8 rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Find a Charger →
              </button>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl">⚡</p>
                  <p className="mt-2 text-sm font-semibold">
                    Fast
                  </p>
                  <p className="text-xs text-slate-500">
                    Charging
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl">🤖</p>
                  <p className="mt-2 text-sm font-semibold">
                    AI Powered
                  </p>
                  <p className="text-xs text-slate-500">
                    Decisions
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl">🌱</p>
                  <p className="mt-2 text-sm font-semibold">
                    Efficient
                  </p>
                  <p className="text-xs text-slate-500">
                    Energy
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-10">
              <div className="text-center">

                <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-emerald-400/10">
                  <div className="text-8xl">
                    🚗
                  </div>
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  Intelligent Charging
                </h3>

                <p className="mt-3 text-slate-400">
                  Let AI choose the optimal charging station
                  for your journey.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-xl font-bold text-emerald-400">
                      95%
                    </p>
                    <p className="text-xs text-slate-500">
                      Availability
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-xl font-bold text-cyan-400">
                      7m
                    </p>
                    <p className="text-xs text-slate-500">
                      Avg Wait
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-xl font-bold text-yellow-400">
                      62%
                    </p>
                    <p className="text-xs text-slate-500">
                      Grid Load
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    );
  }


  /* =========================
     VEHICLE DETAILS
  ========================= */

  if (page === "vehicle") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        <nav className="flex items-center justify-between border-b border-white/10 px-8 py-5">

          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
              ⚡
            </div>

            <div className="text-left">
              <h1 className="font-bold">
                EV CHARGE AI
              </h1>
              <p className="text-xs text-slate-400">
                Smart Charging Management
              </p>
            </div>
          </button>

          <button
            onClick={() => setPage("home")}
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Back
          </button>

        </nav>

        <main className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6 py-12">

          <div className="w-full max-w-2xl">

            <div className="mb-8 text-center">

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10 text-4xl">
                🚗
              </div>

              <h2 className="text-4xl font-bold">
                Find Your Charger
              </h2>

              <p className="mt-3 text-slate-400">
                Tell us about your current charging requirement.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

              <div className="mb-6">
                <label className="mb-2 block text-sm text-slate-300">
                  Current Battery (%)
                </label>

                <input
                  type="number"
                  min="1"
                  max="100"
                  value={battery}
                  onChange={(e) => setBattery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm text-slate-300">
                  Required Battery (%)
                </label>

                <input
                  type="number"
                  min="1"
                  max="100"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm text-slate-300">
                  Current Location
                </label>

                <button className="w-full rounded-xl border border-dashed border-white/20 bg-slate-900 px-4 py-4 text-left text-slate-400 hover:border-emerald-400 hover:text-white">
                  📍 Use My Location
                </button>
              </div>

              <div className="mb-8">
                <label className="mb-2 block text-sm text-slate-300">
                  Charging Preference
                </label>

                <select
                  value={chargingType}
                  onChange={(e) => setChargingType(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400"
                >
                  <option>Fast DC</option>
                  <option>Normal AC</option>
                  <option>Any Available</option>
                </select>
              </div>

              <button
                onClick={() => setPage("recommendation")}
                className="w-full rounded-xl bg-emerald-500 py-4 font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Find Best Station →
              </button>

            </div>

            <p className="mt-5 text-center text-xs text-slate-500">
              AI considers availability, queue, distance and
              charging demand.
            </p>

          </div>
        </main>
      </div>
    );
  }


  /* =========================
     AI RECOMMENDATION
  ========================= */

  if (page === "recommendation") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        <nav className="flex items-center justify-between border-b border-white/10 px-8 py-5">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
              ⚡
            </div>

            <div>
              <h1 className="font-bold">
                EV CHARGE AI
              </h1>
              <p className="text-xs text-slate-400">
                Smart Charging Management
              </p>
            </div>
          </div>

          <button
            onClick={() => setPage("vehicle")}
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Modify Details
          </button>

        </nav>

        <main className="mx-auto max-w-6xl px-6 py-12">

          <div className="mb-10">
            <div className="mb-3 flex items-center gap-2 text-sm text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              AI Analysis Complete
            </div>

            <h2 className="text-4xl font-bold">
              Your Best Charging Option
            </h2>

            <p className="mt-2 text-slate-400">
              We analysed station availability, queue length,
              distance and current load.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/5 p-8 lg:col-span-2">

              <div className="flex items-start justify-between">

                <div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    ⭐ AI RECOMMENDED
                  </span>

                  <h3 className="mt-5 text-3xl font-bold">
                    Station B
                  </h3>

                  <p className="mt-1 text-slate-400">
                    SRM Main Charging Hub
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-400/10 px-5 py-3 text-center">
                  <p className="text-2xl font-bold text-emerald-400">
                    92%
                  </p>

                  <p className="text-xs text-slate-400">
                    AI Match
                  </p>
                </div>

              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs text-slate-500">
                    Distance
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    3.5 km
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs text-slate-500">
                    Wait Time
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    7 min
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs text-slate-500">
                    Chargers
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    2 available
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs text-slate-500">
                    Station Load
                  </p>
                  <p className="mt-1 text-lg font-semibold text-emerald-400">
                    62%
                  </p>
                </div>

              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-5">

                <div className="flex gap-3">
                  <div className="text-xl">
                    💡
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Why we recommend Station B
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Station A is closer but currently has a
                      long queue and high grid load. Station B
                      offers a better balance between distance,
                      waiting time and charger availability.
                    </p>
                  </div>
                </div>

              </div>

              <button
                onClick={() => setPage("map")}
                className="mt-6 w-full rounded-xl bg-emerald-500 py-4 font-semibold text-slate-950 hover:bg-emerald-400"
              >
                View Station & Reserve →
              </button>

            </div>


            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

              <h3 className="text-lg font-semibold">
                AI Decision Factors
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                How the recommendation was calculated
              </p>

              <div className="mt-8 space-y-6">

                <ScoreBar
                  name="Availability"
                  value="95%"
                  width="95%"
                  color="bg-emerald-400"
                />

                <ScoreBar
                  name="Queue"
                  value="88%"
                  width="88%"
                  color="bg-cyan-400"
                />

                <ScoreBar
                  name="Distance"
                  value="78%"
                  width="78%"
                  color="bg-yellow-400"
                />

                <ScoreBar
                  name="Grid Load"
                  value="84%"
                  width="84%"
                  color="bg-purple-400"
                />

              </div>

              <div className="mt-10 rounded-2xl bg-white/5 p-5 text-center">

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Overall Recommendation
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-400">
                  92 / 100
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Excellent match
                </p>

              </div>

            </div>

          </div>

          <div className="mt-8">

            <h3 className="mb-4 text-xl font-semibold">
              Alternative Stations
            </h3>

            <div className="grid gap-4 md:grid-cols-2">

              <StationCard
                name="Station A"
                distance="2.0 km"
                score="71%"
                queue="8"
                load="91%"
                wait="35 min"
              />

              <StationCard
                name="Station C"
                distance="5.0 km"
                score="87%"
                queue="1"
                load="45%"
                wait="3 min"
              />

            </div>

          </div>

        </main>
      </div>
    );
  }


  /* =========================
     MAP / NEARBY STATIONS
  ========================= */

  if (page === "map") {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <nav className="flex items-center justify-between border-b border-white/10 px-8 py-5">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-xl">
            ⚡
          </div>

          <div>
            <h1 className="font-bold">EV CHARGE AI</h1>
            <p className="text-xs text-slate-400">
              Smart Charging Management
            </p>
          </div>
        </div>

        <button
          onClick={() => setPage("recommendation")}
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Back to Recommendation
        </button>

      </nav>

      <main className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            3 stations available nearby
          </div>

          <h2 className="mt-3 text-4xl font-bold">
            Nearby Charging Stations
          </h2>

          <p className="mt-2 text-slate-400">
            Compare stations based on distance, availability,
            queue and current grid load.
          </p>
        </div>


        <div className="grid gap-6 lg:grid-cols-5">


          {/* ================= MAP ================= */}

          <div className="relative h-[600px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 lg:col-span-3">

            {/* Map background */}

            <div className="absolute inset-0 opacity-20">

              <div className="absolute left-[-10%] top-[25%] h-2 w-[120%] rotate-12 bg-slate-300"></div>

              <div className="absolute left-[-10%] top-[55%] h-2 w-[120%] -rotate-6 bg-slate-300"></div>

              <div className="absolute left-[30%] top-[-10%] h-[120%] w-2 rotate-12 bg-slate-300"></div>

              <div className="absolute left-[70%] top-[-10%] h-[120%] w-2 -rotate-12 bg-slate-300"></div>

              <div className="absolute left-[10%] top-[75%] h-2 w-[90%] rotate-3 bg-slate-300"></div>

            </div>


            {/* Map Header */}

            <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between">

              <div className="rounded-xl border border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur">

                <p className="text-sm font-semibold">
                  Charging Network
                </p>

                <p className="text-xs text-slate-500">
                  SRM KTR Area
                </p>

              </div>


              <div className="rounded-xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-400 backdrop-blur">
                🔍 Search
              </div>

            </div>


            {/* Station A */}

            <div className="absolute left-[18%] top-[30%] text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-red-300/20 bg-red-500 text-xl shadow-lg">
                ⚡
              </div>

              <div className="mt-2 rounded-lg bg-slate-950/90 px-3 py-1">
                <p className="text-xs font-semibold">
                  Station A
                </p>

                <p className="text-[10px] text-red-400">
                  High Load
                </p>
              </div>

            </div>


            {/* Station B */}

            <button
              onClick={() => setPage("station")}
              className="absolute left-[52%] top-[38%] text-center transition hover:scale-110"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-emerald-300/30 bg-emerald-500 text-2xl shadow-lg shadow-emerald-500/30">
                ⭐
              </div>

              <div className="mt-2 rounded-lg bg-emerald-500 px-3 py-1 text-slate-950">

                <p className="text-xs font-bold">
                  Station B
                </p>

                <p className="text-[10px]">
                  AI Recommended
                </p>

              </div>

            </button>


            {/* Station C */}

            <div className="absolute right-[15%] top-[62%] text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-emerald-300/20 bg-emerald-500 text-xl shadow-lg">
                ⚡
              </div>

              <div className="mt-2 rounded-lg bg-slate-950/90 px-3 py-1">

                <p className="text-xs font-semibold">
                  Station C
                </p>

                <p className="text-[10px] text-emerald-400">
                  Low Load
                </p>

              </div>

            </div>


            {/* User Location */}

            <div className="absolute bottom-[25%] left-[42%] text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-blue-300/30 bg-blue-500 text-xl shadow-lg">
                📍
              </div>

              <div className="mt-2 rounded-lg bg-slate-950/90 px-3 py-1">

                <p className="text-xs font-semibold">
                  You
                </p>

                <p className="text-[10px] text-slate-500">
                  Current Location
                </p>

              </div>

            </div>


            {/* Legend */}

            <div className="absolute bottom-5 left-5 rounded-xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur">

              <p className="mb-3 text-xs font-semibold text-slate-400">
                STATION STATUS
              </p>

              <div className="flex gap-4 text-xs">

                <span className="flex items-center gap-1">
                  🔴 High Load
                </span>

                <span className="flex items-center gap-1">
                  🟢 Available
                </span>

                <span className="flex items-center gap-1">
                  ⭐ Recommended
                </span>

              </div>

            </div>

          </div>


          {/* ================= STATION LIST ================= */}

          <div className="space-y-4 lg:col-span-2">

            <div className="mb-2 flex items-center justify-between">

              <h3 className="text-xl font-semibold">
                Available Stations
              </h3>

              <span className="text-xs text-slate-500">
                Updated just now
              </span>

            </div>


            {/* Station B */}

            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-5">

              <div className="flex items-start justify-between">

                <div>

                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold text-emerald-300">
                    ⭐ AI RECOMMENDED
                  </span>

                  <h3 className="mt-3 text-lg font-bold">
                    Station B
                  </h3>

                  <p className="text-sm text-slate-500">
                    SRM Main Charging Hub
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-lg font-bold text-emerald-400">
                    92%
                  </p>

                  <p className="text-[10px] text-slate-500">
                    AI Match
                  </p>

                </div>

              </div>


              <div className="mt-5 grid grid-cols-3 gap-2">

                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    Distance
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    3.5 km
                  </p>
                </div>


                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    Wait
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    7 min
                  </p>
                </div>


                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    Available
                  </p>

                  <p className="mt-1 text-sm font-semibold text-emerald-400">
                    2 / 6
                  </p>
                </div>

              </div>


              <div className="mt-4 flex items-center justify-between">

                <span className="text-xs text-slate-500">
                  Grid Load: <span className="text-emerald-400">62%</span>
                </span>

                <button
                  onClick={() => setPage("station")}
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  View Station →
                </button>

              </div>

            </div>


            {/* Station A */}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="text-lg font-semibold">
                    Station A
                  </h3>

                  <p className="text-sm text-slate-500">
                    Tech Park Charging Point
                  </p>

                </div>

                <span className="text-sm font-semibold text-red-400">
                  High Load
                </span>

              </div>


              <div className="mt-5 grid grid-cols-3 gap-2">

                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    Distance
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    2.0 km
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    Wait
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    35 min
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    Available
                  </p>

                  <p className="mt-1 text-sm font-semibold text-red-400">
                    0 / 6
                  </p>
                </div>

              </div>


              <div className="mt-4 flex items-center justify-between">

                <span className="text-xs text-slate-500">
                  Grid Load: <span className="text-red-400">91%</span>
                </span>

                <span className="text-xs text-red-400">
                  Long Queue
                </span>

              </div>

            </div>


            {/* Station C */}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="text-lg font-semibold">
                    Station C
                  </h3>

                  <p className="text-sm text-slate-500">
                    Potheri EV Hub
                  </p>

                </div>

                <span className="text-sm font-semibold text-emerald-400">
                  Low Load
                </span>

              </div>


              <div className="mt-5 grid grid-cols-3 gap-2">

                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    Distance
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    5.0 km
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    Wait
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    3 min
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    Available
                  </p>

                  <p className="mt-1 text-sm font-semibold text-emerald-400">
                    4 / 8
                  </p>
                </div>

              </div>


              <div className="mt-4 flex items-center justify-between">

                <span className="text-xs text-slate-500">
                  Grid Load: <span className="text-emerald-400">45%</span>
                </span>

                <button
                  onClick={() => setPage("station")}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs hover:bg-white/10"
                >
                  View Station →
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

  if (page === "station") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        {/* Navbar */}
        <nav className="flex items-center justify-between border-b border-white/10 px-8 py-5">

          <button
            onClick={() => setPage("map")}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-xl">
              ⚡
            </div>

            <div className="text-left">
              <h1 className="font-bold">EV CHARGE AI</h1>
              <p className="text-xs text-slate-400">
                Smart Charging Management
              </p>
            </div>
          </button>

          <button
            onClick={() => setPage("map")}
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Back to Stations
          </button>

        </nav>

        {/* Station Details */}
        <main className="mx-auto max-w-6xl px-6 py-12">

          {/* Header */}
          <div className="mb-8">

            <div className="mb-3 flex items-center gap-2 text-sm text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              AI Recommended Station
            </div>

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

              <div>
                <h2 className="text-4xl font-bold">
                  Station B
                </h2>

                <p className="mt-2 text-slate-400">
                  SRM Main Charging Hub
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-4 text-center">
                <p className="text-3xl font-bold text-emerald-400">
                  92%
                </p>
                <p className="text-xs text-slate-400">
                  AI Match
                </p>
              </div>

            </div>

          </div>

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-3">

            {/* Left - Station Information */}
            <div className="lg:col-span-2 space-y-6">

              {/* Overview */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                <h3 className="text-xl font-semibold">
                  Station Overview
                </h3>

                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">

                  <div className="rounded-2xl bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">
                      Distance
                    </p>
                    <p className="mt-2 text-lg font-semibold">
                      3.5 km
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">
                      Current Load
                    </p>
                    <p className="mt-2 text-lg font-semibold text-yellow-400">
                      62%
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">
                      Available
                    </p>
                    <p className="mt-2 text-lg font-semibold text-emerald-400">
                      2 / 6
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">
                      Wait Time
                    </p>
                    <p className="mt-2 text-lg font-semibold">
                      7 min
                    </p>
                  </div>

                </div>

              </div>

              {/* Available Chargers */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    Available Chargers
                  </h3>

                  <span className="text-sm text-emerald-400">
                    2 Available
                  </span>
                </div>

                <div className="mt-5 space-y-3">

                  {/* Charger 01 */}
                  <div className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 md:flex-row md:items-center md:justify-between">

                    <div>
                      <p className="font-semibold">
                        DC Charger #01
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Fast DC • 22 kW
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                        Available
                      </span>

                      <span className="text-sm text-slate-400">
                        ~25 min
                      </span>
                    </div>

                  </div>

                  {/* Charger 02 */}
                  <div className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 md:flex-row md:items-center md:justify-between">

                    <div>
                      <p className="font-semibold">
                        DC Charger #02
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Fast DC • 25 kW
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                        Available
                      </span>

                      <span className="text-sm text-slate-400">
                        ~22 min
                      </span>
                    </div>

                  </div>

                  {/* Charger 03 */}
                  <div className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 opacity-60 md:flex-row md:items-center md:justify-between">

                    <div>
                      <p className="font-semibold">
                        DC Charger #03
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Fast DC • 25 kW
                      </p>
                    </div>

                    <span className="rounded-full bg-red-400/10 px-3 py-1 text-xs text-red-400">
                      In Use
                    </span>

                  </div>

                  {/* Charger 04 */}
                  <div className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 opacity-60 md:flex-row md:items-center md:justify-between">

                    <div>
                      <p className="font-semibold">
                        DC Charger #04
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Fast DC • 22 kW
                      </p>
                    </div>

                    <span className="rounded-full bg-red-400/10 px-3 py-1 text-xs text-red-400">
                      In Use
                    </span>

                  </div>

                </div>

              </div>

              {/* AI Insight */}
              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6">

                <div className="flex gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-xl">
                    💡
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Why Station B?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      AI selected this station because it provides a strong
                      balance between distance, charger availability, queue
                      length and current grid load.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Right - Reservation */}
            <div className="h-fit rounded-3xl border border-emerald-400/20 bg-white/5 p-6">

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-semibold">
                  Reserve Charging
                </h3>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                  Available
                </span>

              </div>

              <div className="mt-6 space-y-4">

                <div className="rounded-2xl bg-slate-900 p-4">
                  <p className="text-xs text-slate-500">
                    Selected Charger
                  </p>

                  <p className="mt-2 font-semibold">
                    DC Charger #02
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Fast DC • 25 kW
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900 p-4">

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      Estimated Duration
                    </span>

                    <span className="font-semibold">
                      22 min
                    </span>
                  </div>

                </div>

                <div className="rounded-2xl bg-slate-900 p-4">

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      Estimated Cost
                    </span>

                    <span className="font-semibold text-emerald-400">
                      ₹148
                    </span>
                  </div>

                </div>

                <div className="rounded-2xl bg-slate-900 p-4">

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      Estimated Wait
                    </span>

                    <span className="font-semibold">
                      7 min
                    </span>
                  </div>

                </div>

              </div>

              <button
                onClick={() => setPage("reservation")}
                className="mt-6 w-full rounded-xl bg-emerald-500 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Reserve Charging Slot →
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                You can cancel your reservation before the charging session starts.
              </p>

            </div>

          </div>

        </main>

      </div>
    );
  }


  /* =========================
     STATION DETAILS
  ========================= */

  if (page === "station") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        <nav className="flex items-center justify-between border-b border-white/10 px-8 py-5">

          <button
            onClick={() => setPage("recommendation")}
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Back
          </button>

          <h1 className="font-bold">
            Station Details
          </h1>

          <span className="text-emerald-400">
            ● Live
          </span>

        </nav>

        <main className="mx-auto max-w-5xl px-6 py-10">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="flex flex-col justify-between gap-6 md:flex-row">

              <div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                  AI RECOMMENDED
                </span>

                <h2 className="mt-4 text-4xl font-bold">
                  Station B
                </h2>

                <p className="mt-2 text-slate-400">
                  📍 SRM Main Charging Hub
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-400/10 p-5 text-center">
                <p className="text-3xl font-bold text-emerald-400">
                  62%
                </p>
                <p className="text-sm text-slate-400">
                  Current Load
                </p>
              </div>

            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">

              <StatBox
                title="Distance"
                value="3.5 km"
              />

              <StatBox
                title="Available"
                value="2 / 6"
              />

              <StatBox
                title="Wait Time"
                value="7 min"
              />

              <StatBox
                title="Charger Type"
                value="Fast DC"
              />

            </div>

            <div className="mt-8">

              <h3 className="mb-4 text-xl font-semibold">
                Available Chargers
              </h3>

              <div className="space-y-3">

                <ChargerRow
                  name="DC Charger #01"
                  power="22 kW"
                  available
                />

                <ChargerRow
                  name="DC Charger #02"
                  power="25 kW"
                  available
                />

                <ChargerRow
                  name="DC Charger #03"
                  power="25 kW"
                  available={false}
                />

                <ChargerRow
                  name="DC Charger #04"
                  power="22 kW"
                  available={false}
                />

              </div>

            </div>

            <button
              onClick={() => setPage("reservation")}
              className="mt-8 w-full rounded-xl bg-emerald-500 py-4 font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Reserve Charging Slot →
            </button>

          </div>

        </main>
      </div>
    );
  }


  /* =========================
     RESERVATION
  ========================= */

  if (page === "reservation") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        <nav className="border-b border-white/10 px-8 py-5">
          <button
            onClick={() => setPage("station")}
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Back
          </button>
        </nav>

        <main className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6">

          <div className="w-full max-w-2xl">

            <div className="mb-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-3xl">
                ⚡
              </div>

              <h2 className="mt-5 text-3xl font-bold">
                Confirm Your Reservation
              </h2>

              <p className="mt-2 text-slate-400">
                Reserve your charging slot at Station B.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

              <div className="grid gap-4 md:grid-cols-2">

                <StatBox
                  title="Station"
                  value="Station B"
                />

                <StatBox
                  title="Charger"
                  value="DC Charger #02"
                />

                <StatBox
                  title="Estimated Start"
                  value="06:42 PM"
                />

                <StatBox
                  title="Estimated Duration"
                  value="28 min"
                />

                <StatBox
                  title="Estimated Cost"
                  value="₹148"
                />

                <StatBox
                  title="Queue Position"
                  value="#2"
                />

              </div>

              <button
                onClick={() => setPage("confirmed")}
                className="mt-8 w-full rounded-xl bg-emerald-500 py-4 font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Confirm Reservation ✓
              </button>

            </div>

          </div>

        </main>
      </div>
    );
  }


  /* =========================
     CONFIRMATION
  ========================= */

  if (page === "confirmed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">

        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-4xl">
            ✓
          </div>

          <h2 className="mt-6 text-3xl font-bold">
            Slot Reserved Successfully!
          </h2>

          <p className="mt-3 text-slate-400">
            Your EV charging reservation has been confirmed.
          </p>

          <div className="mt-8 rounded-2xl bg-white/5 p-5 text-left">

            <div className="flex justify-between border-b border-white/10 py-3">
              <span className="text-slate-400">
                Station
              </span>
              <span className="font-semibold">
                Station B
              </span>
            </div>

            <div className="flex justify-between border-b border-white/10 py-3">
              <span className="text-slate-400">
                Charger
              </span>
              <span className="font-semibold">
                DC Charger #02
              </span>
            </div>

            <div className="flex justify-between border-b border-white/10 py-3">
              <span className="text-slate-400">
                Queue Position
              </span>
              <span className="font-semibold">
                #2
              </span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-slate-400">
                Estimated Start
              </span>
              <span className="font-semibold">
                06:42 PM
              </span>
            </div>

          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">

            <button
              onClick={() => setPage("home")}
              className="rounded-xl border border-white/10 py-3 hover:bg-white/10"
            >
              Go Home
            </button>

            <button
              onClick={() => setPage("live")}
              className="rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Track Charging
            </button>

          </div>

        </div>
      </div>
    );
  }


  /* =========================
     LIVE CHARGING
  ========================= */

  if (page === "live") {
    const isComplete = liveBattery >= Number(target);
    
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-white/10 px-8 py-5">
        <button
          onClick={() => setPage("confirmed")}
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Back
        </button>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-12">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
            {isComplete ? "✅ Charging Complete" : "⚡ Charging in Progress"}
          </div>

          <h2 className="mt-2 text-4xl font-bold">
  {isComplete ? "Charging Target Reached" : "Your EV is charging"}
</h2>
            
          

          <p className="mt-2 text-slate-400">
  {isComplete
    ? "Target battery level reached • Station B • DC Charger #02"
    : "Station B • DC Charger #02"}
</p>
            
          
        </div>

        {/* Main Charging Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          {/* Battery */}
          <div className="text-center">

            <p className="text-sm text-slate-400">
              Battery Level
            </p>

            <p className="mt-4 text-7xl font-bold text-emerald-400">
  {liveBattery}%
</p>
              
            

            <div className="mx-auto mt-6 h-4 max-w-3xl overflow-hidden rounded-full bg-white/10">
              <div
                className="h-4 rounded-full bg-emerald-400 transition-all duration-1000"
                style={{ width: `${liveBattery}%` }}
              ></div>
            </div>

            <div className="mx-auto mt-3 flex max-w-3xl justify-between text-sm text-slate-500">
              <span>{battery}%</span>
              <span>Target: {target}%</span>
            </div>
            {isComplete && (
  <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">

    <div className="flex items-center justify-center gap-3">
      <div className="text-3xl">
        🎉
      </div>

      <div className="text-left">
        <h3 className="font-semibold text-emerald-400">
          Charging Completed Successfully
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Your EV has reached the requested {target}% battery level.
        </p>
      </div>
    </div>

  </div>
)}

          </div>

          {/* Charging Stats */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">

            <StatBox
              title="Current Power"
              value="42 kW"
            />

            <StatBox
              title="Energy Delivered"
              value="18.6 kWh"
            />

            <StatBox
              title="Time Remaining"
              value="17 min"
            />

          </div>

          {/* AI Optimization */}
          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-6">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-2xl">
                🧠
              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between gap-4">

                  <h3 className="text-lg font-semibold">
                    AI Charging Optimization
                  </h3>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
  {isComplete ? "COMPLETE" : "ACTIVE"}
</span>
                    
                  

                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
  {isComplete
    ? "AI stopped charging at the requested target to avoid unnecessary energy consumption."
    : "AI is continuously balancing charging speed, station availability and grid demand to provide efficient charging while avoiding unnecessary grid load."}
</p>

                {/* AI Factors */}
                <div className="mt-5 grid gap-3 md:grid-cols-3">

                  <div className="rounded-xl bg-slate-950/50 p-4">
                    <p className="text-xs text-slate-500">
                      Grid Load
                    </p>

                    <p className="mt-1 font-semibold text-emerald-400">
                      62% • Optimal
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950/50 p-4">
                    <p className="text-xs text-slate-500">
                      Charging Mode
                    </p>

                    <p className="mt-1 font-semibold">
                      Smart Fast
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950/50 p-4">
                    <p className="text-xs text-slate-500">
                      Target Battery
                    </p>

                    <p className="mt-1 font-semibold">
                      {target}%
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* AI Insight */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-5">

            <div className="flex gap-3">

              <div className="text-xl">
                💡
              </div>

              <div>

                <h4 className="font-semibold">
                  AI Insight
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Charging is currently running at an efficient power level.
                  If grid demand increases, the system can automatically
                  adjust charging speed to maintain grid stability.
                </p>

              </div>

            </div>

          </div>

          {/* Stop Charging */}
          <button
  onClick={() => setPage("home")}
  className={`mt-8 w-full rounded-xl py-4 font-semibold transition ${
    isComplete
      ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
      : "bg-red-500 text-white hover:bg-red-400"
  }`}
>
  {isComplete ? "Return to Home ✓" : "Stop Charging"}
</button>

        </div>

      </main>

    </div>
  );
}

  if (page === "dashboard") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        <nav className="flex items-center justify-between border-b border-white/10 px-8 py-5">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-xl">
              ⚡
            </div>

            <div>
              <h1 className="font-bold">EV CHARGE AI</h1>
              <p className="text-xs text-slate-400">
                Management Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={() => setPage("home")}
            className="text-sm text-slate-400 hover:text-white"
          >
            ← User App
          </button>

        </nav>

        <main className="mx-auto max-w-7xl px-6 py-10">

          <div className="mb-8">
            <p className="text-sm text-emerald-400">
              ● System Operational
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Charging Management Dashboard
            </h2>

            <p className="mt-2 text-slate-400">
              Monitor stations, chargers, charging sessions and
              network demand.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">Total Stations</p>
              <p className="mt-2 text-3xl font-bold">12</p>
              <p className="mt-1 text-xs text-emerald-400">
                Network stations
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">Total Chargers</p>
              <p className="mt-2 text-3xl font-bold">48</p>
              <p className="mt-1 text-xs text-emerald-400">
                Connected chargers
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">Active Sessions</p>
              <p className="mt-2 text-3xl font-bold">19</p>
              <p className="mt-1 text-xs text-cyan-400">
                Currently charging
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">Average Wait</p>
              <p className="mt-2 text-3xl font-bold">8 min</p>
              <p className="mt-1 text-xs text-yellow-400">
                Network average
              </p>
            </div>

          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">

            <h3 className="text-xl font-semibold">
              Station Monitoring
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Current station utilization
            </p>

            <div className="mt-6 space-y-5">

              <div className="rounded-2xl bg-white/5 p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Station A</p>
                    <p className="text-sm text-slate-500">
                      Tech Park Charging Point
                    </p>
                  </div>

                  <p className="text-red-400">91% Load</p>
                </div>

                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[91%] rounded-full bg-red-400"></div>
                </div>

                <div className="mt-3 flex justify-between text-sm text-slate-400">
                  <span>0 / 6 available</span>
                  <span>Wait: 35 min</span>
                </div>
              </div>


              <div className="rounded-2xl bg-white/5 p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Station B</p>
                    <p className="text-sm text-slate-500">
                      SRM Main Charging Hub
                    </p>
                  </div>

                  <p className="text-emerald-400">62% Load</p>
                </div>

                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[62%] rounded-full bg-emerald-400"></div>
                </div>

                <div className="mt-3 flex justify-between text-sm text-slate-400">
                  <span>2 / 6 available</span>
                  <span>Wait: 7 min</span>
                </div>
              </div>


              <div className="rounded-2xl bg-white/5 p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Station C</p>
                    <p className="text-sm text-slate-500">
                      Potheri EV Hub
                    </p>
                  </div>

                  <p className="text-cyan-400">45% Load</p>
                </div>

                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[45%] rounded-full bg-cyan-400"></div>
                </div>

                <div className="mt-3 flex justify-between text-sm text-slate-400">
                  <span>4 / 8 available</span>
                  <span>Wait: 3 min</span>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-6 rounded-3xl border border-purple-400/20 bg-purple-400/5 p-6">

            <div className="flex items-start gap-4">

              <div className="text-3xl">🤖</div>

              <div>
                <h3 className="text-xl font-semibold">
                  AI Network Recommendation
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Station A is currently experiencing high load and
                  a long queue. AI recommends redirecting incoming
                  users toward Station B to reduce waiting time and
                  balance network demand.
                </p>
              </div>

            </div>

          </div>

          {/* Analytics Section */}

<div className="mt-6 grid gap-6 lg:grid-cols-2">

  {/* Energy Consumption */}
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

    <h3 className="text-xl font-semibold">
      Energy Consumption
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      Today's charging demand
    </p>

    <div className="mt-8 flex h-40 items-end gap-3">
      <div className="h-[35%] flex-1 rounded-t-lg bg-emerald-400/60"></div>
      <div className="h-[50%] flex-1 rounded-t-lg bg-emerald-400/60"></div>
      <div className="h-[70%] flex-1 rounded-t-lg bg-emerald-400/60"></div>
      <div className="h-[55%] flex-1 rounded-t-lg bg-emerald-400/60"></div>
      <div className="h-[80%] flex-1 rounded-t-lg bg-emerald-400/60"></div>
      <div className="h-[95%] flex-1 rounded-t-lg bg-emerald-400"></div>
      <div className="h-[65%] flex-1 rounded-t-lg bg-emerald-400/60"></div>
    </div>

    <div className="mt-5 flex justify-between border-t border-white/10 pt-4">
      <div>
        <p className="text-xs text-slate-500">Energy Delivered</p>
        <p className="text-xl font-bold">428 kWh</p>
      </div>

      <div className="text-right">
        <p className="text-xs text-slate-500">Peak Demand</p>
        <p className="text-xl font-bold text-yellow-400">6:00 PM</p>
      </div>
    </div>

  </div>


  {/* AI Alerts */}
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

    <h3 className="text-xl font-semibold">
      🧠 AI Alerts & Recommendations
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      Intelligent network monitoring
    </p>

    <div className="mt-6 space-y-4">

      <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-4">
        <p className="font-semibold text-red-400">
          🚨 Station A Overloaded
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Current load is 91%. New requests should be redirected
          to nearby stations.
        </p>
      </div>

      <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4">
        <p className="font-semibold text-yellow-400">
          ⚠️ Demand Increasing
        </p>

        <p className="mt-1 text-sm text-slate-400">
          AI predicts increased charging demand during evening peak hours.
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
        <p className="font-semibold text-emerald-400">
          ✓ Load Balancing Opportunity
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Station B has spare capacity. Redirecting users here
          can reduce network congestion.
        </p>
      </div>

    </div>

  </div>

</div>

          




        </main>

      </div>
    );
  }


  return null;
}


/* =========================
   REUSABLE COMPONENTS
========================= */

function ScoreBar({ name, value, width, color }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>{name}</span>
        <span>{value}</span>
      </div>

      <div className="h-2 rounded-full bg-white/10">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: width }}
        ></div>
      </div>
    </div>
  );
}


function StationCard({
  name,
  distance,
  score,
  queue,
  load,
  wait,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <div className="flex items-center justify-between">

        <div>
          <h4 className="font-semibold">
            {name}
          </h4>

          <p className="text-sm text-slate-500">
            {distance} away
          </p>
        </div>

        <span className="font-semibold text-emerald-400">
          {score}
        </span>

      </div>

      <div className="mt-4 flex justify-between text-sm text-slate-400">
        <span>Queue: {queue}</span>
        <span>Load: {load}</span>
        <span>Wait: {wait}</span>
      </div>

    </div>
  );
}


function StationListCard({
  name,
  distance,
  load,
  available,
  status,
  statusColor,
  recommended,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left hover:border-emerald-400/40"
    >

      <div className="flex items-start justify-between">

        <div>
          <div className="flex items-center gap-2">

            <h3 className="font-semibold">
              {name}
            </h3>

            {recommended && (
              <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-400">
                Recommended
              </span>
            )}

          </div>

          <p className="mt-1 text-sm text-slate-500">
            {distance}
          </p>
        </div>

        <span className={`text-sm font-semibold ${statusColor}`}>
          {status}
        </span>

      </div>

      <div className="mt-4 flex justify-between text-sm">

        <span className="text-slate-400">
          Load
        </span>

        <span>
          {load}
        </span>

        <span className="text-slate-400">
          Available
        </span>

        <span className="text-emerald-400">
          {available}
        </span>

      </div>

    </button>
  );
}


function MapPin({ name, color }) {
  return (
    <div className="flex flex-col items-center">

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${color} border-4 border-white font-bold shadow-xl`}
      >
        {name}
      </div>

      <div
        className={`h-3 w-3 rotate-45 ${color}`}
      ></div>

    </div>
  );
}


function StatBox({ title, value }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-lg font-semibold">
        {value}
      </p>

    </div>
  );
}


function ChargerRow({ name, power, available }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900 p-4">

      <div>
        <p className="font-medium">
          {name}
        </p>

        <p className="text-sm text-slate-500">
          Fast DC • {power}
        </p>
      </div>

      <span
        className={
          available
            ? "rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400"
            : "rounded-full bg-red-400/10 px-3 py-1 text-xs text-red-400"
        }
      >
        {available ? "Available" : "In Use"}
      </span>

    </div>
  );
}


export default App;