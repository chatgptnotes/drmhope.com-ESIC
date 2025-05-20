import { NextResponse } from 'next/server';

const statusList = ['Admitted', 'Discharged', 'Under Observation'];
const genderList = ['Male', 'Female', 'Other'];

const allRows = [
  {
    patientId: "P-1001",
    name: "Rahul Sharma",
    age: 32,
    gender: "Male",
    status: "Admitted",
  },
  {
    patientId: "P-1002",
    name: "Neha Singh",
    age: 28,
    gender: "Female",
    status: "Discharged",
  },
  {
    patientId: "P-1003",
    name: "Amit Patel",
    age: 45,
    gender: "Male",
    status: "Under Observation",
  },
  // Add more mock rows for pagination
  ...Array.from({ length: 30 }, (_, i) => ({
    patientId: `P-10${i+4}`,
    name: `Patient ${i+4}`,
    age: 20 + (i % 50),
    gender: genderList[i % 3],
    status: statusList[i % 3],
  })),
];

export async function GET(req: Request) {
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
    { label: "Total Patients", value: total, color: "text-blue-700", bg: "bg-blue-50" },
    { label: "Admitted", value: filtered.filter(r => r.status === 'Admitted').length, color: "text-green-700", bg: "bg-green-50" },
    { label: "Discharged", value: filtered.filter(r => r.status === 'Discharged').length, color: "text-purple-700", bg: "bg-purple-50" },
  ];

  return NextResponse.json({ stats, rows, total });
} 