
import React, { useMemo, useState, useContext, createContext } from "react";
import {
  Activity,
  AlertTriangle,
  Bandage,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Droplets,
  HeartPulse,
  MapPin,
  Pill,
  Plus,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Thermometer,
  Users,
  PhoneCall,
  MessageSquare,
  Bot,
  Brain,
  Lightbulb,
  TrendingUp,
  Building,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

/*****************************
 * Minimal UI Primitives (local) – with collapsible Card & accents
 *****************************/
const cn = (...c) => c.filter(Boolean).join(" ");

function Card({ className = "", collapsible = false, title, headerClass = "", children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={cn("rounded-2xl border shadow-sm overflow-hidden bg-white", className)}>
      {title && (
        <div
          className={cn(
            "flex items-center justify-between px-4 py-2 cursor-pointer",
            "bg-gradient-to-r from-indigo-50 to-indigo-100",
            headerClass
          )}
          onClick={collapsible ? () => setOpen(!open) : undefined}
        >
          <div className="font-medium text-sm flex items-center gap-2">{title}</div>
          {collapsible && (open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
        </div>
      )}
      {(!collapsible || open) && <div>{children}</div>}
    </div>
  );
}

function CardHeader({ className = "", children }) {
  return <div className={cn("p-4 border-b bg-gray-50", className)}>{children}</div>;
}
function CardTitle({ className = "", children }) {
  return <div className={cn("text-base font-semibold flex items-center gap-2", className)}>{children}</div>;
}
function CardDescription({ className = "", children }) {
  return <div className={cn("text-xs text-gray-500 mt-1", className)}>{children}</div>;
}
function CardContent({ className = "", children }) {
  return <div className={cn("p-4", className)}>{children}</div>;
}
function CardFooter({ className = "", children }) {
  return <div className={cn("p-4 border-t bg-gray-50", className)}>{children}</div>;
}

function Button({ className = "", variant = "default", size = "md", onClick, children, ...rest }) {
  const base = "inline-flex items-center justify-center rounded-full font-medium transition";
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-gray-300 text-gray-800 bg-white hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2", lg: "px-5 py-2.5" };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

function Badge({ className = "", variant = "default", children }) {
  const variants = {
    default: "bg-indigo-600 text-white",
    secondary: "bg-gray-100 text-gray-700",
    outline: "border border-gray-300 text-gray-700",
  };
  return <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs", variants[variant], className)}>{children}</span>;
}

function Input({ className = "", ...rest }) {
  return <input className={cn("w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring", className)} {...rest} />;
}
function Textarea({ className = "", ...rest }) {
  return <textarea className={cn("w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring", className)} {...rest} />;
}
function Separator({ className = "", ...rest }) {
  return <hr className={cn("my-3 border-gray-200", className)} {...rest} />;
}

// Tabs (simple local implementation)
const TabsCtx = createContext(null);
function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue);
  return <TabsCtx.Provider value={{ value, setValue }}>{children}</TabsCtx.Provider>;
}
function TabsList({ className = "", children }) {
  return <div className={cn("flex gap-2", className)}>{children}</div>;
}
function TabsTrigger({ value, children }) {
  const ctx = useContext(TabsCtx);
  const active = ctx?.value === value;
  return (
    <Button
      size="sm"
      variant={active ? "default" : "outline"}
      className={cn("rounded-full", active && "ring-2 ring-indigo-200")}
      onClick={() => ctx?.setValue(value)}
    >
      {children}
    </Button>
  );
}
function TabsContent({ value, className = "", children }) {
  const ctx = useContext(TabsCtx);
  if (ctx?.value !== value) return null;
  return <div className={className}>{children}</div>;
}

function Avatar({ className = "", children }) {
  return <div className={cn("relative inline-flex items-center justify-center rounded-full bg-gray-100", className)}>{children}</div>;
}
function AvatarImage({ src, alt }) {
  return <img src={src} alt={alt} className="h-full w-full rounded-full object-cover"/>;
}
function AvatarFallback({ children }) {
  return <span className="text-xs font-semibold text-gray-600">{children}</span>;
}

function Progress({ value = 0, className = "" }) {
  return (
    <div className={cn("h-2 w-full rounded-full bg-gray-100", className)}>
      <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function Switch({ id, checked, onCheckedChange }) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="sr-only"
      />
      <span className={cn("w-10 h-6 rounded-full transition", checked ? "bg-indigo-600" : "bg-gray-300")}></span>
    </label>
  );
}
function Label({ htmlFor, className = "", children }) {
  return <label htmlFor={htmlFor} className={cn("text-sm text-gray-700", className)}>{children}</label>;
}

/*****************************
 * Domain Data & Seeds
 *****************************/
const DUMMY_PATIENT = {
  id: "PT-10724",
  name: "Aarav Mehta",
  age: 56,
  sex: "Male",
  avatar:
    "https://images.unsplash.com/photo-1609171438301-4321a5d2fae2?q=80&w=512&auto=format&fit=crop",
  bloodGroup: "B+",
  location: "Gurugram, IN",
  caregivers: [
    {
      name: "Dr. Rhea Kapoor",
      role: "Primary Care Physician",
      avatar:
        "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=256&auto=format&fit=crop",
    },
    {
      name: "Anil Sharma",
      role: "Care Coordinator",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
    },
    {
      name: "Priya Nair",
      role: "RN / Diabetes Educator",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=256&auto=format&fit=crop",
    },
  ],
  conditions: [
    { name: "Type 2 Diabetes", since: "2017", status: "Stable", icon: <Droplets className="h-4 w-4" /> },
    { name: "Hypertension", since: "2014", status: "Moderate", icon: <HeartPulse className="h-4 w-4" /> },
  ],
  recentEpisodes: [
    {
      title: "Seasonal Flu",
      date: "2025-08-22",
      summary:
        "Fever (38.3°C), sore throat, congestion; treated with oseltamivir; recovered in 5 days.",
      tags: ["OPD", "Viral"],
      icon: <Thermometer className="h-4 w-4" />,
      location: "OPD – Artemis Hospital",
    },
    {
      title: "Road Traffic Trauma – Tibial Fracture",
      date: "2025-05-11",
      summary:
        "Motorbike skid; closed mid-shaft tibial fracture. ORIF with intramedullary nail; 2-day ICU, 5-day IP stay. Ongoing PT.",
      tags: ["Surgery", "ICU", "Rehab"],
      icon: <Bandage className="h-4 w-4" />,
      location: "Artemis Hospital – OR & Ward",
    },
  ],
  meds: [
    { id: "M1", name: "Metformin 1000 mg", dose: "1-0-1", purpose: "T2D", adherence: 92 },
    { id: "M2", name: "Telmisartan 40 mg", dose: "0-0-1", purpose: "HTN", adherence: 88 },
    { id: "M3", name: "Atorvastatin 20 mg", dose: "0-0-1", purpose: "Dyslipidemia", adherence: 95 },
    { id: "M4", name: "Vitamin D3 60k IU", dose: "Weekly", purpose: "Supplement", adherence: 80 },
  ],
};

const vitalsData = [
  { date: "Jul 15", sbp: 138, dbp: 87, hr: 76, glucose: 142 },
  { date: "Jul 22", sbp: 136, dbp: 86, hr: 74, glucose: 151 },
  { date: "Jul 29", sbp: 134, dbp: 84, hr: 73, glucose: 138 },
  { date: "Aug 05", sbp: 133, dbp: 82, hr: 72, glucose: 145 },
  { date: "Aug 12", sbp: 135, dbp: 83, hr: 74, glucose: 149 },
  { date: "Aug 19", sbp: 131, dbp: 81, hr: 71, glucose: 136 },
  { date: "Aug 26", sbp: 129, dbp: 80, hr: 70, glucose: 130 },
  { date: "Sep 02", sbp: 128, dbp: 79, hr: 70, glucose: 126 },
  { date: "Sep 09", sbp: 127, dbp: 78, hr: 69, glucose: 124 },
];
const glucoseBarData = vitalsData.map((d) => ({ date: d.date, glucose: d.glucose }));

// --- Meds Log (dose-level) ---
const medsLogSeed = [
  {
    id: "DL1",
    medId: "M1",
    scheduledAt: "2025-09-09 08:00",
    takenAt: "2025-09-09 08:10",
    state: "on_time",
    source: "MEMS",
    confidence: 0.95,
  },
  {
    id: "DL2",
    medId: "M1",
    scheduledAt: "2025-09-09 20:00",
    takenAt: "2025-09-09 21:05",
    state: "late",
    source: "SelfReport",
    confidence: 0.7,
  },
  {
    id: "DL3",
    medId: "M1",
    scheduledAt: "2025-09-10 08:00",
    takenAt: null,
    state: "missed",
    source: "Inferred",
    confidence: 0.5,
  },
  {
    id: "DL4",
    medId: "M2",
    scheduledAt: "2025-09-09 21:00",
    takenAt: "2025-09-09 21:02",
    state: "on_time",
    source: "MEMS",
    confidence: 0.95,
  },
  {
    id: "DL5",
    medId: "M2",
    scheduledAt: "2025-09-10 21:00",
    takenAt: "2025-09-10 21:40",
    state: "late",
    source: "SelfReport",
    confidence: 0.7,
  },
  {
    id: "DL6",
    medId: "M3",
    scheduledAt: "2025-09-09 21:00",
    takenAt: "2025-09-09 21:00",
    state: "on_time",
    source: "MEMS",
    confidence: 0.95,
  },
  {
    id: "DL7",
    medId: "M4",
    scheduledAt: "2025-09-07 10:00",
    takenAt: null,
    state: "missed",
    source: "Inferred",
    confidence: 0.5,
  },
];

// --- Communications log ---
const commsSeed = [
  { id: "C1", dir: "outbound", channel: "SMS", actor: "Twin Agent", ts: "2025-09-09 07:30", subject: "Fasting glucose reminder", meta: "Delivered" },
  { id: "C2", dir: "inbound", channel: "App", actor: "Patient", ts: "2025-09-09 08:12", subject: "Dose taken confirm (Metformin)", meta: "Self-report + photo" },
  { id: "C3", dir: "outbound", channel: "VoiceAI", actor: "Twin Agent", ts: "2025-09-10 10:00", subject: "PT check-in post-PT session", meta: "Call completed (38s)" },
  { id: "C4", dir: "inbound", channel: "WhatsAppBot", actor: "Patient", ts: "2025-09-10 21:10", subject: "BP log uploaded", meta: "Image parsed" },
  { id: "C5", dir: "outbound", channel: "Phone", actor: "Care Coordinator", ts: "2025-09-11 11:05", subject: "Diet coaching follow-up", meta: "Reached" },
];

// --- Satisfaction (NPS/CSAT) ---
const satisfactionSeed = {
  nps: { score: 8, verbatim: "Coaching helped. App reminders useful; fewer calls please." },
  csatTrend: [ { date: "May", csat: 4.4 }, { date: "Jun", csat: 4.6 }, { date: "Jul", csat: 4.2 }, { date: "Aug", csat: 4.7 }, { date: "Sep", csat: 4.5 } ],
  episodes: [ { name: "Trauma ORIF (May)", csat: 4.6, nps: 9 }, { name: "Flu OPD (Aug)", csat: 4.3, nps: 8 } ],
};

// --- Predictions ---
const predictionSeed = [
  { id: "P1", label: "30d Hyperglycemia Risk", prob: 0.18, drivers: ["Late dinner Fri", "Low steps", "Stress"] },
  { id: "P2", label: "30d HTN Escalation", prob: 0.12, drivers: ["Evening BP variability", "Post-PT spikes"] },
  { id: "P3", label: "90d Readmission (Ortho)", prob: 0.06, drivers: ["Good PT adherence", "No infection signs"] },
];

// --- Next Best Actions ---
const nbaSeed = [
  { id: "NB1", priority: "high", action: "Schedule diabetes coaching call in next 72h", rationale: "Recent late/missed doses + Fri glucose spikes.", talkTrack: "Aarav, I noticed bedtime sugars rise on Fridays. Let’s plan a simple snack swap and a short post-dinner walk." },
  { id: "NB2", priority: "med", action: "Trial morning Telmisartan dosing for 1 week", rationale: "Evening variability; evaluate AM dosing response.", talkTrack: "We’ll try morning dosing and check your BP log mid-week. If dizziness occurs, switch back." },
  { id: "NB3", priority: "low", action: "Automate Vit D weekly reminder (Sat 10am)", rationale: "Missed last weekly dose.", talkTrack: "I’ve set a gentle reminder on Saturdays—feel free to snooze if you’re busy." },
];

/*****************************
 * Small UI helpers
 *****************************/
function Stat({ icon, label, value, sub }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gray-100 text-gray-700">{icon}</div>
        <div className="flex-1">
          <div className="text-sm text-gray-500">{label}</div>
          <div className="text-xl font-semibold leading-tight">{value}</div>
          {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

function ConditionBadge({ condition }) {
  return (
    <Badge variant="secondary" className="gap-2 rounded-full px-3 py-1 text-sm">
      <span className="opacity-80">{condition.icon}</span>
      {condition.name} · since {condition.since}
      <span className="ml-2 text-xs rounded-full px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200">
        {condition.status}
      </span>
    </Badge>
  );
}

function PriorityBadge({ p }) {
  const map = {
    high: { label: "High", className: "bg-red-100 text-red-700" },
    med: { label: "Medium", className: "bg-amber-100 text-amber-700" },
    low: { label: "Low", className: "bg-emerald-100 text-emerald-700" },
  };
  return (
    <span className={cn("text-xs px-2 py-0.5 rounded-full", map[p]?.className)}>
      {map[p]?.label}
    </span>
  );
}

/*****************************
 * Main Component
 *****************************/
export default function PatientTwinPortal() {
  const [alerts, setAlerts] = useState(alertsSeed);
  const [tasks, setTasks] = useState(tasksSeed);
  const [notes, setNotes] = useState([
    { id: "N1", author: "Priya Nair", role: "RN", text: "PT tolerating partial weight-bearing with cane; cue for quad activation.", ts: "2025-09-10 11:40" },
  ]);
  const [newNote, setNewNote] = useState("");
  const [autoReminders, setAutoReminders] = useState(true);

  const [medsLog] = useState(medsLogSeed);
  const [comms] = useState(commsSeed);
  const [satisfaction] = useState(satisfactionSeed);
  const [predictions] = useState(predictionSeed);
  const [nba] = useState(nbaSeed);

  const avgBP = useMemo(() => {
    const sbp = vitalsData.reduce((a, b) => a + b.sbp, 0) / vitalsData.length;
    const dbp = vitalsData.reduce((a, b) => a + b.dbp, 0) / vitalsData.length;
    return `${Math.round(sbp)}/${Math.round(dbp)} mmHg`;
  }, []);
  const lastGlucose = vitalsData[vitalsData.length - 1].glucose;

  function resolveTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Done" } : t)));
  }
  function dismissAlert(id) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }
  function addNote() {
    if (!newNote.trim()) return;
    setNotes((prev) => [
      ...prev,
      { id: Math.random().toString(36).slice(2), author: "Anil Sharma", role: "Coordinator", text: newNote.trim(), ts: new Date().toISOString().slice(0, 16).replace("T", " ") },
    ]);
    setNewNote("");
  }

  function PriorityChip({ p }) { return <PriorityBadge p={p} />; }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 ring-2 ring-indigo-200">
              <AvatarImage src={DUMMY_PATIENT.avatar} alt={DUMMY_PATIENT.name} />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">{DUMMY_PATIENT.name}</h1>
                <Badge variant="outline" className="rounded-full">{DUMMY_PATIENT.id}</Badge>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-3">
                <span>{DUMMY_PATIENT.age} • {DUMMY_PATIENT.sex} • {DUMMY_PATIENT.bloodGroup}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {DUMMY_PATIENT.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-full" size="sm"><ShieldCheck className="h-4 w-4 mr-2" />Consent: Granted</Button>
            <Button className="rounded-full" size="sm"><Users className="h-4 w-4 mr-2" />Care Team</Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Left rail */}
        <div className="xl:col-span-3 space-y-4">
          <Card collapsible title={<><ClipboardList className="h-4 w-4" />Conditions</>} headerClass="from-emerald-50 to-emerald-100">
            <CardHeader>
              <CardDescription>Chronic & active problems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {DUMMY_PATIENT.conditions.map((c, i) => (<ConditionBadge key={i} condition={c} />))}
              <Separator />
              <div className="text-xs text-gray-500">Allergies: NKDA • Smoking: Former • Alcohol: Social</div>
            </CardContent>
          </Card>

          <Card collapsible title={<><CalendarClock className="h-4 w-4" />Recent Episodes</>} headerClass="from-sky-50 to-sky-100">
            <CardHeader>
              <CardDescription>Flu & trauma timeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {DUMMY_PATIENT.recentEpisodes.map((e, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 text-gray-500">{e.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium flex items-center gap-2">
                      {e.title}
                      <div className="flex gap-1">
                        {e.tags.map((t, k) => (<Badge key={k} variant="secondary" className="rounded-full text-[10px]">{t}</Badge>))}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{e.date} • {e.location}</div>
                    <div className="text-sm mt-1">{e.summary}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card collapsible title={<><Pill className="h-4 w-4" />Medications</>} headerClass="from-amber-50 to-amber-100">
            <CardHeader>
              <CardDescription>Adherence past 30–60 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {DUMMY_PATIENT.meds.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Pill className="h-4 w-4 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{m.name} <span className="text-xs text-gray-500">({m.dose}) · {m.purpose}</span></div>
                    <Progress value={m.adherence} />
                  </div>
                  <div className="text-xs w-10 text-right">{m.adherence}%</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Center column */}
        <div className="xl:col-span-6 space-y-4">
          <Card collapsible title={<><Activity className="h-4 w-4" />Vitals & Glycemic Trends</>} headerClass="from-indigo-50 to-indigo-100">
            <CardHeader>
              <CardDescription>Last 8 weeks from wearables & SMBG</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitalsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[120, 150]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="sbp" name="SBP" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="dbp" name="DBP" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={glucoseBarData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[110, 160]} />
                      <Tooltip />
                      <Bar dataKey="glucose" name="Fasting Glucose" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <Stat icon={<HeartPulse className="h-5 w-5" />} label="Avg BP" value={avgBP} sub="8-wk rolling" />
                <Stat icon={<Droplets className="h-5 w-5" />} label="Latest FBG" value={`${lastGlucose} mg/dL`} sub="Sep 09" />
                <Stat icon={<Activity className="h-5 w-5" />} label="Resting HR" value="69 bpm" sub="stable" />
                <Stat icon={<Syringe className="h-5 w-5" />} label="HBA1c" value="6.9%" sub="Jul-2025" />
              </div>
            </CardContent>
          </Card>

          <Card collapsible title={<><Building className="h-4 w-4" />Care Plan & Interventions</>} headerClass="from-purple-50 to-purple-100">
            <CardHeader>
              <CardDescription>Active plans across Diabetes, HTN, Rehab, Flu recovery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="text-sm font-medium flex items-center gap-2"><Stethoscope className="h-4 w-4" />Diabetes Plan</div>
                  <ul className="text-sm list-disc ml-5 mt-1 space-y-1">
                    <li>Plate method dinners 5x/week</li>
                    <li>SMBG: Fasting + bedtime 3x/week</li>
                    <li>Tele-coach follow-up in 2 weeks</li>
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-100">
                  <div className="text-sm font-medium flex items-center gap-2"><HeartPulse className="h-4 w-4" />Hypertension Plan</div>
                  <ul className="text-sm list-disc ml-5 mt-1 space-y-1">
                    <li>Breathing cooldown 5 mins post-PT</li>
                    <li>Consider AM dosing trial for Telmisartan</li>
                    <li>BP log upload weekly</li>
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="text-sm font-medium flex items-center gap-2"><Bandage className="h-4 w-4" />Rehab Plan (Post-ORIF)</div>
                  <ul className="text-sm list-disc ml-5 mt-1 space-y-1">
                    <li>Partial weight-bearing with cane; progress as tolerated</li>
                    <li>Home quad sets, ankle pumps daily</li>
                    <li>PT in-clinic 2x/week</li>
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-100">
                  <div className="text-sm font-medium flex items-center gap-2"><Thermometer className="h-4 w-4" />Flu (Resolved)</div>
                  <ul className="text-sm list-disc ml-5 mt-1 space-y-1">
                    <li>Completed course of oseltamivir</li>
                    <li>Post-viral fatigue: energy pacing guidance</li>
                    <li>Vaccination reminder: Influenza 2025-26</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement & Intelligence */}
          <Card collapsible title={<><Brain className="h-4 w-4" />Engagement & Intelligence</>} headerClass="from-rose-50 to-rose-100">
            <CardHeader>
              <CardDescription>Comms • Satisfaction • Predictions • Next Best Action</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="comms">
                <TabsList className="flex flex-wrap gap-2">
                  <TabsTrigger value="comms"><MessageSquare className="h-3.5 w-3.5 mr-1" />Comms</TabsTrigger>
                  <TabsTrigger value="satisfaction"><TrendingUp className="h-3.5 w-3.5 mr-1" />Satisfaction</TabsTrigger>
                  <TabsTrigger value="pred"><Lightbulb className="h-3.5 w-3.5 mr-1" />Predictions</TabsTrigger>
                  <TabsTrigger value="nba"><ArrowRight className="h-3.5 w-3.5 mr-1" />Next Best Action</TabsTrigger>
                </TabsList>

                <TabsContent value="comms" className="mt-3 space-y-3">
                  {comms.map((c) => (
                    <div key={c.id} className="border rounded-xl p-3 flex items-start gap-3">
                      <div className="mt-0.5">
                        {c.channel === "Phone" || c.channel === "VoiceAI" ? (
                          <PhoneCall className="h-4 w-4" />
                        ) : c.channel.includes("Bot") || c.channel === "App" ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{c.subject}</div>
                        <div className="text-xs text-gray-500">{c.ts} • {c.dir.toUpperCase()} • {c.channel} • {c.actor}</div>
                        <div className="text-xs mt-1">{c.meta}</div>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-full">View</Button>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="satisfaction" className="mt-3 space-y-3">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="rounded-xl" title="" collapsible={false}>
                      <CardContent className="p-3">
                        <div className="text-xs text-gray-500">Latest NPS</div>
                        <div className="text-3xl font-semibold">{satisfaction.nps.score}</div>
                        <div className="text-xs mt-1">"{satisfaction.nps.verbatim}"</div>
                      </CardContent>
                    </Card>
                    <Card className="rounded-xl md:col-span-2" title="" collapsible={false}>
                      <CardContent className="p-3 h-28">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={satisfaction.csatTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[3.5, 5]} />
                            <Tooltip />
                            <Bar dataKey="csat" name="CSAT (1-5)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {satisfaction.episodes.map((e, i) => (
                      <div key={i} className="border rounded-xl p-3">
                        <div className="text-sm font-medium">{e.name}</div>
                        <div className="text-xs text-gray-500">CSAT {e.csat} • NPS {e.nps}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="pred" className="mt-3 space-y-3">
                  {predictions.map((p) => (
                    <div key={p.id} className="border rounded-xl p-3 flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium">{p.label}</div>
                        <div className="text-xs text-gray-500">Top drivers: {p.drivers.join(", ")}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold">{Math.round(p.prob * 100)}%</div>
                        <div className="text-[11px] text-gray-500">probability</div>
                      </div>
                    </div>
                  ))}
                  <div className="text-[11px] text-gray-500">Predictions are illustrative and not medical advice; clinician review required.</div>
                </TabsContent>

                <TabsContent value="nba" className="mt-3 space-y-3">
                  {nba.map((n) => (
                    <div key={n.id} className="border rounded-xl p-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{n.action}</div>
                        <PriorityChip p={n.priority} />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Why: {n.rationale}</div>
                      <div className="text-sm mt-2 p-2 rounded-lg bg-gray-50">Caregiver talk-track: “{n.talkTrack}”</div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" className="rounded-full">Assign</Button>
                        <Button size="sm" variant="outline" className="rounded-full">Snooze</Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right rail */}
        <div className="xl:col-span-3 space-y-4">
          <Card collapsible title={<><AlertTriangle className="h-4 w-4" />Live Alerts</>} headerClass="from-rose-50 to-rose-100">
            <CardHeader>
              <CardDescription>AI-ranked by clinical relevance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((a) => (
                <div key={a.id} className="rounded-xl border p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium"><PriorityBadge p={a.priority} />{a.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{a.message}</div>
                      <div className="text-[11px] text-gray-500 mt-1">Suggested: {a.suggested}</div>
                      <div className="text-[11px] text-gray-500 mt-1">{a.timestamp}</div>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => dismissAlert(a.id)}>Dismiss</Button>
                  </div>
                </div>
              ))}
              {alerts.length === 0 && <div className="text-sm text-gray-500">No active alerts 🎉</div>}
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch id="autoRem" checked={autoReminders} onCheckedChange={setAutoReminders} />
                <Label htmlFor="autoRem" className="text-sm">Auto-reminders to patient</Label>
              </div>
              <Button size="sm" variant="ghost" className="rounded-full">Configure</Button>
            </CardFooter>
          </Card>

          <Card collapsible title={<><Users className="h-4 w-4" />Caregiver Review</>} headerClass="from-slate-50 to-slate-100">
            <CardHeader>
              <CardDescription>Queue of tasks, notes, team, meds log</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tasks">
                <TabsList className="rounded-full flex flex-wrap gap-2">
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="medslog">Meds Log</TabsTrigger>
                </TabsList>

                <TabsContent value="tasks" className="space-y-3 mt-3">
                  {tasks.map((t) => (
                    <div key={t.id} className="border rounded-xl p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">{t.title}</div>
                          <div className="text-xs text-gray-500">Owner: {t.owner} • Due: {t.due}</div>
                          <div className="text-xs mt-1">{t.desc}</div>
                        </div>
                        {t.status === "Open" ? (
                          <Button size="sm" className="rounded-full" onClick={() => resolveTask(t.id)}>
                            <CheckCircle2 className="h-4 w-4 mr-1" /> Mark Done
                          </Button>
                        ) : (
                          <Badge className="rounded-full" variant="secondary">Done</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="notes" className="space-y-3 mt-3">
                  <div className="space-y-3 max-h-56 overflow-auto pr-1">
                    {notes.map((n) => (
                      <div key={n.id} className="flex gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback>{n.author.split(" ").map((p) => p[0]).join("")}</AvatarFallback></Avatar>
                        <div>
                          <div className="text-sm"><span className="font-medium">{n.author}</span> <span className="text-xs text-gray-500">({n.role}) • {n.ts}</span></div>
                          <div className="text-sm">{n.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add a caregiver note…" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                    <Button className="rounded-full" onClick={addNote}><Plus className="h-4 w-4 mr-1" />Add</Button>
                  </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-3 mt-3">
                  <div className="flex flex-col gap-3">
                    {DUMMY_PATIENT.caregivers.map((c, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Avatar className="h-9 w-9"><AvatarImage src={c.avatar} alt={c.name} /><AvatarFallback>{c.name.split(" ").map((p) => p[0]).join("")}</AvatarFallback></Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{c.name}</div>
                          <div className="text-xs text-gray-500">{c.role}</div>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-full">Message</Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="medslog" className="space-y-3 mt-3">
                  <div className="text-xs text-gray-500">Dose-level events last 7–10 days; source-weighted confidence.</div>
                  <div className="max-h-60 overflow-auto">
                    <div className="grid grid-cols-6 text-[11px] font-medium text-gray-500 px-2 py-1">
                      <div>Medication</div><div>Scheduled</div><div>Taken</div><div>Status</div><div>Source</div><div>Conf</div>
                    </div>
                    {medsLog.map((d) => {
                      const med = DUMMY_PATIENT.meds.find((m) => m.id === d.medId);
                      return (
                        <div key={d.id} className="grid grid-cols-6 items-center text-sm px-2 py-2 border-t">
                          <div className="truncate">{med?.name}</div>
                          <div>{d.scheduledAt}</div>
                          <div>{d.takenAt || "—"}</div>
                          <div><Badge className="rounded-full" variant="secondary">{d.state}</Badge></div>
                          <div className="text-xs">{d.source}</div>
                          <div className="text-xs">{Math.round(d.confidence * 100)}%</div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <Card collapsible title={<span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" />Privacy & Export</span>} headerClass="from-indigo-50 to-indigo-100">
          <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-sm text-gray-500">This is a prototype for an AI-driven, always-on patient twin portal. All data is fictional and for demonstration only.</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-full"><ShieldCheck className="h-4 w-4 mr-2" />Privacy Controls</Button>
              <Button className="rounded-full">Export Visit Summary</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- Alerts & Tasks Seeds ---
const alertsSeed = [
  { id: "A1", priority: "high", title: "Elevated Fasting Glucose 149 mg/dL", message: "3-day moving avg > 140 mg/dL in mid-Aug; trend improving post 26 Aug.", timestamp: "2025-08-19 07:20", suggested: "Reinforce diet; consider SMBG at bedtime; review in 2 weeks." },
  { id: "A2", priority: "med", title: "BP Variability", message: "SBP variability (CV 3.8%) – within acceptable range; monitor post-PT sessions.", timestamp: "2025-08-26 18:00", suggested: "Check BP 1h post-physio; encourage cooldown breathing." },
  { id: "A3", priority: "low", title: "Adherence Dip – Vitamin D", message: "Last 4 weeks adherence 80% vs 95% baseline.", timestamp: "2025-09-01 09:10", suggested: "Automate weekly reminder (Sat 10:00)." },
];

const tasksSeed = [
  { id: "T1", title: "Post-ORIF Rehab Review", due: "2025-09-15", owner: "Priya Nair", desc: "Assess ROM & weight-bearing tolerance; update home exercise plan.", status: "Open" },
  { id: "T2", title: "Diabetes Coaching Call", due: "2025-09-16", owner: "Anil Sharma", desc: "Reinforce plate method; check bedtime snack choices.", status: "Open" },
  { id: "T3", title: "Hypertension Med Review", due: "2025-09-20", owner: "Dr. Rhea Kapoor", desc: "Evaluate evening Telmisartan timing vs AM dosing.", status: "Open" },
];

/*****************************
 * Lightweight Dev Tests (runtime assertions)
 *****************************/
function __DEV_TESTS__() {
  console.assert(ArrowRight != null, "ArrowRight icon should be imported");
  console.assert(predictionSeed.length >= 3, "Need 3+ predictions");
  console.assert(nbaSeed.length >= 3, "Need 3+ Next Best Actions");
  console.assert(medsLogSeed.some((d) => d.state === "missed"), "Meds log should include at least one missed dose");
  const allowed = new Set(["high", "med", "low"]);
  console.assert(alertsSeed.every((a) => allowed.has(a.priority)), "Alerts priority must be high|med|low");
  const taskAllowed = new Set(["Open", "Done"]);
  console.assert(tasksSeed.every((t) => taskAllowed.has(t.status)), "Tasks status must be Open|Done");
  const dates = new Set(satisfactionSeed.csatTrend.map((d) => d.date));
  console.assert(dates.size === satisfactionSeed.csatTrend.length, "CSAT trend dates should be unique");
  console.assert(typeof Button === "function" && typeof Card === "function", "UI primitives should exist");
  console.assert(typeof Tabs === "function" && typeof TabsTrigger === "function" && typeof TabsContent === "function", "Tabs primitives should exist");
  console.assert(vitalsData.length >= 5, "Vitals should have at least 5 points for charts");
  console.info("✔ Dev tests passed (runtime assertions)");
}
try { if (typeof window !== "undefined") { __DEV_TESTS__(); } } catch (e) { console.warn("Dev tests encountered an error:", e); }
