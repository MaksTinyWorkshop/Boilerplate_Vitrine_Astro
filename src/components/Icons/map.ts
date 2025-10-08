import Alert from './icons/alert.svg?raw';
import Check from './icons/check.svg?raw';
import ChevronDown from './icons/chevron-down.svg?raw';
import ChevronLeft from './icons/chevron-left.svg?raw';
import ChevronRight from './icons/chevron-right.svg?raw';
import ChevronUp from './icons/chevron-up.svg?raw';
import CircleCheck from './icons/circle-check.svg?raw';
import CircleClose from './icons/circle-close.svg?raw';
import Close from './icons/close.svg?raw';
import Copy from './icons/copy.svg?raw';
import PlanPremium from './icons/plan-premium.svg?raw';
import PlanStandard from './icons/plan-standard.svg?raw';
import PlanStarter from './icons/plan-starter.svg?raw';
import SectorCulture from './icons/sector-culture.svg?raw';
import SectorEducation from './icons/sector-education.svg?raw';
import SectorHospitality from './icons/sector-hospitality.svg?raw';
import SectorIndustry from './icons/sector-industry.svg?raw';
import SectorPublic from './icons/sector-public.svg?raw';
import SectorRealestate from './icons/sector-realestate.svg?raw';
import SectorRestaurant from './icons/sector-restaurant.svg?raw';
import SectorRetail from './icons/sector-retail.svg?raw';
import WorkflowApproval from './icons/workflow-approval.svg?raw';
import WorkflowDeploy from './icons/workflow-deploy.svg?raw';
import WorkflowQuote from './icons/workflow-quote.svg?raw';
import Discord from './icons/discord.svg?raw';
import Facebook from './icons/facebook.svg?raw';
import Github from './icons/github.svg?raw';
import Home from './icons/home.svg?raw';
import Info from './icons/info.svg?raw';
import Instagram from './icons/instagram.svg?raw';
import Mail from './icons/mail.svg?raw';
import Moon from './icons/moon.svg?raw';
import Order from './icons/order.svg?raw';
import Phone from './icons/phone.svg?raw';
import Plus from './icons/plus.svg?raw';
import Search from './icons/search.svg?raw';
import Linkedin from './icons/linkedin.svg?raw';
import Sun from './icons/sun.svg?raw';
import Warning from './icons/warning.svg?raw';

const iconMap = {
  alert: Alert,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'circle-check': CircleCheck,
  'circle-close': CircleClose,
  close: Close,
  copy: Copy,
  'plan-premium': PlanPremium,
  'plan-standard': PlanStandard,
  'plan-starter': PlanStarter,
  'sector-culture': SectorCulture,
  'sector-education': SectorEducation,
  'sector-hospitality': SectorHospitality,
  'sector-industry': SectorIndustry,
  'sector-public': SectorPublic,
  'sector-realestate': SectorRealestate,
  'sector-restaurant': SectorRestaurant,
  'sector-retail': SectorRetail,
  'workflow-approval': WorkflowApproval,
  'workflow-deploy': WorkflowDeploy,
  'workflow-quote': WorkflowQuote,
  discord: Discord,
  facebook: Facebook,
  github: Github,
  home: Home,
  info: Info,
  instagram: Instagram,
  mail: Mail,
  phone: Phone,
  moon: Moon,
  order: Order,
  plus: Plus,
  search: Search,
  linkedin: Linkedin,
  sun: Sun,
  warning: Warning,
} as const satisfies Record<string, string>;

export type IconName = keyof typeof iconMap;

export default iconMap;
