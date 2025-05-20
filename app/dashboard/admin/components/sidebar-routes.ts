import {
  UserIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
  ClipboardIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  RectangleStackIcon,
  ClipboardDocumentCheckIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline';

export const sidebarRoutes = [
  {
    section: "Today's Dashboard",
    items: [
      { label: "Today's IPD Dashboard", icon: Squares2X2Icon, path: "/dashboard/admin/ipd" },
      { label: "Today's OPD Dashboard", icon: Squares2X2Icon, path: "/dashboard/admin/opd" },
    ],
  },
  {
    section: "Patient Management",
    items: [
      { label: "Patient Management", icon: UserIcon, path: "/dashboard/admin/patient-management" },
      { label: "Patient Dashboard", icon: ClipboardDocumentListIcon, path: "/dashboard/admin/patient-dashboard" },
    ],
  },
  {
    section: "Masters",
    items: [
      { label: "Diagnosis Master", icon: ClipboardIcon, path: "/dashboard/admin/masters/diagnosis-master" },
      { label: "CGHS Surgery Master", icon: PuzzlePieceIcon, path: "/dashboard/admin/masters/cghs-surgery-master" },
      { label: "Yojna Surgery Master", icon: PuzzlePieceIcon, path: "/dashboard/admin/masters/yojna-surgery-master" },
      { label: "Private Surgery Master", icon: PuzzlePieceIcon, path: "/dashboard/admin/masters/private-surgery-master" },
      { label: "Complication Master", icon: ExclamationTriangleIcon, path: "/dashboard/admin/masters/complication-master" },
      { label: "Radiology Master", icon: BeakerIcon, path: "/dashboard/admin/masters/radiology-master" },
      { label: "Lab Master", icon: RectangleStackIcon, path: "/dashboard/admin/masters/lab-master" },
      { label: "Other Investigations", icon: ClipboardDocumentCheckIcon, path: "/dashboard/admin/masters/other-investigations" },
      { label: "Medications Master", icon: ClipboardDocumentCheckIcon, path: "/dashboard/admin/masters/medications-master" },
    ],
  },
]; 