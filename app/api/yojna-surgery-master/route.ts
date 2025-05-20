import { NextResponse } from 'next/server';

const categories = [
  'Ophthalmology',
  'Cardiology',
  'General Surgery',
  'Orthopedics',
  'ENT',
];

const allRows = [
  { surgeryName: 'Cataract Surgery', category: 'Ophthalmology', scheme: 'PMJAY', nabhRate: 12000, nonNabhRate: 10000, packageCode: 'PM-OPH-01' },
  { surgeryName: 'Coronary Angioplasty', category: 'Cardiology', scheme: 'PMJAY', nabhRate: 65000, nonNabhRate: 55000, packageCode: 'PM-CAR-15' },
  { surgeryName: 'Appendectomy', category: 'General Surgery', scheme: 'PMJAY', nabhRate: 22000, nonNabhRate: 18000, packageCode: 'PM-GES-03' },
  { surgeryName: 'Total Knee Replacement', category: 'Orthopedics', scheme: 'MJPJAY', nabhRate: 80000, nonNabhRate: 70000, packageCode: 'MJ-ORT-12' },
  { surgeryName: 'Cochlear Implant', category: 'ENT', scheme: 'PMJAY', nabhRate: 600000, nonNabhRate: 550000, packageCode: 'PM-ENT-09' },
  // Add more mock rows for pagination
  ...Array.from({ length: 40 }, (_, i) => ({
    surgeryName: `Surgery ${i + 6}`,
    category: categories[i % categories.length],
    scheme: i % 2 === 0 ? 'PMJAY' : 'MJPJAY',
    nabhRate: 20000 + (i * 1000),
    nonNabhRate: 15000 + (i * 900),
    packageCode: `PKG-${i + 6}`,
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
      row.surgeryName.toLowerCase().includes(search) ||
      row.packageCode.toLowerCase().includes(search)
    );
  }
  if (category && category !== 'All') {
    filtered = filtered.filter(row => row.category === category);
  }
  const total = filtered.length;
  const rows = filtered.slice((page-1)*pageSize, page*pageSize);

  return NextResponse.json({ rows, total, categories });
} 