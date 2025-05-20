import { NextResponse } from 'next/server';

const categories = [
  'Cardiac',
  'Orthopedic',
  'Neurosurgery',
  'Gastroenterology',
  'Urology',
];

const allRows = [
  { code: 'CS1001', name: 'Coronary Artery Bypass Grafting (CABG)', category: 'Cardiac', nabh: 120000, nonNabh: 105000 },
  { code: 'CS1002', name: 'Valve Replacement Surgery', category: 'Cardiac', nabh: 135000, nonNabh: 120000 },
  { code: 'OS2001', name: 'Total Knee Replacement', category: 'Orthopedic', nabh: 90000, nonNabh: 80000 },
  { code: 'OS2002', name: 'Total Hip Replacement', category: 'Orthopedic', nabh: 95000, nonNabh: 85000 },
  { code: 'NS3001', name: 'Craniotomy', category: 'Neurosurgery', nabh: 110000, nonNabh: 95000 },
  { code: 'NS3002', name: 'Laminectomy', category: 'Neurosurgery', nabh: 65000, nonNabh: 55000 },
  { code: 'GS4001', name: 'Laparoscopic Cholecystectomy', category: 'Gastroenterology', nabh: 40000, nonNabh: 35000 },
  { code: 'GS4002', name: 'Appendectomy', category: 'Gastroenterology', nabh: 30000, nonNabh: 25000 },
  { code: 'US5001', name: 'Transurethral Resection of Prostate (TURP)', category: 'Urology', nabh: 45000, nonNabh: 40000 },
  { code: 'US5002', name: 'Nephrectomy', category: 'Urology', nabh: 70000, nonNabh: 60000 },
  // Add more mock rows for pagination
  ...Array.from({ length: 40 }, (_, i) => ({
    code: `X${i + 11}`,
    name: `Surgery ${i + 11}`,
    category: categories[i % categories.length],
    nabh: 20000 + (i * 1000),
    nonNabh: 15000 + (i * 900),
  })),
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const category = searchParams.get('category') || '';

  let filtered = allRows;
  if (search) {
    filtered = filtered.filter(row =>
      row.code.toLowerCase().includes(search) ||
      row.name.toLowerCase().includes(search)
    );
  }
  if (category && category !== 'All') {
    filtered = filtered.filter(row => row.category === category);
  }
  const total = filtered.length;
  const rows = filtered.slice((page-1)*pageSize, page*pageSize);

  return NextResponse.json({ rows, total, categories });
} 