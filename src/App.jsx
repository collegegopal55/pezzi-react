import { useState } from "react";
import { MENU, PG, PL, CMP, F, IND, TS, CL, Q } from "./data.js";
import { face, scene } from "./art.js";
import "./styles.css";
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const SHT = [
  "Dashboard",
  "Employee Analytics",
  "Instant Exports",
  "Attendance Overview",
  "Active User Drill-down",
  "Attendance by Employee",
  "Leave Analytics",
  "Payroll Dashboard",
  "Payroll Insights",
  "Employee Management",
  "Shift & Roster",
  "Assign Shift",
];
const PRODS = "hr payroll leave att perf ess eng mkt rec exp".split(" ");
const TOP = [
  "Overtime rules",
  "Night shift pay",
  "PF and ESI",
  "Roster planning",
  "Biometric attendance",
  "Leave policy",
  "Payroll errors",
  "Compliance",
];
const FAQ = [
  [
    "Can Pezzi handle night shifts and overtime?",
    "Yes. Configure night allowance and OT multipliers; payroll picks them up automatically.",
  ],
  [
    "Which attendance methods are supported?",
    "Biometric devices, mobile app with GPS and geofence, and web punch.",
  ],
  [
    "Is PF/ESI compliance included?",
    "Standard and Professional plans include statutory computation.",
  ],
  [
    "How long does setup take?",
    "Most teams go live in a few days with bulk upload.",
  ],
  [
    "Is there a free demo?",
    "Yes, click Book Demo and our expert will call you back.",
  ],
];
const Sec = ({ alt, children }) => (
  <section className={alt ? "alt" : ""}>
    <div className="w">{children}</div>
  </section>
);
const Hero = ({ tag, t, s, children }) => (
  <div className="hero">
    <div className="w" style={{ gridTemplateColumns: "1fr" }}>
      <div>
        <span className="tag">{tag}</span>
        <h1>{t}</h1>
        <p className="mu">{s}</p>
        {children}
      </div>
    </div>
  </div>
);
const Faq = () => (
  <Sec>
    <div style={{ maxWidth: 760, margin: "auto" }}>
      <h2 className="c">Frequently asked questions</h2>
      {FAQ.map((q) => (
        <details key={q[0]}>
          <summary>{q[0]}</summary>
          <p className="mu">{q[1]}</p>
        </details>
      ))}
    </div>
  </Sec>
);
const Shot = ({ i, c }) => (
  <div className="fr">
    <div className="dots">●●●</div>
    <img
      src={`/screens/${i}.webp`}
      alt={SHT[i]}
      style={{ width: "100%", display: "block", cursor: "zoom-in" }}
      onClick={() =>
        c.setModal(
          <img src={`/screens/${i}.webp`} style={{ maxWidth: "100%" }} />,
        )
      }
    />
  </div>
);
function Nav({ c }) {
  const nav = (x) => (x.startsWith("p:") ? c.go("p", x.slice(2)) : c.go(x));
  return (
    <>
      <div className="ban" onClick={() => c.go("p", "navos")}>
        ✨ Meet Pezzi AI Assistant: your smart HR helper →
      </div>
      {/* <nav>
        <div className="w">
          <a className="logo" onClick={() => c.go("home")}>
           
        <img src="/pezzi-logo.png" alt="Pezzi Softech" className="logo" />
          </a>
          <div className="sp" />
          {MENU.map((m) => (
            <span className="dd hm" key={m[0]}>
              <a className="l">{m[0]} ▾</a>
              <div className="ddm">
                {m[1].map((x) => (
                  <a key={x[1]} onClick={() => nav(x[1])}>
                    {x[0]}
                  </a>
                ))}
              </div>
            </span>
          ))}
          <a className="l hm" onClick={() => c.go("pricing")}>
            Pricing
          </a>
          <a className="l" onClick={() => c.go("login")}>
            Login
          </a>
          <button
            className="btn"
            onClick={() => c.setModal(<DemoForm c={c} />)}
          >
            Book Demo
          </button>
        </div>
      </nav> */}

      <nav>
  <div className="w">
    <a className="logo" onClick={() => c.go("home")}>
      <img src="/pezzi-logo.png" alt="Pezzi Softech" />
    </a>
    <div className="sp" />
    {MENU.map((m) => (
      <span className="dd hm" key={m[0]}>
        <a className="l">{m[0]} ▾</a>
        <div className="ddm">
          {m[1].map((x) => (
            <a key={x[1]} onClick={() => nav(x[1])}>
              {x[0]}
            </a>
          ))}
        </div>
      </span>
    ))}
    <a className="l hm" onClick={() => c.go("pricing")}>Pricing</a>
    <a className="l" onClick={() => c.go("login")}>Login</a>
    <button className="btn" onClick={() => c.setModal(<DemoForm c={c} />)}>
      Book Demo
    </button>
  </div>
</nav>
    </>
  );
}
function Footer({ c }) {
  return (
    <footer>
      <div
        className="w g"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))" }}
      >
        {MENU.map((m) => (
          <div key={m[0]}>
            <b style={{ color: "#fff" }}>{m[0]}</b>
            {m[1].map((x) => (
              <a
                key={x[1]}
                onClick={() =>
                  x[1].startsWith("p:") ? c.go("p", x[1].slice(2)) : c.go(x[1])
                }
              >
                {x[0]}
              </a>
            ))}
          </div>
        ))}
        <div>
          <b style={{ color: "#fff" }}>Pezzi Softech</b>
          <p>
            Plot No. 1, C211-212, Shakti Khand 2, Indirapuram, Ghaziabad, UP
            201014
          </p>
        </div>
      </div>
      <div className="w" style={{ marginTop: 20 }}>
        © 2026 Pezzi Softech India LLP · sales@pezzisoftech.com
      </div>
    </footer>
  );
}
function useLead(c, done) {
  const [f, setF] = useState({ n: "", p: "" });
  return [
    f,
    (k) => (e) => setF({ ...f, [k]: e.target.value }),
    () => {
      if (f.n.trim().length < 2) return c.T("Please enter your name");
      if (!/^[6-9]\d{9}$/.test(f.p)) return c.T("Enter valid 10-digit mobile");
      c.T("✅ Thanks " + f.n + "! Our expert will call you soon.");
      done && done();
      setF({ n: "", p: "" });
    },
  ];
}
function DemoForm({ c }) {
  const [f, s, sub] = useLead(c, () => c.setModal(null));
  return (
    <>
      <h3>Book a Free Demo</h3>
      <label>Name</label>
      <input value={f.n} onChange={s("n")} />
      <label>Mobile</label>
      <input value={f.p} maxLength={10} onChange={s("p")} />
      <button className="btn" onClick={sub}>
        Book Demo
      </button>
    </>
  );
}
function Home({ c }) {
  const [fi, setFi] = useState(0),
    [ind, setInd] = useState("Hospitals"),
    [n, setN] = useState(50),
    [sh, setSh] = useState(0),
    f = F[fi];
  return (
    <>
      <div className="hero">
        <div className="w">
          <div>
            <span className="tag">
              ⭐ WHERE ACCURACY MEETS EFFORTLESS PAYROLL
            </span>
            <h1>
              Best Attendance & Payroll Software in India for All Industries
            </h1>
            <p className="mu">
              Smart, automated attendance and payroll for hospitals, factories,
              offices and more.
            </p>
            <ul className="ck">
              <li>Error-Free Salary Calculation</li>
              <li>Easy Shift & Roster Management</li>
              <li>100% Compliance Ready</li>
            </ul>
            <button className="btn" onClick={() => c.go("contact")}>
              Talk to Expert
            </button>{" "}
            <button className="btn o" onClick={() => c.go("app")}>
              Try Live Demo →
            </button>
          </div>
          <Shot i={0} c={c} />
        </div>
      </div>
      <Sec alt>
        <div className="c">
          <h2>Facing Attendance & Payroll Errors?</h2>
          <div className="g g3" style={{ marginTop: 20 }}>
            {[
              "Manual attendance mistakes",
              "Wrong overtime calculation",
              "Night shift salary issues",
              "Shift change not updated",
              "Multiple shifts in same day",
              "Complex roster management",
            ].map((x) => (
              <div className="card er" key={x}>
                ❌ <b>{x}</b>
              </div>
            ))}
          </div>
        </div>
      </Sec>
      <Sec>
        <div className="c">
          <h2>Complete Attendance & Payroll Management</h2>
          {F.map((x, i) => (
            <span
              key={i}
              className={"chip " + (i == fi ? "on" : "")}
              onClick={() => setFi(i)}
            >
              {x[1]} {x[0]}
            </span>
          ))}
        </div>
        <div className="card" style={{ marginTop: 16 }}>
          <h3>{f[0]}</h3>
          <p className="mu">{f[2]}</p>
          <ul className="ck">
            {f[3].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </Sec>
      <Sec alt>
        <div className="c">
          <h2>Best Payroll Software for Every Industry</h2>
          {Object.keys(IND).map((i) => (
            <span
              key={i}
              className={"chip " + (i == ind ? "on" : "")}
              onClick={() => setInd(i)}
            >
              {i}
            </span>
          ))}
        </div>
        <div
          className="card g g2"
          style={{ marginTop: 14, alignItems: "center" }}
        >
          <img
            src={scene(ind)}
            alt={ind}
            style={{ width: "100%", borderRadius: 12 }}
          />
          <div>
            <h3>{ind}</h3>
            <p className="mu">{IND[ind]}</p>
          </div>
        </div>
      </Sec>
      <Sec>
        <div className="c">
          <h2>Product Tour</h2>
          {SHT.map((x, i) => (
            <span
              key={i}
              className={"chip " + (i == sh ? "on" : "")}
              onClick={() => setSh(i)}
            >
              {x}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <Shot i={sh} c={c} />
        </div>
      </Sec>
      <Sec alt>
        <div className="g g2" style={{ alignItems: "center" }}>
          <div>
            <h2>Calculate your savings</h2>
            <b>{n} employees</b>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={n}
              onChange={(e) => setN(+e.target.value)}
            />
          </div>
          <div className="card c">
            <div className="stat">{Math.round(n * 0.6)} hrs/month</div>HR time
            saved
            <div className="stat" style={{ marginTop: 12 }}>
              {inr(n * 0.6 * 350 + n * 40)}/month
            </div>
            Estimated savings (demo)
          </div>
        </div>
      </Sec>
      <Sec>
        <h2 className="c">Customer voices</h2>
        <div className="g g3" style={{ marginTop: 18 }}>
          {TS.map((t, i) => (
            <div className="card tm" key={i}>
              <img src={face(i + 3)} style={{ width: 56, height: 56 }} alt="" />
              <p>“{t[0]}”</p>
              <b>{t[1]}</b>
              <br />
              <span className="mu">{t[2]}</span>
            </div>
          ))}
        </div>
        <div className="c" style={{ marginTop: 16 }}>
          {CL.map((x) => (
            <span className="chip" key={x}>
              {x}
            </span>
          ))}
        </div>
      </Sec>
      <Faq />
      <Sec>
        <div className="cta">
          <h2>Ready to Simplify Your Payroll Process?</h2>
          <button
            className="btn"
            onClick={() => c.setModal(<DemoForm c={c} />)}
          >
            Book Demo
          </button>
        </div>
      </Sec>
    </>
  );
}
function Pricing({ c }) {
  const [n, setN] = useState(25),
    cost = (p) => p[1] + Math.max(0, n - 20) * p[2];
  return (
    <Sec>
      <div className="c">
        <h2>Plans For You (Built for Every Industry)</h2>
        <b>{n} employees</b>
        <input
          type="range"
          min="1"
          max="500"
          value={n}
          onChange={(e) => setN(+e.target.value)}
          style={{ maxWidth: 420 }}
        />
      </div>
      <div className="g g4">
        {PL.map((p, i) => (
          <div key={p[0]} className={"card plan c " + (i == 2 ? "pop" : "")}>
            <h3>{p[0]}</h3>
            <div className="price">{inr(cost(p))}</div>
            <div className="mu">
              / month · ₹{p[1]} up to 20 emp. +₹{p[2]}/extra
            </div>
            <p className="mu">Best for {p[3]}</p>
            <button
              className="btn"
              onClick={() => c.setModal(<DemoForm c={c} />)}
            >
              Get {p[0]}
            </button>
          </div>
        ))}
      </div>
      <h3 style={{ marginTop: 36 }}>Compare features</h3>
      <div className="card tw">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              {PL.map((p) => (
                <th key={p[0]}>{p[0]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CMP.map((r) => (
              <tr key={r[0]}>
                <td>{r[0]}</td>
                {r.slice(1).map((x, i) => (
                  <td key={i}>{x == "Y" ? "✅" : x == "-" ? "❌" : x}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Sec>
  );
}
function Contact({ c }) {
  const [f, s, sub] = useLead(c);
  return (
    <>
      <Hero tag="CONTACT" t="Let's connect" s="How can we help?" />
      <Sec>
        <div className="g g2">
          <div className="card">
            <b>Pezzi Softech India LLP</b>
            <p className="mu">
              Plot No. 1, C211-212, Shakti Khand 2, Indirapuram, Ghaziabad, UP
              201014
              <br />
              sales@pezzisoftech.com
            </p>
          </div>
          <div className="card">
            <h3>Call Back Request</h3>
            <label>Name</label>
            <input value={f.n} onChange={s("n")} />
            <label>Mobile</label>
            <input value={f.p} maxLength={10} onChange={s("p")} />
            <button className="btn" onClick={sub}>
              Request Call Back
            </button>
          </div>
        </div>
      </Sec>
    </>
  );
}
function Page({ k, c }) {
  const p = PG[k];
  if (k == "tour")
    return (
      <>
        <Hero tag="PRODUCT TOUR" t="Pezzi Platform Tour" s="12 real screens." />
        <Sec>
          <div className="g g3">
            {SHT.map((x, i) => (
              <div className="card" key={x}>
                <Shot i={i} c={c} />
                <h3 style={{ marginTop: 10 }}>{x}</h3>
              </div>
            ))}
          </div>
        </Sec>
      </>
    );
  if (!p) return null;
  const prod = PRODS.includes(k);
  return (
    <>
      <Hero tag={prod ? "PRODUCT" : "EXPLORE"} t={p[0]} s={p[1]}>
        <button className="btn" onClick={() => c.setModal(<DemoForm c={c} />)}>
          Book a Demo
        </button>
        {p[4] && (
          <>
            {" "}
            <button className="btn o" onClick={() => c.go("app", "", p[4])}>
              Try Live Demo →
            </button>
          </>
        )}
      </Hero>
      <Sec>
        <div className="g g3">
          {Q(p[2]).map((x) => (
            <div className="card" key={x[1]}>
              <div style={{ fontSize: 26 }}>{x[0]}</div>
              <h3>{x[1]}</h3>
              <p className="mu">{x[2]}</p>
            </div>
          ))}
        </div>
      </Sec>
      {prod && <Faq />}
    </>
  );
}
function Lib({ k0, c }) {
  const [t, setT] = useState(k0),
    [q, setQ] = useState(""),
    [cat, setCat] = useState(""),
    [pg, setPg] = useState(0),
    all = TOP.flatMap((x) =>
      ["Complete guide to " + x, x + ": common mistakes", "Automate " + x].map(
        (t) => ({ t, c: x }),
      ),
    ).filter(
      (x) =>
        (!cat || x.c == cat) && x.t.toLowerCase().includes(q.toLowerCase()),
    ),
    n = Math.ceil(all.length / 6) || 1;
  return (
    <>
      <Hero
        tag="RESOURCE LIBRARY"
        t="Resource Library"
        s="Blogs, guides, templates and ebooks."
      />
      <Sec>
        <div className="c">
          {["Blogs", "Guides", "Templates", "Ebooks"].map((x) => (
            <span
              key={x}
              className={"chip " + (x == t ? "on" : "")}
              onClick={() => {
                setT(x);
                setPg(0);
              }}
            >
              {x}
            </span>
          ))}
        </div>
        <div className="c">
          <input
            placeholder="Search..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPg(0);
            }}
            style={{ maxWidth: 240, display: "inline-block" }}
          />
          <select
            value={cat}
            onChange={(e) => {
              setCat(e.target.value);
              setPg(0);
            }}
            style={{ width: "auto" }}
          >
            <option value="">All</option>
            {TOP.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <div className="g g3">
          {all.slice(pg * 6, pg * 6 + 6).map((x) => (
            <div className="card" key={x.t}>
              <span className="tag">{t.slice(0, -1)}</span>
              <h3 style={{ marginTop: 8 }}>{x.t}</h3>
              <p className="mu">{x.c} · 5 min read</p>
            </div>
          ))}
        </div>
        <div className="c" style={{ marginTop: 16 }}>
          {Array.from({ length: n }, (_, i) => (
            <span
              key={i}
              className={"chip " + (i == pg ? "on" : "")}
              onClick={() => setPg(i)}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </Sec>
    </>
  );
}
const CS = [
  ["City Hospital", "Healthcare", "Payroll", "Zero night-shift errors"],
  ["Marble Factory", "Manufacturing", "Attendance", "OT closed in 1 hour"],
  ["Hotel Group", "Hospitality", "Payroll", "Multi-branch rosters"],
  ["Retail Chain", "Retail", "Attendance", "Saved 50% HR time"],
  ["School Trust", "Education", "Leave", "Digitised leave"],
  ["Infra Co", "Construction", "Payroll", "90% faster payroll"],
];
function Cust() {
  const [i, setI] = useState(""),
    [p, setP] = useState(""),
    l = CS.filter((c) => (!i || c[1] == i) && (!p || c[2] == p));
  return (
    <>
      <Hero
        tag="CUSTOMERS"
        t="See how businesses thrive with Pezzi"
        s="Case studies."
      />
      <Sec>
        <select
          value={i}
          onChange={(e) => setI(e.target.value)}
          style={{ width: "auto" }}
        >
          <option value="">All industries</option>
          {[...new Set(CS.map((c) => c[1]))].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select
          value={p}
          onChange={(e) => setP(e.target.value)}
          style={{ width: "auto", marginLeft: 8 }}
        >
          <option value="">All products</option>
          <option>Payroll</option>
          <option>Attendance</option>
          <option>Leave</option>
        </select>
        <div className="g g3">
          {l.map((c) => (
            <div className="card" key={c[0]}>
              <span className="tag">{c[1]}</span>
              <h3 style={{ marginTop: 8 }}>
                {c[0]}: {c[3]}
              </h3>
              <p className="mu">{c[2]}</p>
            </div>
          ))}
        </div>
      </Sec>
    </>
  );
}
function Login({ c }) {
  const [u, setU] = useState("");
  return (
    <>
      <Hero
        tag="LOGIN"
        t="Login to Pezzi"
        s="Every company has its own Pezzi web address."
      />
      <Sec>
        <div className="card" style={{ maxWidth: 420, margin: "auto" }}>
          <label>Company web address</label>
          <input
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="yourcompany"
          />
          <button
            className="btn"
            onClick={() =>
              u.trim()
                ? (c.T("Opening " + u + ".pezzisoftech.com (demo)"),
                  c.go("app"))
                : c.T("Enter company address")
            }
          >
            Continue
          </button>
        </div>
      </Sec>
    </>
  );
}
const E0 = [
  [
    101,
    "Aarav Sharma",
    "Nursing",
    "N",
    24000,
    24,
    12,
    9,
    "NNNOGGG",
    "21:55",
    "06:05",
  ],
  [
    102,
    "Priya Singh",
    "Admin",
    "G",
    32000,
    25,
    4,
    0,
    "GGGGGGO",
    "09:02",
    "18:10",
  ],
  [
    103,
    "Rohit Verma",
    "Production",
    "M",
    18000,
    26,
    18,
    0,
    "MMMMMMO",
    "05:58",
    null,
  ],
  [104, "Neha Gupta", "Pharmacy", "G", 28000, 23, 2, 0, "GGGGGOO", null, null],
  [
    105,
    "Vikram Rawat",
    "Security",
    "N",
    16000,
    26,
    10,
    22,
    "NNNNNNO",
    "21:50",
    null,
  ],
  [
    106,
    "Sunita Yadav",
    "Accounts",
    "G",
    45000,
    24,
    0,
    0,
    "GGGGGOO",
    "09:20",
    "18:00",
  ],
].map((a) => ({
  id: a[0],
  name: a[1],
  dept: a[2],
  shift: a[3],
  basic: a[4],
  present: a[5],
  ot: a[6],
  nights: a[7],
  roster: a[8].split(""),
  in: a[9],
  out: a[10],
}));
const pay = (e) => {
  const d = e.basic / 26,
    earn = d * e.present,
    hra = earn * 0.4,
    ot = e.ot * (d / 8) * 2,
    ni = e.nights * 150,
    gross = earn + hra + ot + ni,
    pf = Math.min(earn, 15000) * 0.12,
    esi = gross <= 21000 ? gross * 0.0075 : 0;
  return { earn, hra, ot, ni, gross, pf, esi, net: gross - pf - esi };
};
const now = () => new Date().toTimeString().slice(0, 5);
function Dash({ c, tab0 }) {
  const [tab, setTab] = useState(tab0 || "dash"),
    [E, setE] = useState(E0),
    [L, setL] = useState([
      {
        id: 1,
        e: "Neha Gupta",
        t: "Casual",
        d: 2,
        r: "Family function",
        s: "Pending",
      },
      { id: 2, e: "Rohit Verma", t: "Sick", d: 1, r: "Fever", s: "Approved" },
    ]),
    [nf, setNf] = useState({ name: "", dept: "", basic: "", shift: "G" }),
    [q, setQ] = useState(""),
    [lf, setLf] = useState({ d: 1, r: "", t: "Casual", e: E0[0].name }),
    upd = (id, p) => setE(E.map((e) => (e.id == id ? { ...e, ...p } : e))),
    C = ["M", "G", "N", "O"];
  const T = [
      ["dash", "📊 Dashboard"],
      ["emp", "👥 Employees"],
      ["att", "📍 Attendance"],
      ["ros", "🗓️ Roster"],
      ["lv", "🌴 Leave"],
      ["pay", "💰 Payroll"],
    ],
    tot = E.reduce((a, e) => a + pay(e).net, 0);
  return (
    <div className="app">
      <div className="side">
        {T.map((t) => (
          <a
            key={t[0]}
            className={tab == t[0] ? "on" : ""}
            onClick={() => setTab(t[0])}
          >
            {t[1]}
          </a>
        ))}
        <a onClick={() => c.go("home")}>← Exit demo</a>
      </div>
      <div className="main">
        {tab == "dash" && (
          <>
            <h2>Dashboard</h2>
            <div className="g g4">
              {[
                [E.length, "Employees"],
                [E.filter((e) => e.in).length, "Present today"],
                [L.filter((l) => l.s == "Pending").length, "Pending leaves"],
                [inr(tot), "Net payroll"],
              ].map((k) => (
                <div className="card" key={k[1]}>
                  <div className="kpi">{k[0]}</div>
                  {k[1]}
                </div>
              ))}
            </div>
          </>
        )}
        {tab == "emp" && (
          <>
            <h2>Employees</h2>
            <div className="card">
              <div className="row">
                <input
                  placeholder="Name"
                  value={nf.name}
                  onChange={(e) => setNf({ ...nf, name: e.target.value })}
                />
                <input
                  placeholder="Department"
                  value={nf.dept}
                  onChange={(e) => setNf({ ...nf, dept: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Basic ₹"
                  value={nf.basic}
                  onChange={(e) => setNf({ ...nf, basic: e.target.value })}
                />
                <button
                  className="btn"
                  style={{ flex: 0 }}
                  onClick={() => {
                    if (!nf.name || !nf.basic)
                      return c.T("Name and basic required");
                    setE([
                      ...E,
                      {
                        id: Math.max(...E.map((x) => x.id)) + 1,
                        name: nf.name,
                        dept: nf.dept || "General",
                        shift: nf.shift,
                        basic: +nf.basic,
                        present: 0,
                        ot: 0,
                        nights: 0,
                        roster: "GGGGGGO".split(""),
                        in: null,
                        out: null,
                      },
                    ]);
                    setNf({ name: "", dept: "", basic: "", shift: "G" });
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <input
              placeholder="🔍 Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ marginTop: 14 }}
            />
            <div className="card tw">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Dept</th>
                    <th>Basic</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {E.filter((e) =>
                    (e.name + e.dept).toLowerCase().includes(q.toLowerCase()),
                  ).map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.name}</td>
                      <td>{e.dept}</td>
                      <td>{inr(e.basic)}</td>
                      <td>
                        <button
                          className="btn r s"
                          onClick={() => setE(E.filter((x) => x.id != e.id))}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab == "att" && (
          <>
            <h2>Attendance · Today</h2>
            <div className="card tw">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>In</th>
                    <th>Out</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {E.map((e) => (
                    <tr key={e.id}>
                      <td>{e.name}</td>
                      <td>{e.in || "-"}</td>
                      <td>{e.out || "-"}</td>
                      <td>
                        <span
                          className={
                            "b " + (!e.in ? "no" : e.out ? "ok" : "wa")
                          }
                        >
                          {!e.in ? "Absent" : e.out ? "Completed" : "Working"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn s"
                          onClick={() =>
                            upd(
                              e.id,
                              !e.in
                                ? { in: now() }
                                : !e.out
                                  ? { out: now() }
                                  : { in: null, out: null },
                            )
                          }
                        >
                          {!e.in ? "Punch In" : !e.out ? "Punch Out" : "Reset"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab == "ros" && (
          <>
            <h2>Shift Roster</h2>
            <p className="mu">Click a cell to change shift.</p>
            <div className="card tw">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (d) => (
                        <th key={d}>{d}</th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {E.map((e) => (
                    <tr key={e.id}>
                      <td>{e.name}</td>
                      {e.roster.map((s, i) => (
                        <td key={i}>
                          <span
                            className={"sh s" + s}
                            onClick={() =>
                              upd(e.id, {
                                roster: e.roster.map((x, j) =>
                                  j == i ? C[(C.indexOf(x) + 1) % 4] : x,
                                ),
                              })
                            }
                          >
                            {s}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab == "lv" && (
          <>
            <h2>Leave Management</h2>
            <div className="card">
              <div className="row">
                <select
                  value={lf.e}
                  onChange={(e) => setLf({ ...lf, e: e.target.value })}
                >
                  {E.map((e) => (
                    <option key={e.id}>{e.name}</option>
                  ))}
                </select>
                <select
                  value={lf.t}
                  onChange={(e) => setLf({ ...lf, t: e.target.value })}
                >
                  <option>Casual</option>
                  <option>Sick</option>
                  <option>Earned</option>
                </select>
                <input
                  type="number"
                  min="1"
                  value={lf.d}
                  onChange={(e) => setLf({ ...lf, d: +e.target.value })}
                />
                <input
                  placeholder="Reason"
                  value={lf.r}
                  onChange={(e) => setLf({ ...lf, r: e.target.value })}
                />
                <button
                  className="btn"
                  style={{ flex: 0 }}
                  onClick={() => {
                    if (lf.d < 1) return c.T("Enter valid days");
                    setL([
                      { ...lf, id: Date.now(), r: lf.r || "-", s: "Pending" },
                      ...L,
                    ]);
                    c.T("Leave applied");
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="card tw" style={{ marginTop: 14 }}>
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Type</th>
                    <th>Days</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {L.map((l) => (
                    <tr key={l.id}>
                      <td>{l.e}</td>
                      <td>{l.t}</td>
                      <td>{l.d}</td>
                      <td>
                        <span
                          className={
                            "b " +
                            (l.s == "Approved"
                              ? "ok"
                              : l.s == "Rejected"
                                ? "no"
                                : "wa")
                          }
                        >
                          {l.s}
                        </span>
                      </td>
                      <td>
                        {l.s == "Pending" &&
                          ["Approved", "Rejected"].map((s) => (
                            <button
                              key={s}
                              className={
                                "btn s " + (s == "Rejected" ? "r" : "")
                              }
                              style={{ marginRight: 4 }}
                              onClick={() =>
                                setL(
                                  L.map((x) =>
                                    x.id == l.id ? { ...x, s } : x,
                                  ),
                                )
                              }
                            >
                              {s == "Approved" ? "Approve" : "Reject"}
                            </button>
                          ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab == "pay" && (
          <>
            <h2>Payroll · October 2026</h2>
            <p className="mu">
              Edit OT hours and nights; PF 12% (cap ₹15,000), ESI 0.75% if gross
              ≤ ₹21,000. OT 2x, night ₹150.
            </p>
            <div className="card tw">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>OT hrs</th>
                    <th>Nights</th>
                    <th>Gross</th>
                    <th>PF+ESI</th>
                    <th>Net</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {E.map((e) => {
                    const p = pay(e);
                    return (
                      <tr key={e.id}>
                        <td>{e.name}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            value={e.ot}
                            style={{ width: 70, margin: 0 }}
                            onChange={(x) =>
                              upd(e.id, {
                                ot: Math.max(0, +x.target.value || 0),
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            value={e.nights}
                            style={{ width: 70, margin: 0 }}
                            onChange={(x) =>
                              upd(e.id, {
                                nights: Math.max(0, +x.target.value || 0),
                              })
                            }
                          />
                        </td>
                        <td>{inr(p.gross)}</td>
                        <td>{inr(p.pf + p.esi)}</td>
                        <td>
                          <b>{inr(p.net)}</b>
                        </td>
                        <td>
                          <button
                            className="btn o s"
                            onClick={() =>
                              c.setModal(
                                <>
                                  <h3>Payslip · Oct 2026</h3>
                                  <p className="mu">
                                    {e.name} · {e.dept}
                                  </p>
                                  <table>
                                    <tbody>
                                      {[
                                        ["Basic earned", p.earn],
                                        ["HRA (40%)", p.hra],
                                        ["Overtime", p.ot],
                                        ["Night allowance", p.ni],
                                        ["Gross", p.gross],
                                        ["PF", p.pf],
                                        ["ESI", p.esi],
                                        ["Net Pay", p.net],
                                      ].map((r) => (
                                        <tr key={r[0]}>
                                          <td>{r[0]}</td>
                                          <td>{inr(r[1])}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </>,
                              )
                            }
                          >
                            Payslip
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p>
              <button
                className="btn"
                onClick={() =>
                  c.T("✅ Payroll processed for " + E.length + " employees")
                }
              >
                Run Payroll
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
export default function App() {
  const [r, setR] = useState({ v: "home", k: "", t: "dash" }),
    [toast, setToast] = useState(""),
    [modal, setModal] = useState(null),
    T = (m) => {
      setToast(m);
      setTimeout(() => setToast(""), 2500);
    },
    go = (v, k = "", t) => {
      setR({ v, k, t: t || "dash" });
      scrollTo(0, 0);
    },
    c = { go, T, setModal },
    k = r.k,
    LIB = {
      blogs: "Blogs",
      guides: "Guides",
      tpl: "Templates",
      ebooks: "Ebooks",
      lib: "Blogs",
    };
  return (
    <>
      <Nav c={c} />
      {r.v == "home" && <Home c={c} />}
      {r.v == "pricing" && <Pricing c={c} />}
      {r.v == "contact" && <Contact c={c} />}
      {r.v == "login" && <Login c={c} />}
      {r.v == "app" && <Dash key={r.t} c={c} tab0={r.t} />}
      {r.v == "p" &&
        (LIB[k] ? (
          <Lib key={k} k0={LIB[k]} c={c} />
        ) : k == "cust" || k == "cases" ? (
          <Cust />
        ) : (
          <Page k={k} c={c} />
        ))}
      {r.v != "app" && <Footer c={c} />}
      {modal && (
        <div
          className="ov"
          onClick={(e) => e.target == e.currentTarget && setModal(null)}
        >
          <div className="md">
            {modal}
            <p>
              <button className="btn o s" onClick={() => setModal(null)}>
                Close
              </button>
            </p>
          </div>
        </div>
      )}
      {toast && (
        <div id="toast" style={{ display: "block" }}>
          {toast}
        </div>
      )}
    </>
  );
}
