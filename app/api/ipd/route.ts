import { NextResponse } from 'next/server';

const allRows = [
  {
    ipdVisitId: "IPD-2023-5001",
    patientId: "ESIC-2023-1008",
    name: "Rajesh Kumar",
    room: "205-A",
    admissionDate: "15 May 2023",
    diagnosis: "Pneumonia",
    doctor: "Dr. S. Mehta",
  },
  {
    ipdVisitId: "IPD-2023-5002",
    patientId: "ESIC-2023-1015",
    name: "Priya Sharma",
    room: "103-B",
    admissionDate: "17 May 2023",
    diagnosis: "Appendicitis",
    doctor: "Dr. P. Gupta",
  },
  {
    ipdVisitId: "IPD-2023-5003",
    patientId: "ESIC-2023-1023",
    name: "Anil Verma",
    room: "307-C",
    admissionDate: "18 May 2023",
    diagnosis: "Myocardial Infarction",
    doctor: "Dr. A. Kumar",
  },
  {
    ipdVisitId: "IPD-2023-5004",
    patientId: "ESIC-2023-1027",
    name: "Sunita Singh",
    room: "202-A",
    admissionDate: "18 May 2023",
    diagnosis: "Cholecystitis",
    doctor: "Dr. P. Gupta",
  },
  // Add more mock rows for pagination
  ...Array.from({ length: 30 }, (_, i) => ({
    ipdVisitId: `IPD-2023-50${i+5}`,
    patientId: `ESIC-2023-10${i+28}`,
    name: `Patient ${i+5}`,
    room: `${100 + i}-A`,
    admissionDate: "18 May 2023",
    diagnosis: "Diagnosis",
    doctor: `Dr. X.${i}`,
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
    { label: "Total IPD Patients", value: total, color: "text-blue-700", bg: "bg-blue-50" },
    { label: "Admissions Today", value: 8, color: "text-green-700", bg: "bg-green-50" },
    { label: "Discharges Today", value: 5, color: "text-purple-700", bg: "bg-purple-50" },
  ];

  return NextResponse.json({ stats, rows, total });
} 