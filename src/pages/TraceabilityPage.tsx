import { SectionCard } from "@/components/SectionCard";
import { ArrowRight } from "lucide-react";

const traces = [
  {
    insight: "Settlement calculation contains hardcoded date logic vulnerable to Y2K-style issues",
    specSection: "SETTL-CALC § 4.2 — Date Processing Logic",
    codeRef: "SETTL-CALC.cbl, PROCEDURE DIVISION, PARA-CALC-DATE (lines 842–891)",
    code: `COMPUTE WS-YEAR = FUNCTION INTEGER-OF-DATE(WS-DATE-IN)\n  IF WS-YEAR < 50\n    MOVE 20 TO WS-CENTURY\n  ELSE\n    MOVE 19 TO WS-CENTURY\n  END-IF`,
  },
  {
    insight: "Dynamic SQL in DB2-ACCESS bypasses standard parameter binding — injection risk",
    specSection: "DB2-ACCESS § 2.1 — SQL Construction",
    codeRef: "DB2-ACCESS.cbl, PARA-BUILD-SQL (lines 312–358)",
    code: `STRING 'SELECT * FROM ' WS-TABLE-NAME\n  ' WHERE ' WS-COND-FIELD ' = ''' WS-COND-VALUE ''''\n  DELIMITED BY SIZE INTO WS-SQL-STMT`,
  },
  {
    insight: "Orphan program UTIL-LEGACY contains reusable date utilities referenced nowhere",
    specSection: "Inventory Report § Orphan Analysis",
    codeRef: "UTIL-LEGACY.cbl, PARA-CONVERT-DATE (lines 45–102)",
    code: `* UTILITY: DATE CONVERSION ROUTINES\n* AUTHOR: J.SMITH 1994\n* NOTE: REPLACED BY SETTL-CALC INLINE LOGIC\n  PERFORM PARA-CONVERT-JULIAN THRU PARA-CONVERT-EXIT`,
  },
];

const TraceabilityPage = () => (
  <div className="space-y-6 max-w-5xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Insight-to-Code Traceability</h1>
      <p className="text-sm text-muted-foreground mt-1">Proving explainability and auditability · Modernization Insight → Spec → Code</p>
    </div>

    <div className="space-y-4">
      {traces.map((t, i) => (
        <SectionCard key={i} title={`Trace #${i + 1}`}>
          <div className="space-y-4">
            {/* Insight */}
            <div className="rounded-md border border-status-warning/30 bg-status-warning/5 p-4">
              <div className="text-[10px] text-status-warning uppercase tracking-wider font-medium mb-1">Modernization Insight</div>
              <div className="text-sm text-foreground">{t.insight}</div>
            </div>

            <div className="flex justify-center"><ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" /></div>

            {/* Spec Section */}
            <div className="rounded-md border border-primary/30 bg-primary/5 p-4">
              <div className="text-[10px] text-primary uppercase tracking-wider font-medium mb-1">Specification Section</div>
              <div className="text-sm font-mono text-foreground">{t.specSection}</div>
            </div>

            <div className="flex justify-center"><ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" /></div>

            {/* Code */}
            <div className="rounded-md border border-border bg-muted/50 p-4">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Source Code Reference</div>
              <div className="text-xs text-muted-foreground mb-2">{t.codeRef}</div>
              <pre className="text-xs font-mono text-foreground leading-relaxed whitespace-pre-wrap">{t.code}</pre>
            </div>
          </div>
        </SectionCard>
      ))}
    </div>
  </div>
);

export default TraceabilityPage;
