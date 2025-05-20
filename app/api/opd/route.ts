import { NextResponse } from 'next/server';

const statusList = ['Completed', 'In Progress', 'Waiting'];

const allRows = [
  {
    opdVisitId: "OPD-2023-2001",
    tokenNo: "T-001",
    patientId: "ESIC-2023-1001",
    name: "Rahul Sharma",
    timeSlot: "09:30 AM",
    department: "Cardiology",
    doctor: "Dr. A. Kumar",
    status: "Completed",
  },
  {
    opdVisitId: "OPD-2023-2002",
    tokenNo: "T-002",
    patientId: "ESIC-2023-1012",
    name: "Mohan Patel",
    timeSlot: "10:00 AM",
    department: "Orthopedics",
    doctor: "Dr. S. Mehta",
    status: "Completed",
  },
  {
    opdVisitId: "OPD-2023-2003",
    tokenNo: "T-003",
    patientId: "ESIC-2023-1018",
    name: "Geeta Desai",
    timeSlot: "10:30 AM",
    department: "General Medicine",
    doctor: "Dr. R. Singh",
    status: "In Progress",
  },
  {
    opdVisitId: "OPD-2023-2004",
    tokenNo: "T-004",
    patientId: "ESIC-2023-1025",
    name: "Vikram Malhotra",
    timeSlot: "11:00 AM",
    department: "ENT",
    doctor: "Dr. P. Gupta",
    status: "Waiting",
  },
  // Add more mock rows for pagination
  ...Array.from({ length: 30 }, (_, i) => ({
    opdVisitId: `OPD-2023-20${i+5}`,
    tokenNo: `T-${(i+5).toString().padStart(3, '0')}`,
    patientId: `ESIC-2023-10${i+30}`,
    name: `OPD Patient ${i+5}`,
    timeSlot: `${9 + (i%8)}:${(i%2) ? '30' : '00'} AM`,
    department: ["Cardiology", "Orthopedics", "ENT", "General Medicine"][i%4],
    doctor: `Dr. Y.${i}`,
    status: statusList[i%3],
  })),
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const search = searchParams.get('search')?.toLowerCase() || '';

  let filtered = allRows;
  if (search) {
    filtered = filtered.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(search)
      )
    );
  }
  const total = filtered.length;
  const rows = filtered.slice((page-1)*pageSize, page*pageSize);

  // Example stats (could be dynamic)
  const stats = [
    { label: "Total OPD Patients", value: total, color: "text-blue-700", bg: "bg-blue-50" },
    { label: "Morning Slot", value: 28, color: "text-green-700", bg: "bg-green-50" },
    { label: "Evening Slot", value: 14, color: "text-purple-700", bg: "bg-purple-50" },
  ];

  return NextResponse.json({ stats, rows, total });
} 