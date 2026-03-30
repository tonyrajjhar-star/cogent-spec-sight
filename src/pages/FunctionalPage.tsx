import { SectionCard } from "@/components/SectionCard";
import { CoverageBar } from "@/components/CoverageBar";

const mappings = [
  { program: "SETTL-MAIN", domain: "Settlement", function: "End-of-Day Settlement Processing", clarity: 94 },
  { program: "PAY-BATCH", domain: "Payments", function: "Batch Payment Execution", clarity: 91 },
  { program: "SETTL-CALC", domain: "Settlement", function: "Settlement Amount Calculation", clarity: 78 },
  { program: "CICS-MENU", domain: "Operations", function: "Operator Navigation & Menu", clarity: 88 },
  { program: "ACCT-INQ", domain: "Accounts", function: "Account Balance Inquiry", clarity: 96 },
  { program: "BAL-UPD", domain: "Accounts", function: "Balance Update & Posting", clarity: 85 },
  { program: "PAY-REPORT", domain: "Reporting", function: "Payment Reconciliation Report", clarity: 92 },
];

const domains = [...new Set(mappings.map(m => m.domain))];

const FunctionalPage = () => (
  <div className="space-y-6 max-w-6xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Functional Specification Mapping</h1>
      <p className="text-sm text-muted-foreground mt-1">Business understanding, not just technical output</p>
    </div>

    {/* Domain overview */}
    <div className="flex flex-wrap gap-2">
      {domains.map(d => (
        <div key={d} className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          {d} <span className="text-muted-foreground ml-1">({mappings.filter(m => m.domain === d).length})</span>
        </div>
      ))}
    </div>

    <SectionCard title="Program → Business Function Mapping" subtitle="Inferred business domains and functional clarity">
      <div className="divide-y divide-border">
        {mappings.map(m => (
          <div key={m.program} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
            <div className="w-28 text-sm font-mono text-primary shrink-0">{m.program}</div>
            <div className="flex-1">
              <div className="text-sm text-foreground">{m.function}</div>
              <div className="text-[10px] text-muted-foreground">{m.domain}</div>
            </div>
            <div className="w-40 shrink-0">
              <CoverageBar label="Clarity" value={m.clarity} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  </div>
);

export default FunctionalPage;
