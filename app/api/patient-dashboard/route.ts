import { NextResponse } from 'next/server';

const statusList = ['Approved', 'Pending', 'Rejected'];
const insuranceList = ['Active', 'Expired'];
const genderList = ['Male', 'Female', 'Other'];

const allRows = [
  {
    id: "ESIC-2023-1001",
    name: "Rahul Sharma",
    age: 42,
    gender: "Male",
    primaryDiagnosis: "Type 2 Diabetes Mellitus",
    surgery: "Cataract Surgery",
    status: "Approved",
    registration: "15 Jan 2023",
    insurance: "Active",
    referee: "Dr. Neha Patel",
  },
  {
    id: "ESIC-2023-1002",
    name: "Amit Verma",
    age: 35,
    gender: "Male",
    primaryDiagnosis: "Hypertension",
    surgery: "Appendectomy",
    status: "Pending",
    registration: "20 Feb 2023",
    insurance: "Active",
    referee: "Dr. Vikram Singh",
  },
  {
    id: "ESIC-2023-1003",
    name: "Suman Gupta",
    age: 29,
    gender: "Female",
    primaryDiagnosis: "Coronary Artery Disease",
    surgery: "Coronary Angioplasty",
    status: "Rejected",
    registration: "10 Mar 2023",
    insurance: "Expired",
    referee: "Dr. Anjali Gupta",
  },
  // Add more mock rows for pagination
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `ESIC-2023-10${i+4}`,
    name: `Patient ${i+4}`,
    age: 20 + (i % 60),
    gender: genderList[i % 3],
    primaryDiagnosis: ["Hypertension", "Diabetes", "Asthma", "CAD"][i%4],
    surgery: ["Appendectomy", "Cataract Surgery", "Angioplasty", "Bypass Surgery"][i%4],
    status: statusList[i % 3],
    registration: `${10 + (i%20)} Mar 2023`,
    insurance: insuranceList[i % 2],
    referee: `Dr. Referee ${i+1}`,
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
    { label: "Approved", value: filtered.filter(r => r.status === 'Approved').length, color: "text-green-700", bg: "bg-green-50" },
    { label: "Pending", value: filtered.filter(r => r.status === 'Pending').length, color: "text-yellow-700", bg: "bg-yellow-50" },
  ];

  return NextResponse.json({ stats, rows, total });
} 