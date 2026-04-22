import {
  Upload, GitBranch, BarChart3, FileText, Layers, ShieldCheck,
  UserCheck, TrendingUp, Link2, LayoutDashboard, Cpu, FileCode,
  Hash, ArrowRight, AlertTriangle, RotateCw, Brain, Eye,
  CheckCircle2, Clock, Menu, X, Check, Loader2, Circle,
  Coffee, Database, BookOpen, Code2, LogIn, Activity, Gauge
} from "lucide-react";
import { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Upload, GitBranch, BarChart3, FileText, Layers, ShieldCheck,
  UserCheck, TrendingUp, Link2, LayoutDashboard, Cpu, FileCode,
  Hash, ArrowRight, AlertTriangle, RotateCw, Brain, Eye,
  CheckCircle2, Clock, Menu, X, Check, Loader2, Circle,
  Coffee, Database, BookOpen, Code2, LogIn, Activity, Gauge,
};

export const getIcon = (name: string): LucideIcon => iconMap[name] || Circle;
