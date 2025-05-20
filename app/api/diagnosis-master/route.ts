import { NextResponse } from 'next/server';

const categories = [
  'Endocrine',
  'Cardiovascular',
  'Respiratory',
  'Digestive',
  'Musculoskeletal',
  'Neurological',
  'Psychiatric',
  'Genitourinary',
];

const allRows = [
  { id: 1, code: 'E11', name: 'Type 2 diabetes mellitus', category: 'Endocrine' },
  { id: 2, code: 'I10', name: 'Essential (primary) hypertension', category: 'Cardiovascular' },
  { id: 3, code: 'J45', name: 'Asthma', category: 'Respiratory' },
  { id: 4, code: 'K29', name: 'Gastritis and duodenitis', category: 'Digestive' },
  { id: 5, code: 'M54', name: 'Dorsalgia', category: 'Musculoskeletal' },
  { id: 6, code: 'G47', name: 'Sleep disorders', category: 'Neurological' },
  { id: 7, code: 'F41', name: 'Anxiety disorders', category: 'Psychiatric' },
  { id: 8, code: 'N39', name: 'Urinary tract infection', category: 'Genitourinary' },
  { id: 9, code: 'J02', name: 'Acute pharyngitis', category: 'Respiratory' },
  { id: 10, code: 'E78', name: 'Disorders of lipoprotein metabolism', category: 'Endocrine' },
  // Add more mock rows for pagination
  ...Array.from({ length: 90 }, (_, i) => ({
    id: i + 11,
    code: `X${i + 11}`,
    name: `Diagnosis ${i + 11}`,
    category: categories[i % categories.length],
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